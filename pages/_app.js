import App from "next/app";
import React, { useState } from "react";
import { ThemeProvider } from "styled-components";
import logger from "../pages/api/logger";
import AppContext from "../context/appContext";
import "../styles.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { getProjectsData } from "./api/projects";

logger.init();

const theme = {
  fonts: {
    titleFont: "Inter-Black",
    textFont: "Inter-Regular",
  },
  colors: {
    primary: "blue",
  },
};

const MyApp = ({ Component, pageProps }) => {
  const [componentPositions, setComponentPositions] = useState([
    { name: "About", position: 1140 },
    { name: "Skills", position: 2480 },
    { name: "Projects", position: 3810 },
    { name: "Contact", position: 4899 },
  ]);

  const handleScrollTo = (obj) => {
    const componentPositionsClone = [...componentPositions];
    componentPositionsClone.map((i) => {
      return i.name === obj.name
        ? typeof obj.position === "number"
          ? (i.position = obj.position)
          : ""
        : "";
    });
    setComponentPositions(componentPositionsClone);
  };

  return (
    <AppContext.Provider
      value={{
        componentPositions: componentPositions,
        handleScrollTo: handleScrollTo,
      }}
    >
      <ThemeProvider theme={theme}>
        <ToastContainer closeOnClick position="top-left" />
        <Component {...pageProps} />
      </ThemeProvider>
    </AppContext.Provider>
  );
};

export default MyApp;

// export default class MyApp extends App {
//
//
//   render() {
//     const { Component, pageProps } = this.props;
//     return (
//       <ThemeProvider theme={theme}>
//         <ToastContainer />
//         <Component {...pageProps} />
//       </ThemeProvider>
//     );
//   }
// }
