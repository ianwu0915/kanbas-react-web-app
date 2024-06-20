import {Link} from "react-router-dom";
import { BsPlus } from "react-icons/bs"; // Import the BsPlus icon
import { useParams } from "react-router-dom";

export default function QuizTopPanel() {
    const { cid } = useParams();
    return (
        <div className="d-flex justify-content-between mb-5">
        <input
          id="wd-search-quiz"
          className="form-control me-2"
          placeholder="Search for Quiz"
          style={{ maxWidth: "300px" }} // Optional: To control the width of the input
        />
        <div className="d-flex">
          <Link
            to={`/Kanbas/Courses/${cid}/Quizzes/editor`}
            className="btn btn-danger float-end fs-5"
            // data-bs-toggle="modal"
            // data-bs-target="#wd-add-quiz-dialog"
          >
            <BsPlus className="fs-2 mb-1" />
            Quiz
          </Link>

          {/* <Link className="btn btn-secondary mx-2" to={`/Kanbas/Courses/${cid}/Quizzes/${qid}/editor`} >Edit</Link> */}
        </div>
      </div>
    );
    }