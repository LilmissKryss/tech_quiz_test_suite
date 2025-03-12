import type { Question } from "../models/Question.js";

export const getQuestions = async (): Promise<Question[]> => {
  try {
    const response = await fetch("/api/questions/random");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const question: Question = await response.json();
    console.log("Fetched question:", question);

    // Ensure the response is wrapped in an array
    return question ? [question] : [];
  } catch (error) {
    console.error("Failed to fetch question:", error);
    throw error;
  }
};
