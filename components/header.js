import React, { useState, useEffect, useRef, useContext } from "react";
import PropTypes from "prop-types";
import styled, { createGlobalStyle } from "styled-components";
import AppContext from "../context/appContext";
import AOS from "aos";
import "aos/dist/aos.css";

const Header = () => {
  // Cypress Testing Coverage //
  /* istanbul ignore file */
  const [showSkipLink, setShowSkipLink] = useState(false);
  const ref = useRef(null);
  const overlayRef = useRef(null);
  const burgerRef = useRef(null);
  const appContext = useContext(AppContext);
  const [burgerMenu, setBurgerMenu] = useState(false);
  useEffect(() => {
    AOS.init({
      offset: 0,
      // duration: 750,
      // once: true,
    });
    window.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (burgerMenu && burgerRef.current) {
      burgerRef.current.focus();
    }
  }, [burgerMenu]);

  const handleClickOutside = (e) => {
    if (e.target === overlayRef.current) {
      setBurgerMenu(false);
    }
  };

  const handleClick = (component) => {
    if (component.position) {
      window.scrollTo({
        top: component.position,
        left: 0,
        behavior: "smooth",
      });
      setBurgerMenu(false);
    }
  };

  const handleBurgerClick = () => {
    setBurgerMenu(!burgerMenu);
  };

  const renderLinks = () => {
    const { componentPositions } = appContext;

    return (
      <React.Fragment>
        {componentPositions.map((component, index) => (
          <Linkk
            tabindex="0"
            role="button"
            key={componentPositions.indexOf(component)}
            array={componentPositions}
            onClick={() => handleClick(component)}
            data-aos="fade-left"
            burgerMenu={burgerMenu}
            id={component.name}
            value={burgerMenu}
            data-testid={`${component.name}-link`}
            data-aos-delay={index * 100}
          >
            {component.name}
          </Linkk>
        ))}
      </React.Fragment>
    );
  };

  return (
    <Container>
      <GlobalStyle burgerMenu={burgerMenu} />
      <SkipHeaderLink
        href="#main"
        onFocus={() => {
          setShowSkipLink(true);
          setBurgerMenu(false);
        }}
        onBlur={() => setShowSkipLink(false)}
        showSkipLink={showSkipLink}
      >
        Skip to Content
      </SkipHeaderLink>
      {!burgerMenu && <HeaderContainer>{renderLinks()}</HeaderContainer>}

      <ResonsiveHeaderContainer id="responsive">
        <BurgerContainer onClick={handleBurgerClick}>
          <BurgerMenu
            value={burgerMenu}
            id="burgerMenu"
            ref={burgerRef}
            data-testid="burgerMenu"
          >
            <BurgerInner burgerMenu={burgerMenu} />
          </BurgerMenu>
        </BurgerContainer>
        <Overlay
          burgerMenu={burgerMenu}
          ref={overlayRef}
          role="dialog"
          aria-label="overlay"
        >
          <ResponsiveLinksContainer
            ref={ref}
            data-testid={"responsive-header"}
            id="responsive-header"
            value={burgerMenu}
            burgerMenu={burgerMenu}
          >
            {burgerMenu && renderLinks()}
          </ResponsiveLinksContainer>
        </Overlay>
      </ResonsiveHeaderContainer>
    </Container>
  );
};

export default Header;

const GlobalStyle = createGlobalStyle`
 body {
   overflow: ${({ burgerMenu }) =>
     burgerMenu ? "hidden !important" : "scroll"};
   overscroll-behavior: none;
  }
`;

const Container = styled.header``;

const SkipHeaderLink = styled.a`
  opacity: ${({ showSkipLink }) => (showSkipLink ? 1 : 0)};
  padding: 16px 24px;
  position: absolute;
  top: 92px;
  left: ${({ showSkipLink }) => (showSkipLink ? "62px" : "-400px")};
  font-size: 1rem;
  border-radius: 9px;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.02) 0px -5.9px 2.7px,
    rgba(0, 0, 0, 0.024) 0px -1.2px 6.9px, rgba(0, 0, 0, 0.03) 0px 8px 14.2px,
    rgba(0, 0, 0, 0.04) 0px 21.9px 29.2px, rgba(0, 0, 0, 0.07) 0px 49px 80px;
  &:focus {
    outline: initial solid initial;
  }
`;

const HeaderContainer = styled.header`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  top: 20px;
  right: 50px;
  max-width: 500px;
  width: 100%;
  background-color: transparent;
  @media (max-width: 1086px) {
    right: 0;
    left: 0;
    margin-left: auto;
    margin-right: auto;
  }
  @media (max-width: 515px) {
    display: none;
  }
`;

