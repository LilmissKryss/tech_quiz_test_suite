describe("Tech Quiz App", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3004");
  });

  it("allows a user to start the quiz", () => {
    cy.contains("Start Quiz").click();
    cy.get("h2").should("exist");
  });

  it("allows selecting an answer", () => {
    cy.contains("Start Quiz").click();
    cy.wait(1000); // Ensure questions are loaded
    cy.get("button").contains("1").click();
  });

  it("completes the quiz and displays a score", () => {
    cy.contains("Start Quiz").click();
    cy.wait(1000); // Ensure questions are loaded

    // Answer all questions
    const totalQuestions = 10;
    for (let i = 0; i < totalQuestions; i++) {
      cy.get("button").contains("1").click();
      cy.wait(1000); // Wait for next question to appear
    }

    // Look for text "Quiz Completed"
    cy.get("h2").contains("Quiz Completed").should("be.visible");

    // Check for the score display
    cy.contains("Your score:").should("be.visible");

    // Verify the "Take New Quiz" button exists
    cy.contains("button", "Take New Quiz").should("be.visible");
  });
});
