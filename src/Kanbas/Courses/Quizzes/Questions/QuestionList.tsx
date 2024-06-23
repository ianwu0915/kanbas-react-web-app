import React from "react";
import { IoTrashOutline } from "react-icons/io5";
import { useParams } from "react-router";
import { useNavigate } from "react-router";
import * as client from "./client";
interface Question {
    _id: string;
    quiz: string;
    title: string;
    type: string;
    points: number;
    questionText: string;
    choices: { text: string; correct: boolean }[];
    correctAnswer: string;
  }

export default function QuestionList({
  questions, setQuestion, setQuestions, setEditQuestion, setCreateQuestion,
}: {
  questions: Question[];
  setQuestion: (question: any) => void;
  setQuestions: (questions: Question[]) => void;
  setEditQuestion: (value: boolean) => void;
  setCreateQuestion: (value: boolean) => void;
}) {
  const { qid } = useParams();
  const navigate = useNavigate();
  const handleDelete = (index: number) => { 
    if (qid) {
    client.deleteQuestion(questions[index]._id as string);
    setQuestions(questions.filter((_, i) => i !== index));
    } else {
    setQuestions(questions.filter((_, i) => i !== index));
    }
  }
  
  const handleEdit = (index: number) => {
    setQuestion(questions[index]);
    setEditQuestion(true);
    setCreateQuestion(false);
  };

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
              className="btn btn-secondary float-end ms-2"
              onClick={() => handleDelete(index)}
            >
              <IoTrashOutline className="fs-5"/>
            </button>
            <button
              className="btn btn-secondary float-end fs-6"
              onClick={() => handleEdit(index)}
            >
              Edit
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
