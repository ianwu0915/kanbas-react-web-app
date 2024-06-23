import axios from "axios";

const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const ANSWER_API = `${REMOTE_SERVER}/api/answers`;

export const findAnswersForQuestion = async (quizId: string, studentId: string) => {
    console.log("quizId", quizId);
    console.log("studentId", studentId);
    const response = await axios.get(`${REMOTE_SERVER}/api/${quizId}/answers/${studentId}`);
    console.log("response from findAnswersForQuestion", response.data);
    return response.data;
}

export const submitAnswers = async (answer: any) => {
    const response = await axios.post(`${ANSWER_API}`, answer);
    console.log("response from createAnswer", response.data);
    return response.data;
}

