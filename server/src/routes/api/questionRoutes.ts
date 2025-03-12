import express, { Request, Response } from "express";
const router = express.Router();
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const _filename = fileURLToPath(import.meta.url);
const _dirname = path.dirname(_filename);

const questionData = JSON.parse(
  fs.readFileSync(
    path.resolve(_dirname, "../../seeds/pythonQuestions.json"),
    "utf-8"
  )
);

// Get random questions
const getRandomQuestions = async () => {
  const randomIndex = Math.floor(Math.random() * questionData.length);
  return questionData[randomIndex];
};

// GET route to fetch a random question
router.get("/random", async (_: Request, res: Response) => {
  try {
    // Logic to fetch a random question from the database
    const question = await getRandomQuestions();
    res.json(question);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch question" });
  }
});

// Function to check the answer
const checkAnswer = async (
  questionId: number,
  userAnswer: string
): Promise<boolean> => {
  // Logic to check the answer using questionId
  const question = questionData.find(
    (q: { id: number; correctAnswer: string }) => q.id === questionId
  );
  if (!question) {
    throw new Error("Question not found");
  }
  return question.correctAnswer === userAnswer;
};

// POST route to submit an answer
router.post("/answer", async (req: Request, res: Response) => {
  const { questionId, userAnswer } = req.body;
  try {
    // Logic to validate the user's answer
    const isCorrect = await checkAnswer(questionId, userAnswer);
    res.json({ correct: isCorrect });
  } catch (error) {
    res.status(500).json({ error: "Failed to submit answer" });
  }
});

export default router;
