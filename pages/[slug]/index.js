import styled, { keyframes } from "styled-components";
import { useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import ImageLoader from "../../components/common/imageLoader";
import { getProject, getOtherProjects } from "../api/projects";
import Projects from "../../components/projects";
import Contact from "../../components/contact";
import AOS from "aos";
import "aos/dist/aos.css";

const ProjectPage = ({ project, otherProjects }) => {
  const { push, query } = useRouter();
  const { slug } = query;

  useEffect(() => {
    AOS.init({
      disable: "mobile",
      offset: 300,
      duration: 750,
      anchorPlacement: "bottom-bottom",
    });
  }, []);

  useEffect(() => {
    AOS.init({
      disable: "mobile",
      offset: 300,
      duration: 750,
      once: false,
      anchorPlacement: "bottom-bottom",
    });
  }, [slug]);

  return (
    <Container>
      <Head>
        <title>{`Kevin Seabourne | ${project.title}`}</title>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/favicon-16x16.png"
        />
        <link rel="manifest" href="/favicon/site.webmanifest" />
      </Head>
      <Wrapper>
        <IconContainer onClick={() => push("/")} data-aos="flip-down">
          <ImageLoader
            width="80px"
            alt="return"
            src="/images/back.png"
            hover={true}
          />
        </IconContainer>
        <TitleContainer>
          <Title data-aos="fade-right" data-aos-delay="100">
            {project.title}
          </Title>
          <TitleLine
            data-aos="fade-right"
            data-aos-delay="200"
            marginTop="15px"
          />
        </TitleContainer>
        <Paragraph data-aos="fade-right" data-aos-delay="300">
          {project.description}
        </Paragraph>
        <InfoRow>
          <InfoColumn>
            <Label data-aos="fade-up" data-aos-delay="0">
              Features
            </Label>
            {project.features.map((feature, index) => (
              <Stack
                data-aos="fade-up"
                data-aos-delay={index === 0 ? 100 : index * 100}
                data-aos-anchor-placement="bottom-bottom"
              >
                {feature}
              </Stack>
            ))}
          </InfoColumn>
          <InfoColumn>
            <Label data-aos="fade-up" data-aos-delay="100">
              Stack
            </Label>
            {project.fullStack.map((stack, index) => (
              <Stack
                data-aos="fade-up"
                data-aos-delay={index === 0 ? 100 : index * 100}
                data-aos-anchor-placement="bottom-bottom"
              >
                {stack}
              </Stack>
            ))}
          </InfoColumn>
          <InfoColumn>
            <Label data-aos="fade-up" data-aos-delay="200">
              Code
            </Label>
            <NewLink href={project.githubLink} target="_blank" tabIndex="-1">
              <LinkText data-aos="fade-up" data-aos-delay="300">
                Repository
              </LinkText>
            </NewLink>
          </InfoColumn>
          <InfoColumn>
            <Label data-aos="fade-up" data-aos-delay="300">
              Live
            </Label>
            <NewLink href={project.websiteLink} target="_blank" tabIndex="-1">
              <LinkText data-aos="fade-up" data-aos-delay="400">
                View Site
              </LinkText>
            </NewLink>
          </InfoColumn>
        </InfoRow>
        <ImageContainer data-aos="fade-up">
          <ImageLoader
            maxWidth="100%"
            placeholderSize="56.75%"
            alt="website front page"
            src={project.galleryImages[0].url}
            borderRadius="12px"
            backgroundColor="#F9F9F9"
            priority={true}
            loadingSkeleton={true}
            opacity={0}
            boxShadow="0 10px 20px 0 hsla(0, 0%, 41.6%, 0.3)"
          />
        </ImageContainer>
        <StackExplainationContainer>
          <TitleContainer>
            <SubTitle data-aos="fade-up">Stack Choices</SubTitle>
            <Line marginTop="6px" data-aos="flip-down" data-aos-delay="100" />
          </TitleContainer>
          <Paragraph data-aos="fade-up" data-aos-delay="200">
            {project.stackChoice}
          </Paragraph>
        </StackExplainationContainer>
        <ImageGalleryContainer>
          <LeftImage>
            <ImageContainer data-aos="fade-up" data-aos-delay="100">
              <ImageLoader
                maxWidth="100%"
                placeholderSize={
                  project.title === "Videography Portfolio Website"
                    ? "125%"
                    : "246%"
                }
                alt="website front page"
                src={project.galleryImages[1].url}
                borderRadius="12px"
                backgroundColor="#F9F9F9"
                opacity={0}
                boxShadow="0 10px 20px 0 hsla(0, 0%, 41.6%, 0.3)"
                priority={true}
                loadingSkeleton={true}
              />
            </ImageContainer>
          </LeftImage>
          <RightImageContainer>
            <ImageContainer data-aos="fade-up">
              <ImageLoader
                maxWidth="100%"
                placeholderSize={
                  project.title === "Videography Portfolio Website"
                    ? "125%"
                    : "246%"
                }
                alt="website front page"
                src={project.galleryImages[2].url}
                borderRadius="12px"
                backgroundColor="#F9F9F9"
                opacity={0}
                marginBottom="600px"
                boxShadow="0 10px 20px 0 hsla(0, 0%, 41.6%, 0.3)"
                priority={true}
                loadingSkeleton={true}
              />
            </ImageContainer>
          </RightImageContainer>
        </ImageGalleryContainer>
        <ProblemsContainer>
          <TitleContainer>
            <SubTitle data-aos="fade-up">Challenges Faced</SubTitle>
            <Line marginTop="6px" data-aos="flip-down" data-aos-delay="200" />
          </TitleContainer>
          <Paragraph data-aos="fade-up" data-aos-delay="300">
            {project.challengesFaced}
          </Paragraph>
        </ProblemsContainer>
        <ImageGalleryContainer>
          <LeftImage>
            <ImageContainer data-aos="fade-right">
              <ImageLoader
                maxWidth="100%"
                placeholderSize="56.75%"
                alt="website front page"
                src={project.galleryImages[3].url}
                borderRadius="12px"
                backgroundColor="#F9F9F9"
                marginBottom="105px"
                opacity={0}
                boxShadow="0 10px 20px 0 hsla(0, 0%, 41.6%, 0.3)"
                priority={true}
                loadingSkeleton={true}
              />
            </ImageContainer>
            <ImageContainer
              data-aos="fade-right"
              data-aos-delay="200"
              data-aos-anchor-placement="middle-left"
            >
              <ImageLoader
                maxWidth="100%"
                placeholderSize="56.75%"
                alt="website front page"
                src={project.galleryImages[4].url}
                borderRadius="12px"
                backgroundColor="#F9F9F9"
                opacity={0}
                boxShadow="0 10px 20px 0 hsla(0, 0%, 41.6%, 0.3)"
                priority={true}
                loadingSkeleton={true}
              />
            </ImageContainer>
          </LeftImage>
          <RightImageContainer>
            <ImageContainer data-aos="fade-left" data-aos-delay="300">
              <ImageLoader
                maxWidth="100%"
                placeholderSize="246%"
                alt="website front page"
                src={project.galleryImages[5].url}
                borderRadius="12px"
                backgroundColor="#F9F9F9"
                opacity={0}
                boxShadow="0 10px 20px 0 hsla(0, 0%, 41.6%, 0.3)"
                priority={true}
              />
            </ImageContainer>
          </RightImageContainer>
        </ImageGalleryContainer>

        <LearnedContainer>
          <TitleContainer>
            <SubTitle data-aos="fade-up">Lessons Learned</SubTitle>
            <Line marginTop="6px" data-aos="flip-down" data-aos-delay="200" />
          </TitleContainer>
          <Paragraph data-aos="fade-up" data-aos-delay="300">
            {project.lessonsLearned}
          </Paragraph>
        </LearnedContainer>
      </Wrapper>
      <Projects data={otherProjects} otherProjects={true} />
      <Contact />
    </Container>
  );
};

export async function getServerSideProps(context) {
  const slug = context.query.slug;

  const data = await getProject(slug);
  const otherProjects = await getOtherProjects(slug);

  if (!data || !otherProjects) {
    return {
      notFound: true,
    };
  }

  const { project } = data;
  const { projects } = otherProjects;
  return {
    props: { project, otherProjects: projects },
  };
}

export default ProjectPage;

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  flex-direction: column;
  background-color: #08aeea;
  background-image: linear-gradient(0deg, #02aab0 0%, #00cdac 100%);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.div`
  width: 100%;
  max-width: 1450px;
  padding: 0px 30px;
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
`;

const IconContainer = styled.button`
  width: 36px;
  height: 36px;
  border: none;
  background-color: transparent;
  padding: 0px;
  margin-top: 80px;
  &:focus {
    &:focus:not(:focus-visible) {
      outline: none;
    }
  }
  & .returnIcon {
    color: pink;
  }
`;

const ImageContainer = styled.div``;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  max-width: max-content;
  margin-bottom: 20px;
`;

const Title = styled.h2`
  margin-top: 100px;
  font-size: 45px;
  &:hover {
    cursor: default;
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

const TitleLine = styled.hr`
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
  margin-bottom: 2rem;
  margin-top: 1rem;
  margin-left: 0;
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
  @media (max-width: 900px) {
    margin-bottom: 0.8rem;
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
  margin-top: ${({ marginTop }) => (marginTop ? marginTop : "0px")};
  margin-left: auto;
  margin-right: auto;
  width: 50%;
  border-radius: 2500px;
  position: relative;
  opacity: 0.7;
`;

const InfoRow = styled.div`
  margin-top: 70px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 200px;
  max-width: 1300px;
  width: 100%;
  @media (max-width: 658px) {
    flex-wrap: wrap;
    margin-bottom: 120px;
  }
  @media (max-width: 577px) {
    margin-top: 10px;
  }
`;

const InfoColumn = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  width: 260px;
  padding-right: 40px;
  @media (max-width: 900px) {
    &:nth-child(2) {
      padding-right: 7px;
    }
  }
  @media (max-width: 658px) {
    padding-right: 0px;
    &:nth-child(2) {
      padding-right: 0px;
    }
    &:nth-child(3) {
      padding-top: 100px;
    }
    &:nth-child(4) {
      padding-top: 100px;
    }
  }
  @media (max-width: 577px) {
    &:nth-child(1) {
      padding-top: 80px;
    }
    &:nth-child(2) {
      padding-top: 80px;
    }
    &:nth-child(3) {
      padding-top: 80px;
    }
    &:nth-child(4) {
      padding-top: 80px;
    }
  }
`;

const Label = styled.label`
  font-size: 29px;
  margin-bottom: 8px;
`;

const SubTitle = styled.label`
  font-size: 48px;
  margin-bottom: 8px;
  @media (max-width: 600px) {
    font-size: 40px;
  }
`;

const Stack = styled.span`
  font-size: 19px;
  line-height: 30px;
  padding: 5px 0px;
  &:hover {
    cursor: default;
  }
`;

const NewLink = styled.a`
  text-decoration: none;
  outline: none;
`;

const LinkText = styled.button`
  display: inline-block;
  position: relative;
  font-size: 1.3em;
  font-weight: 600;
  font-family: inherit;
  letter-spacing: 1px;
  margin: 0px;
  padding: 0px;
  text-align: center;
  white-space: nowrap;
  width: max-content;
  background-color: transparent;
  border: none;
  color: #f5f5eb;
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
    width: 100%;
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
    &:last-child {
      border-bottom: 2.2px solid #f5f5eb;
    }
    &:hover&::before {
      opacity: 0;
    }
  }
`;

const ImageGalleryContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  @media (max-width: 900px) {
    flex-direction: column;
  }
`;

const LeftImage = styled.div`
  width: calc(50% - 20px);
  border-radius: 12px;
  @media (max-width: 900px) {
    width: 100%;
    margin-bottom: 105px;
  }
`;

const RightImageContainer = styled.div`
  width: calc(50% - 20px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  @media (max-width: 900px) {
    flex-direction: column;
    width: 100%;
    order: 1;
  }
`;

const StackExplainationContainer = styled.div`
  margin: 200px 0px;
  margin-left: auto;
  margin-right: auto;
  max-width: 800px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  @media (max-width: 600px) {
    margin-top: 150px;
  }
`;

const ProblemsContainer = styled.div`
  margin-top: -100px;
  margin-bottom: 200px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  @media (max-width: 900px) {
  margin-top: -400px;
`;

const LearnedContainer = styled.div`
  margin: 200px 0px;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const Paragraph = styled.p`
  font-size: 1.3em;
  max-width: 800px;
  margin-top: 0px;
  white-space: pre-line;
  line-height: 40px;
`;
