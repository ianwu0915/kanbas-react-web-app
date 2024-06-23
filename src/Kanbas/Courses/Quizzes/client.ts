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

export const createQuiz = async (quiz: any) => {
    const response = await axios.post(`${REMOTE_SERVER}/api/quizzes`, quiz);
    console.log("response from createQuiz", response.data);
    return response.data;
}

export const updateQuiz = async (quiz: any) => {
    const response = await axios.put(`${REMOTE_SERVER}/api/quizzes/${quiz._id}`, quiz);
    console.log("response from updateQuiz", response.data);
    return response.data;
}

export const deleteQuiz = async (quizId: string) => {
    const response = await axios.delete(`${REMOTE_SERVER}/api/quizzes/${quizId}`);
    console.log("response from deleteQuiz", response.data);
    return response.data;
}