describe("checking network status", () => {
    it("can access the internet", () => {
        cy.visit("https://google.com");
        cy.origin("http://localhost:3000", () => {
            cy.visit("/");
        });
    });
});
