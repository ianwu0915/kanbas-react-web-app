import { IoEllipsisVertical } from "react-icons/io5";
import { BsPlus } from "react-icons/bs"; // Import the BsPlus icon
import GreenCheckmark from "./GreenCheckmark";

export default function LessonControlButtons() {
  return (
    <div className="float-end">
      <GreenCheckmark />
      <BsPlus className="fs-4 mx-2" /> {/* Add the BsPlus icon with some margin */}
      <IoEllipsisVertical className="fs-4" />
    </div>
  );
}
