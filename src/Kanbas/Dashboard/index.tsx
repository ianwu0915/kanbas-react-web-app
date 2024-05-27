import "./style.css";
import { MdMessage } from "react-icons/md";

export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses (12)</h2> <hr />
      <div id="wd-dashboard-courses" className="row">
        <div className="row row-cols-1 row-cols-md-5 g-4">
          {[
            {
              image: "/images/webdev.png",
              title: "CS5610 Web Development",
              subtitle: "CS5610.12414.202406",
              term: "202410_2 Summer Full 2024 Semester",
              link: "#/Kanbas/Courses/1234/Home",
            },
            {
              image: "/images/algo.png",
              title: "CS5800 Algorithm",
              subtitle: "CS5800.12414.202406",
              term: "202410_2 Summer Full 2024 Semester",
              link: "#/Kanbas/Courses/1234/Home",
            },
            {
              image: "/images/cloud.png",
              title: "CS5710 Cloud Computing",
              subtitle: "CS5710.12414.202406",
              term: "202410_2_Summer Full 2024 Semester",
              link: "#/Kanbas/Courses/1234/Home",
            },
            {
              image: "/images/mobile-app.png",
              title: "CS5520 Mobile App Development",
              subtitle: "CS5520.12414.202406",
              term: "202410_2_Summer Full 2024 Semester",
              link: "#/Kanbas/Courses/1234/Home",
            },
            {
              image: "/images/sysdesign.png",
              title: "CS5310 System Design",
              subtitle: "CS5310.12414.202406",
              term: "202410_2_Summer Full 2024 Semester",
              link: "#/Kanbas/Courses/1234/Home",
            },
            {
              image: "/images/python.png",
              title: "CS5001 Python Programming",
              subtitle: "CS5001.12414.202406",
              term: "202410_2_Summer Full 2024 Semester",
              link: "#/Kanbas/Courses/1234/Home",
            },
            {
              image: "/images/ood.png",
              title: "CS5004 Object Oriented Programming",
              subtitle: "CS5004.12414.202406",
              term: "202410_2_Summer Full 2024 Semester",
              link: "#/Kanbas/Courses/1234/Home",
            },
          ].map((course, index) => (
            <div key={index} className="wd-dashboard-course col" style={{ width: "300px" }}>
              <div className="card shadow mb-4">
                <img src={course.image} className="fixed-size-img" />
                <div className="card-body">
                  <a className="wd-dashboard-course-link fs-3" href={course.link}>
                    <h3 className="wd-dashboard-course-title text-truncate-ellipsis">
                      <span>{course.title}</span>
                    </h3>
                    <div className="wd-dashboard-course-subtitle text-truncate-ellipsis">
                      <span>{course.subtitle}</span>
                    </div>
                    <div className="wd-dashboard-course-term text-truncate-ellipsis">
                      {course.term}
                    </div>
                  </a>
                  <a href={course.link} className="btn">
                    <MdMessage style={{ width: "30px", height: "30px", paddingLeft: 0 }} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
