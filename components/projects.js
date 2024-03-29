import React, { useState, useEffect, useRef, useContext } from "react";
import Link from "next/link";
import ImageLoader from "./common/imageLoader";
import AppContext from "../context/appContext";
import styled from "styled-components";
import { toast } from "react-toastify";
import AOS from "aos";
import "aos/dist/aos.css";

const Projects = ({ data, otherProjects }) => {
  const context = useContext(AppContext);
  const ref = useRef(null);
  const [innerWidth, setInnerWidth] = useState(null);

  useEffect(() => {
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

  useEffect(() => {
    AOS.init({
      disable: "mobile",
      offset: 100,
      duration: 750,
      once: true,
    });
  });

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
        >
          {website.shortDescription}
        </Description>
        <SkillsContainer>
          {website.shortStack.map((tech, index) => (
            <SkillsInnerContainer key={index}>
              <Skills
                key={tech}
                data-aos={`fade-${direction}`}
                data-aos-delay="200"
              >
                {tech}
              </Skills>
              {website.shortStack.length - 1 !== index && (
                <Gap data-aos={`fade-${direction}`} data-aos-delay="200">
                  |
                </Gap>
              )}
            </SkillsInnerContainer>
          ))}
        </SkillsContainer>
        <ButtonsContainer>
          <InnerButtonContainer
            data-aos={`fade-${direction}`}
            data-aos-delay="250"
          >
            <NewLink href={website.websiteLink} tabIndex="-1" target="_blank">
              <DemoButton>Demo</DemoButton>
            </NewLink>
          </InnerButtonContainer>
          <InnerButtonContainer
            data-aos={`fade-${direction}`}
            data-aos-delay="300"
          >
            <Link
              href={`/${website.title
                .toLowerCase()
                .replace(/[{L}!#$'"@`#*+)(:;{}\s]/g, "-")}`}
            >
              <CodeButton>More Info</CodeButton>
            </Link>
          </InnerButtonContainer>
        </ButtonsContainer>
      </TextContainer>
    );
  };

  const handleRightText = (website) => {
    if (innerWidth <= 1408) {
      return false;
    }
    if (data.indexOf(website) % 2 !== 0) {
      return true;
    }
    return false;
  };

  const handleLeftText = (website) => {
    if (innerWidth <= 1408) {
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
          <Title data-aos="fade-up" data-aos-once="true">
            {otherProjects ? "Other Projects" : "Projects"}
          </Title>
          <Line data-aos="fade-up" data-aos-once="true" data-aos-delay={50} />
        </TitleContainer>
        <ProjectsContainer>
          {data.map((website, index) => (
            <Project data-testid="project" key={index}>
              {handleRightText(website) &&
                renderTextContainer(website, "right")}
              <Image
                data-aos={
                  data.indexOf(website) % 2 !== 0 ? "fade-left" : "fade-right"
                }
                href={website.websiteLink}
                target="_blank"
              >
                <ImageLoader
                  src={website.displayImage.url}
                  alt={website.title}
                  maxWidth="660px"
                  hover={true}
                  backgroundColor={true}
                  placeholderSize="56.75%"
                  data-testid="image"
                  borderRadius="12px"
                  priority={true}
                  loadingSkeleton={true}
                  boxShadow="0 10px 20px 0 hsla(0, 0%, 41.6%, 0.3)"
                  boxShadowHover="0 12px 22px 0 hsla(0, 0%, 41.6%, 0.5)"
                />
              </Image>
              {handleLeftText(website) && renderTextContainer(website, "left")}
            </Project>
          ))}
        </ProjectsContainer>
      </Wrapper>
    </Container>
  );
};

export default Projects;

const Loading = styled.div``;

const Container = styled.section`
  height: 100%;
  overflow: hidden;
  max-height: 4600px;
  width: 100%;
  background-image: linear-gradient(0deg, #ff9a9e 0%, #fad0c4 100%);
  @media (max-width: 1408px) {
    max-height: 5500px;
  }
  @media (min-width: 120px) {
    min-height: ;
  }
`;

const Wrapper = styled.div`
  ${"" /* max-width: 1590px; */}
  max-width: 1450px;
  margin: 0 auto;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px 30px;
  box-sizing: border-box;
`;

const TitleContainer = styled.div`
  margin-top: 12rem;
  margin-bottom: 6em;
  @media (max-width: 986px) {
    margin-top: 3em;
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

const NewLink = styled.a`
  text-decoration: none;
  outline: none;
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
  @media (max-width: 1408px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    max-height: 2000px;
  }
`;

const Image = styled.a`
  max-width: 660px;
  width: 100%;
  display: flex;
  align-items: center;
  &:hover {
    cursor: pointer;
  }
  &:focus {
    &:focus:not(.focus-visible) {
      outline: 1px solid initial;
    }
  }
`;

const TextContainer = styled.div`
  width: 47%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  @media (max-width: 1408px) {
    margin-top: 30px;
    text-align: center;
    width: 70%;
  }
  @media (max-width: 900px) {
    margin-top: 30px;
    text-align: center;
    width: 80%;
  }
  @media (max-width: 750px) {
    width: 100%;
  }
`;

const ProjectTitle = styled.h1`
  font-size: 38px;
  margin-bottom: 10px;
  @media (max-width: 684px) {
    font-size: 2.3rem;
  }
`;

const Description = styled.p`
  font-size: 1.3em;
  max-width: 800px;
  margin-top: 0px;
  white-space: pre-line;
  line-height: 40px;
  @media (max-width: 1408px) {
    font-size: 1.3em;
    align-self: center;
  }
  @media (max-width: 1204px) {
    font-size: 1.3em;
  }
  @media (max-width: 584px) {
    font-size: 1.22em;
  }
`;

const SkillsContainer = styled.div`
  display: flex;
  @media (max-width: 1408px) {
    justify-content: center;
  }
  @media (max-width: 450px) {
    align-items: center;
    flex-direction: column;
  }
`;

const SkillsInnerContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  @media (max-width: 1408px) {
    text-align: center;
  }
  @media (max-width: 450px) {
    align-items: center;
    flex-direction: column;
  }
`;

const Skills = styled.label`
  font-family: inherit;
  font-size: 19px;
  @media (max-width: 1204px) {
    font-size: 1.3em;
  }
  @media (max-width: 1408px) {
    font-size: 1.3em;
  }
  @media (max-width: 684px) {
    font-size: 1.2em;
  }
  @media (max-width: 584px) {
    font-size: 1.1em;
  }
`;

const Gap = styled.span`
  text-align: center;
  font-size: 1.3em;
  padding: 0px 14px;

  @media (max-width: 450px) {
    transform: rotate(90deg) !important;
  }
`;

const ButtonsContainer = styled.div`
  margin-top: 42px;
  display: flex;
  flex-direction: row;
  @media (max-width: 1408px) {
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

  @media (max-width: 1408px) {
    width: 100%;
  }
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
  transition: all 0.3s;
  &:focus {
    &:focus:not(:focus-visible) {
      outline: none;
    }
  }
  &:hover {
    box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.2);
    transform: scale(1) translateY(-3px);
    cursor: pointer;
  }
  @media (max-width: 1408px) {
    width: 50%;
  }
  @media (max-width: 750px) {
    width: 95%;
  }
  @media (max-width: 319px) {
    margin-bottom: 25px;
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
  transition: all 0.25s ease;
  &:focus {
    &:focus:not(:focus-visible) {
      outline: none;
    }
  }
  &:hover {
    box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.2);
    transform: scale(1) translateY(-3px);
    cursor: pointer;
  }
  @media (max-width: 1408px) {
    width: 50%;
  }
  @media (max-width: 750px) {
    width: 95%;
  }
`;
