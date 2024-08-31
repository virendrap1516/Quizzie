import React, { useState, useEffect } from "react";
import "./PollForm.css";
import PollSlideForm from "./PollSlideForm";
import QuizSharePage from "../QuizSuccess";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createQuiz, updateQuiz } from "../../../../actions/quizAction";

const PollForm = ({ quizName, quizType, quizData }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const initialSlide = {
    question: "",
    optionType: "text",
    options: [
      { text: "", imageUrl: "" },
      { text: "", imageUrl: "" },
      { text: "", imageUrl: "" },
      { text: "", imageUrl: "" },
    ],
  };
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slides, setSlides] = useState(
    quizData ? quizData.slides : [initialSlide]
  );
  const [quizCreated, setQuizCreated] = useState(false);
  useEffect(() => {
    setCurrentSlide(currentSlide);
    console.log("currentSlide", currentSlide);
  }, [currentSlide]);

  const handleAddSlide = () => {
    if (slides.length < 5) {
      setSlides((prevSlides) => [
        ...prevSlides,
        { ...initialSlide, selectedOption: "text" },
      ]);
      setCurrentSlide(slides.length);
    }
  };

  const handleRemoveSlide = (index) => {
    setSlides((prevSlides) => prevSlides.filter((element, i) => i !== index));
    setCurrentSlide(currentSlide > 0 ? currentSlide - 1 : 0);
  };

  const handleChange = (e, slideIndex, optionIndex, inputType) => {
    const { name, value } = e.target;
    setSlides((prevSlides) =>
      prevSlides.map((slide, i) => {
        if (i === slideIndex) {
          if (name === "question" || name === "timer") {
            return { ...slide, [name]: value };
          }
          if (name === "textOption" || name === "imageUrlOption") {
            const updatedOptions = [...slide.options];
            updatedOptions[optionIndex][inputType] = value;
            return { ...slide, options: updatedOptions };
          }
        }
        return slide;
      })
    );
  };

  const handleOptionChange = (optionType, index) => {
    setSlides((prevSlides) =>
      prevSlides.map((slide, i) =>
        i === index ? { ...slide, optionType: optionType } : slide
      )
    );
  };

  const handleRemoveOption = (slideIndex, optionIndex) => {
    setSlides((prevSlides) =>
      prevSlides.map((slide, index) =>
        index === slideIndex
          ? {
              ...slide,
              options: slide.options.filter((element, i) => i !== optionIndex),
            }
          : slide
      )
    );
  };

  const handleCreateQuiz = () => {
    setQuizCreated(true);
    const formData = { quizType, quizName, slides };
    if (quizData) {
      dispatch(updateQuiz(quizData._id, formData));
    } else {
      dispatch(createQuiz(formData));
    }
    setSlides([initialSlide]);
    setCurrentSlide(0);
  };

  return (
    <>
      {!quizCreated ? (
        <div className="modal-backdrop">
          <div className="pollForm">
            <div className="pollSlideMenu">
              {slides.map((slide, index) => (
                <div
                  key={index}
                  className="slideBox"
                  onClick={() => setCurrentSlide(index)}
                >
                  {index + 1}
                  {index >= 1 && (
                    <span
                      className="slideCloseBtn"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveSlide(index);
                      }}
                    >
                      x
                    </span>
                  )}
                </div>
              ))}
              <div className="slideAddBtn" onClick={handleAddSlide}>
                +
              </div>
              <p>Max 5 questions</p>
            </div>
            {slides.map((slide, slideIndex) => (
              <div key={slideIndex}>
                {slideIndex === currentSlide && (
                  <PollSlideForm
                    key={slideIndex}
                    slide={slide}
                    slideIndex={slideIndex}
                    optionType={slide.optionType}
                    setOptionType={(optionType) =>
                      handleOptionChange(optionType, slideIndex)
                    }
                    handleChange={handleChange}
                    handleRemoveOption={handleRemoveOption}
                  />
                )}
              </div>
            ))}
            <div className="qnaBtnContainer">
              <button
                className="cancelButton"
                onClick={() => navigate("/analytics")}
              >
                Cancel
              </button>
              <button className="continueButton" onClick={handleCreateQuiz}>
                {quizData ? "Update Quiz" : "Create Quiz"}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <QuizSharePage quizType={quizType} />
      )}
    </>
  );
};

export default PollForm;
