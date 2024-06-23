import React, { useState } from "react";
import * as client from "./client";
import { useEffect } from "react";
import { useParams } from "react-router";
import { IoTrashOutline } from "react-icons/io5";
import "../../../styles.css";
import { FaPlus } from "react-icons/fa6";
import ReactQuill from "react-quill";

import "react-quill/dist/quill.snow.css";

export default function QuestionEditor({
  onSave,
  setEditQuestion,
}: {
  onSave: (data: any) => void;
  setEditQuestion: (value: boolean) => void;
}) {
  const { qid } = useParams();
  const [question, setQuestion] = useState({
    quiz: qid,
    title: "",
    type: "Multiple Choice",
    points: 0,
    questionText: "",
    choices: [],
    correctAnswer: "",
  });

  const stripHtml = (htmlString: string) => {
    return htmlString.replace(/<[^>]*>?/gm, "");
  };

  const [questionType, setQuestionType] = useState(question.type);

  const createQuestion = async (question: any) => {
    const status = await client.createQuestion(question);
    console.log("status from createQuestion", status);
  };

  const [choices, setChoices] = useState([{ text: "", correct: false }]);
  const [trueFalseChoices, setTrueFalseChoices] = useState([
    { text: "True", correct: false },
    { text: "False", correct: false },
  ]);

  const addChoice = () => {
    setChoices([...choices, { text: "", correct: false }]);
  };

  const removeChoice = (index: any) => {
    setChoices(choices.filter((_: any, i: any) => i !== index));
  };

  const handleChoiceChange = (value: any, index: any) => {
    const newChoices = choices.map((choice: any, i: any) => {
      if (i === index) {
        return { ...choice, text: value };
      }
      return choice;
    });
    setChoices(newChoices);
  };

  const handleFillInTheBlankChoiceChange = (value: any, index : any) => {
    const newChoices = choices.map((choice: any, i: any) => {
      if (i === index) {
        return { ...choice, text: value, correct: true};
      }
      return choice;
    });
    setChoices(newChoices);
  };

  const onCancel = () => {
    setEditQuestion(false);
  };

  const handleCorrectChoiceChange = (index: any) => {
    const newChoices = choices.map((choice: any, i: any) => ({
      ...choice,
      correct: i === index,
    }));
    setChoices(newChoices);
  };

  const handleCorrectTrueFalseChange = (index: any) => {
    const newChoices = trueFalseChoices.map((choice: any, i: any) => ({
      ...choice,
      correct: i === index,
    }));
    setTrueFalseChoices(newChoices);
  };


  useEffect(() => {
    console.log("current choices include: ", choices);
    // console.log("current question text", stripHtml(question.questionText));
  }, [choices]);

  const handleSave = () => {
    const context = stripHtml(question.questionText);
    
    const questionSave = {
      ...question,
      choices: question.type === "True/False" ? trueFalseChoices : choices,
      questionText: context,
    };

    if (qid) {
      createQuestion(questionSave);
      setEditQuestion(false);

    } else {
      // If the qid does not exist, then we are in the process of creating a new quiz with new questions
      // So We leave the creation to the QuizEditor component
      // We passed the question created to the QuizEditor component
      onSave(questionSave);
    }
  };

  return (
    <div id="wd-question-editor">
      <div className="mb-4">
        {/* <label htmlFor="question-type" className="form-label">
            Question Type
          </label> */}
        <div className="d-flex mb-4 align-items-center ">
          <div className="me-2">
            <input
              id="question-title"
              className="form-control"
              value={question.title}
              placeholder="Enter title for the question"
              onChange={(e) =>
                setQuestion({ ...question, title: e.target.value })
              }
              style={{ width: "300px" }}
            ></input>
          </div>
          <div className="" style={{ width: "300px" }}>
            <select
              className="form-select"
              value={question.type}
              onChange={(e) => {
                setQuestionType(e.target.value);
                setQuestion({ ...question, type: e.target.value });
              }}
            >
              <option>Multiple Choice</option>
              <option>Fill In the Blank</option>
              <option>True/False</option>
            </select>
          </div>
          <div className="d-flex align-items-center ms-4 ms-auto">
            <label htmlFor="question-points" className="form-label me-2 fs-4">
              pts:
            </label>
            <input
              type="number"
              id="question-points"
              className="form-control"
              value={question.points}
              placeholder="Enter points for the question"
              onChange={(e) =>
                setQuestion({ ...question, points: parseInt(e.target.value) })
              }
              style={{ width: "60px" }} // Adjust the width as needed
            />
          </div>
        </div>
        <hr />

        <div className="mb-4">
          <label htmlFor="question-title" className="form-label">
            Question:
          </label>
          <ReactQuill
            id="question-title"
            className="mb-5"
            theme="snow"
            value={question.questionText}
            onChange={(value) => {
              setQuestion({ ...question, questionText: value });
            }}
            style={{ height: "200px" }}
          />
        </div>
        <br />

        {questionType === "Multiple Choice" ||
        questionType === "Fill In the Blank" ? (
          <div className="mb-4">
            <h4 className="mb-4 fs-5 fw-bold">Answers:</h4>
            <label className="form-label">Choices</label>
            {choices.map((choice: any, index: any) => (
              <div key={index} className="input-group mb-3 w-75">

                {questionType === "Multiple Choice" && <div className="input-group-text">
                  <input
                    type="radio"
                    name="correctAnswer"
                    checked={choice.correct}
                    onChange={() => handleCorrectChoiceChange(index)}
                  />
                </div>}
                <input
                  type="text"
                  className="form-control"
                  value={choice.text}
                  placeholder={questionType !== "Multiple Choice"? "Possible Answer" : "Possible Choice"}
                  onChange={(e) => {questionType === "Multiple Choice"? handleChoiceChange(e.target.value, index) : handleFillInTheBlankChoiceChange(e.target.value, index)}}
                />
                <button
                  className="btn btn-danger"
                  onClick={() => removeChoice(index)}
                >
                  <IoTrashOutline />
                </button>
              </div>
            ))}
            <div
              className="text-end text-danger add-answer-hover w-100 mt-4 fs-4"
              onClick={addChoice}
            >
              <FaPlus className="mb-1 me-2 fs-5" />
              Add Another Answer
            </div>
          </div>
        ) : (
          <div className="radio-options">
            <h4 className="mb-4 fs-5 fw-bold">Answers:</h4>
            {trueFalseChoices.map((choice: any, index: any) => (
              <div key={index} className="mb-3 fs-6">
                <input
                    type="radio"
                    name="correctAnswer"
                    checked={choice.correct}
                    onChange={() => handleCorrectTrueFalseChange(index)}
                  />
                <label htmlFor={`option-${index}`} className="ms-2">
                  {choice.text}
                </label>
              </div>
            ))}
          </div>
        )}

        <div className="mb-4">
          <button className="btn btn-secondary" onClick={onCancel}>
            Cancel
          </button>
          <button className="btn btn-danger" onClick={handleSave}>
            Create Question
          </button>
        </div>
      </div>
    </div>
  );
}
