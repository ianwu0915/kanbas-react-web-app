import React, { useState, useEffect } from 'react';

interface QuestionCardProps {
  question: {
    _id: string;
    title: string;
    type: string;
    questionText: string;
    points: number;
    choices: { text: string }[];
  };
  onNext: () => void;
  onPrevious: () => void;
  onAnswerChange: (questionId: string, answer: any) => void;
  isLastQuestion: boolean;
  isFirstQuestion: boolean;
  answer: any;
}

export default function QuestionCard({
  question,
  onNext,
  onPrevious,
  onAnswerChange,
  isLastQuestion,
  isFirstQuestion,
  answer: initialAnswer,
}: QuestionCardProps) {
  const [answer, setAnswer] = useState<string>(initialAnswer);

  useEffect(() => {
    setAnswer(initialAnswer);
  }, [initialAnswer, question]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAnswer(e.target.value);
    onAnswerChange(question._id, e.target.value);
  };

  return (
    <div className="card question-card mb-4">
      <div className="card-header d-flex justify-content-between p-3">
        <h5>Question {question.title}</h5>
        <span>{question.points} pts</span>
      </div>
      <div className="card-body">
        <p>{question.questionText}</p>
        {question.type === 'Multiple Choice' && (
          <div>
            {question.choices.map((choice, index) => (
              <div key={index} className='ps-2 pe-2'>
                <hr />
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name={question._id}
                    value={choice.text}
                    checked={answer === choice.text}
                    onChange={handleChange}
                  />
                  <label className="form-check-label">{choice.text}</label>
                </div>
              </div>
            ))}
          </div>
        )}
        {question.type === 'Fill In the Blank' && (
          <input type="text" className="form-control" value={answer} onChange={handleChange} />
        )}
        {question.type === 'True/False' && (
          <div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name={question._id}
                value="True"
                checked={answer === 'True'}
                onChange={handleChange}
              />
              <label className="form-check-label">True</label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name={question._id}
                value="False"
                checked={answer === 'False'}
                onChange={handleChange}
              />
              <label className="form-check-label">False</label>
            </div>
          </div>
        )}
        <div className="d-flex justify-content-between mt-3">
          {!isFirstQuestion && <button className="btn btn-secondary" onClick={onPrevious}>Previous</button>}
          {!isLastQuestion && <button className="btn btn-primary" onClick={onNext}>Next</button>}
        </div>
      </div>
    </div>
  );
}
