import React from 'react';

interface Question {
  _id: string;
}

interface QuestionListProps {
  questions: Question[];
  onQuestionClick: (index: number) => void;
}

export default function QuestionList({ questions, onQuestionClick }:{
    questions: Question[];
    onQuestionClick: (index: number) => void;
}){
  return (
    <div className="list-group">
      <h3>Questions</h3>
      {questions.map((question, index) => (
        <button
          key={question._id}
          type="button"
          className="list-group-item list-group-item-action text-danger"
          onClick={() => onQuestionClick(index)}
        >
          Question {index + 1}
        </button>
      ))}
    </div>
  );
};

// export default QuestionList;
