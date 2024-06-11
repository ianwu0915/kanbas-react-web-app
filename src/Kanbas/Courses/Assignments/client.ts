import axios from "axios";
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const COURSES_API = `${REMOTE_SERVER}/api/courses`;
const ASSIGNMENTS_API = `${REMOTE_SERVER}/api/assignments`;

export const findAssignmentsForCourse = async (courseId: string) => {
  const response = await axios
    .get(ASSIGNMENTS_API);
  return response.data;
};

export const createAssignment = async (courseId: string, assignment: any) => {
    console.log("new ass: ", assignment)
    console.log(`${COURSES_API}/${courseId}/assignments`) 
    const response = await axios.post( `${COURSES_API}/${courseId}/assignments`, assignment );
    console.log("response is:", response);
    console.log("response data is:", response.data);
    return response.data;
};
  

export const deleteAssignment = async (assignmentId: string) => {
  const response = await axios
    .delete(`${ASSIGNMENTS_API}/${assignmentId}`);
  return response.data;
};

export const updateAssignment = async (assignment: any) => {
    const response = await axios.
      put(`${ASSIGNMENTS_API}/${assignment._id}`, assignment);
    return response.data;
  };
  