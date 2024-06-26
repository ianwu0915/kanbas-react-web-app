import CoursesNavigation from "./Navigation";
import Modules from "./Modules";
import Home from "./Home";
import Assignments from "./Assignments";
import Editor from "./Assignments/AssignmentEditor";
import Grades from "./Grades";
import PeopleTable from "./People/PeopleTable";
import Quizzes from "./Quizzes";
import { Navigate, Route, Routes, useParams, useLocation } from "react-router";
import { FaAlignJustify } from "react-icons/fa";
import { courses } from "../Database";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import QuizDetails from "./Quizzes/QuizDetails";
import QuizEditor from "./Quizzes/QuizEditor";
import QuizPreview from "./Quizzes/QuizPreview/QuizPreview";
import AttemptSummary from "./Quizzes/QuizPreview/AttemptSummary";

export default function Courses({ courses }: { courses: any[] }) {
  const { assignments } = useSelector((state: any) => state.assignmentsReducer);
  const [assignment, setAssignment] = useState({
    title: "",
    description: "",
    points: 100,
    startDate: "",
    dueDate: "",
  });
  const { cid, aid } = useParams();
  const course = courses.find((course) => course._id === cid);
  const { pathname } = useLocation();

  return (
    <div id="wd-courses">
      <h2 className="text-danger">
        <FaAlignJustify className="me-4 fs-4 mb-1" />
        {course && course.name} &gt; {pathname.split("/")[4]}
      </h2>
      <hr />
      <div className="d-flex">
        <div className="d-none d-md-block">
          <CoursesNavigation />
        </div>
        <div className="flex-fill">
          <Routes>
            <Route path="/" element={<Navigate to="Home" />} />
            <Route path="Home" element={<Home />} />
            <Route path="Modules" element={<Modules />} />
            <Route path="Assignments" element={<Assignments />} />
            <Route
              path="Assignments/Editor"
              element={
                <Editor
                  dialogTitle="Add Assignment"
                  assignment={assignment}
                  setAssignment={setAssignment}
                />
              }
            />
            <Route
              path="Assignments/Editor/:aid"
              element={
                <Editor
                  dialogTitle="Edit Assignment"
                  assignment={assignment}
                  setAssignment={setAssignment}
                />
              }
            />
            <Route path="People" element={<PeopleTable />} />
            <Route path="People/:uid" element={<PeopleTable />} />
            <Route path="Grades" element={<Grades />} />
            <Route path="Quizzes" element={<Quizzes />} />
            <Route path="Quizzes/:qid/detail" element={<QuizDetails />} />
            <Route path="Quizzes/:qid/editor" element={<QuizEditor />} />
            <Route path="Quizzes/editor" element={<QuizEditor />} />
            <Route path="Quizzes/:qid" element={<QuizPreview />} />
            <Route path="/Quizzes/:qid/summary" element={<AttemptSummary />} />

          </Routes>
        </div>
      </div>
    </div>
  );
}
