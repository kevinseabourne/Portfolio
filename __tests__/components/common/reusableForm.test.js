import React from "react";
import { render } from "../../test-utils";
import Contact from "../../../components/contact";
import { fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import preloadAll from "jest-next-dynamic";
import { sendEmail } from "../../../pages/api/email";

jest.mock("../../../pages/api/email");

beforeAll(async () => {
  await preloadAll();
});

afterEach(() => {
  jest.clearAllMocks();
});

describe("clear input button", () => {
  test.each([
    ["name-input", "name", "name-iconBox", "Name-label"],
    ["email-input", "test@hotmail.com", "email-iconBox", "Email-label"],
    ["message-input", "message", "message-iconBox", "Message-label"],
  ])(
    "should show the inputs label and clearButton when there is a value greater than or equal to 1",
    (inputName, query, clearButton, inputLabelName) => {
      const handleScrollTo = jest.fn();
      const { getByTestId } = render(
        <Contact handleScrollTo={handleScrollTo} />
      );
      const input = getByTestId(inputName);

      fireEvent.change(input, { target: { value: query } });

      const clearInputButton = getByTestId(clearButton);
      const inputLabel = getByTestId(inputLabelName);

      expect(clearInputButton).toBeVisible();
      expect(inputLabel).toBeVisible();

      fireEvent.click(clearInputButton);

      expect(input.value).toBe("");
      expect(input).toHaveFocus();
      expect(clearInputButton).not.toBeVisible();
      expect(inputLabel).not.toBeVisible();
    }
  );

  it("should show an error message below each input when failing validation requirements", async () => {
    sendEmail.mockImplementation(() =>
      Promise.reject("Async error").catch((error) => {
        expect(error).toEqual("Async error");
      })
    );
    const handleScrollTo = jest.fn();
    const { getByText, getByTestId } = render(
      <Contact handleScrollTo={handleScrollTo} />
    );

    const nameInput = getByTestId("name-input");
    const emailInput = getByTestId("email-input");
    const messageInput = getByTestId("message-input");
    const sendButton = getByText("Send");

    fireEvent.change(nameInput, { target: { value: "1" } });
    fireEvent.change(emailInput, { target: { value: "test@hotmail" } });
    fireEvent.change(messageInput, { target: { value: "" } });
    fireEvent.click(sendButton);

    expect(nameInput.value).toBe("1");
    expect(emailInput.value).toBe("test@hotmail");
    expect(messageInput.value).toBe("");

    await waitFor(() => expect(getByTestId("nameErrorMessage")).toBeVisible());
    await waitFor(() => expect(getByTestId("emailErrorMessage")).toBeVisible());
    await waitFor(() =>
      expect(getByTestId("messageErrorMessage")).toBeVisible()
    );

    await waitFor(() => expect(getByTestId("name-ErrorImage")).toBeVisible());
    await waitFor(() => expect(getByTestId("email-ErrorImage")).toBeVisible());
    await waitFor(() =>
      expect(getByTestId("message-ErrorImage")).toBeVisible()
    );
  });

  it("should show an error message and the errorMessage should be sensitive to input changes.", async () => {
    sendEmail.mockImplementation(() =>
      Promise.reject("Async error").catch((error) => {
        expect(error).toEqual("Async error");
      })
    );
    const handleScrollTo = jest.fn();
    const { getByText, getByTestId } = render(
      <Contact handleScrollTo={handleScrollTo} />
    );

    const nameInput = getByTestId("name-input");
    const emailInput = getByTestId("email-input");
    const messageInput = getByTestId("message-input");
    const sendButton = getByText("Send");

    fireEvent.change(nameInput, { target: { value: "1" } });
    fireEvent.change(emailInput, { target: { value: "test@hotmail" } });
    fireEvent.change(messageInput, { target: { value: "" } });
    fireEvent.click(sendButton);

    expect(nameInput.value).toBe("1");
    expect(emailInput.value).toBe("test@hotmail");
    expect(messageInput.value).toBe("");

    await waitFor(() => expect(getByTestId("nameErrorMessage")).toBeVisible());
    await waitFor(() => expect(getByTestId("emailErrorMessage")).toBeVisible());
    await waitFor(() =>
      expect(getByTestId("messageErrorMessage")).toBeVisible()
    );

    fireEvent.change(nameInput, { target: { value: "name" } });
    fireEvent.change(emailInput, { target: { value: "test@hotmail.com" } });
    fireEvent.change(messageInput, { target: { value: "message" } });

    expect(nameInput.value).toBe("name");
    expect(emailInput.value).toBe("test@hotmail.com");
    expect(messageInput.value).toBe("message");

    await waitFor(() =>
      expect(getByTestId("nameErrorMessage")).not.toBeVisible()
    );
    await waitFor(() =>
      expect(getByTestId("emailErrorMessage")).not.toBeVisible()
    );
    await waitFor(() =>
      expect(getByTestId("messageErrorMessage")).not.toBeVisible()
    );
  });

  it("should not allow you to click send if the send status is pending", async () => {
    sendEmail.mockImplementation(() =>
      Promise.resolve({ data: {}, status: 200 })
    );
    const handleScrollTo = jest.fn();
    const { getByText, getByTestId } = render(
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

    expect(sendEmail).toHaveBeenCalledTimes(1);
    expect(sendEmail).toHaveBeenCalledWith({
      name: "name",
      email: "test@hotmail.com",
      message: "message",
    });

    expect(nameInput.value).toBe("name");
    expect(emailInput.value).toBe("test@hotmail.com");
    expect(messageInput.value).toBe("message");
    expect(getByTestId("loading-spinner"));

    fireEvent.click(sendButton);

    // expect sendEmail to not be called. When clicking on send during pending state.
    expect(sendEmail).toHaveBeenCalledTimes(1);

    expect(nameInput.value).toBe("name");
    expect(emailInput.value).toBe("test@hotmail.com");
    expect(messageInput.value).toBe("message");
    expect(getByTestId("loading-spinner"));

    fireEvent.click(sendButton);
    fireEvent.click(sendButton);
    fireEvent.click(sendButton);

    expect(sendEmail).toHaveBeenCalledTimes(1);
  });
});
