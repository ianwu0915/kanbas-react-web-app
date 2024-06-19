import React, { useState } from "react";
import { Link } from "react-router-dom";
import * as db from "../Database";
import { setCurrentUser } from "../Account/reducer";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { MdMessage } from "react-icons/md";
import randomImage from "../RandomImage";
import * as client from "../Courses/client";
import "./style.css";

export default function Dashboard({
  courses,
  course,
  setCourse,
  addNewCourse,
  deleteCourse,
  updateCourse,
}: {
  courses: any[];
  course: any;
  setCourse: (course: any) => void;
  addNewCourse: () => void;
  deleteCourse: (course: any) => void;
  updateCourse: () => void;
}) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  console.log("current user:", currentUser);
  const [userCourse, setUserCourse] = useState<any[]>([]);

  const fetchUserCourses = async () => {
    const courses = await client.fetchAllCoursesForUser(currentUser._id);
    console.log("courses", courses);
    setUserCourse(courses);
    // setCurrentUser({ ...currentUser, enrolledCourses: courses });
  };

  console.log("userCourse", userCourse);
  console.log("currentUser", currentUser);

  useEffect(() => {
    fetchUserCourses();
  }, [currentUser]);

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      {currentUser.role === "FACULTY" && (
        <>
          <h5>
            New Course
            <button
              className="btn btn-primary float-end"
              id="wd-add-new-course-click"
              onClick={addNewCourse}
            >
              Add
            </button>
            <button
              className="btn btn-warning float-end me-2"
              onClick={updateCourse}
              id="wd-update-course-click"
            >
              Update
            </button>
          </h5>
          <br />
          {/* add input element for each of fields in course state variable*/}
          <input
            value={course.name}
            className="form-control mb-2"
            onChange={(e) => setCourse({ ...course, name: e.target.value })}
          />
          <input
            value={course.number}
            className="form-control mb-2"
            onChange={(e) => setCourse({ ...course, number: e.target.value })}
          />
          <textarea
            value={course.description}
            className="form-control"
            onChange={(e) =>
              setCourse({ ...course, description: e.target.value })
            }
          />
          <hr />
        </>
      )}
      <br />
      {currentUser.role === "STUDENT" && (
        <Link
          to="/Kanbas/AllCourses"
          className="btn btn-primary float-start"
          id="wd-enroll-course-click"
        >
          Register Course
        </Link>
      )}
      <br />
      <hr />
      <h2 id="wd-dashboard-published">Your Courses ({courses.length})</h2>{" "}
      <hr />
      <div id="wd-dashboard-courses" className="row">
        <div className="row row-cols-1 row-cols-md-5 g-4">
          {userCourse.map((course) => (
            <div className="wd-dashboard-course col" style={{ width: "300px" }}>
              <Link
                to={`/Kanbas/Courses/${course.number}/Home`}
                className="text-decoration-none"
              >
                <div className="card rounded-3 overflow-hidden">
                  <img
                    src={`/images/${randomImage()}`}
                    height="{160}"
                    className="fixed-size-img"
                  />
                  <div className="card-body">
                    <span
                      className="wd-dashboard-course-link"
                      style={{
                        textDecoration: "none",
                        color: "navy",
                        fontWeight: "bold",
                      }}
                    >
                      {course.name}
                    </span>
                    <p
                      className="wd-dashboard-course-title card-text"
                      style={{ maxHeight: 53, overflow: "hidden" }}
                    >
                      {course.description}
                    </p>
                    <Link
                      to={`/Kanbas/Courses/${course._id}/Home`}
                      className="btn"
                    >
                      <MdMessage
                        style={{
                          width: "30px",
                          height: "30px",
                          paddingLeft: 0,
                        }}
                      />
                    </Link>
                    <button
                      onClick={(event) => {
                        event.preventDefault();
                        deleteCourse(course._id);
                      }}
                      className="btn btn-danger float-end"
                      id="wd-delete-course-click"
                    >
                      Delete
                    </button>
                    <button
                      id="wd-edit-course-click"
                      onClick={(event) => {
                        event.preventDefault();
                        setCourse(course);
                      }}
                      className="btn btn-warning me-2 float-end"
                    >
                      Edit
                    </button>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