const Linkk = styled.button`
  display: inline-block;
  position: relative;
  font-size: 1.5rem;
  font-weight: 600;
  font-family: inherit;
  letter-spacing: 1px;
  text-align: center;
  white-space: nowrap;
  background-color: transparent;
  border: none;
  width: calc(100% - 40px);
  margin: 22.46px 11px;
  padding: 0px 12px;
  color: rgba(245, 245, 247, 0.8);
  transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
  &::before {
    background-color: rgba(245, 245, 247, 0.4);
    bottom: -9px;
    content: "";
    height: 3px;
    left: 0;
    opacity: 0;
    position: absolute;
    right: 0;
    transform-origin: left center;
    transform: scaleX(0);
    visibility: visible;
    width: auto;
    border-radius: 0px 0px 4px 4px;
    transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
    box-shadow: rgba(17, 12, 46, 0.15) 0px 48px 100px 0px;
  }

  &:hover&::before {
    transform: scaleX(1);
    opacity: 1;
    background-color: rgba(245, 245, 247, 1);
  }
  &:hover {
    cursor: pointer;
    color: rgba(245, 245, 247, 1);
  }
  @media (max-width: 515px) {
    display: block;
    padding: 22.5px 0px;
    margin: 0px 20px;
    border-top: 1px solid #f5f5eb;
    &:last-child {
      border-bottom: 1px solid #f5f5eb;
    }
    &:hover&::before {
      opacity: 0;
    }
  }
`;

const ResonsiveHeaderContainer = styled.header`
  position: absolute;
  display: none;
  right: 0;
  background-color: transparent;
  @media (max-width: 515px) {
    display: flex;
  }
`;

const Overlay = styled.div`
  overflow: hidden;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 1;
  width: 100%;
  height: 100%;
  transition: all 0.3s;
  visibility: ${({ burgerMenu }) => (burgerMenu ? "visible" : "hidden")};
  background-color: ${({ burgerMenu }) =>
    burgerMenu ? "rgba(0, 0, 0, 0.25)" : "transparent"};
  &.overlayAnimation-enter {
    background-color: transparent;
  }
  &.overlayAnimation-enter-active {
    background-color: rgba(0, 0, 0, 0.25);
    transition: all 0.3s;
  }
  &.overlayAnimation-exit {
    background-color: rgba(0, 0, 0, 0.25);
    transition: all 0.3s;
  }
  &.overlayAnimation-exit-active {
    background-color: transparent;
    transition: all 0.3s;
  }
`;

const BurgerContainer = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background: none;
  color: inherit;
  border: none;
  font: inherit;
  margin-top: 20px;
  padding: 20px;
  margin-right: 20px;
  z-index: 4;
`;

const BurgerMenu = styled.div`
  display: inline-block;
  background: none;
  color: inherit;
  border: none;
  font: inherit;
  position: relative;
  width: 40px;
  height: 24px;
  margin-left: auto;
  &:hover {
    cursor: pointer;
  }
`;

const BurgerInner = styled.div`
  position: absolute;
  width: 40px;
  height: 4px;
  transition-timing-function: ease;
  transition-duration: 0.15s;
  transition-property: transform;
  border-radius: 4px;
  background-color: #f5f5eb;
  transform: ${({ burgerMenu }) =>
    burgerMenu
      ? `translate3d(0, 10px, 0) rotate(45deg)`
      : `translate3d(0, 0px, 0) rotate(0deg)`}
  };
  &::before {
    display: block;
    content: "";
    top: 10px;
    transition-timing-function: ease;
    transition-duration: 0.15s;
    transition-property: transform, opacity;
    position: absolute;
    width: 40px;
    height: 4px;
    transition-timing-function: ease;
    transition-duration: 0.15s;
    transition-property: transform;
    border-radius: 4px;
    background-color: #f5f5eb;
        opacity: ${({ burgerMenu }) => (burgerMenu ? 0 : 1)}
  };
  &::after {
    top: 20px;
    display: block;
    content: "";
    position: absolute;
    width: 40px;
    height: 4px;
    transition-timing-function: ease;
    transition-duration: 0.15s;
    transition-property: transform;
    border-radius: 4px;
    background-color: #f5f5eb;
    bottom: -10px;
    background-color: #f5f5eb;
    transform: ${({ burgerMenu }) =>
      burgerMenu
        ? `translate3d(0,-20px, 0) rotate(-90deg)`
        : `translate3d(0, 0px, 0) rotate(0deg)`}
  };
`;

const ResponsiveLinksContainer = styled.div`
  top: 0;
  right: 0;
  box-sizing: border-box;
  padding-top: 110px;
  width: 100%;
  height: 100vh;
  position: absolute;
  overflow: hidden;
  background-image: linear-gradient(0deg, #ff9a9e 0%, #fad0c4 100%);
  z-index: 3;
  transition: all 0.3s ease;
  width: ${({ burgerMenu }) => (burgerMenu ? "280px" : "0px")};
  @media (max-width: 350px) {
    width: ${({ burgerMenu }) => (burgerMenu ? "250px" : "0px")};
  }
`;
