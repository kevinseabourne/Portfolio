import React, { useEffect, useContext, useRef } from "react";
import PropTypes from "prop-types";
import styled, { keyframes } from "styled-components";
// import AOS from "aos";
// import "aos/dist/aos.css";
import AppContext from "../context/appContext";
import ContactForm from "./contactForm";
import LazyLoad from "react-lazyload";
const githubIcon = "/images/github-original.svg";
const linkedInIcon = "/images/linkedin-original.svg";

export default function Contact() {
  const context = useContext(AppContext);
  const ref = useRef(null);

  useEffect(() => {
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => {
      window.removeEventListener("resize", updateSize);
    };
  }, []);

  const updateSize = () => {
    const { handleScrollTo } = context;

    handleScrollTo({
      name: "Contact",
      position: ref.current.offsetTop,
    });
  };

  return (
    <Container ref={ref}>
      <Wrapper>
        <TitleContainer>
          <Title>Contact</Title>
          <Line />
        </TitleContainer>
        <ContactContainer>
          <GetInTouch data-aos="fade" data-aos-delay="0" data-aos-once="true">
            <GetInTouchTitle>Get In Touch</GetInTouchTitle>
            <Message>
              Send me a message if you are interested in hiring me.
            </Message>
          </GetInTouch>
          <ContactForm />
          <Links
            data-aos="fade"
            data-aos-delay="200"
            data-aos-once="true"
            data-aos-anchor-placement="bottom-bottom"
          >
            <LazyLoad once={true} height={70} offset={100}>
              <GithubLink
                href="https://github.com/kevinseabourne"
                target="_blank"
              >
                <GithubIcon src={githubIcon} />
              </GithubLink>
            </LazyLoad>
            <LazyLoad once={true} height={70} offset={100}>
              <LinkedInLink
                href="https://www.linkedin.com/in/kevin-seabourne-53833a19a/"
                target="_blank"
              >
                <LinkedInIcon src={linkedInIcon} />
              </LinkedInLink>
            </LazyLoad>
          </Links>
        </ContactContainer>
        <Copyright
          data-aos="fade"
          data-aos-delay="0"
          data-aos-once="true"
          data-aos-anchor-placement="bottom-bottom"
        >
          Copyright © 2020 Kevin Seabourne.
        </Copyright>
      </Wrapper>
    </Container>
  );
}

Contact.propTypes = {
  handleScrollTo: PropTypes.func,
};

const Container = styled.section`
  height: 100vh;
  min-height: 1233px;
  width: 100%;
  padding-bottom: 70px;
  background-color: #08aeea;
  position: relative;
  background-image: linear-gradient(0deg, #02aab0 0%, #00cdac 100%);
  @media (max-width: 900px) {
    height: 100%;
    min-height: 1024.56px;
  }
  @media (max-width: 768px) {
    padding-bottom: 0px;
  }
  @media (max-width: 415px) {
    height: 100%;
    ${"" /* padding-bottom: 150px; */}
  }
`;

const Wrapper = styled.div`
  max-width: 1590px;
  margin: 0 auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 0px 10px;
  box-sizing: border-box;
  position: relative;
`;

const TitleContainer = styled.div`
  margin-top: 12.5rem;
  @media (max-width: 1533px) {
    margin-top: 9rem;
  }
  @media (max-width: 986px) {
    margin-top: 3em;
  }
`;

const Title = styled.h1`
  font-size: 4em;
  text-align: center;
  @media (max-width: 623px) {
    font-size: 3.12em;
  }
  @media (max-width: 415px) {
    font-size: 2.5em;
  }
`;

const Line = styled.hr`
  background-image: linear-gradient(
    115deg,
    #4fcf70,
    #fad648,
    #a767e5,
    #12bcfe,
    #44ce7b
  );
  border: none;
  content: "";
  height: 4px;
  margin-bottom: 2.5rem;
  margin-top: 1rem;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
  border-radius: 2500px;
  opacity: 0.7;
`;

const ContactContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  ${"" /* flex: 0 1 100px; */}
  justify-content: space-between;
  margin-bottom: 169px;
  @media (max-width: 1533px) {
    flex-direction: column;
    align-items: center;
    margin-bottom: 0px;
    justify-content: center;
  }
`;

const GetInTouch = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  align-items: center;
  text-align: center;
  max-width: 450px;
  width: 100%;
  @media (max-width: 1533px) {
    display: none;
  }
`;

const GetInTouchTitle = styled.h2`
  margin-top: 112px;
  font-size: 2rem;
  @media (max-width: 1533px) {
    margin-top: 0px;
  }
`;

const Message = styled.p`
  font-size: 1.4rem;
`;

const Links = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  text-align: center;
  max-width: 450px;
  width: 100%;
  @media (max-width: 1533px) {
    margin-top: 50px;
  }
`;

const shakeTop = keyframes`
  0%,
  100% {
    -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
    -webkit-transform-origin: 50% 0;
            transform-origin: 50% 0;
  }
  10% {
    -webkit-transform: rotate(2deg);
            transform: rotate(2deg);
  }
  20%,
  40%,
  60% {
    -webkit-transform: rotate(-4deg);
            transform: rotate(-4deg);
  }
  30%,
  50%,
  70% {
    -webkit-transform: rotate(4deg);
            transform: rotate(4deg);
  }
  80% {
    -webkit-transform: rotate(-2deg);
            transform: rotate(-2deg);
  }
  90% {
    -webkit-transform: rotate(2deg);
            transform: rotate(2deg);
  }
`;

const GithubLink = styled.a`
  margin-top: 136.5px;
  margin-right: 100px;
  @media (max-width: 1533px) {
    margin-top: 50px;
  }
`;

const GithubIcon = styled.img`
  height: 70px;
  width: 70px;
  margin: auto;
  object-position: center;
  object-fit: contain;
  &:hover {
    cursor: pointer;
    animation: ${shakeTop} 0.8s cubic-bezier(0.455, 0.03, 0.515, 0.955) both;
  }
`;

const LinkedInLink = styled.a`
  margin-top: 136.5px;
  @media (max-width: 1533px) {
    margin-top: 50px;
  }
`;

const LinkedInIcon = styled.img`
  height: 70px;
  width: 70px;
  object-position: center;
  object-fit: contain;
  margin: auto;
  &:hover {
    cursor: pointer;
    animation: ${shakeTop} 0.8s cubic-bezier(0.455, 0.03, 0.515, 0.955) both;
  }
`;

const Copyright = styled.span`
  text-align: center;
  font-size: 1.2rem;
  z-index: 1;
  margin-bottom: 100px;
  @media (max-width: 1533px) {
    margin-bottom: 50px;
    margin-top: 100px;
  }
  @media (max-width: 600px) {
    margin-bottom: 25px;
  }
  @media (max-width: 415px) {
    font-size: 1.07rem;
    margin-bottom: 50px;
  }
`;
