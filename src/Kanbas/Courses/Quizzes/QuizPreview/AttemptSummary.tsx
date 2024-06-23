import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import * as client from "./client";
import * as quizClient from "../client";
import * as questionClient from "../Questions/client";
import QuestionCard from "./QuestionCard";

interface Quiz {
  _id: string;
  multipleAttempts: boolean;
  howManyAttempts: number;
}

interface Attempt {
  quiz: string;
  student: string;
  answers: {
    question: string;
    answer: string;
    correct: boolean;
    points: number;
  }[];
  score: number;
  attemptDate: Date;
}

export default function AttemptSummary() {
  const {cid, qid} = useParams();
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [questions, setQuestions] = useState<any[]>([]);
  const [lastAttempt, setLastAttempt] = useState<Attempt | null>(null);
  const [remainingAttempts, setRemainingAttempts] = useState<number>(0);

  const { currentUser } = useSelector((state: any) => state.accountReducer);

  useEffect(() => {
    const fetchQuizAndAttempts = async () => {
      const quizData = await quizClient.findQuizById(qid as string);
      setQuiz(quizData);
      console.log("quizData:", quizData);
      const questionsData = await questionClient.findQuestionsForQuiz(qid as string);
      setQuestions(questionsData);
      console.log("questionsData:", questionsData);

      console.log(currentUser);

      // Get the last answers for the current user
      const attemptsData = await client.findAnswersForQuestion(
        qid as string,
        currentUser._id as string
      );
      if (attemptsData.length > 0) {
        const lastAttemptData = attemptsData[attemptsData.length - 1];
        setLastAttempt(lastAttemptData);
      }

      const remaining = quizData.howManyAttempts - attemptsData.length;
      setRemainingAttempts(remaining);
    };

    fetchQuizAndAttempts();
  }, [qid]);

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Quiz Summary</h1>
      {quiz && (
        <div>
        <p>Total Attempts Allowed: {quiz.howManyAttempts}</p>
        <p>Remaining Attempts: {remainingAttempts}</p>
        {remainingAttempts > 0 && (
          <>
            <Link to={`../Quizzes/${qid}`} className="btn btn-primary">
              Take Quiz
            </Link>
            {currentUser.role === "FACULTY" && (
              <Link to={`../Quizzes/${qid}/editor`} className="btn btn-danger ms-3">
                Edit Quiz
              </Link>
            )}
          </>
        )}
        </div>
      )}
      {lastAttempt && (
        <div className="mt-4">
          <h2>Last Attempt</h2>
          <p>Score: {lastAttempt.score}</p>
          {lastAttempt.answers.map((answer, index) => (
            <QuestionCard
              key={index}
              question={questions[index]}
              selectedAnswer={answer.answer}
              correctAnswer={
                questions[index].choices.find((choice:any) => choice.correct)?.text
              }
              readonly={true}
            />
          ))}
        </div>
      )}
    </div>
  );
}
