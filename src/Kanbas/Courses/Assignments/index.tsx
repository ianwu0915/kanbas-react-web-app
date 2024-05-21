import "./style.css"
import { TiDocumentText } from "react-icons/ti";
import {

  BsThreeDots,
  BsPlus,
  BsChevronDown,
  BsGripVertical,
} from "react-icons/bs";
import LessonControlButtons from "./LessonControlButtons";

export default function Assignments() {
  return (
    <div id="wd-assignments">
      <div className="d-flex justify-content-between mb-5">
        <input
          id="wd-search-assignment"
          className="form-control me-2"
          placeholder="Search for Assignments"
          style={{ maxWidth: "300px" }} // Optional: To control the width of the input
        />
        <div className="d-flex">
          <button
            id="wd-add-assignment-group"
            className="btn btn-outline-secondary me-2"
          >
            + Group
          </button>
          <button id="wd-add-assignment" className="btn btn-danger">
            + Assignment
          </button>
        </div>
      </div>

      <ul id="wd-assignment-list" className="list-group rounded-0">
        <div className="wd-title d-flex align-items-center p-3 bg-light">
          <BsGripVertical className="me-2 fs-5" />
          <BsChevronDown className="me-2 fs-5" />
          <span className="flex-grow-1">ASSIGNMENTS</span>
          <div className="badge-container ms-2">
            <span className="badge bg-light text-dark border me-5">40% of Total</span>
        </div>
          <LessonControlButtons />
        </div>
        <li className="wd-assignment-list-item list-group-item">
          <div className="d-flex align-items-center">
            <BsGripVertical className="me-2 fs-5" />
            <div className="flex-grow-1">
              <a
                className="wd-assignment-link d-block"
                href="#/Kanbas/Courses/1234/Assignments/123"
              >
                A1 - ENV + HTML
              </a>
              <p className="mb-0">
              <span className="red-text">Multiple Modules</span> | <strong>Not available until</strong> May 6 at
                12:00am | <strong>Due</strong> May 13 at 11:59pm | 100 pts
              </p>
            </div>
            <LessonControlButtons />
          </div>
        </li>
        <li className="wd-assignment-list-item list-group-item">
          <div className="d-flex align-items-center">
            <BsGripVertical className="me-2 fs-5" />
            <div className="flex-grow-1">
              <a
                className="wd-assignment-link d-block"
                href="#/Kanbas/Courses/1234/Assignments/123"
              >
                A2 - CSS + BOOTSTRAP
              </a>
              <p className="mb-0">
              <span className="red-text">Multiple Modules</span> | <strong>Not available until</strong> May 13
                at 12:00am | <strong>Due</strong> May 20 at 11:59pm | 100 pts
              </p>
            </div>
            <LessonControlButtons />
          </div>
        </li>
        <li className="wd-assignment-list-item list-group-item">
          <div className="d-flex align-items-center">
            <BsGripVertical className="me-2 fs-5" />
            <div className="flex-grow-1">
              <a
                className="wd-assignment-link d-block"
                href="#/Kanbas/Courses/1234/Assignments/123"
              >
                A3 - JAVASCRIPT + REACT
              </a>
              <p className="mb-0">
              <span className="red-text">Multiple Modules</span> | <strong>Not available until</strong> May 20
                at 12:00am | <strong>Due</strong> May 27 at 11:59pm | 100 pts
              </p>
            </div>
            <LessonControlButtons />
          </div>
        </li>
      </ul>
    </div>
  );
}
