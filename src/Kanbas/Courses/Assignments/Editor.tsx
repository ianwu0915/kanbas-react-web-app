import React from "react";

export default function AssignmentEditor() {
  return (
    <div id="wd-assignments-editor" className="container my-4">
      <div className="mb-4">
        <label htmlFor="wd-name" className="form-label">
          Assignment Name
        </label>
        <input id="wd-name" className="form-control" value="A1 - ENV + HTML" />
      </div>

      <div className="mb-4">
        <label htmlFor="wd-description" className="form-label">
          Description
        </label>
        <textarea id="wd-description" className="form-control" rows={5}>
          The assignment is available online. Submit a link to the landing page
          of your Web application running on Netlify. The landing page should
          include the following: Your full name and section, Links to each of
          the lab assignments, Link to the Kanbas application, Links to all
          relevant source code repositories. The Kanbas application should
          include a link to navigate back to the landing page.
        </textarea>
      </div>

      <div className="row mb-3">
        <div className="col-md-4 text-md-end">
          <label htmlFor="wd-points" className="form-label">
            Points
          </label>
        </div>
        <div className="col-md-8">
          <input id="wd-points" className="form-control" value={100} />
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
        <div className="col-md-8">
          <select id="wd-submission-type" className="form-select">
            <option value="Online">Online</option>
            {/* Add other submission types as needed */}
          </select>
          <div className="border p-3 mt-2">
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
              <label htmlFor="wd-media-recordings" className="form-check-label">
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

      <div className="row mb-3">
        <div className="col-md-4 text-md-end">
          <label htmlFor="wd-assign-section" className="form-label">
            Assign
          </label>
        </div>
        <div className="col-md-8">
          <div className="border p-3 mt-2">
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
                  type="datetime-local"
                  id="wd-due-date"
                  className="form-control"
                  value="2024-05-13T23:59"
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
                  type="datetime-local"
                  id="wd-available-from"
                  className="form-control"
                  value="2024-05-06T00:00"
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
                  type="datetime-local"
                  id="wd-available-until"
                  className="form-control"
                  value="2024-05-20T00:00"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
