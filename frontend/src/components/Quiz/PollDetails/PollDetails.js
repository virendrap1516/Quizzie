import React, { useState, useEffect } from "react";
import "../QuizDetails/QuizDetails.css";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getQuiz, optionSubmit } from "../../../actions/quizAction";
import PollCompleted from "../PollDetails/PollCompleted";

const PollDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [answerSelected, setAnswerSelected] = useState("");
  const [pollCompleted, setPollCompleted] = useState(false);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const { quiz } = useSelector((state) => state.quiz);

  useEffect(() => {
    dispatch(getQuiz(id));
  }, [id, dispatch]);
  const handleNextClick = () => {
    if (answerSelected) {
      dispatch(optionSubmit(id, currentSlideIndex, answerSelected));
    }
    if (currentSlideIndex < quiz?.slides?.length - 1) {
      setCurrentSlideIndex(currentSlideIndex + 1);
      setAnswerSelected("");
    } else {
      setPollCompleted(true);
    }
  }
  const currentSlide = quiz?.slides?.[currentSlideIndex];
  return (
    <>
      {!pollCompleted ? (
        <div className="modal">
          {currentSlide && (
            <div className="quizDetailsForm">
              <p className="playQuizhead">0{`${currentSlideIndex + 1}/0${
                quiz?.slides?.length
              }`}</p>
              <h3 className="quizQuestion">{currentSlide.question}</h3>
              {currentSlide?.optionType === "text" && (
                <div className="playQuizOptions">
                  {currentSlide.options.map((option, index) => (
                    <div key={index}
                      className={`optionBox ${
                        answerSelected === option.text ? "answerSelected" : ""
                      }`}
                      onClick={() => setAnswerSelected(option.text)}
                    >
                      {option.text}
                    </div>
                  ))}
                </div>
              )}
              {currentSlide?.optionType === "imageUrl" && (
                <div className="playQuizOptions">
                  {currentSlide.options.map((option, index) => (
                    <div key={index}
                      className={`imgOptionBox ${
                        answerSelected === option.imageUrl
                          ? "answerSelected"
                          : ""
                      }`}
                      onClick={() => setAnswerSelected(option.imageUrl)}
                    >
                      <img src={option.imageUrl} alt="" />
                    </div>
                  ))}
                </div>
              )}
              {currentSlide?.optionType === "textImageUrl" && (
                <div className="playQuizOptions">
                  {currentSlide.options.map((option, index) => (
                    <div key={index}
                      className={`poolTextImgOptionBox ${
                        answerSelected === option.text ? "answerSelected" : ""
                      }`}
                      onClick={() => setAnswerSelected(option.text)}
                    >
                      <p>{option.text}</p>
                      <img src={option.imageUrl} alt="" />
                    </div>
                  ))}
                </div>
              )}
              <div className="nextButtonContainer">
                <button className="nextButton" onClick={handleNextClick}>
                  {currentSlideIndex === quiz?.slides?.length - 1
                    ? "SUBMIT"
                    : "NEXT"}
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <PollCompleted />
      )}
    </>
  );
};

export default PollDetails;
