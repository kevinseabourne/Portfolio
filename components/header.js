import React, { useState, useEffect, useRef, useContext } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import AppContext from "../context/appContext";
import { createGlobalStyle } from "styled-components";
// import AOS from "aos";
// import "aos/dist/aos.css";

const Header = (props) => {
  // Cypress Testing Coverage //
  /* istanbul ignore file */

  const ref = useRef(null);
  const appContext = useContext(AppContext);
  const [burgerMenu, setBurgerMenu] = useState(false);
  useEffect(() => {
    window.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClickOutside = (e) => {
    if (ref.current && !ref.current.contains(e.target)) {
      setBurgerMenu(false);
    }
  };

  const handleClick = (component) => {
    if (component.position) {
      window.scrollTo({
        top: component.position,
        left: 0,
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
        {componentPositions.map((component) => (
          <Linkk
            key={componentPositions.indexOf(component)}
            array={componentPositions}
            onClick={() => handleClick(component)}
            data-aos="fade-left"
            burgerMenu={burgerMenu}
            id={component.name}
            value={burgerMenu}
            data-testid={`${component.name}-link`}
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
      {!burgerMenu && <HeaderContainer>{renderLinks()}</HeaderContainer>}
      <ResonsiveHeaderContainer id="responsive" ref={ref}>
        <BurgerMenu
          value={burgerMenu}
          onClick={handleBurgerClick}
          id="burgerMenu"
          data-testid="burgerMenu"
        >
          <BurgerInner burgerMenu={burgerMenu} />
        </BurgerMenu>

        <ResponsiveLinksContainer
          data-testid={"responsive-header"}
          id="responsive-header"
          value={burgerMenu}
          burgerMenu={burgerMenu}
        >
          {burgerMenu && renderLinks()}
        </ResponsiveLinksContainer>
      </ResonsiveHeaderContainer>
    </Container>
  );
};

export default Header;

const Container = styled.header``;

const HeaderContainer = styled.header`
  position: absolute;
  display: flex;
  justify-content: space-around;
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
  @media (max-width: 410px) {
    display: none;
  }
`;

const Linkk = styled.p`
  display: inline-block;
  position: relative;
  font-size: 1.4rem;
  font-weight: 600;
  white-space: nowrap;
  color: rgba(245, 245, 247, 0.8);
  transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
  &::before {
    background-color: rgba(245, 245, 247, 0.4);
    bottom: -6px;
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
  @media (max-width: 1440px) {
    font-size: 1.2rem;
  }
  @media (max-width: 410px) {
    font-size: 1.1em;
    display: block;
    padding: 22.5px 0px;
    margin: 0px 20px;
    font-size: 1rem;
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
  @media (max-width: 410px) {
    display: flex;
  }
`;

const BurgerMenu = styled.div`
  display: inline-block;
  position: relative;
  width: 40px;
  height: 24px;
  padding: 40px;
  margin-left: auto;
  z-index: 4;
  &:hover {
    cursor: pointer;
  }
`;

const BurgerInner = styled.div`
  position: absolute;
  width: 38px;
  height: 3.45px;
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
    width: 38px;
    height: 3.45px;
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
    width: 38px;
    height: 3.45px;
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
  padding-top: 108px;
  height: 100vh;
  position: fixed;
  overflow: hidden;
  background-image: linear-gradient(0deg, #ff9a9e 0%, #fad0c4 100%);
  z-index: 3;
  transition: width 0.3s ease;
  width: ${({ burgerMenu }) => (burgerMenu ? "280px" : "0px")};
  @media (max-width: 350px) {
    width: ${({ burgerMenu }) => (burgerMenu ? "250px" : "0px")};
  }
`;

const GlobalStyle = createGlobalStyle`
 body {
   overflow: ${({ burgerMenu }) => (burgerMenu ? "hidden" : "scroll")};
  }
`;
