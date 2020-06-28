import React, { useState, useEffect, useRef, useContext } from "react";
import AppContext from "../context/appContext";
import styled from "styled-components";
import { toast } from "react-toastify";
// import AOS from "aos";
// import "aos/dist/aos.css";

const Projects = ({ data }) => {
  const context = useContext(AppContext);
  const ref = useRef(null);
  const [innerWidth, setInnerWidth] = useState(null);

  useEffect(() => {
    // AOS.init({
    //   disable: "mobile",
    //   offset: 300,
    //   duration: 750,
    //   once: true
    // });
    data.length === 0 &&
      toast.error("An error has occurred", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => {
      window.removeEventListener("resize", updateSize);
    };
  }, []);

  const updateSize = () => {
    const { handleScrollTo } = context;
    setInnerWidth(window.innerWidth);

    handleScrollTo({ name: "Projects", position: ref.current.offsetTop });
  };

  const renderTextContainer = (website, direction) => {
    // text container renders each.
    return (
      <TextContainer data-testid="project-info" key={data.indexOf(website)}>
        <ProjectTitle
          data-aos={`fade-${direction}`}
          data-aos-delay="100"
          data-aos-anchor-placement="bottom-bottom"
        >
          {website.title}
        </ProjectTitle>
        <Description
          data-testid={`${website.title} description`}
          data-aos={`fade-${direction}`}
          data-aos-delay="150"
          data-aos-anchor-placement="bottom-bottom"
        >
          {website.description}
        </Description>
        <Skills
          data-aos={`fade-${direction}`}
          data-aos-delay="200"
          data-aos-anchor-placement="bottom-bottom"
        >
          {`${website.skills}`}
        </Skills>
        <ButtonsContainer>
          <InnerButtonContainer
            data-aos={`fade-${direction}`}
            data-aos-delay="250"
            data-aos-anchor-placement="bottom-bottom"
          >
            <DemoButton>Demo</DemoButton>
          </InnerButtonContainer>
          <InnerButtonContainer
            data-aos={`fade-${direction}`}
            data-aos-delay="300"
            data-aos-anchor-placement="bottom-bottom"
          >
            <CodeButton>Code</CodeButton>
          </InnerButtonContainer>
        </ButtonsContainer>
      </TextContainer>
    );
  };

  const handleRightText = (website) => {
    if (innerWidth <= 984) {
      return false;
    }
    if (data.indexOf(website) % 2 !== 0) {
      return true;
    }
    return false;
  };

  const handleLeftText = (website) => {
    if (innerWidth <= 984) {
      return true;
    }
    if (data.indexOf(website) % 2 === 0) {
      return true;
    }

    return false;
  };

  return data.length === 0 ? (
    <Loading ref={ref} data-testid="loading-projects"></Loading>
  ) : (
    <Container ref={ref}>
      <Wrapper>
        <TitleContainer>
          <Title>Projects</Title>
          <Line />
        </TitleContainer>
        <ProjectsContainer>
          {data.map((website) => (
            <Project data-testid="project" key={data.indexOf(website)}>
              {handleRightText(website) &&
                renderTextContainer(website, "right")}
              <Image
                data-testid="image"
                data-aos-once="true"
                data-aos-anchor-placement="bottom-bottom"
                data-aos={
                  data.indexOf(website) % 2 !== 0 ? "fade-left" : "fade-right"
                }
              />
              {handleLeftText(website) && renderTextContainer(website, "left")}
            </Project>
          ))}
        </ProjectsContainer>
      </Wrapper>
    </Container>
  );
};

const Loading = styled.div``;

const Container = styled.section`
  height: 100%;
  overflow: hidden;
  max-height: 4600px;
  width: 100%;
  background-image: linear-gradient(0deg, #ff9a9e 0%, #fad0c4 100%);
  @media (max-width: 984px) {
    max-height: 5500px;
  }
  @media (min-width: 120px) {
    min-height: ;
  }
`;

const Wrapper = styled.div`
  max-width: 1590px;
  margin: 0 auto;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px 17px;
  box-sizing: border-box;
  @media (max-width: 415px) {
    padding: 0px 7px;
  }
`;

const TitleContainer = styled.div`
  margin-top: 9rem;
  margin-bottom: 6em;
  @media (max-width: 986px) {
    margin-top: 3em;
    margin-bottom: 3em;
  }
`;

const Title = styled.h1`
  font-size: 4em;
  text-align: center;
  @media (max-width: 1440px) {
    font-size: 3.2rem;
  }
  @media (max-width: 1024px) {
    font-size: 3.5rem;
  }
  @media (max-width: 578px) {
    font-size: 3.2em;
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
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
  border-radius: 2500px;
  opacity: 0.7;
`;

const ProjectsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Project = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 16%;
  max-height: 500px;
  position: relative;
  @media (max-width: 984px) {
    flex-direction: column;
    justify-content: center;
    max-height: 2000px;
  }
`;

const Image = styled.div`
  width: 47%;
  padding-bottom: 30%;
  overflow: hidden;
  height: 0;
  max-height: 800px;
  background-color: #08aeea;
  border-radius: 12px;
  background-image: linear-gradient(0deg, #02aab0 0%, #00cdac 100%);
  box-shadow: 0 10px 20px 0 hsla(0, 0%, 41.6%, 0.3);
  &:hover {
    cursor: pointer;
  }
  @media (max-width: 984px) {
    margin: 0 auto;
    width: 100%;
    padding-bottom: 67%;
    margin-bottom: 30px;
  }
`;

const TextContainer = styled.div`
  width: 47%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  @media (max-width: 984px) {
    width: 100%;
  }
`;

const ProjectTitle = styled.h1`
  font-size: 3rem;
  @media (max-width: 1440px) {
    font-size: 2.8rem;
  }
  @media (max-width: 1024px) {
    font-size: 2.35rem;
  }
  @media (max-width: 684px) {
    font-size: 2.3rem;
  }
  @media (max-width: 415px) {
    font-size: 2.5em;
  }
  @media (max-width: 415px) {
    font-size: 2rem;
    text-align: center;
  }
`;

const Description = styled.p`
  font-size: 1.5em;
  font-weight: 200;
  margin-bottom: 25px;
  @media (max-width: 1440px) {
    font-size: 1.4rem;
  }
  @media (max-width: 1024px) {
    font-size: 1.2rem;
  }
  @media (max-width: 584px) {
    font-size: 1.22em;
  }
  @media (max-width: 415px) {
    font-size: 1.05rem;
    text-align: center;
  }
`;

const Skills = styled.label`
  font-family: inherit;
  font-size: 1.3em;
  font-weight: 200;
  @media (max-width: 1440px) {
    font-size: 1.3rem;
  }
  @media (max-width: 1024px) {
    font-size: 1.1rem;
  }
  @media (max-width: 684px) {
    font-size: 1.2em;
  }
  @media (max-width: 584px) {
    font-size: 1.1em;
  }
  @media (max-width: 584px) {
    font-size: 1rem;
    text-align: center;
  }
`;

const ButtonsContainer = styled.div`
  margin-top: 42px;
  display: flex;
  flex-direction: row;
  @media (max-width: 984px) {
    margin-bottom: 30px;
  }
  @media (max-width: 319px) {
    flex-direction: column;
    align-items: center;
  }
  @media (max-width: 750px) {
    width:100%:
  }
`;

const InnerButtonContainer = styled.div`
  width: auto;
  @media (max-width: 750px) {
    width: 100%;
  }
`;

const DemoButton = styled.button`
  font-size: 1.1em;
  padding: 14px 24px;
  border-radius: 40px;
  margin-right: 15px;
  border: none;
  color: #f5f5eb;
  font-weight: 700;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
  background-color: #08aeea;
  background-image: linear-gradient(0deg, #02aab0 0%, #00cdac 100%);
  transform: translateY(0px) scale(1);
  transition: all 0.15s ease;
  &:hover {
    box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.2);
    transform: scale(1) translateY(-3.5px);
    cursor: pointer;
  }
  @media (max-width: 750px) {
    width: 95%;
  }
  @media (max-width: 319px) {
    margin-bottom: 25px;
  }
  @media (max-width: 584px) {
    padding: 13.5px 24px;
  }
`;

const CodeButton = styled.button`
  font-size: 1.1em;
  padding: 14px 24px;
  border-radius: 40px;
  border: none;
  color: #f5f5eb;
  font-weight: 700;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
  background-color: #08aeea;
  background-image: linear-gradient(0deg, #02aab0 0%, #00cdac 100%);
  transform: translateY(0px) scale(1);
  transition: all 0.15s ease;
  &:hover {
    box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.2);
    transform: scale(1) translateY(-3.5px);
    cursor: pointer;
  }
  @media (max-width: 750px) {
    width: 95%;
  }
  @media (max-width: 584px) {
    padding: 13.5px 24px;
  }
`;
export default Projects;
