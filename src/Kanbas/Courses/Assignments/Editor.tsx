import React from "react";
import { useParams } from "react-router";
import { assignments } from "../../Database";
import { Link } from "react-router-dom";

export default function AssignmentEditor() {
  const { cid, aid } = useParams();
  const assignment = assignments.find((assignment) => assignment._id === aid);

  return (
    <div id="wd-assignments-editor" className="container my-4">
      <div className="mb-4">
        <label htmlFor="wd-name" className="form-label">
          Assingment Name 
        </label>
        <input id="wd-name" className="form-control" value={assignment && assignment.title} />
      </div>

      <div className="mb-4">
        <label htmlFor="wd-description" className="form-label">
          Description
        </label>
        <textarea id="wd-description" className="form-control" rows={5}>
          {assignment && assignment.description}
        </textarea>
      </div>

      <div className="row mb-3">
        <div className="col-md-4 text-md-end">
          <label htmlFor="wd-points" className="form-label">
            Points
          </label>
        </div>
        <div className="col-md-8">
          <input id="wd-points" className="form-control" value={assignment?.points} />
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-md-4 text-md-end">
          <label htmlFor="wd-group" className="form-label">
            Assignment Group
          </label>
        </div>
        <div className="col-md-8">
          <select id="wd-group" className="form-select">
            <option value="ASSIGNMENTS">ASSIGNMENTS</option>
            {/* Add other groups as needed */}
          </select>
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-md-4 text-md-end">
          <label htmlFor="wd-display-grade-as" className="form-label">
            Display Grade as
          </label>
        </div>
        <div className="col-md-8">
          <select id="wd-display-grade-as" className="form-select">
            <option value="Percentage">Percentage</option>
            {/* Add other display options as needed */}
          </select>
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-md-4 text-md-end">
          <label htmlFor="wd-submission-type" className="form-label">
            Submission Type
          </label>
        </div>
        <div className=" col-md-8">
          <div className="border p-3">
            <select id="wd-submission-type" className="form-select">
              <option value="Online">Online</option>
              {/* Add other submission types as needed */}
            </select>
            <div className="p-1 mt-2">
              <label className="form-label">Online Entry Options</label>
              <div className="form-check">
                <input
                  type="checkbox"
                  id="wd-text-entry"
                  className="form-check-input"
                />
                <label htmlFor="wd-text-entry" className="form-check-label">
                  Text Entry
                </label>
              </div>
              <div className="form-check">
                <input
                  type="checkbox"
                  id="wd-website-url"
                  className="form-check-input"
                  defaultChecked
                />
                <label htmlFor="wd-website-url" className="form-check-label">
                  Website URL
                </label>
              </div>
              <div className="form-check">
                <input
                  type="checkbox"
                  id="wd-media-recordings"
                  className="form-check-input"
                />
                <label
                  htmlFor="wd-media-recordings"
                  className="form-check-label"
                >
                  Media Recordings
                </label>
              </div>
              <div className="form-check">
                <input
                  type="checkbox"
                  id="wd-student-annotation"
                  className="form-check-input"
                />
                <label
                  htmlFor="wd-student-annotation"
                  className="form-check-label"
                >
                  Student Annotation
                </label>
              </div>
              <div className="form-check">
                <input
                  type="checkbox"
                  id="wd-file-upload"
                  className="form-check-input"
                />
                <label htmlFor="wd-file-upload" className="form-check-label">
                  File Uploads
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-md-4 text-md-end">
          <label htmlFor="wd-assign-section" className="form-label">
            Assign
          </label>
        </div>
        <div className="col-md-8">
          <div className="border p-4 mt-2">
            <div className="row mb-3">
              <div className="col-md-2">
                <label htmlFor="wd-assign-to" className="form-label">
                  Assign to
                </label>
              </div>
              <div className="col-md-10">
                <input
                  id="wd-assign-to"
                  className="form-control"
                  value="Everyone"
                />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-2">
                <label htmlFor="wd-due-date" className="form-label">
                  Due
                </label>
              </div>
              <div className="col-md-10">
                <input
                  type="text"
                  id="wd-due-date"
                  className="form-control"
                  value={`${assignment?.dueDate}, ${assignment?.dueTime}`} 
                />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-2">
                <label htmlFor="wd-available-from" className="form-label">
                  Available from
                </label>
              </div>
              <div className="col-md-10">
                <input
                  type="text"
                  id="wd-available-from"
                  className="form-control"
                  value={`${assignment?.startDate}, ${assignment?.startTime}`}
                />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-2">
                <label htmlFor="wd-available-until" className="form-label">
                  Until
                </label>
              </div>
              <div className="col-md-10">
                <input
                  type="text"
                  id="wd-available-until"
                  className="form-control"
                  value={`${assignment?.dueDate}, ${assignment?.dueTime}`}
                />
              </div>
            </div>
            <Link to={`/Kanbas/Courses/${cid}/Assignments`} className="btn btn-danger float-end">
              Save
            </Link>
            <Link to={`/Kanbas/Courses/${cid}/Assignments`} className="btn btn-light me-2 float-end">
              Cancel
            </Link>
          
          </div>
        </div>
      </div>
    </div>
  );
}
