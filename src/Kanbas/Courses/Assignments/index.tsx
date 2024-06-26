import "./style.css";
import { BsPlus, BsChevronDown, BsGripVertical } from "react-icons/bs";
import { MdOutlineAssignment } from "react-icons/md";
import LessonControlButtons from "./LessonControlButtons";
import { IoEllipsisVertical } from "react-icons/io5";
import { useParams, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  setAssignments,
  addAssignment,
  deleteAssignment,
  updateAssignment,
} from "./AssignmentsReducer";
import * as client from "./client";
import { useDispatch } from "react-redux";

export default function Assignments() {
  const { cid } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const dispatch = useDispatch();
  // const [assignment, setAssignment] = useState({
  //   title: "",
  //   description: "",
  //   points: 100,
  //   startDate: "",
  //   dueDate: "",
  // });

  const { assignments } = useSelector((state: any) => state.assignmentsReducer);

  const fetchAssignments = async () => {
    const assignments = await client.findAssignmentsForCourse(cid as string);
    console.log("cid:", cid);
    dispatch(setAssignments(assignments));
    console.log("the new assignments:", assignments);
    console.log("current user:", currentUser);  
  };

  const handleNavigate = (assignment: any) => {
    navigate(`/Kanbas/Courses/${cid}/Assignments/Editor/${assignment._id}`, {
      state: { assignment },
    });
  };

  useEffect(() => {
    fetchAssignments();
  }, [assignments.length]);

  return (
    <div id="wd-assignments" className="me-4">
      <div className="d-flex justify-content-between mb-5 ms-5">
        <input
          id="wd-search-assignment"
          className="form-control me-2"
          placeholder="Search for Assignments"
          style={{ maxWidth: "300px" }} // Optional: To control the width of the input
        />
        {currentUser.role === "FACULTY" && (
          <div className="d-flex">
            <button
              id="wd-add-assignment-group"
              className="btn btn-outline-secondary me-2 float-end"
            >
              <BsPlus className="fs-4 mb-1" />
              Group
            </button>
            <Link
              to="/Kanbas/Courses/RS101/Assignments/Editor"
              className="btn btn-danger float-end"
              // data-bs-toggle="modal"
              // data-bs-target="#wd-add-assignment-dialog"
            >
              <BsPlus className="fs-4 mb-1" />
              Assignment
            </Link>
          </div>
        )}
      </div>

      <ul id="wd-assignment-list" className="list-group rounded-0 ms-5" style={{ border: '1px solid black' }}>
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
          .filter((assignment: any) => assignment.course === cid)
          .map((assignment: any) => (
            <li className="wd-assignment-list-item list-group-item">
              <div className="d-flex align-items-center">
                <BsGripVertical className="me-2 fs-5" />
                <MdOutlineAssignment
                  className="me-3"
                  size={23}
                  style={{ color: "green" }}
                />
                <div
                  className="flex-grow-1 w-50"
                  onClick={() => handleNavigate(assignment)}
                >
                  <button
                    className="wd-assignment-link d-block btn btn-link text-start p-0"
                    // onClick={() => handleNavigate(assignment)}
                  >
                    {assignment.title}
                  </button>
                  <p className="mb-0">
                    <span className="text-danger">Multiple Modules</span> |{" "}
                    <strong>Not available until</strong> {assignment.startDate}{" "}
                    at {assignment.startTime} | <strong>Due</strong>{" "}
                    {assignment.dueDate} at {assignment.dueTime} |{" "}
                    {assignment.points} pts
                  </p>
                </div>
                <LessonControlButtons assignmentId={assignment._id} />
              </div>
            </li>
          ))}
      </ul>
      {/* <AssignmentEditor
        dialogTitle="Add Assignment"
        assignment={assignment}
        setAssignment={setAssignment}
      /> */}
    </div>
  );
}
