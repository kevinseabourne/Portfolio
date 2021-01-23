import React from "react";
import Projects from "../../../components/projects";
import { render } from "../../test-utils";
import { fireEvent, waitFor, act } from "@testing-library/react";
import { getAllProjects, mockData } from "../../../pages/api/projects";
import "@testing-library/jest-dom";

jest.mock("../../../pages/api/projects");

describe("Projects", () => {
  it("should render data from props", async () => {
    getAllProjects.mockResolvedValue({ data: mockData });
    const { getByText, getByTestId } = render(<Projects data={mockData} />);

    const title = getByText("Clothing Store Mock");
    const descrition = getByTestId("Clothing Store Mock description");
    const skills = getByText("React | Javacript | CSS | Styled Components");

    await waitFor(() => expect(title).toBeVisible());
    await waitFor(() => expect(descrition).toBeVisible());
    await waitFor(() => expect(skills).toBeVisible());
  });

  it("should loading div when data props are undefined", async () => {
    getAllProjects.mockImplementation(() =>
      Promise.reject("Async error").catch((error) => {
        expect(error).toEqual("Async error");
      })
    );
    const { getByTestId, getByRole } = render(<Projects data={[]} />);
    const loading = getByTestId("loading-projects");
    const errorMessage = await waitFor(() => getByRole("alert"));

    await waitFor(() => expect(errorMessage).toBeVisible());
    await waitFor(() => expect(loading).toBeVisible(), { timeout: 5000 });
  });
});
