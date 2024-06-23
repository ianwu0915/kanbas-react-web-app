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
  const [answer, setAnswer] = useState<string>(selectedAnswer || '');

  useEffect(() => {
    setAnswer(selectedAnswer || '');
  }, [selectedAnswer, question]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (readonly) return;
    setAnswer(e.target.value);
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
                  checked={answer === choice.text}
                  onChange={handleChange}
                  disabled={readonly}
                />
                <label className="form-check-label">
                  {choice.text}
                  {readonly && (
                    <>
                      {answer === choice.text && ' (Your answer)'}
                      {choice.correct && ' (Correct answer)'}
                    </>
                  )}
                </label>
              </div>
            ))}
          </div>
        )}
        {question.type === 'Fill In the Blank' && (
          <input
            type="text"
            className="form-control"
            value={answer}
            onChange={handleChange}
            disabled={readonly}
          />
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
                disabled={readonly}
              />
              <label className="form-check-label">
                True
                {readonly && (
                  <>
                    {answer === 'True' && ' (Your answer)'}
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
                checked={answer === 'False'}
                onChange={handleChange}
                disabled={readonly}
              />
              <label className="form-check-label">
                False
                {readonly && (
                  <>
                    {answer === 'False' && ' (Your answer)'}
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
            <button className="btn btn-primary" onClick={onNext}>{isLastQuestion ? 'Finish' : 'Next'}</button>
          </div>
        )}
      </div>
    </div>
  );
}
