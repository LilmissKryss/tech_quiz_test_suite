import express, { Request, Response } from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const router = express.Router();

const _filename = fileURLToPath(import.meta.url);
const _dirname = path.dirname(_filename);

// Load questions from JSON file
const questionData = JSON.parse(
  fs.readFileSync(
    path.resolve(_dirname, "../../seeds/pythonQuestions.json"),
    "utf-8"
  )
);

// shuffle questions and get 10 random ones
const getRandomQuestions = async (count = 10) => {
  const shuffledQuestions = questionData
    .map((q: any) => ({ ...q, sort: Math.random() }))
    .sort((a: any, b: any) => a.sort - b.sort)
    .map(({ sort, ...q }: any) => q);

  return shuffledQuestions.slice(0, count);
};

// GET route to fetch 10 random questions
router.get("/random", async (_: Request, res: Response) => {
  try {
    const questions = await getRandomQuestions();
    res.json(questions);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch questions" });
  }
});

// check user's answer
const checkAnswer = async (
  questionId: number,
  userAnswer: string
): Promise<boolean> => {
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
    const isCorrect = await checkAnswer(questionId, userAnswer);
    res.json({ correct: isCorrect });
  } catch (error) {
    res.status(500).json({ error: "Failed to submit answer" });
  }
});

export default router;
