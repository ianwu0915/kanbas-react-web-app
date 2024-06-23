import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as questionClient from '../Questions/client';
import * as quizClient from '../client';
import * as client from './client';
import { useParams } from 'react-router-dom';
import QuestionCard from './QuestionCard';
import QuestionList from './QuestionList';

interface Quiz {
  _id: string;
  name: string;
  description: string;
}

interface Question {
  _id: string;
  title: string;
  type: string;
  points: number;
  questionText: string;
  choices: { text: string, correct: boolean }[];
}

interface Answer {
  question: string;
  answer: any;
  correct: boolean;
  points: number;
}

export default function QuizPreview() {
const navigate = useNavigate();
  const { qid } = useParams<{ qid: string }>();
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [studentId, setStudentId] = useState(''); 
  const [answers, setAnswers] = useState<Answer[]>([]);
  const currentUser = useSelector((state: any) => state.accountReducer.currentUser);

  useEffect(() => {
    const fetchQuizData = async () => {
      const quizData = await quizClient.findQuizById(qid as string);
      const questionsData = await questionClient.findQuestionsForQuiz(qid as string);
      setQuiz(quizData);
      setQuestions(questionsData);
      setStudentId(currentUser._id);
    };
    fetchQuizData();
  }, [qid]);

  const handleNext = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  const handlePrevious = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
  };

  const handleQuestionClick = (index: number) => {
    setCurrentQuestionIndex(index);
  };

  const handleAnswerChange = (questionId: string, answer: any) => {
    setAnswers((prevAnswers) => {
      const existingAnswerIndex = prevAnswers.findIndex((a) => a.question === questionId);
      const question = questions.find((q) => q._id === questionId);
      const correct = question?.choices.some((choice) => choice.text === answer && choice.correct) || false;
      const points = correct ? question?.points || 0 : 0;

      const newAnswer = {
        question: questionId,
        answer,
        correct,
        points,
      };

      if (existingAnswerIndex !== -1) {
        const updatedAnswers = [...prevAnswers];
        updatedAnswers[existingAnswerIndex] = newAnswer;
        return updatedAnswers;
      }
      return [...prevAnswers, newAnswer];
    });
  };

  const handleSubmit = async () => {
    const currentStudentId = studentId; // Replace with the actual ObjectId of the student
    const score = calculateScore(answers);

    const submission = {
      quiz: qid,
      student: studentId,
      answers: answers,
      score,
      attemptDate: new Date(),
    };

    await client.submitAnswers(submission);
    navigate(`summary`);
  };

  const calculateScore = (answers: Answer[]) => {
    // Calculate score logic
    return answers.reduce((total, answer) => total + answer.points, 0);
  };

  const getAnswerForQuestion = (questionId: string) => {
    const answer = answers.find((a) => a.question === questionId);
    return answer ? answer.answer : '';
  };

  return (
    <div className="container quiz-preview mt-4">
      <h1>Quiz Instructions</h1>
      <div className="row">
        <div className="col-md-8 mt-5">
          {questions.length > 0 && (
            <QuestionCard
              question={questions[currentQuestionIndex]}
              onNext={handleNext}
              onPrevious={handlePrevious}
              onAnswerChange={handleAnswerChange}
              isLastQuestion={currentQuestionIndex === questions.length - 1}
              isFirstQuestion={currentQuestionIndex === 0}
            //   answer={getAnswerForQuestion(questions[currentQuestionIndex]._id)}
            />
          )}
          {currentQuestionIndex === questions.length - 1 && (
            <button className="btn btn-primary mt-3" onClick={handleSubmit}>Submit Quiz</button>
          )}
        </div>
        <div className="col-md-3">
          <QuestionList questions={questions} onQuestionClick={handleQuestionClick} />
        </div>
      </div>
    </div>
  );
}
