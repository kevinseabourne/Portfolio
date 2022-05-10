import React, { useEffect, useState } from "react";
import { getAllProjects, getAllGraphQLProjects } from "./api/projects";
import Head from "next/head";
import styled from "styled-components";
import Header from "../components/header";
import Banner from "../components/banner";
import About from "../components/about";
import Skills from "../components/skills";
import Projects from "../components/projects";
import Contact from "../components/contact";

const Home = ({ allProjects }) => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    setProjects(allProjects);
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>Kevin D Seabourne | Portfolio</title>
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
      <Container>
        <Header />
        <Banner />
        <About />
        <Skills />
        <Projects data={projects} />
        <Contact />
      </Container>
    </React.Fragment>
  );
};

export async function getStaticProps() {
  const data = await getAllProjects();
  if (data) {
    const { projects } = data;
    return { props: { allProjects: projects } };
  } else {
    return { props: { data: null } };
  }
}

export default Home;

const Container = styled.main`
  margin: 0;
`;
