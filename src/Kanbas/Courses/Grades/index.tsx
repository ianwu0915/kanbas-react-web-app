import React from "react";
import { Table, Form, Button, Dropdown } from "react-bootstrap";
import { FaUpload, FaDownload, FaCog } from "react-icons/fa";
import { LiaFileImportSolid, LiaFileExportSolid } from "react-icons/lia";
import './style.css'; // Import the custom CSS

export default function Grades() {
  return (
    <div className="container my-4">
      <div className="d-flex justify-content-between mb-3">
        <div className="col-md-6">
          <Form.Group controlId="searchStudents">
            <Form.Label>Student Names</Form.Label>
            <div className="d-flex">
              <Form.Control type="text" placeholder="Search Students" className="me-2" />
            </div>
          </Form.Group>
        </div>
        <div className="col-md-6">
          <Form.Group controlId="searchAssignments">
            <Form.Label>Assignment Names</Form.Label>
            <Form.Control type="text" placeholder="Search Assignments" />
          </Form.Group>
        </div>
        
      </div>
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
      <Button variant="secondary mb-3">
                <i className="bi bi-funnel"></i> Apply Filters
              </Button>
      <div className="table-responsive">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Student Name</th>
              <th>A1 SETUP<br />Out of 100</th>
              <th>A2 HTML<br />Out of 100</th>
              <th>A3 CSS<br />Out of 100</th>
              <th>A4 BOOTSTRAP<br />Out of 100</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="text-danger">Jane Adams</td>
              <td>100%</td>
              <td>96.67%</td>
              <td>92.18%</td>
              <td>66.22%</td>
            </tr>
            <tr>
              <td className="text-danger">Christina Allen</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
            </tr>
            <tr>
              <td className="text-danger">Samreen Ansari</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
            </tr>
            <tr>
              <td className="text-danger">Han Bao</td>
              <td>100%</td>
              <td>100%</td>
              <td>
                <Form.Control
                  type="text"
                  defaultValue="88.03"
                  className="form-control"
                />
              </td>
              <td>98.99%</td>
            </tr>
            <tr>
              <td className="text-danger">Mahi Sai Srinivas Bobbili</td>
              <td>100%</td>
              <td>96.67%</td>
              <td>98.37%</td>
              <td>100%</td>
            </tr>
            <tr>
              <td className="text-danger">Siran Cao</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
            </tr>
          </tbody>
        </Table>
      </div>
    </div>
  );
}
