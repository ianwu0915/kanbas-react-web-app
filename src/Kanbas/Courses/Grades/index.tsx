import React from "react";
import { Table, Form, Button, Dropdown } from "react-bootstrap";
import { FaUpload, FaDownload, FaCog } from "react-icons/fa";
import { LiaFileImportSolid, LiaFileExportSolid } from "react-icons/lia";
import './style.css'; // Import the custom CSS
import SearchBar from "./SearchBar";
import { CiFilter } from "react-icons/ci";
import { enrollments, grades, assignments, users } from "../../Database";
import { useParams } from "react-router-dom";

const getStudentName = (uid: string) => {
  const user = users.find(user => user._id === uid);
  return user ? `${user.firstName} ${user.lastName}` : 'N/A';
} 

const getGradeForStudent = (uid: string, aid: string) => {
  const grade = grades.find(grade => grade.student === uid && grade.assignment === aid);
  return grade ? `${grade.grade}%` : 'N/A';
}

export default function Grades() {

  const { cid } = useParams();

  // 課程所有作業
  const allassignments = assignments.filter((assignment) => assignment.course === cid);
  // 參與的人
  const courseEnrollments = enrollments.filter((enrollment) => enrollment.course === cid);

  return (
    <div className="container my-4">
      <div className="d-flex justify-content-end mb-3">
        <Button variant="outline-secondary" className="me-2 d-flex align-items-center">
          <LiaFileExportSolid className="me-1" /> Import
        </Button>
        <Dropdown>
          <Dropdown.Toggle variant="outline-secondary" id="dropdown-basic" className="d-flex align-items-center">
            <LiaFileImportSolid className="me-1" /> Export
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item href="#/action-1">Export as CSV</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Export as Excel</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Button variant="outline-secondary" className="ms-2 d-flex align-items-center">
          <FaCog />
        </Button>
      </div>
      <SearchBar />
      <button type="button" className="btn btn-light mb-3">
                <CiFilter className="me-1 fs-4" />
                <i className="bi bi-funnel"></i> Apply Filters
              </button>
      <div className="table-responsive">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th className ="text-start ps-4">Student Name</th>
              {allassignments.map((assignment) => (
              <th>{assignment.title}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {courseEnrollments.map((enrollment) => (
              <tr>
                <td className="text-start text-danger ps-4">{getStudentName(enrollment.user)}</td>
                {allassignments.map((assignment) => (
                  <td>{getGradeForStudent(enrollment.user, assignment._id)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}
