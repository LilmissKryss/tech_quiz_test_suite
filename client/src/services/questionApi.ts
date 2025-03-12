import type { Question } from "../models/Question.js";

export const getQuestions = async (): Promise<Question[]> => {
  try {
    const response = await fetch("/api/questions/random");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data: Question[] = await response.json();
    console.log("Fetched questions:", data);
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Failed to fetch questions:", error);
    throw error;
  }
};
