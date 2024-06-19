import { Link } from "react-router-dom";

export default function AllCourses({ courses }: { courses: any[] }) {
  return (
    <div id="wd-dashboard-enroll-courses" className="row">  
    <h2 id="wd-dashboard-published">
        Published Courses ({courses.length})
    </h2>{" "}
    <hr />
      <div className="row row-cols-1 row-cols-md-5 g-4">
        {courses.map((course) => (
          <div
            className="wd-dashboard-enroll-course col"
            style={{ width: "300px" }}
          >
            <Link
              to={`/Kanbas/Courses/${course.number}/Home`}
              className="text-decoration-none"
            >
              <div className="card rounded-3 overflow-hidden">
                <img
                  src={`/images/${course.image}`}
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
                      console.log("Edit course clicked");
                    }}
                    className="btn btn-warning me-2 float-end"
                  >
                    Enroll
                  </button>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
