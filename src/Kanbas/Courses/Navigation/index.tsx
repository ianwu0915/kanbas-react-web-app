import "./index.css";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
export default function CoursesNavigation() {
  const links = [
    "Home",
    "Modules",
    "Piazza",
    "Zoom",
    "Assignments",
    "Quizzes",
    "People",
    "Grades",
  ];
  const { pathname } = useLocation();
  
  return (
    <div id="wd-courses-navigation" className="list-group fs-5 rounded-0 me-5">
      {links.map((link) => (
        <Link
          key={link}
          to={link}
          className={`list-group-item text-danger border border-0 ${pathname.includes(link) ? "active text-black" : ""}`}>
          {link}
        </Link>
      ))}
    </div>
  );
}
