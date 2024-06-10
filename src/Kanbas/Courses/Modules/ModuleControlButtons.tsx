import { IoEllipsisVertical } from "react-icons/io5";
import { BsPlus } from "react-icons/bs"; // Import the BsPlus icon
import { FaTrash } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import GreenCheckmark from "./GreenCheckmark";
import { useDispatch } from "react-redux";
import { editModule, deleteModule } from "./ModuleReducer";

export default function ModuleControlButtons({
  moduleId,
}: {
  moduleId: string;
}) {
  const dispatch = useDispatch();
  return (
    <div className="float-end">
      <FaPencil
        onClick={() => dispatch(editModule(moduleId))}
        className="text-primary me-3"
      />
      <FaTrash
        className="text-danger me-2 mb-1"
        onClick={() => dispatch(deleteModule(moduleId))}
      />
      <GreenCheckmark />
      <BsPlus className="fs-4 mx-2" />{" "}
      {/* Add the BsPlus icon with some margin */}
      <IoEllipsisVertical className="fs-4" />
    </div>
  );
}
