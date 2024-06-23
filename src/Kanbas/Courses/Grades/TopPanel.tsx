import { Button, Dropdown } from "react-bootstrap";
import { FaCog } from "react-icons/fa";
import { LiaFileImportSolid, LiaFileExportSolid } from "react-icons/lia";
export default function TopPanel() {
    return (
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
    );
}