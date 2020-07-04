import React from "react";
import { render } from "../../test-utils";
import Contact from "../../../components/contact";
import { fireEvent, waitFor, cleanup } from "@testing-library/react";
import { sendEmail } from "../../../pages/api/email";
import "@testing-library/jest-dom";

jest.mock("../../../pages/api/email");

jest.setTimeout(10000);

afterEach(() => {
  jest.clearAllMocks();
  jest.resetModules();
});

describe("doSubmit", () => {
  it("should awaitFor a response from post request and clear inputs if response status is 200", async () => {
    sendEmail.mockImplementation(() =>
      Promise.resolve({ data: {}, status: 200, response: {} })
    );

    const handleScrollTo = jest.fn();
    const { getByTestId, queryByText, queryByTestId } = render(
      <Contact handleScrollTo={handleScrollTo} />
    );
    const nameInput = getByTestId("name-input");
    const emailInput = getByTestId("email-input");
    const messageInput = getByTestId("message-input");

    fireEvent.change(nameInput, { target: { value: "name" } });
    fireEvent.change(emailInput, { target: { value: "test@hotmail.com" } });
    fireEvent.change(messageInput, { target: { value: "message" } });

    const sendButton = queryByText("Send");
    fireEvent.click(sendButton);

    expect(sendEmail).toHaveBeenCalledTimes(1);
    expect(sendEmail).toHaveBeenCalledWith({
      name: "name",
      email: "test@hotmail.com",
      message: "message",
    });

    expect(getByTestId("Send")).not.toHaveTextContent("Send");
    expect(getByTestId("loading-spinner"));

    await waitFor(() => expect(nameInput.value).toBe(""));
    await waitFor(() => expect(emailInput.value).toBe(""));
    await waitFor(() => expect(messageInput.value).toBe(""));
    await waitFor(() =>
      expect(getByTestId("loading-spinner")).toBeInTheDocument()
    );
    await waitFor(() =>
      expect(getByTestId("sentCheckmarkIcon")).toBeInTheDocument()
    );

    // checkmark icon should appear for 9 seconds and then disappear

    await waitFor(
      () => expect(queryByTestId("loading-spinner")).not.toBeInTheDocument(),
      {
        timeout: 10000,
      }
    );
    await waitFor(
      () => expect(queryByTestId("sentCheckmarkIcon")).not.toBeInTheDocument(),
      {
        timeout: 10000,
      }
    );
    await waitFor(() => expect(getByTestId("Send")).toBeInTheDocument(), {
      timeout: 10000,
    });
    cleanup();
  });

  it("should show an error message on a rejected http post request", async () => {
    sendEmail.mockImplementation(() =>
      Promise.reject("Async error").catch((error) => {
        expect(error).toEqual("Async error");
      })
    );
    const handleScrollTo = jest.fn();
    const { getByTestId, getByText, getByRole } = render(
      <Contact handleScrollTo={handleScrollTo} />
    );

    const nameInput = getByTestId("name-input");
    const emailInput = getByTestId("email-input");
    const messageInput = getByTestId("message-input");
    const sendButton = getByText("Send");

    fireEvent.change(nameInput, { target: { value: "name" } });
    fireEvent.change(emailInput, { target: { value: "test@hotmail.com" } });
    fireEvent.change(messageInput, { target: { value: "message" } });
    fireEvent.click(sendButton);

    await waitFor(() => expect(nameInput.value).toBe("name"));
    await waitFor(() => expect(emailInput.value).toBe("test@hotmail.com"));
    await waitFor(() => expect(messageInput.value).toBe("message"));

    expect(sendEmail).toHaveBeenCalledTimes(1);
    expect(sendEmail).toHaveBeenCalledWith({
      name: "name",
      email: "test@hotmail.com",
      message: "message",
    });

    // error message should appear:
    // JSDOM cannot find in message DOM, test coverage for error message done with cypress.
  });

  it("should not clear the inputs if the response status is not 200", async () => {
    sendEmail.mockImplementation(() =>
      Promise.resolve({ data: {}, status: 500 })
    );

    const handleScrollTo = jest.fn();
    const { getByTestId, queryByText } = render(
      <Contact handleScrollTo={handleScrollTo} />
    );
    const nameInput = getByTestId("name-input");
    const emailInput = getByTestId("email-input");
    const messageInput = getByTestId("message-input");

    fireEvent.change(nameInput, { target: { value: "name" } });
    fireEvent.change(emailInput, { target: { value: "test@hotmail.com" } });
    fireEvent.change(messageInput, { target: { value: "message" } });

    const sendButton = queryByText("Send");
    fireEvent.click(sendButton);

    expect(sendEmail).toHaveBeenCalledTimes(1);
    expect(sendEmail).toHaveBeenCalledWith({
      name: "name",
      email: "test@hotmail.com",
      message: "message",
    });

    expect(getByTestId("loading-spinner"));

    await waitFor(() => expect(nameInput.value).toBe("name"));
    await waitFor(() => expect(emailInput.value).toBe("test@hotmail.com"));
    await waitFor(() => expect(messageInput.value).toBe("message"));
  });
});
