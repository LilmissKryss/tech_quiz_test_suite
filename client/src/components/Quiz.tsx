import { useState } from "react";
import type { Question } from "../models/Question.js";
import { getQuestions } from "../services/questionApi.js";

const Quiz = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [loading, setLoading] = useState(false);

  const getRandomQuestions = async () => {
    try {
      setLoading(true);
      console.log("Fetching questions...");
      const questions = await getQuestions();
      console.log("Questions received:", questions);
      console.log("Number of questions loaded:", questions.length);

      if (!questions) {
        throw new Error("something went wrong!");
      }

      setQuestions(questions);
      setQuizStarted(true);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerClick = (isCorrect: boolean) => {
    if (isCorrect) {
      setScore(score + 1);
    }

    const nextQuestionIndex = currentQuestionIndex + 1;

    // Check if there are more questions left
    if (nextQuestionIndex < questions.length) {
      setCurrentQuestionIndex(nextQuestionIndex);
    } else {
      setQuizCompleted(true);
    }
  };

  const handleStartQuiz = async () => {
    setQuizCompleted(false);
    setScore(0);
    setCurrentQuestionIndex(0);
    await getRandomQuestions();
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!quizStarted) {
    return (
      <div className="p-4 text-center">
        <button
          className="btn btn-primary d-inline-block mx-auto"
          onClick={handleStartQuiz}
        >
          Start Quiz
        </button>
      </div>
    );
  }

  if (quizCompleted) {
    return (
      <div className="card p-4 text-center">
        <h2>Quiz Completed</h2>
        <div className="alert alert-success">
          Your score: {score}/{questions.length}
        </div>
        <button
          className="btn btn-primary d-inline-block mx-auto"
          onClick={handleStartQuiz}
        >
          Take New Quiz
        </button>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  // safety check if there are no questions
  if (!currentQuestion) {
    return (
      <div className="alert alert-warning">
        No question available. Please try again.
      </div>
    );
  }

  return (
    <div className="card p-4">
      <h2>{currentQuestion.question}</h2>
      <div className="mt-3">
        {currentQuestion.answers.map((answer, index) => (
          <div key={index} className="d-flex align-items-center mb-2">
            <button
              className="btn btn-primary"
              onClick={() => handleAnswerClick(answer.isCorrect)}
            >
              {index + 1}
            </button>
            <div className="alert alert-secondary mb-0 ms-2 flex-grow-1">
              {answer.text}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Quiz;
