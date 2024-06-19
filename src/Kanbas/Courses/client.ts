import axios from "axios";
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const COURSES_API = `${REMOTE_SERVER}/api/courses`;
export const fetchAllCourses = async () => {
  const { data } = await axios.get(COURSES_API);
  return data;
};

export const createCourse = async (course: any) => {
  console.log("course", course);
  delete course._id;
  const response = await axios.post(COURSES_API, course);
  return response.data;
};

export const deleteCourse = async (id: string) => {
  const response = await axios.delete(`${COURSES_API}/${id}`);
  return response.data;
};

export const updateCourse = async (course: any) => {
  console.log("course", course.name);
  const name = course.name;
  const response = await axios.put(`${COURSES_API}/${name}`, course);
  return response.data;
};

export const fetchAllCoursesForUser = async (userId: string) => {
  console.log("userId", userId);
  const response = await axios.get(`${REMOTE_SERVER}/api/users/${userId}/courses`);
  console.log("response", response.data);
  return response.data;
}

export const registerCourse = async (userId: string, courseId: string) => {
  const response = await axios.post(`${REMOTE_SERVER}/api/users/${userId}/register/${courseId}`);
  return response.data;
}
