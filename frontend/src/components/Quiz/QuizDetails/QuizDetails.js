import React, { useState, useEffect } from "react";
import "./QuizDetails.css";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getQuiz, answerCounts } from "../../../actions/quizAction";
import QuizCompleted from "../QuizDetails/QuizCompleted";

const QuizDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [answerSelected, setAnswerSelected] = useState("");
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [score, setScore] = useState(0);
  const { quiz } = useSelector((state) => state.quiz);

  useEffect(() => {
    dispatch(getQuiz(id));
  }, [id, dispatch]);

  const handleNextClick = async () => {
    if (answerSelected !== "") {
      const currentSlide = quiz?.slides?.[currentSlideIndex];
      const isCorrect =
        (currentSlide.optionType === "text" &&
          answerSelected === currentSlide.answer.text) ||
        (currentSlide.optionType === "imageUrl" &&
          answerSelected === currentSlide.answer.imageUrl) ||
        (currentSlide.optionType === "textImageUrl" &&
          (answerSelected === currentSlide.answer.text ||
            answerSelected === currentSlide.answer.imageUrl));
  
      if (isCorrect) {
        setScore((prevScore) => prevScore + 1);
      }
  
      await dispatch(answerCounts(id, currentSlideIndex, isCorrect)); 
    }

    if (currentSlideIndex < quiz?.slides?.length - 1) {
      setCurrentSlideIndex(currentSlideIndex + 1);
      setAnswerSelected("");
    } else {
      setQuizCompleted(true);
    }
  };

  useEffect(() => {
    const currentSlide = quiz?.slides?.[currentSlideIndex];
    if (currentSlide && currentSlide.timer !== "OFF") {
      const timerDuration = parseInt(currentSlide.timer, 10) * 1000;
      const timer = setTimeout(() => {
        handleNextClick();
      }, timerDuration);

      return () => clearTimeout(timer);
    }
  }, [currentSlideIndex, quiz?.slides]);
  const currentSlide = quiz?.slides?.[currentSlideIndex];
  return (
    <>
      {!quizCompleted ? (
        <div className="modal">
          {currentSlide && (
            <div className="quizDetailsForm">
              <div className="playQuizhead">
                <p>0{`${currentSlideIndex + 1}/0${quiz?.slides?.length}`}</p>
                <p>
                  {currentSlide.timer === "OFF"
                    ? ""
                    : `00:${currentSlide.timer}s`}
                </p>
              </div>
              <h3 className="quizQuestion">{currentSlide.question}</h3>
              {currentSlide?.optionType === "text" && (
                <div className="playQuizOptions">
                  {currentSlide.options.map((option, index) => (
                    <div
                      key={index}
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
                    <div
                      key={index}
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
                    <div
                      key={index}
                      className={`textImgOptionBox ${
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
        <QuizCompleted score={score} totalQuestions={quiz?.slides?.length} />
      )}
    </>
  );
};

export default QuizDetails;
