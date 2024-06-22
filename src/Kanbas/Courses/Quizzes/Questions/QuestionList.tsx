import React from "react";
import { IoTrashOutline } from "react-icons/io5";
interface Question {
    quiz: string;
    title: string;
    type: string;
    points: number;
    questionText: string;
    choices: { text: string; correct: boolean }[];
    correctAnswer: string;
  }

export default function QuestionList({
  questions,
}: {
  questions: Question[];
}) {
  return (
    <div>
      {questions.map((question: any, index) => (
        <div key={index} className="card mb-3 mt-5">
          <div className="card-header d-flex justify-content-between align-items-center">
            <span className="fw-bold">Question</span>
            {/* <span className="float-end">{question.title}</span> */}
            <span className="float-end">{question.points} pts</span>
          </div>
          <div className="card-body">
            <span className="card-text">{question.questionText}</span>
            <button
              className="btn float-end"
              onClick={() => console.log("Delete question")}
            >
              <IoTrashOutline />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
