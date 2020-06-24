import React from "react";
import styled, { keyframes } from "styled-components";
// import AOS from "aos";
// import "aos/dist/aos.css";

const Banner = (props) => {
  // useEffect(() => {
  //   AOS.init({
  //     disable: "mobile",
  //     offset: 200,
  //     duration: 750
  //   });
  //   AOS.refreshHard();
  //   return () => {
  //     document.removeEventListener("aos:out", ({ detail }) => {});
  //   };
  // }, []);

  return (
    <Container data-testid={"banner"}>
      <TextContainer>
        <JobTitle1 data-aos="fade-right" data-aos-delay="100">
          Front-End
        </JobTitle1>
        <JobTitle2 data-aos="fade-right" data-aos-delay="300">
          Web Developer
        </JobTitle2>
        <Name data-aos="fade-right" data-aos-delay="500">
          Kevin D Seabourne
        </Name>
        <Line data-aos="fade-right" data-aos-delay="700" />
      </TextContainer>
    </Container>
  );
};

const Container = styled.section`
  height: 100vh;
  min-height: 650px;
  max-height: 1240px;
  width: 100%;
  overflow: hidden;
  background-color: #08aeea;
  background-image: linear-gradient(0deg, #02aab0 0%, #00cdac 100%);
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  @media (max-width: 1086px) {
    display: flex;
    justify-content: center;
  }
`;

const TextContainer = styled.div`
  margin-left: 15rem;
  border-radius: 5%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 20px;
  @media (max-width: 1086px) {
    margin-left: 0rem;
  }
`;

const JobTitle1 = styled.h1`
  font-size: 5rem;
  font-weight: 500;
  @media (max-width: 1280px) {
    font-size: 3.8rem;
  }
  @media (max-width: 736px) {
    font-size: 4.3rem;
  }
  @media (max-width: 578px) {
    font-size: 3.2em;
  }
  @media (max-width: 415px) {
    font-size: 2.3em;
  }
`;

const JobTitle2 = styled.h1`
  font-size: 5rem;
  font-weight: 500;
  @media (max-width: 1280px) {
    font-size: 3.8rem;
  }
  @media (max-width: 736px) {
    font-size: 4.3rem;
  }
  @media (max-width: 578px) {
    font-size: 3.2em;
  }
  @media (max-width: 415px) {
    font-size: 2.3em;
  }
`;

const Name = styled.h2`
  font-size: 2.6rem;
  font-weight: 400;
  margin: 12px 0px;
  @media (max-width: 1280px) {
    font-size: 2.4rem;
  }
  @media (max-width: 736px) {
    font-size: 1.9rem;
  }
  @media (max-width: 578px) {
    font-size: 1.6em;
  }
  @media (max-width: 415px) {
    font-size: 1.5em;
  }
`;

const lineAnimation = keyframes`
  0% {
  background-position: 100% 0;
  }

  100% {
      background-position: -100% 0;
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
  margin-bottom: 1.5rem;
  margin-top: 1rem;
  margin-left: 0;
  // width: 40.3rem; // to this with percentage i will have to add padding to the container to the the container longer.
  width: 100%;
  border-radius: 2500px;
  position: relative;
  opacity: 0.7;
  &::before {
    content: "";
    position: absolute;
    width: calc(100% + 4px);
    height: calc(100% + 4px);
    top: -2px;
    z-index: 1;
    left: -2px;
    background-image: linear-gradient(
      115deg,
      #4fcf70,
      #fad648,
      #a767e5,
      #12bcfe,
      #44ce7b
    );
    background-size: 200%;
    animation: ${lineAnimation} 25s ease-out infinite normal;
  }
  &:hover&::before {
    -webkit-animation-play-state: paused;
    -moz-animation-play-state: paused;
    -o-animation-play-state: paused;
    animation-play-state: paused;
  }
`;

export default Banner;
