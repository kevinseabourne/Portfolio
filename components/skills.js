import React, { useRef, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import LazyLoad from "react-lazyload";
import AppContext from "../context/appContext";
import ImageLoader from "../components/common/imageLoader";
// import AOS from "aos";
// import "aos/dist/aos.css";

const Skills = (props) => {
  // Cypress Testing Coverage //
  /* istanbul ignore file */
  const appContext = useContext(AppContext);
  const ref = useRef(null);

  const handleScrollToRef = useRef({
    handleScrollTo: appContext.handleScrollTo,
  });

  useEffect(() => {
    // AOS.init({
    //   disable: "mobile",
    //   duration: 750,
    //   offset: 0,
    //   anchorPlacement: "bottom-bottom"
    // });

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
              <ImageLoader
                src={skill.image}
                keyValue={skills.indexOf(skill)}
                alt={skill.title}
                width={"100%"}
                dataTestId={skill.title}
                delay={skills.indexOf(skill) * 120}
              />
              {/* <ImageContainer>
                <LazyLoad
                  key={skills.indexOf(skill)}
                  once={true}
                  height={"100%"}
                  offset={-700}
                  debounce={false}
                >
                  <Image
                    src={skill.image}
                    data-testid={skill.title}
                    data-aos="fade-up"
                    data-aos-once="true"
                    data-aos-anchor-placement="bottom-bottom"
                    data-aos-delay={skills.indexOf(skill) * 100}
                    key={skills.indexOf(skill)}
                    alt={skill.title}
                  />
                </LazyLoad>
              </ImageContainer> */}
              <SubTitle
                data-aos="fade-up"
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
  min-height: 780px;
  background-color: #08aeea;
  background-image: linear-gradient(0deg, #00cdac 0%, #02aab0 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 160px 0px;
  @media (max-width: 2048px) {
    padding: 0px;
  }
  @media (max-width: 1440px) {
    min-height: 780px;
  }
  @media (max-width: 1024px) {
    ${"" /* height: 100vh; */}
    min-height: 954px;
    padding: 0px;
  }
  @media (max-width: 986px) {
    min-height: 780px;
  }
  @media (max-width: 778px) {
    min-height: 955px;
  }
  @media (max-width: 320px) {
    min-height: 771px;
  }
  @media (max-height: 500px) {
    min-height: 1010px;
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
  height: 100%;
  /* margin-top: 320px; */
  @media (max-width: 784px) {
    height: 100%;
    margin-bottom: 3em;
  }
`;

const TitleContainer = styled.div`
  margin-bottom: 6em;
  margin-top: 3em;
  @media (max-width: 1440px) {
    margin-bottom: 3em;
  }
  @media (max-width: 1024px) {
    margin-top: 6em;
    margin-bottom: 6em;
  }
  @media (max-width: 986px) {
    margin-top: 3em;
  }
  @media (max-width: 778px) {
    margin-top: 4em;
    margin-bottom: 2em;
  }
`;

const Title = styled.h1`
  font-size: 4em;
  text-align: center;
  @media (max-width: 1440px) {
    font-size: 3.2rem;
  }
  @media (max-width: 768px) {
    font-size: 2.9em;
  }
  @media (max-width: 578px) {
    font-size: 3.2em;
  }
  @media (max-width: 415px) {
    font-size: 2.5em;
  }
  @media (max-height: 500px) {
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
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
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
  grid-template-columns: repeat(3, minmax(100px, 210px));
  justify-content: space-evenly;
  grid-auto-flow: row;
  grid-column-end: auto;
  grid-gap: 200px 12%;
  @media (max-width: 1440px) {
    grid-gap: 118px 0%;
    grid-template-columns: repeat(3, minmax(100px, 180px));
  }
  @media (max-width: 1280px) {
    grid-gap: 118px 0%;
    grid-template-columns: repeat(3, minmax(100px, 145px));
  }
  @media (max-width: 1024px) {
    grid-gap: 152px 5%;
    grid-template-columns: repeat(2, minmax(10px, 150px));
  }
  @media (max-width: 768px) {
    grid-gap: 57px 13%;
    grid-template-columns: repeat(2, minmax(10px, 140px));
  }
  @media (max-width: 638px) {
    grid-gap: 32px 13%;
    grid-template-columns: repeat(2, minmax(10px, 140px));
  }
  @media (max-width: 415px) {
    grid-gap: 46px 13%;
    grid-template-columns: repeat(2, minmax(10px, 120px));
  }
  @media (max-height: 500px) {
    grid-gap: 46px 13%;
    grid-template-columns: repeat(2, minmax(10px, 120px));
  }
`;

const Child = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  ${"" /* align-items: center; */}
`;

const SubTitle = styled.label`
  text-align: center;
  font-size: 2.2rem;
  letter-spacing: 2;
  text-transform: uppercase;
  margin-top: auto;
  margin-bottom: 0.5rem;
  @media (max-width: 1440px) {
    font-size: 1.4rem;
  }
  @media (max-width: 760px) {
    font-size: 1.4rem;
  }
  @media (max-width: 415px) {
    font-size: 1.07rem;
  }
  @media (max-height: 500px) {
    font-size: 1.07rem;
  }
`;

export default Skills;
