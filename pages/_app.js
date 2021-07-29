import { useState } from "react";
import logger from "../pages/api/logger";
import AppContext from "../context/appContext";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { GlobalStyle } from "../globalStyle";
import { ToastContainer } from "react-toastify";

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

export default function App({ Component, pageProps }) {
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
    <>
      <AppContext.Provider
        value={{
          componentPositions: componentPositions,
          handleScrollTo: handleScrollTo,
        }}
      >
        <GlobalStyle />
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </AppContext.Provider>
    </>
  );
}
