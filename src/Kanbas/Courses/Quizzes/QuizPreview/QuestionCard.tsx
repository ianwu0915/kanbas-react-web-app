import React, { useState, useEffect } from 'react';

interface QuestionCardProps {
  question: {
    _id: string;
    title: string;
    type: string;
    questionText: string;
    points: number;
    choices: { text: string, correct: boolean }[];
  };
  selectedAnswer?: string;
  correctAnswer?: string;
  onNext?: () => void;
  onPrevious?: () => void;
  onAnswerChange?: (questionId: string, answer: any) => void;
  isLastQuestion?: boolean;
  isFirstQuestion?: boolean;
  readonly?: boolean;
}

export default function QuestionCard({
  question,
  selectedAnswer,
  correctAnswer,
  onNext,
  onPrevious,
  onAnswerChange,
  isLastQuestion,
  isFirstQuestion,
  readonly,
}: QuestionCardProps) {
  const [currentAnswer, setCurrentAnswer] = useState<string>(selectedAnswer || '');

  useEffect(() => {
    setCurrentAnswer(selectedAnswer || '');
  }, [selectedAnswer, question]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (readonly) return;
    setCurrentAnswer(e.target.value);
    if (onAnswerChange) {
      onAnswerChange(question._id, e.target.value);
    }
  };

  return (
    <div className="card question-card mb-4">
      <div className="card-header d-flex justify-content-between">
        <h5 className='pt-1'>Question {question.title}</h5>
        <span>{question.points} pts</span>
      </div>
      <div className="card-body">
        <p>{question.questionText}</p>
        {question.type === 'Multiple Choice' && (
          <div>
            {question.choices.map((choice, index) => (
              <div key={index} className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name={question._id}
                  value={choice.text}
                  checked={currentAnswer === choice.text}
                  onChange={handleChange}
                  disabled={readonly}
                />
                <label className="form-check-label">
                  {choice.text}
                  {readonly && (
                    <>
                      {currentAnswer === choice.text && ' (Your answer)'}
                      {choice.correct && ' (Correct answer)'}
                    </>
                  )}
                </label>
              </div>
            ))}
          </div>
        )}
        {question.type === 'Fill In the Blank' && (
          <div>
            <input
              type="text"
              className="form-control mb-3"
              value={currentAnswer}
              onChange={handleChange}
              disabled={readonly}
            />
            {readonly && !question.choices.some(choice => choice.text === currentAnswer && choice.correct) && (
              <div>
                <strong>Correct Answers:</strong>
                <ul>
                  {question.choices.filter(choice => choice.correct).map((choice, index) => (
                    <li key={index}>{choice.text}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
        {question.type === 'True/False' && (
          <div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name={question._id}
                value="True"
                checked={currentAnswer === 'True'}
                onChange={handleChange}
                disabled={readonly}
              />
              <label className="form-check-label">
                True
                {readonly && (
                  <>
                    {currentAnswer === 'True' && ' (Your answer)'}
                    {correctAnswer === 'True' && ' (Correct answer)'}
                  </>
                )}
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name={question._id}
                value="False"
                checked={currentAnswer === 'False'}
                onChange={handleChange}
                disabled={readonly}
              />
              <label className="form-check-label">
                False
                {readonly && (
                  <>
                    {currentAnswer === 'False' && ' (Your answer)'}
                    {correctAnswer === 'False' && ' (Correct answer)'}
                  </>
                )}
              </label>
            </div>
          </div>
        )}
        {!readonly && (
          <div className="d-flex justify-content-between mt-3">
            {!isFirstQuestion && <button className="btn btn-secondary" onClick={onPrevious}>Previous</button>}
            {!isLastQuestion && <button className="btn btn-primary" onClick={onNext}>Next</button>}
          </div>
        )}
      </div>
    </div>
  );
}
