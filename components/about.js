import React, { useEffect, useRef, useContext } from "react";
import AppContext from "../context/appContext";
import PropTypes from "prop-types";
import styled from "styled-components";
// import AOS from "aos";
// import "aos/dist/aos.css";

const About = (props) => {
  const appContext = useContext(AppContext);
  const ref = useRef(null);

  const handleScrollToRef = useRef({
    handleScrollTo: appContext.handleScrollTo,
  });

  useEffect(() => {
    // AOS.init({
    //   disable: "mobile",
    //   offset: 0,
    //   duration: 750,
    //   once: true,
    //   anchorPlacement: "bottom-bottom"
    // });
    updateSize();

    window.addEventListener("resize", updateSize);

    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const updateSize = () => {
    const { handleScrollTo } = appContext;
    handleScrollTo({ name: "About", position: ref.current.offsetTop });
  };

  return (
    <Container ref={ref}>
      <Wrapper>
        <TextContainer>
          <Title data-aos="fade-up">My View</Title>
          <Line data-aos="flip-down" data-aos-delay="500" />
          <Text data-aos="fade-up" data-aos-delay="200">
            I strive to write clean, non repetative, reusable & understandable
            code.
          </Text>
        </TextContainer>
        <TextContainer>
          <Title data-aos="fade-up" data-aos-delay="200">
            About Me
          </Title>
          <Line data-aos="flip-down" data-aos-delay="700" />
          <Text data-aos="fade-up" data-aos-delay="400">
            I am a web developer who fell in love with programing in my free
            time. I enjoy learning about new technologies and have a passion for
            web development.
          </Text>
        </TextContainer>
        <TextContainer>
          <Title data-aos="fade-up" data-aos-delay="400">
            Goals
          </Title>
          <Line data-aos="flip-down" data-aos-delay="900" />
          <Text
            data-aos="fade-up"
            data-aos-delay="600"
            data-aos-anchor-placement="bottom-bottom"
          >
            To continue to learn. Work on bigger projects, taking on new,
            different challanges and ultimatly build a long career in the
            industry.
          </Text>
        </TextContainer>
      </Wrapper>
    </Container>
  );
};

const Container = styled.section`
  height: 100vh;
  min-height: 933.2px;
  width: 100%;
  background-image: linear-gradient(0deg, #ff9a9e 0%, #fad0c4 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 35px 20px;
  box-sizing: border-box;
  @media (max-width: 790px) {
    height: 100%;
    align-items: flex-start;
  }
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  max-width: 1450px;
  width: 100%;
  border-radius: 12px;
  margin: 0px 15px;
  @media (max-width: 1247px) {
    justify-content: center;
  }
`;

const TextContainer = styled.div`
  display: flex;
  font-size: 16.9px;
  flex-direction: column;
  text-align: center;
  flex: 0 1 370px;
  &:nth-child(2) {
    margin: 0 20px;
  }
  @media (max-width: 1247px) {
    margin: 0 auto;
    justify-content: center;
    &:nth-child(2) {
      order: 2;
    }
    &:nth-child(1) {
      padding-right: 1%;
    }
    &:nth-child(3) {
      padding-left: 1%;
    }
  }
  @media (max-width: 796px) {
    justify-content: center;
    margin-bottom: 20px;
    &:nth-child(2) {
      order: 1;
      margin-top: 35px;
      margin-bottom: 35px;
    }
    &:nth-child(1) {
      order: 2;
      padding-right: 0%;
      margin-bottom: 35px;
    }
    &:nth-child(3) {
      order: 3;
      padding-left: 0%;
      margin-bottom: 35px;
    }
  }
  @media (max-width: 600px) {
    &:nth-child(2) {
      margin-top: 0px;
      margin-bottom: 15px;
    }
    &:nth-child(1) {
      margin-bottom: 15px;
    }
    &:nth-child(3) {
      margin-bottom: 0px;
    }
  }
`;

const Title = styled.h2`
  font-size: 4em;
  @media (max-width: 1280px) {
    font-size: 3.5em;
  }
  @media (max-width: 983px) {
    font-size: 3.8em;
  }
  @media (max-width: 623px) {
    font-size: 3.12em;
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
  margin-bottom: 0.2rem;
  margin-top: 1rem;
  margin-left: auto;
  margin-right: auto;
  width: 23%;
  border-radius: 2500px;
  opacity: 0.7;
`;

const Text = styled.p`
  font-size: 1.6em;
  font-weight: 200;
  @media (max-width: 1280px) {
    font-size: 1.4em;
  }
  @media (max-width: 623px) {
    font-size: 1.22em;
  }
`;

export default About;
