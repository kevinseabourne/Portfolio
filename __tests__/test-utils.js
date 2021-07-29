import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ThemeProvider } from "styled-components";
import Home from ".././pages/index";
import preloadAll from "jest-next-dynamic";
import AppContext from "../context/appContext";
import { ToastContainer } from "react-toastify";

const theme = {
  maincolor: "red",
  colors: {
    primary: "blue",
  },
};

const componentPositions = [
  { name: "About", position: 1140 },
  { name: "Skills", position: 2480 },
  { name: "Projects", position: 3810 },
  { name: "Contact", position: 4899 },
];

const handleScrollTo = jest.fn();

const customRender = (component) => {
  return render(
    <AppContext.Provider
      value={{
        componentPositions: componentPositions,
        handleScrollTo: handleScrollTo,
      }}
    >
      <ThemeProvider theme={theme}>
        <ToastContainer />

        {component}
      </ThemeProvider>
    </AppContext.Provider>
  );
};

export { customRender as render };

// -------- Test -------- //

describe("react router", () => {
  beforeAll(async () => {
    await preloadAll();
  });
  it("render about component", async () => {
    const data = jest.fn();
    const { container } = customRender(<Home data={data} />);
    expect(container).toBeInTheDocument();
  });
});
