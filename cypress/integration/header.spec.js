describe("Header Links", () => {
  const tests = [
    {
      section: "About",
      expected: 660,
    },
    {
      section: "Skills",
      expected: 1320,
    },
    {
      section: "Projects",
      expected: 2303,
    },
    {
      section: "Contact",
      expected: 5280,
    },
  ];
  tests.forEach(({ section, expected }) => {
    it(
      "should scroll to the " +
        section +
        " section when clicking on its link in the header",
      () => {
        cy.visit("http://kevinseabourne.com");

        const link = cy.findByTestId(`${section}-link`);

        link.click().wait(2000); // wait for the scroll to finish then assert.

        cy.window().then((win) => {
          expect(win.pageYOffset).to.equal(expected);
        });
        cy.scrollTo(0, 0);
      }
    );
  });
});

describe("Responsive Header", () => {
  it("should open and close responsive header on click outside", () => {
    cy.visit("http://kevinseabourne.com");
    cy.viewport("iphone-x");

    const burgerMenu = cy.findByTestId("burgerMenu");
    burgerMenu.click();

    const header = cy.findByTestId("responsive-header");
    header.should("be.visible");

    const clickOutside = cy.findByTestId("banner");
    clickOutside.click();

    cy.findByTestId("responsive-header").should("not.be.visible");
  });

  it("should open & close the header when clicking on the burgerMenu", () => {
    cy.visit("http://kevinseabourne.com");
    cy.viewport("iphone-x");

    const burgerMenu = cy.findByTestId("burgerMenu");
    burgerMenu.click();

    const header = cy.findByTestId("responsive-header");
    header.should("be.visible");

    burgerMenu.click();

    cy.findByTestId("responsive-header").should("not.be.visible");
  });

  it("should close the header after clicking on a link", () => {
    cy.visit("http://kevinseabourne.com");
    cy.viewport("iphone-x");

    const burgerMenu = cy.findByTestId("burgerMenu");
    burgerMenu.click();

    const aboutLink = cy.findByText("About");

    aboutLink.click();

    cy.findByTestId("responsive-header").should("not.be.visible");
  });
});

describe("Responsive Header Links", () => {
  const tests = [
    {
      section: "About",
      expected: 812,
    },
    {
      section: "Skills",
      expected: 1744,
    },
    {
      section: "Projects",
      expected: 2941,
    },
    {
      section: "Contact",
      expected: 6453,
    },
  ];
  tests.forEach(({ section, expected }) => {
    it(
      "should scroll to the " +
        section +
        " section when clicking on its link in the header",
      () => {
        cy.visit("http://kevinseabourne.com");
        cy.viewport("iphone-x");

        const burgerMenu = cy.findByTestId("burgerMenu");
        burgerMenu.click();

        const link = cy.findByTestId(`${section}-link`);

        link.click().wait(2000); // wait for the scroll to finish then assert.

        cy.window().then((win) => {
          expect(win.pageYOffset).to.equal(expected);
        });
      }
    );
  });
});
