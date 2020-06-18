import { getAllProjects } from "./api/projects";
import Head from "next/head";
import styled from "styled-components";
import Header from "../components/header";
import Banner from "../components/banner";
import About from "../components/about";
import Skills from "../components/skills";
import Projects from "../components/projects";
import Contact from "../components/contact";

const Home = ({ data }) => {
  const dataArray = [];
  if (data) {
    const values = Object.values(data);
    for (const value of values) {
      dataArray.push(value);
    }
  }
  return (
    <React.Fragment>
      <Head>
        <title>Portfolio | Kevin Seabourne</title>
        <meta
          name="description"
          property="og:title"
          content="Portfolio | Kevin Seabourne"
          key="portfolio"
        />
      </Head>
      <Head>
        <meta
          name="description"
          property="og:title"
          content="Portfolio | Kevin Seabourne"
          key="portfolio"
        />
      </Head>
      <Container>
        <Header />
        <Banner />
        <About />
        <Skills />
        <Projects data={dataArray} />
        <Contact />
      </Container>
    </React.Fragment>
  );
};

export async function getStaticProps() {
  const { data } = await getAllProjects();

  return {
    props: { data },
  };
}

export default Home;

const Container = styled.main`
  margin: 0;
`;
