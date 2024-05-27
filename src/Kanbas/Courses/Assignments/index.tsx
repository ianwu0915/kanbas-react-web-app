import "./style.css";
import { TiDocumentText } from "react-icons/ti";
import {
  BsThreeDots,
  BsPlus,
  BsChevronDown,
  BsGripVertical,
} from "react-icons/bs";
import { MdOutlineAssignment } from "react-icons/md";
import LessonControlButtons from "./LessonControlButtons";
import { IoEllipsisVertical } from "react-icons/io5";
import { assignments } from "../../Database";
import { useParams } from "react-router";

export default function Assignments() {
  const { cid } = useParams();
  return (
    <div id="wd-assignments" className="me-4">
      <div className="d-flex justify-content-between mb-5 ms-5">
        <input
          id="wd-search-assignment"
          className="form-control me-2"
          placeholder="Search for Assignments"
          style={{ maxWidth: "300px" }} // Optional: To control the width of the input
        />
        <div className="d-flex">
          <button
            id="wd-add-assignment-group"
            className="btn btn-outline-secondary me-2 float-end"
          >
            <BsPlus className="fs-4 mb-1" />
            Group
          </button>
          <button id="wd-add-assignment" className="btn btn-danger float-end">
            <BsPlus className="fs-4 mb-1" />
            Assignment
          </button>
        </div>
      </div>

      <ul id="wd-assignment-list" className="list-group rounded-0 ms-5">
        <div className="wd-title d-flex align-items-center p-3 bg-secondary">
          <BsGripVertical className="me-2 fs-5" />
          <BsChevronDown className="me-2 fs-5" />
          <span className="flex-grow-1">ASSIGNMENTS</span>
          <div className="badge-container ms-2">
            <span className="badge bg-secondary text-dark border me-1 fs-6">
              40% of Total
            </span>
            <BsPlus className="fs-4 mb-1" />
          </div>
          <IoEllipsisVertical className="fs-4" />
        </div>
        {assignments
          .filter((assignment) => assignment.course === cid)
          .map((assignment) => (
            <li className="wd-assignment-list-item list-group-item">
              <div className="d-flex align-items-center">
                <BsGripVertical className="me-2 fs-5" />
                <MdOutlineAssignment
                  className="me-3"
                  size={23}
                  style={{ color: "green" }}
                />
                <div className="flex-grow-1 w-50">
                  <a
                    className="wd-assignment-link d-block"
                    href="#/Kanbas/Courses/1234/Assignments/123"
                  >
                    {assignment.title}
                  </a>
                  <p className="mb-0">
                    <span className="text-danger">Multiple Modules</span> |{" "}
                    <strong>Not available until</strong> May 20 at 12:00am |{" "}
                    <strong>Due</strong> May 27 at 11:59pm | 100 pts
                  </p>
                </div>
                <LessonControlButtons />
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}
