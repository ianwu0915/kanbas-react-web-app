import axios from "axios";

const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const QUESTIONS_API = `${REMOTE_SERVER}/api/questions`;

export const findQuestionsForQuiz = async (quizId: string) => {
    console.log("finding questions for quizId", quizId);
    const response = await axios.get(`${REMOTE_SERVER}/api/${quizId}/questions`);
    console.log("response from findQuestionsForQuiz", response.data);
    return response.data;
}

export const findQuestionById = async (questionId: string) => {
    const response = await axios.get(`${QUESTIONS_API}/${questionId}`);
    console.log("response from findQuestionById", response.data);
    return response.data;
}

export const createQuestion = async (question: any) => {
    const response = await axios.post(`${QUESTIONS_API}`, question);
    console.log("response from createQuestion", response.data);
    return response.data;
}

export const updateQuestion = async (question: any) => {
    const response = await axios.put(`${QUESTIONS_API}/${question._id}`, question);
    console.log("response from updateQuestion", response.data);
    return response.data;
}

export const deleteQuestion = async (questionId: string) => {
    const response = await axios.delete(`${QUESTIONS_API}/${questionId}`);
    console.log("response from deleteQuestion", response.data);
    return response.data;
}





