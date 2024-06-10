import React, { useEffect } from "react";
import { useParams, useLocation } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addAssignment, updateAssignment } from "./AssignmentsReducer";

export default function AssignmentEditor({
  dialogTitle,
  assignment,
  setAssignment,
}: {
  dialogTitle: string;
  assignment: {
    title: string;
    description: string;
    points: number;
    startDate: string;
    dueDate: string;
  };
  setAssignment: (assignment: {
    title: string;
    description: string;
    points: number;
    startDate: string;
    dueDate: string;
  }) => void;
}) {
  const { cid, aid } = useParams();
  const location = useLocation();
  const dispatch = useDispatch();
  const { assignments } = useSelector((state: any) => state.assignmentsReducer);

  // if (aid) {
  //   const foundAssignment = assignments.find((assignment: any) => assignment._id === aid);
  //   if (foundAssignment) {
  //     setAssignment(foundAssignment);
  //   }
  //   else if (location.state && location.state.assignment) {
  //     setAssignment(location.state.assignment);
  //   }
  // }

  // useEffect to set the assignment from the state 
  useEffect(() => {
    if (aid) {
      const foundAssignment = assignments.find((assignment: any) => assignment._id === aid);
      if (foundAssignment) {
        setAssignment(foundAssignment);
      }
    // } else if (location.state && location.state.assignment) {
    //   setAssignment(location.state.assignment);
    }
  }, [aid, location.state, assignments, setAssignment]);

  // handleSave function to dispatch the addAssignment or updateAssignment action
  const handleSave = () => {
    if (aid) {
      dispatch(updateAssignment({ ...assignment, course: cid, _id: aid }));
      setAssignment({
        title: "",
        description: "",
        points: 100,
        startDate: "",
        dueDate: "",
      })
    } else {
      dispatch(addAssignment({ ...assignment, course: cid }));
    }
  };

  return (
    <div id="wd-assignments-editor" className="container my-4">
      <h2 className="mb-4">{dialogTitle}</h2>
      <div className="mb-4">
        <label htmlFor="wd-name" className="form-label">
          Assignment Name
        </label>
        <input
          id="wd-name"
          className="form-control"
          value={assignment.title}
          placeholder="New Assignment Name"
          onChange={(e) =>
            setAssignment({ ...assignment, title: e.target.value })
          }
        />
      </div>

      <div className="mb-4">
        <label htmlFor="wd-description" className="form-label">
          Description
        </label>
        <textarea
          id="wd-description"
          className="form-control"
          rows={5}
          placeholder="New assignment Description"
          value={assignment.description}
          onChange={(e) =>
            setAssignment({
              ...assignment,
              description: e.target.value,
            })
          }
        />
      </div>

      <div className="row mb-3">
        <div className="col-md-4 text-md-end">
          <label htmlFor="wd-points" className="form-label">
            Points
          </label>
        </div>
        <div className="col-md-8">
          <input
            id="wd-points"
            className="form-control"
            value={assignment.points}
            placeholder="100"
            onChange={(e) =>
              setAssignment({
                ...assignment,
                points: parseInt(e.target.value),
              })
            }
          />
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-md-4 text-md-end">
          <label htmlFor="wd-assign-section" className="form-label">
            Assign
          </label>
        </div>
        <div className="col-md-8">
          <div className="border p-5 mt-2 mb-2">
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
                  readOnly
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
                  type="date"
                  id="wd-due-date"
                  className="form-control"
                  value={assignment.dueDate}
                  onChange={(e) =>
                    setAssignment({
                      ...assignment,
                      dueDate: e.target.value,
                    })
                  }
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
                  type="date"
                  id="wd-available-from"
                  className="form-control"
                  value={assignment.startDate}
                  onChange={(e) =>
                    setAssignment({
                      ...assignment,
                      startDate: e.target.value,
                    })
                  }
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
                  type="date"
                  id="wd-available-until"
                  className="form-control"
                  value={assignment.dueDate}
                />
              </div>
            </div>
            <Link
              onClick={handleSave}
              to={`/Kanbas/Courses/${cid}/Assignments`}
              className="btn btn-danger float-end"
            >
              Save
            </Link>
            <Link
              to={`/Kanbas/Courses/${cid}/Assignments`}
              className="btn btn-light me-2 float-end"
            >
              Cancel
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
