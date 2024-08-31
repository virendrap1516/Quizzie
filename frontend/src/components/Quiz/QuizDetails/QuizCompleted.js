import React from "react";
import "./QuizDetails.css";
import Trophy from "../../../assets/trophy.png"
const QuizCompleted = ({score, totalQuestions}) => {
  return (
    <div className="modal">
      <div className="quizCompletedForm">
        <h1>Congrats Quiz is completed</h1>
        <img src={Trophy} alt="" />
        <p>Your Score is <span className="score">0{score}/0{totalQuestions}</span></p>
      </div>
    </div>
  );
};

export default QuizCompleted;
