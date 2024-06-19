import { useSelector, useDispatch } from "react-redux";
import { BsGripVertical } from "react-icons/bs";
import { FaSpaceAwesome } from "react-icons/fa6";
import { useParams } from "react-router";
import * as client from "./client";

import { useState, useEffect } from "react";

export default function Modules() {
  const { cid } = useParams();
  const [quiz, setQuiz] = useState("");
  const [quizzes, setQuizzes] = useState([]);

  const fetchQuizzes = async () => {
    const quizzes = await client.findQuizzesForCourse(cid as string);
    console.log("the new quizzes:", quizzes);
    setQuizzes(quizzes);
  };

  useEffect(() => {
    fetchQuizzes();
  }, []);

  return (
    <div id="wd-quizzes" className="me-4">
      <br />
      <br />
      <br />
      <br />
      <ul id="wd-quizzes" className="list-group rounded-0">
        <div>
          <li className="wd-quiz list-group-item p-4 fs-4 fw-bold border-gray bg-secondary">
            Quizzes
          </li>
        </div>
        {quizzes.map((quiz: any) => (
          <li className="wd-lesson list-group-item p-3 ps-1 fs-4">
            <div className="d-flex align-items-center">
              <div className="icon-block me-3">
                <FaSpaceAwesome className="fs-4 ms-3 me-2" style={{ color: "green" }}/>
              </div>
              <div className="text-block">
                <span className ="fs-4 fw-bolder">{quiz.name}</span>
                <p className="mb-0 fs-6">
                    <span className="ms-0 me-4"> 
                        <strong>Not available until</strong> {new Date(quiz.availableDate).toLocaleDateString("en-CA")}
                    </span>
                  <span className="ms-0">
                    Due {new Date(quiz.dueDate).toLocaleDateString("en-CA")}  
                  </span>
                  <span className="ms-4">{quiz.points} pts</span>
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
