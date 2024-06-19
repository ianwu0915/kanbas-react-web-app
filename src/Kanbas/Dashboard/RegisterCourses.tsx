import { Link, useNavigate } from "react-router-dom";
import * as client from "../Courses/client";
import { useSelector, useDispatch } from "react-redux";

import { setCurrentUser } from "../Account/reducer";
import randomImage from "../RandomImage";

export default function RegisterCourses({ courses }: { courses: any[] }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const handleEnrollCourse = async (courseId: string) => {
    console.log("Enroll course clicked", courseId);
    console.log("currentUser", currentUser.enrolledCourses);
    if (
      currentUser.enrolledCourses.find((c: any) => c.courseId === courseId)
    ) {
      console.log("Already enrolled in course", courseId);
      // show an alert message
      alert("You are already enrolled in this course");
      return;
    }

    const response = await client.registerCourse(currentUser._id, courseId);
    console.log("response", response);
    const newUserCourses = [...currentUser.enrolledCourses, response];
    const newCurrentUser = { ...currentUser, enrolledCourses: newUserCourses };
    dispatch(setCurrentUser(newCurrentUser));
    navigate("/Kanbas/Dashboard");
    
  };

  return (
    <div id="wd-dashboard-enroll-courses" className="row">
      <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2>{" "}
      <hr />
      <div className="row row-cols-1 row-cols-md-5 g-4">
        {courses.map((course) => (
          <div
            className="wd-dashboard-enroll-course col"
            style={{ width: "300px" }}
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
                  className="wd-dashboard-enroll-course-title card-text"
                  style={{ maxHeight: 53, overflow: "hidden" }}
                >
                  {course.description}
                </p>

                <button
                  id="wd-enroll-course-click"
                  onClick={(event) => {
                    event.preventDefault();
                    handleEnrollCourse(course._id);
                  }}
                  className="btn btn-warning me-2 float-end"
                >
                  Enroll
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
