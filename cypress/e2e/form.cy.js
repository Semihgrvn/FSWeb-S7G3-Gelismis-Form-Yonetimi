describe('isim-testi', function () {
    this.beforeEach(() => {
        cy.visit("http://localhost:3000");
    });

    it('Testler', function () {
        cy.get('#name').click().type("deneme yazısıdır");

        cy.get('#email').click().type("denememaili@gmail.com");

        cy.get('#password').type("1122334455");

        cy.get('#termAccept').check();

        cy.get('[data-cy="isim-soyisim"]').should("be.visible")

        cy.get('#termAccept').should("be.visible")

        cy.get('.btn').click();
    });

    it('Bos Birakilan Input', function () {
        cy.get('#email').click().type("denememaili@gmail.com");

        cy.get('#password').type("1122334455");

        cy.get('#termAccept').check();

        cy.get('[data-cy="isim-soyisim"]').should("be.visible")

        cy.get('#termAccept').should("be.visible")

        cy.get('.btn').click();

        cy.get('#name').type("deneme yazısıdır");

        cy.get('.btn').click();
    });
});


