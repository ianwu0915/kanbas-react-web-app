import { addAssignment } from "./AssignmentsReducer";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";

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
  const { cid } = useParams();
  const dispatch = useDispatch();
  const { assignments } = useSelector((state: any) => state.assignmentsReducer);

  return (
    <div
      id="wd-add-assignment-dialog"
      className="modal fade"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="staticBackdropLabel">
              {dialogTitle}{" "}
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
            ></button>
          </div>
          <div className="modal-body">
            <form>
              <div className="form-group">
                <label htmlFor="wd-assignment-title" className="form-label">
                  Assignment Title
                </label>
                <input
                  id="wd-assignment-title"
                  type="text"
                  className="form-control"
                  value={assignment.title}
                  placeholder="New Assignment Name"
                  onChange={(e) =>
                    setAssignment({ ...assignment, title: e.target.value })
                  }
                />
              </div>
              <div className="form-group mt-3">
                <label htmlFor="wd-assignment-title" className="form-label">
                  Assignment Description
                </label>
                <input
                  className="form-control"
                  value={assignment.description}
                  placeholder="New assignment Description"
                  onChange={(e) =>
                    setAssignment({
                      ...assignment,
                      description: e.target.value,
                    })
                  }
                />
              </div>

              <div className="form-group mt-3">
                <label htmlFor="wd-assignment-title" className="form-label">
                  Points
                </label>
                <input
                  className="form-control"
                  type="number"
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
              <div className="form-group mt-3">
                <label htmlFor="wd-assignment-title" className="form-label">
                  Available from
                </label>
                <input
                  className="form-control"
                  type="date"
                  value={assignment.startDate}
                  placeholder="100"
                  onChange={(e) =>
                    setAssignment({
                      ...assignment,
                      startDate: e.target.value,
                    })
                  }
                />
              </div>
              <div className="form-group mt-3">
                <label htmlFor="wd-assignment-title" className="form-label">
                  Due at
                </label>
                <input
                  className="form-control"
                  type="date"
                  value={assignment.dueDate}
                  placeholder="100"
                  onChange={(e) => {
                    
                    setAssignment({
                      ...assignment,
                      dueDate: e.target.value,
                    });
                }
                  }
                />
              </div>
            </form>
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Cancel{" "}
            </button>
            <button
              onClick={() => {
                dispatch(addAssignment({ ...assignment, course: cid }));
                console.log(assignment);
                console.log(assignments);
                // setAssignment({title: "", description: "", points: 0, "startDate": new Date(), dueDate: new Date()});
              }}
              type="button"
              data-bs-dismiss="modal"
              className="btn btn-danger"
            >
              Add assignment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
