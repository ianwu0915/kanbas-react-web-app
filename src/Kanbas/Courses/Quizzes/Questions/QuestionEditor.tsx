import React, { useState } from "react";
import { useEffect } from "react";
import { IoTrashOutline } from "react-icons/io5";
import "../../../styles.css";
import { FaPlus } from "react-icons/fa6";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function QuestionEditor({
  onSave,
}: {
  onSave: (data: any) => void;
}) {

  const [question, setQuestion] = useState({
    quiz: "",
    title: "",
    type: "Multiple Choice",
    points: 0,
    questionText: "",
    choices: [],
    correctAnswer: "",
  });
  const [questionType, setQuestionType] = useState("Multiple Choice");
  // const [points, setPoints] = useState(0);
  const [choices, setChoices] = useState([{ text: "", correct: false }]);

  const addChoice = () => {
    setChoices([...choices, { text: "", correct: false }]);
  };

  const removeChoice = (index: any) => {
    setChoices(choices.filter((_, i) => i !== index));
  };

  const handleChoiceChange = (value: any, index: any) => {
    const newChoices = choices.map((choice, i) => {
      if (i === index) {
        return { ...choice, text: value };
      }
      return choice;
    });
    setChoices(newChoices);
  };

  const onCancel = () => {};

  const handleCorrectChoiceChange = (index: any) => {
    const newChoices = choices.map((choice, i) => ({
      ...choice,
      correct: i === index,
    }));
    setChoices(newChoices);
  };

  useEffect(() => {
    console.log("current choices include: ", choices);
  }, [choices]); 

  const handleSave = () => {
    const questionSave = {
      ...question,
      choices: choices,
    };
   onSave(questionSave)
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
              onChange={(e) => setQuestion({ ...question, title: e.target.value })}
              style={{ width: "300px" }}
            ></input>
          </div>
          <div className="" style={{ width: "300px" }}>
            <select
              className="form-select"
              value={questionType}
              onChange={(e) => {
                setQuestionType(e.target.value)
                setQuestion({ ...question, type: e.target.value})
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
              onChange={(e) => setQuestion({ ...question, points: parseInt(e.target.value) })}
              style={{ width: "60px" }} // Adjust the width as needed
            />
          </div>
        </div>
        <hr />

        <div className="mb-4">
          <label htmlFor="question-title" className="form-label">
            Question:
          </label>
          <ReactQuill id="question-title" className="mb-5" theme="snow" value={question.questionText} onChange={(value) => setQuestion({ ...question, questionText: value })}  style={{ height: '200px' }}   />
          {/* <textarea
            id="question-title"
            className="form-control"
            rows={5}
            value={question.questionText}
            placeholder="Enter the question"
            onChange={(e) => setQuestion({...question, questionText: e.target.value})}
          /> */}
        </div>
        <br />
        
        {questionType === "Multiple Choice" || questionType === "Fill In the Blank" ? (
          <div className="mb-4">
             <h4 className="mt-5 mb-4 fs-5 fw-bold">Answers:</h4>
            <label className="form-label">Choices</label>
            {choices.map((choice, index) => (
              <div key={index} className="input-group mb-3 w-75">
                <div className="input-group-text">
                  <input
                    type="radio"
                    name="correctAnswer"
                    checked={choice.correct}
                    onChange={() => handleCorrectChoiceChange(index)}
                  />
                </div>
                <input
                  type="text"
                  className="form-control"
                  value={choice.text}
                  placeholder="Possible Answer"
                  onChange={(e) => handleChoiceChange(e.target.value, index)}
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
            <div className="mb-3 fs-6">
              <input
                type="radio"
                id="trueOption"
                name="trueFalse"
                value="True"
              />
              <label htmlFor="trueOption" className="ms-2">True</label>
            </div>
            <div className="mb-3 fs-6">
              <input
                type="radio"
                id="falseOption"
                name="trueFalse"
                value="False"
              />
              <label htmlFor="falseOption" className="ms-2">False</label>
            </div>
          </div>
        )}

        <div className="mb-4">
          <button className="btn btn-secondary" onClick={onCancel}>
            Cancel
          </button>
          <button className="btn btn-danger" onClick={handleSave}>
            Update Question
          </button>
        </div>
      </div>
    </div>
  );
}
