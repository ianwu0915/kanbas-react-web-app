import { FaCheckCircle } from "react-icons/fa";
import { FaCircle } from "react-icons/fa";
export default function GreenCheckmark({
  quiz,
  publish,
}: {
  quiz: any;
  publish: (quiz: any) => void;
}) {
  {
    return (
      <span className="me-1 position-relative" onClick ={()=> publish(quiz)}>
        <FaCheckCircle
          style={{ top: "2px" }}
          className="text-success me-1 position-absolute fs-4"
        />
        <FaCircle className="text-white me-1 fs-6" />
      </span>
    );
  }
}
