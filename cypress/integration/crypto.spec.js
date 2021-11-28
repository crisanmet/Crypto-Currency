/// <reference types="cypress" />

const URL = "http://127.0.0.1:8080/";
const CANTIDAD_MONEDAS_MOSTRADAS = 20;

context("Crypto-Nita", () => {
  before(() => {
    cy.visit(URL);
  });

  describe("Se carga la pagina de CRYPTO", () => {
    it("Nos aseguramos que haya un contenedor con las monedas", () => {
      cy.get(".tabla-coins")
        .find(".tr-coins")
        .should("have.length", CANTIDAD_MONEDAS_MOSTRADAS);
    });
    it("Buscamos una crypto en el input de search y nos deberìa mostrar solo lo buscado", () => {
      cy.get(".search").type("ethereum");
      cy.get(".tabla-coins").find(".tr-coins").should("contain", 1);
    });
    it("Borramos el valor del input del search y nos deberìa mostrar todas las monedas", () => {
      cy.get(".search").clear();
      cy.get(".tabla-coins")
        .find(".tr-coins")
        .should("contain", CANTIDAD_MONEDAS_MOSTRADAS);
    });
    it("Modificamos la base de USD a ARS", () => {
      cy.get(".form-select").select("ARS");
      cy.get(".form-select").should("have.value", "ars");
    });
    it("Hacemos click en una moneda con una fecha correcta", () => {
      cy.get(".tr-coins:first").click();
      cy.get(".swal2-input").type("22-11-2021");
      cy.get(".swal2-confirm").click();
      cy.get(".swal2-popup").should("have.class", "swal2-icon-success");
      cy.visit(URL);
    });
    it("Hacemos click en una moneda con una fecha erronea", () => {
      cy.get(".tr-coins:first").click();
      cy.get(".swal2-input").type("asdadadad");
      cy.get(".swal2-confirm").click();
      cy.get(".swal2-validation-message").should("be.visible");
    });
  });
});
