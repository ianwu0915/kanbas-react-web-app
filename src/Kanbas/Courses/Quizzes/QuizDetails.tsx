import React from "react";
import { useParams } from "react-router";
import { useState, useEffect } from "react";
import * as client from "./client";
import "./style.css";

export default function QuizDetails() {
  const { qid } = useParams();
  const [quiz, setQuiz] = useState({
    courseNumber: "",
    name: "",
    quizType: "",
    points: 0,
    assignmentGroup: "",
    shuffleAnswers: false,
    timeLimit: 0,
    multipleAttempts: false,
    howManyAttempts: 0,
    showCorrectAnswers: "",
    accessCode: "",
    oneQuestionAtATime: false,
    webcamRequired: false,
    lockQuestionsAfterAnswering: false,
    dueDate: new Date(),
    availableDate: new Date(),
    untilDate: new Date(),
  });

  const fetchQuiz = async () => {
    const quiz = await client.findQuizById(qid as string);
    setQuiz(quiz);
  };

  useEffect(() => {
    fetchQuiz();
  }, [quiz]);

  if (!quiz) {
    return <div>Loading...</div>;
  }

  return (
    <div className="quiz-info w-75">
      <h2 className ="fw-bold fs-1 ms-5"> {quiz.name}</h2>
      <br />
      <table className="details">
        <tbody>
          <tr>
            <td>
              <strong>Quiz Type:</strong>
            </td>
            <td>{quiz.quizType}</td>
          </tr>
          <tr>
            <td>
              <strong>Points:</strong>
            </td>
            <td>{quiz.points}</td>
          </tr>
          <tr>
            <td>
              <strong>Assignment Group:</strong>
            </td>
            <td>{quiz.assignmentGroup}</td>
          </tr>
          <tr>
            <td>
              <strong>Shuffle Answers:</strong>
            </td>
            <td>{quiz.shuffleAnswers ? "Yes" : "No"}</td>
          </tr>
          <tr>
            <td>
              <strong>Time Limit:</strong>
            </td>
            <td>{quiz.timeLimit} Minutes</td>
          </tr>
          <tr>
            <td>
              <strong>Multiple Attempts:</strong>
            </td>
            <td>{quiz.multipleAttempts ? "Yes" : "No"}</td>
          </tr>
          <tr>
            <td>
              <strong>How Many Attempts:</strong>
            </td>
            <td>{quiz.howManyAttempts}</td>
          </tr>
          <tr>
            <td>
              <strong>Show Correct Answers:</strong>
            </td>
            <td>{quiz.showCorrectAnswers}</td>
          </tr>
          <tr>
            <td>
              <strong>Access Code:</strong>
            </td>
            <td>{quiz.accessCode}</td>
          </tr>
          <tr>
            <td>
              <strong>One Question at a Time:</strong>
            </td>
            <td>{quiz.oneQuestionAtATime ? "Yes" : "No"}</td>
          </tr>
          <tr>
            <td>
              <strong>Webcam Required:</strong>
            </td>
            <td>{quiz.webcamRequired ? "Yes" : "No"}</td>
          </tr>
          <tr>
            <td>
              <strong>Lock Questions After Answering:</strong>
            </td>
            <td>{quiz.lockQuestionsAfterAnswering ? "Yes" : "No"}</td>
          </tr>
        </tbody>
      </table>
      <br />
      <div className="quiz-info" />
      <div className="date-info">
        <table>
          <thead>
            <tr>
              <th>Due</th>
              <th>For</th>
              <th>Available from</th>
              <th>Until</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{new Date(quiz.dueDate).toLocaleString()}</td>
              <td>Everyone</td>
              <td>{new Date(quiz.availableDate).toLocaleString()}</td>
              <td>{new Date(quiz.untilDate).toLocaleString()}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
