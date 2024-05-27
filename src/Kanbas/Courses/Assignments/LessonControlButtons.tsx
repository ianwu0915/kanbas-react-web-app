import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "./GreenCheckMark";
export default function LessonControlButtons() {
  return (
    <div className="float-end ms-5">
      <GreenCheckmark />
      <IoEllipsisVertical className="fs-4 ms-3" />
    </div>
);}
