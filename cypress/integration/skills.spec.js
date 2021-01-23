import "@testing-library/react/dont-cleanup-after-each";

describe("Skills", () => {
  it("should render images", () => {
    cy.visit("http://kevinseabourne.com");
    cy.viewport("macbook-15");

    // lazy loaded images should not load (exist) until scrolled into view.
    cy.findByAltText("html5").should("not.exist");
    cy.findByAltText("css3").should("not.exist");
    cy.findByAltText("javascript").should("not.exist");
    cy.findByAltText("sc").should("not.exist");
    cy.findByAltText("react").should("not.exist");
    cy.findByAltText("github").should("not.exist");

    cy.findByTestId("skills-container").scrollIntoView();

    cy.findByAltText("html5").should("be.visible");
    cy.findByAltText("css3").should("be.visible");
    cy.findByAltText("javascript").should("be.visible");
    cy.findByAltText("sc").should("be.visible");
    cy.findByAltText("react").should("be.visible");
    cy.findByAltText("github").should("be.visible");
  });
});
