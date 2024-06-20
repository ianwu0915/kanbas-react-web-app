import axios from "axios";

const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const COURSES_API = `${REMOTE_SERVER}/api/courses`;

export const findQuizzesForCourse = async (courseId: string) => {
    const response = await axios.get(`${COURSES_API}/${courseId}/quizzes`);
    console.log("response from findQuizzesForCourse", response.data);
    return response.data;
}

export const findQuizById = async (quizId: string) => {
    const response = await axios.get(`${REMOTE_SERVER}/api/quizzes/${quizId}`);
    console.log("response from findQuizById", response.data);
    return response.data;
}