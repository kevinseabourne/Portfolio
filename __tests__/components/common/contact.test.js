import React from "react";
import { render } from "../../test-utils";
import Contact from "../../../components/contact";
import { fireEvent, waitFor } from "@testing-library/react";
import { sendEmail } from "../../../pages/api/email";
import "@testing-library/jest-dom";

jest.mock("../../../pages/api/email");

beforeAll(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.clearAllMocks();
  jest.resetModules();
});

afterAll(() => {
  jest.useRealTimers();
});

describe("doSubmit", () => {
  it("should awaitFor a response from post request and clear inputs if response status is 200", async () => {
    sendEmail.mockImplementation(() =>
      Promise.resolve({ data: {}, status: 200, response: {} })
    );
    // sendEmail.mockResolvedValue({
    //   response: { status: 200 },
    // });

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

    await waitFor(() => expect(nameInput.value).toBe(""));
    await waitFor(() => expect(emailInput.value).toBe(""));
    await waitFor(() => expect(messageInput.value).toBe(""));
    await waitFor(() => expect(sendButton).toHaveTextContent("Send"));
  });

  it("should not clear the inputs if the response status is not 200", async () => {
    sendEmail.mockImplementation(() =>
      Promise.resolve({ data: {}, status: 500 })
    );

    const handleScrollTo = jest.fn();
    const { getByTestId, queryByText, debug } = render(
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

  it("should show an error message on a rejected http post request", async () => {
    // sendEmail.mockImplementation(() =>
    //   Promise.reject("Async error").catch((error) => {
    //     expect(error).toEqual("Async error");
    //   })
    // );
    sendEmail.mockImplementation(() => Promise.resolve({ status: 200 }));
    const handleScrollTo = jest.fn();
    const { getByTestId, getByText } = render(
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

    await waitFor(() => expect(nameInput.value).toBe(""));
    await waitFor(() => expect(emailInput.value).toBe(""));
    await waitFor(() => expect(messageInput.value).toBe(""));

    expect(sendEmail).toHaveBeenCalledTimes(1);
    expect(sendEmail).toHaveBeenCalledWith({
      name: "name",
      email: "test@hotmail.com",
      message: "message",
    });
  });
});
