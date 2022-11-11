import React, { useRef, useEffect, useContext } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import ImageLoader from "./common/imageLoader";
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
    { image: "/images/nextjs-logotype-dark.svg", title: "Next.js" },
    { image: "/images/typescript.svg", title: "Typescript" },
    { image: "/images/javascript-original.svg", title: "Javascript" },
    { image: "/images/html5-original.svg", title: "HTML" },
    { image: "/images/css3-original.svg", title: "CSS" },
    { image: "/images/styled-components-logo.png", title: "Styled Components" },
    { image: "/images/gitIcon.svg", title: "Git" },
    {
      image: "/images/react-testing-library.png",
      title: "React Testing Library",
    },
    { image: "/images/cypress.png", title: "Cypress" },
  ];

  return (
    <Container data-testid="skills-container" ref={ref}>
      <Wrapper>
        <TitleContainer>
          <Title data-aos="fade-up" data-aos-once="true">
            Skills
          </Title>
          <Line data-aos="fade-up" data-aos-once="true" data-aos-delay="50" />
        </TitleContainer>
        <ImagesContainer>
          {skills.map((skill) => (
            <Child
              key={skills.indexOf(skill)}
              whileHover={{
                scale: 1.04,
                transition: { type: "spring", bounce: 0.25 },
              }}
            >
              <ImageContainer
                data-aos="fade-in"
                data-aos-once="true"
                data-aos-anchor-placement="bottom-bottom"
                data-aos-delay={skills.indexOf(skill) * 100}
              >
                <ImageLoader
                  src={skill.image}
                  data-testid={skill.title}
                  key={skills.indexOf(skill)}
                  alt={skill.title}
                  maxWidth="150px"
                  centerImage={true}
                  priority={true}
                  placeholderSize="100%"
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
  min-height: 100vh;
  width: 100%;
  background-color: #08aeea;
  background-image: linear-gradient(0deg, #00cdac 0%, #02aab0 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 190px 0px;
  @media (max-height: 984px) {
    height: 100%;
    padding: 190px 0px;
  }
  @media (max-width: 986px) {
    height: 100%;
    padding: 0px;
  }
`;

const Wrapper = styled.div`
  max-width: 1450px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 0px 30px;
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
  font-size: 52px;
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
  grid-template-columns: repeat(3, minmax(100px, 250px));
  justify-content: space-evenly;
  grid-auto-flow: row;
  grid-column-end: auto;
  grid-gap: 200px 5%;
  @media (max-width: 1260px) {
    grip-gap: 76px 0%;
    padding-bottom: 3rem;
  }
  @media (max-width: 638px) {
    padding-bottom: 0px;
    grid-gap: 67px 12%;
    grid-template-columns: repeat(2, minmax(10px, 170px));
  }
`;

const Child = styled(motion.div)`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const ImageContainer = styled.div`
  width: 100%;
`;

const SubTitle = styled.label`
  text-align: center;
  font-size: 27px;
  letter-spacing: 2;
  margin-top: 21px;
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
