import React from "react";
import { mount } from "cypress/react";
import Quiz from "../../src/components/Quiz";

describe("Quiz Component", () => {
  it("renders the start button initially", () => {
    mount(<Quiz />);
    cy.contains("Start Quiz").should("exist");
  });

  it("displays loading spinner when fetching questions", () => {
    mount(<Quiz />);
    cy.contains("Start Quiz").click();
    cy.get(".spinner-border").should("be.visible");
  });

  it("shows a question and possible answers after loading", () => {
    mount(<Quiz />);
    cy.contains("Start Quiz").click();
    cy.wait(2000);
    cy.get("h2").should("not.be.empty");
    cy.get("button").should("have.length.greaterThan", 1);
  });
});
