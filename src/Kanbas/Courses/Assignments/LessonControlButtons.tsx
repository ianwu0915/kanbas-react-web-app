import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "./GreenCheckMark";
import { FaTrash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { deleteAssignment } from "./AssignmentsReducer";
export default function LessonControlButtons({assignmentId}: {assignmentId: string;}) {
  const dispatch = useDispatch();
  return (
    <div className="float-end ms-5">
      <FaTrash className="text-danger fs-4 me-3" onClick={() => dispatch(deleteAssignment(assignmentId))}/>
      <GreenCheckmark />
      <IoEllipsisVertical className="fs-4 ms-3" />
    </div>
);}
