import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "./GreenCheckMark";
import { GoCircleSlash } from "react-icons/go";
import { useParams } from "react-router";
import { useState } from "react";
import { Link } from "react-router-dom";
import { FaRegCheckCircle } from "react-icons/fa";



export default function QuizContextMenu({
  quiz,
  deleteQuiz,
  publishQuiz,
}: {
  quiz: any;
  deleteQuiz: (id: string) => void;
  publishQuiz: (quiz: any) => void;
}) {
  const { cid } = useParams();
  const [showDropdown, setShowDropdown] = useState(false);
  const toggleDropdown = () => setShowDropdown(!showDropdown);

  return (
    <div className="float-end">
      {quiz.published ? (
        // <GreenCheckmark quiz= {quiz} publish={() => publishQuiz(quiz)}/>
        <FaRegCheckCircle className="text-success" onClick={() => {
            publishQuiz(quiz);
          }}/>
      ) : (
        <GoCircleSlash className="text-danger" onClick={() => {
            publishQuiz(quiz);
          }} />
      )}

      <IoEllipsisVertical
        className="fs-4"
        onClick={toggleDropdown}
        style={{ cursor: "pointer" }}
      />

      {/* Dropdown Menu */}
      {showDropdown && (
        <ul
          className="dropdown-menu show"
          style={{ position: "absolute", right: 0 }}
        >
          {" "}
          {/* Adjust positioning as needed */}
          <li>
            <Link
              className="dropdown-item"
              to={`/Kanbas/Courses/${cid}/Quizzes/${quiz._id}/editor`}
            >
              Edit
            </Link>
          </li>
          <li>
            <button
              className="dropdown-item"
              onClick={() => {
                deleteQuiz(quiz._id);
                toggleDropdown();
              }}
            >
              Delete
            </button>
          </li>
          <li>
            <hr className="dropdown-divider" />
          </li>
          <li>
            <button
              className="dropdown-item"
              onClick={() => {
                publishQuiz(quiz);
                toggleDropdown();
              }}
            >
              {quiz.published ? "Unpublish" : "Publish"}
            </button>
          </li>
        </ul>
      )}
    </div>
  );
}
