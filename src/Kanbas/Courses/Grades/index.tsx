import React from "react";
import { Table, Form, Button, Dropdown } from "react-bootstrap";
import { FaUpload, FaDownload, FaCog } from "react-icons/fa";
import { LiaFileImportSolid, LiaFileExportSolid } from "react-icons/lia";
import './style.css'; // Import the custom CSS
import SearchBar from "./SearchBar";
import { CiFilter } from "react-icons/ci";

export default function Grades() {
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
              <th>Student Name</th>
              <th>A1 SETUP<br />Out of 100</th>
              <th>A2 HTML<br />Out of 100</th>
              <th>A3 CSS<br />Out of 100</th>
              <th>A4 BOOTSTRAP<br />Out of 100</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="text-start text-danger ps-4">Jane Adams</td>
              <td>100%</td>
              <td>96.67%</td>
              <td>92.18%</td>
              <td>66.22%</td>
            </tr>
            <tr>
              <td className="text-start text-danger ps-4">Christina Allen</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
            </tr>
            <tr>
              <td className="text-start text-danger ps-4">Samreen Ansari</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
            </tr>
            <tr>
              <td className="text-start text-danger ps-4">Han Bao</td>
              <td>100%</td>
              <td>100%</td>
              <td>
                <Form.Control
                  type="text"
                  defaultValue="88.03"
                  className="form-control text-center"
                />
              </td>
              <td>98.99%</td>
            </tr>
            <tr>
              <td className="text-start text-danger ps-4">Mahi Sai Srinivas Bobbili</td>
              <td>100%</td>
              <td>96.67%</td>
              <td>98.37%</td>
              <td>100%</td>
            </tr>
            <tr>
              <td className="text-start text-danger ps-4">Siran Cao</td>
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
