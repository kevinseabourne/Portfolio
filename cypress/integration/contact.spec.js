import { sendEmail } from "../../pages/api/email";

describe("Failed Request - Error Message", () => {
  it("should show an error message. On a failed http post request", () => {
    cy.server({ force404: true });
    cy.route({
      method: "POST",
      url: "/api.emailjs.com/api/v1.0/email/send",
      response: [{ status: 404 }],
    });
    cy.visit("http://kevinseabourne.com");

    cy.get('[data-testid="name-input"]').type("test", { force: true });
    cy.wait(1000).get('[data-testid="email-input"]').type("test@hotmail.com", {
      force: true,
    });
    cy.wait(1000)
      .get('[data-testid="message-input"]')
      .type("message", { force: true });

    const sendButton = cy.findByText("Send");
    sendButton.click({ force: true });

    // Assertion //

    const loadingContainer = cy.wait(2000).findByRole("alert");
    loadingContainer.should("be.visible");
  });

  it("Successful Request - Passed Message", () => {
    const template_params = {
      to_name: "Kevin Seabourne",
      from_name: "test",
      reply_to: "test@hotmail.com",
      message_html: "message",
    };
    cy.server();
    cy.route({
      method: "POST",
      status: 200,
      url: "https://api.emailjs.com/api/v1.0/email/send",
      response: {},
      delay: 3000,
    });
    cy.visit("http://kevinseabourne.com");

    cy.get('[data-testid="name-input"]').type("test", { force: true });
    cy.wait(1000).get('[data-testid="email-input"]').type("test@hotmail.com", {
      force: true,
    });
    cy.wait(1000)
      .get('[data-testid="message-input"]')
      .type("message", { force: true });

    const sendButton = cy.findByText("Send");
    sendButton.click({ force: true });

    const loadingSpinner = cy.findByTestId("loading-spinner");
    sentCheckmarkIcon.should("be.visible");
    // Assertion //

    const sentCheckmarkIcon = cy.wait(12000).findByTestId("sentCheckmarkIcon");
    sentCheckmarkIcon.should("be.visible");

    // after a successfull post request the sent icons stay visible for 12 seconds then goes away
    sendButton.should("be.visible");
  });
});
