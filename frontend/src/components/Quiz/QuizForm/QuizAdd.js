import React, { useState } from "react";
import "./QuizForm.css";
import { useNavigate, useLocation } from "react-router-dom";
import QnAForm from "./QnAForm/QnAForm";
import PollForm from "./PollForm/PollForm";
const QuizAdd = () => {
  const { state } = useLocation();
  const [stateData] = useState(state?.quizData);
  const [activeOption, setActiveOption] = useState("" || stateData?.quizType);
  const [openQuizForm, setOpenQuizForm] = useState(false);
  const [quizName, setQuizName] = useState("" || stateData?.quizName);
  const navigate = useNavigate();
  return (
    <>
      {!openQuizForm ? (
        <div className="modal-backdrop">
          <div className="quizForm">
            <input
              className="slideFormInputField"
              type="text"
              placeholder="Quiz name"
              value={quizName}
              onChange={(e) => {setQuizName(e.target.value)}}
            />
            <div className="quizType">
              <p>Quiz Type</p>
              <p
                className={`optionName ${
                  activeOption === "Q&A" ? "activeOption" : ""
                }`}
                onClick={() => setActiveOption("Q&A")}
              >
                Q &A
              </p>
              <p
                className={`optionName ${
                  activeOption === "Poll" ? "activeOption" : ""
                }`}
                onClick={() => setActiveOption("Poll")}
              >
                Poll Type
              </p>
            </div>
            <div className="quizBtnContainer">
              <button
                className="cancelButton"
                onClick={() => navigate("/analytics")}
              >
                Cancel
              </button>
              <button
                className="continueButton"
                onClick={() => setOpenQuizForm(!openQuizForm)}
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      ) : activeOption === "Q&A" ? (
        <QnAForm quizType={activeOption} quizName={quizName} quizData={stateData}/>
      ) : (
        <PollForm quizType={activeOption} quizName={quizName} quizData={stateData}/>
      )}
    </>
  );
};

export default QuizAdd;
