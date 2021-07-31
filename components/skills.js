import React, { useRef, useEffect, useContext } from "react";
import styled from "styled-components";
import Image from "next/image";
// import LazyLoad from "react-lazyload";
import AppContext from "../context/appContext";
import AOS from "aos";
import "aos/dist/aos.css";

const Skills = (props) => {
  // Cypress Testing Coverage //
  /* istanbul ignore file */
  const appContext = useContext(AppContext);
  const ref = useRef(null);

  const handleScrollToRef = useRef({
    handleScrollTo: appContext.handleScrollTo,
  });

  useEffect(() => {
    AOS.init({
      disable: "mobile",
      duration: 750,
      offset: 0,
      anchorPlacement: "bottom-bottom",
    });

    updateSize();
    window.addEventListener("resize", updateSize);

    return () => {
      window.removeEventListener("resize", updateSize);
    };
  }, []);

  const updateSize = () => {
    const { handleScrollTo } = handleScrollToRef.current;
    if (ref.current.offsetTop) {
      handleScrollTo({ name: "Skills", position: ref.current.offsetTop });
    }
  };

  const skills = [
    { image: "/images/html5-original.svg", title: "html5" },
    { image: "/images/css3-original.svg", title: "css3" },
    { image: "/images/javascript-original.svg", title: "javascript" },
    { image: "/images/styled-components-logo.png", title: "sc" },
    { image: "/images/react-original.svg", title: "react" },
    { image: "/images/github-original.svg", title: "github" },
  ];

  return (
    <Container data-testid="skills-container" ref={ref}>
      <Wrapper>
        <TitleContainer>
          <Title>Skills</Title>
          <Line />
        </TitleContainer>
        <ImagesContainer>
          {skills.map((skill) => (
            <Child key={skills.indexOf(skill)}>
              <ImageContainer>
                <Image
                  src={skill.image}
                  data-testid={skill.title}
                  data-aos="fade-in"
                  data-aos-once="true"
                  data-aos-anchor-placement="bottom-bottom"
                  data-aos-delay={skills.indexOf(skill) * 100}
                  key={skills.indexOf(skill)}
                  alt={skill.title}
                  width={190}
                  height={190}
                  fill="responsive"
                />
              </ImageContainer>

              <SubTitle
                data-aos="fade-in"
                data-aos-once="true"
                data-aos-anchor-placement="bottom-bottom"
                data-aos-delay={skills.indexOf(skill) * 200}
              >
                {skill.title}
              </SubTitle>
            </Child>
          ))}
        </ImagesContainer>
      </Wrapper>
    </Container>
  );
};

const Container = styled.section`
  height: 100vh;
  width: 100%;
  background-color: #08aeea;
  background-image: linear-gradient(0deg, #00cdac 0%, #02aab0 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-height: 984px) {
    height: 100%;
    padding: 35px 0px;
  }
  @media (max-width: 984px) {
    height: 100%;
  }
`;

const Wrapper = styled.div`
  max-width: 1590px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 0px 30px;
  /* margin-top: 320px; */
  @media (max-width: 784px) {
    height: 100%;
    margin-bottom: 3em;
  }
`;

const TitleContainer = styled.div`
  margin-bottom: 6em;
  @media (max-width: 986px) {
    margin-top: 3em;
  }
  @media (max-width: 778px) {
    margin-bottom: 3em;
  }
`;

const Title = styled.h1`
  font-size: 4em;
  text-align: center;
  @media (max-width: 578px) {
    font-size: 3.2em;
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
  margin-top: 1rem;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
  border-radius: 2500px;
  opacity: 0.7;
`;

const ImagesContainer = styled.div`
  width: 100%;
  height: auto;
  display: grid;
  grid-template-columns: repeat(3, minmax(100px, 200px));
  justify-content: space-evenly;
  grid-auto-flow: row;
  grid-column-end: auto;
  grid-gap: 200px 12%;
  @media (max-width: 1060px) {
    grip-gap: 76px 0%;
  }
  @media (max-width: 638px) {
    grid-gap: 67px 12%;
    grid-template-columns: repeat(2, minmax(10px, 140px));
  }
`;

const Child = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Placeholder = styled.div`
  min-height: 40px;
  height: 200px;
  width: 100%;
  z-index: 1;
  margin-bottom: 13.3px;
`;

const ImageContainer = styled.div``;

// const Image = styled.img`
//   margin: 0 auto;
//   width: 100%;
//   ${"" /* padding-top: 100%; */}
//   object-fit: contain;
//   object-position: center;
//   margin-bottom: 13.3px;
// `;

const SubTitle = styled.label`
  text-align: center;
  font-size: 2.2rem;
  letter-spacing: 2;
  text-transform: uppercase;
  margin-top: auto;
  margin-bottom: 0.5rem;
  @media (max-width: 1200px) {
    font-size: 2rem;
  }
  @media (max-width: 760px) {
    font-size: 1.4rem;
  }
  @media (max-width: 390px) {
    font-size: 1.3rem;
  }
`;

export default Skills;
