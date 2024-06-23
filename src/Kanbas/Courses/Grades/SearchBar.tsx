import Form from "react-bootstrap/Form";
import "./style.css";
import { IoIosSearch } from "react-icons/io";
export default function SearchBar() {
  return (
    <div className="row d-flex align-items-center">
      <div className="col-md-6">
        <label htmlFor="searchStudents" className="fw-bold fs-5 mb-2 ms-1">
          Student Names
        </label>
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text rounded-0" id="basic-addon1">
              <IoIosSearch style={{ fontSize: "1.5rem" }} />
            </span>
          </div>
          <input
            type="text"
            className="form-control"
            id="searchStudents"
            placeholder="Search Students"
            aria-label="Username"
            aria-describedby="basic-addon1"
          />
        </div>
      </div>
      <div className="col-md-6">
        <label htmlFor="searchStudents" className="fw-bold fs-5 mb-2 ms-1">
          Assignment Names
        </label>
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text rounded-0" id="basic-addon1">
              <IoIosSearch style={{ fontSize: "1.5rem" }} />
            </span>
          </div>
          <input
            type="text"
            className="form-control"
            id="searchStudents"
            placeholder="Search Assignments"
            aria-describedby="basic-addon1"
          />
        </div>
      </div>
      
    
    </div>
  );
}
