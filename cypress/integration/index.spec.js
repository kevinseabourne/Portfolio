describe("http GET request", () => {
  it("should show an error message of a rejected http request", () => {
    cy.server({ force404: true });
    cy.route({
      method: "GET",
      status: 404,
      url: "http://localhost:3000/_next/webpack-hmr?page=/",
      response: {},
      delay: 3000,
    });
    cy.visit("http://localhost:3000");

    const loadingContainer = cy.wait(5000).findByRole("alert");
    loadingContainer.should("be.visible");
  });
});
