import { useSelector, useDispatch } from "react-redux";
import { BsGripVertical } from "react-icons/bs";
import { FaSpaceAwesome } from "react-icons/fa6";
import { useParams } from "react-router";
import * as client from "./client";
import { useNavigate } from "react-router";

import { useState, useEffect } from "react";
import QuizTopPanel from "./QuizTopPanel";
import QuizContextMenu from "./QuizContextMenu";

export default function Modules() {
  const { cid } = useParams();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const [quizzes, setQuizzes] = useState([]);
  const navigate = useNavigate();

  const fetchQuizzes = async () => {
    const quizzes = await client.findQuizzesForCourse(cid as string);
    console.log("the new quizzes:", quizzes);
    if (currentUser.role === "STUDENT") {
      setQuizzes(quizzes.filter((quiz: any) => quiz.published));
    } else {
      setQuizzes(quizzes);
    }
  };

  const deleteQuiz = async (id: string) => {
    await client.deleteQuiz(id);
    fetchQuizzes();
  };

  const publishQuiz = async (quiz: any) => {
    quiz.published = !quiz.published;
    console.log("publishing quiz", quiz);
    await client.updateQuiz(quiz);
    fetchQuizzes();
  };

  const handleOnclick = (quiz: any) => {
    navigate(`${quiz._id}/summary`);
  };

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const getAvailabilityStatus = (availableDate: string, dueDate: string) => {
    const currentDate = new Date();
    const available = new Date(availableDate);
    const due = new Date(dueDate);

    if (currentDate < available) {
      return (
        <span>
          <strong>Not available until</strong>{" "}
          {available.toLocaleDateString("en-CA")}
        </span>
      );
    } else if (currentDate >= available && currentDate <= due) {
      return <strong>Available</strong>;
    } else {
      return <strong>Closed</strong>;
    }
  };

  return (
    <div id="wd-quizzes" className="me-4">
      <br />
      {currentUser.role === "FACULTY" && <QuizTopPanel />}
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
                <FaSpaceAwesome
                  className="fs-4 ms-3 me-2"
                  style={{ color: "green" }}
                />
              </div>
              <div
                className="flex-grow-1 w-50"
                onClick={() => {handleOnclick(quiz)}}
              >
                <span className="fs-4 fw-bolder">{quiz.name}</span>
                <p className="mb-0 fs-6">
                  <span className="ms-0 me-4">
                    {getAvailabilityStatus(quiz.availableDate, quiz.dueDate)}
                  </span>
                  <span className="ms-0">
                    <strong>Due</strong>{" "}
                    {new Date(quiz.dueDate).toLocaleDateString("en-CA")}
                  </span>
                  <span className="ms-4">{quiz.points} pts</span>
                </p>
              </div>
              {currentUser.role === "FACULTY" && (
                <QuizContextMenu
                  quiz={quiz}
                  deleteQuiz={deleteQuiz}
                  publishQuiz={publishQuiz}
                />
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
