import React from "react";
import Home from "../../pages/index";
import { render } from "../test-utils";
import "@testing-library/jest-dom";
import { fireBaseData } from "../../pages/api/__mocks__/projects";

describe("react router", () => {
  it("render about component", async () => {
    const handleScrollTo = jest.fn();
    const { container } = render(
      <Home handleScrollTo={handleScrollTo} data={{ data: fireBaseData }} />
    );
    expect(container).toBeInTheDocument();
  });
});
