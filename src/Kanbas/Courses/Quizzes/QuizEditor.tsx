import React, { useEffect } from "react";
import { useParams } from "react-router";
import { useState } from "react";
import { Link } from "react-router-dom";
import * as client from "./client";
import * as questionClient from "./Questions/client";
import QuestionEditor from "./Questions/UpdateQuestionEditor";
import NewQuestionEditor from "./Questions/NewQuestionEditor";
import QuestionList from "./Questions/QuestionList";
import { FaPlus } from "react-icons/fa";

export default function QuizEditor() {
  const { cid, qid } = useParams();
  const [quiz, setQuiz] = useState({
    courseNumber: cid as string,
    name: "",
    description: "",
    quizType: "Graded Quiz",
    points: 0,
    assignmentGroup: "Quizzes",
    shuffleAnswers: true,
    timeLimit: 20,
    multipleAttempts: false,
    howManyAttempts: 0,
    showCorrectAnswers: "Immediately",
    accessCode: "",
    oneQuestionAtATime: true,
    webcamRequired: false,
    lockQuestionsAfterAnswering: false,
    dueDate: new Date(),
    availableDate: new Date(),
    untilDate: new Date(),
    published: false,
  });

  // interface Question {
  //   quiz: string;
  //   title: string;
  //   type: string;
  //   points: number;
  //   questionText: string;
  //   choices: {text: string, correct: boolean}[],
  //   correctAnswer: string;
  // }

 const [questions, setQuestions] = useState<any[]>([]);

 const fetchQuestions = async () => {
  if (qid) {
    const questions = await questionClient.findQuestionsForQuiz(qid as string);
    console.log("questions from fetchQuestions is:", questions);
    setQuestions(questions);
  }
  }

  const [question, setQuestion] = useState({
    quiz: "",
    title: "",
    type: "Multiple Choice",
    points: 0,
    questionText: "",
    choices: [],
    correctAnswer: "",
  });

  const [activeTab, setActiveTab] = useState("details");
  const [editQuestion, setEditQuestion] = useState(false);
  const [createQuestion, setCreateQuestion] = useState(false);

  const fetchQuiz = async () => {
    const quiz = await client.findQuizById(qid as string);
    console.log("quiz from fetchQuiz is:", quiz);
    console.log(typeof quiz.availableDate);
    quiz.availableDate = new Date(quiz.availableDate);
    quiz.dueDate = new Date(quiz.dueDate);
    quiz.untilDate = new Date(quiz.untilDate);
    setQuiz(quiz);
  };

  useEffect(() => {
    if (qid) {
      fetchQuiz();
    }
  }, []);

  useEffect(() => {
    fetchQuestions();
  }, [editQuestion]);

  // Function to create the quiz and all the questions associated with it
  const createQuizAndQuestions = async (quiz: any) => {
    console.log("quiz before create is:", quiz);
    const newQuiz = await client.createQuiz(quiz);
    console.log("new quiz after create is:", newQuiz);
    // Create All the questions 
    questions.forEach(async (question) => {
      question.quiz = newQuiz._id;
      const newQuestion = await questionClient.createQuestion(question);
      console.log("new question after create is:", newQuestion);
    });
  };

  const updateQuiz = async (quiz: any) => {
    const status = await client.updateQuiz(quiz);
    console.log("status after update is:", status);
  };

  // Function to delete the quiz and all the questions associated with it
  const deleteQuizAndQuestions = async (quizId: string) => {
    const status = await client.deleteQuiz(quizId);
    console.log("status after delete is:", status);
    const questions = await questionClient.findQuestionsForQuiz(quizId);
    questions.forEach(async (question: any) => {
      const status = await questionClient.deleteQuestion(question._id);
      console.log("status after delete is:", status);
    });
  }

  // handleSave function to dispatch the addQuiz or updateQuiz action
  const handleSave = () => {
    if (qid) {
      updateQuiz(quiz);
    } else {
      createQuizAndQuestions(quiz);
    }
  };

  const handleSaveAndPublish = () => {
    quiz.published = true;
    handleSave();
  };

  const handleQuestionSave = (newQuestion: any) => {
    setQuestion(newQuestion);
    setQuestions([...questions, newQuestion]);
    setEditQuestion(false);
  };

  const handleAddNewQuestion = () => { 
    setEditQuestion(true);
    setCreateQuestion(true);
  }

  useEffect(() => {
    console.log("questions after save is:", questions);
  }, [questions]);

  return (
    <div className="container my-4 ms-0">
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "details" ? "active" : ""}`}
            onClick={() => setActiveTab("details")}
          >
            Details
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${
              activeTab === "questions" ? "active" : "text-danger"
            }`}
            onClick={() => setActiveTab("questions")}
          >
            Questions
          </button>
        </li>
      </ul>

      <div className="tab-content mt-3">
        {activeTab === "details" && (
          <div id="wd-quizs-editor">
            <div className="mb-4">
              <label htmlFor="wd-name" className="form-label">
                Quiz Name
              </label>
              <input
                id="wd-name"
                className="form-control"
                value={quiz.name}
                placeholder="New Quiz Name"
                onChange={(e) => setQuiz({ ...quiz, name: e.target.value })}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="wd-description" className="form-label">
                Description
              </label>
              <textarea
                id="wd-description"
                className="form-control"
                rows={5}
                placeholder="New quiz Description"
                value={quiz.description}
                onChange={(e) =>
                  setQuiz({ ...quiz, description: e.target.value })
                }
              />
            </div>

            <div className="container row mb-3 ms-0">
              <div className="row mb-3">
                <div className="col-md-4 text-md-end">
                  <label htmlFor="wd-points" className="form-label">
                    Points
                  </label>
                </div>
                <div className="col-md-8">
                  <input
                    id="wd-points"
                    className="form-control"
                    value={quiz.points}
                    placeholder="100"
                    onChange={(e) =>
                      setQuiz({
                        ...quiz,
                        points: parseInt(e.target.value),
                      })
                    }
                  />
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-md-4 text-md-end">
                  <label htmlFor="wd-quiz-type" className="form-label">
                    Quiz Type
                  </label>
                </div>
                <div className="col-md-8">
                  <select
                    id="wd-quiz-type"
                    className="form-control"
                    value={quiz.quizType}
                    onChange={(e) =>
                      setQuiz({ ...quiz, quizType: e.target.value })
                    }
                  >
                    <option value="graded">Graded Quiz</option>
                    <option value="practice">Practice Quiz</option>
                    <option value="graded-survey">Graded Survey</option>
                    <option value="ungraded-survey">Ungraded Survey</option>
                  </select>
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-4 text-md-end">
                  <label htmlFor="wd-quiz-type" className="form-label">
                    Assignment Group
                  </label>
                </div>
                <div className="col-md-8">
                  <select
                    id="wd-assignment-group"
                    className="form-control"
                    value={quiz.assignmentGroup}
                    onChange={(e) =>
                      setQuiz({ ...quiz, assignmentGroup: e.target.value })
                    }
                  >
                    <option value="quizzes">Quizzes</option>
                    <option value="exams">Exams</option>
                    <option value="assignments">Assignments</option>
                    <option value="project">Project</option>
                  </select>
                </div>
              </div>
              <div className="col-md-4 fs-4 fw-bold text-md-end mb-3">
                Option
              </div>
              <div className="row mb-3">
                <div className="col-md-4 text-md-end">
                  <label htmlFor="wd-shuffle-answers" className="form-label">
                    Shuffle Answers
                  </label>
                </div>
                <div className="col-md-8">
                  <input
                    type="checkbox"
                    id="wd-shuffle-answers"
                    className="form-check-input"
                    checked={quiz.shuffleAnswers}
                    onChange={(e) =>
                      setQuiz({ ...quiz, shuffleAnswers: e.target.checked })
                    }
                  />
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-md-4 text-md-end">
                  <label htmlFor="wd-time-limit" className="form-label">
                    Time Limit (minutes)
                  </label>
                </div>
                <div className="col-md-1">
                  <input
                    type="number"
                    id="wd-time-limit"
                    className="form-control"
                    value={quiz.timeLimit}
                    placeholder="Enter time limit"
                    onChange={(e) =>
                      setQuiz({ ...quiz, timeLimit: parseInt(e.target.value) })
                    }
                  />
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-md-4 text-md-end">
                  <label htmlFor="wd-multiple-attempts" className="form-label">
                    Allow Multiple Attempts
                  </label>
                </div>
                <div className="col-md-8">
                  <input
                    type="checkbox"
                    id="wd-multiple-attempts"
                    className="form-check-input"
                    checked={quiz.shuffleAnswers}
                    onChange={(e) =>
                      setQuiz({ ...quiz, shuffleAnswers: e.target.checked })
                    }
                  />
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-md-4 text-md-end">
                  <label htmlFor="wd-assign-section" className="form-label">
                    Assign
                  </label>
                </div>
                <div className="col-md-8">
                  <div className="border p-5 mt-2 mb-2">
                    <div className="row mb-3">
                      <div className="col-md-2">
                        <label htmlFor="wd-assign-to" className="form-label">
                          Assign to
                        </label>
                      </div>
                      <div className="col-md-10">
                        <input
                          id="wd-assign-to"
                          className="form-control"
                          value="Everyone"
                          readOnly
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-md-2">
                        <label htmlFor="wd-due-date" className="form-label">
                          Due
                        </label>
                      </div>
                      <div className="col-md-10">
                        <input
                          type="date"
                          id="wd-due-date"
                          className="form-control"
                          value={quiz.dueDate.toISOString().split("T")[0]}
                          onChange={(e) =>
                            setQuiz({
                              ...quiz,
                              dueDate: new Date(e.target.value),
                            })
                          }
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-md-2">
                        <label
                          htmlFor="wd-available-from"
                          className="form-label"
                        >
                          Available from
                        </label>
                      </div>
                      <div className="col-md-10">
                        <input
                          type="date"
                          id="wd-available-from"
                          className="form-control"
                          value={quiz.availableDate.toISOString().split("T")[0]}
                          onChange={(e) =>
                            setQuiz({
                              ...quiz,
                              availableDate: new Date(e.target.value),
                            })
                          }
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-md-2">
                        <label
                          htmlFor="wd-available-until"
                          className="form-label"
                        >
                          Until
                        </label>
                      </div>
                      <div className="col-md-10">
                        <input
                          type="date"
                          id="wd-available-until"
                          className="form-control"
                          value={quiz.untilDate.toISOString().split("T")[0]}
                          onChange={(e) =>
                            setQuiz({
                              ...quiz,
                              untilDate: new Date(e.target.value),
                            })
                          }
                        />
                      </div>
                    </div>
                    {!quiz.published && (
                      <Link
                        onClick={handleSaveAndPublish}
                        to={`/Kanbas/Courses/${cid}/Quizzes`}
                        className="btn btn-primary float-end ms-2"
                      >
                        Save and Publish
                      </Link>
                    )}
                    <Link
                      onClick={handleSave}
                      to={`/Kanbas/Courses/${cid}/Quizzes`}
                      className="btn btn-danger float-end"
                    >
                      Save
                    </Link>
                    <Link
                      to={`/Kanbas/Courses/${cid}/Quizzes`}
                      className="btn btn-secondary me-2 float-end"
                    >
                      Cancel
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {activeTab === "questions" && (
          <>
            {!editQuestion ? (
              <>
                <QuestionList
                  questions={questions}
                  setQuestion={setQuestion}
                  setQuestions={setQuestions}
                  setEditQuestion={setEditQuestion}
                  setCreateQuestion={setCreateQuestion}
                />
                <div className="d-flex justify-content-center my-3">
                  <button
                    className="btn btn-secondary mt-4 p-3"
                    onClick={handleAddNewQuestion}
                  >
                    <FaPlus className="me-2 mb-1" />
                    New Question
                  </button>
                </div>
              </>
            ) : createQuestion ? (
              <NewQuestionEditor onSave={handleQuestionSave} setEditQuestion={setEditQuestion} />
            ) : (
              <QuestionEditor questionFromQuiz={question} onSave={handleQuestionSave} setEditQuestion={setEditQuestion} />
            )}
          </>
        )}
      </div>
    </div>
  );
}