import React from "react";
import { RiDeleteBin6Fill } from "react-icons/ri";
import "./QnAForm.css";

const QnASlideForm = ({
  slide,
  slideIndex,
  handleChange,
  optionType,
  setOptionType,
  handleAddOption,
  handleRemoveOption,
  handleAnswerChange,
  correctAnswerIndex,
}) => {
  return (
    <div>
      <input
        className="qnaFormInputField"
        type="text"
        name="question"
        value={slide.question}
        placeholder="Q&A Question"
        onChange={(e) => handleChange(e, slideIndex)}
      />
      <div className="optionType">
        <p>Option Type</p>
        <label>
          <input
            type="radio"
            name={`optionType-${slideIndex}`}
            value="text"
            className="circle"
            checked={optionType === "text"}
            onChange={() => {
              setOptionType("text");
            }}
          />
          <p>Text</p>
        </label>
        <label>
          <input
            type="radio"
            name={`optionType-${slideIndex}`}
            value="imageUrl"
            className="circle"
            checked={optionType === "imageUrl"}
            onChange={() => {
              setOptionType("imageUrl");
            }}
          />
          <p>Image URL</p>
        </label>
        <label>
          <input
            type="radio"
            name={`optionType-${slideIndex}`}
            value="textImageUrl"
            className="circle"
            checked={optionType === "textImageUrl"}
            onChange={() => {
              setOptionType("textImageUrl");
            }}
          />
          <p>Text & Image URL</p>
        </label>
      </div>
      <div
        className={
          optionType === "textImageUrl"
            ? "options-body-textImage"
            : "options-body"
        }
      >
        {(optionType === "text" || optionType === "imageUrl") && (
          <div className="optionFieldContainer">
            {slide.options.map((option, optionIndex) => (
              <div className="optionField" key={optionIndex}>
                <input
                  type="radio"
                  name={`option-${slideIndex}`}
                  value=""
                  className="radioInput"
                  checked={correctAnswerIndex === optionIndex}
                  onChange={() =>
                    handleAnswerChange(
                      slideIndex,
                      optionType === "text"
                        ? { ...slide.answer, text: option.text }
                        : { ...slide.answer, imageUrl: option.imageUrl }
                    )
                  }
                />
                <input
                  className={`optionInputField ${
                    correctAnswerIndex === optionIndex ? "correctAnswer" : ""
                  }`}
                  type="text"
                  name={optionType === "text" ? "textOption" : "imageUrlOption"}
                  value={optionType === "text" ? option.text : option.imageUrl}
                  placeholder={optionType === "text" ? "Text" : "Image URL"}
                  onChange={(e) =>
                    handleChange(e, slideIndex, optionIndex, optionType)
                  }
                />
                {optionIndex > 1 && (
                  <button
                    className="delBtn"
                    onClick={() => handleRemoveOption(slideIndex, optionIndex)}
                  >
                    <RiDeleteBin6Fill />
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
        {optionType === "textImageUrl" && (
          <div className="optionFieldContainer-textImage">
            {slide.options.map((option, optionIndex) => (
              <div className="optionField" key={optionIndex}>
                <input
                  type="radio"
                  name={`option-${slideIndex}`}
                  value=""
                  className="radioInput"
                  checked={correctAnswerIndex === optionIndex}
                  onChange={() =>
                    handleAnswerChange(slideIndex, {
                      text: option.text,
                      imageUrl: option.imageUrl,
                    })
                  }
                />
                <input
                  className={`optionInputField ${
                    correctAnswerIndex === optionIndex ? "correctAnswer" : ""
                  }`}
                  type="text"
                  name="textOption"
                  value={option.text}
                  placeholder="Text"
                  onChange={(e) =>
                    handleChange(e, slideIndex, optionIndex, "text")
                  }
                />
                <input
                  className={`optionInputField ${
                    correctAnswerIndex === optionIndex ? "correctAnswer" : ""
                  }`}
                  type="text"
                  name="imageUrlOption"
                  value={option.imageUrl}
                  placeholder="Image URL"
                  onChange={(e) =>
                    handleChange(e, slideIndex, optionIndex, "imageUrl")
                  }
                />
                {optionIndex > 1 && (
                  <button
                    className="delBtn"
                    onClick={() => handleRemoveOption(slideIndex, optionIndex)}
                  >
                    <RiDeleteBin6Fill />
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
        <div className="timer">
          <p className="timer-head">Timer</p>
          {["OFF", "5", "10"].map((timer, index) => (
            <p
              key={index}
              onClick={() =>
                handleChange(
                  { target: { name: "timer", value: timer } },
                  slideIndex
                )
              }
              className={slide.timer === timer ? "selected" : ""}
            >
              {timer === "OFF" ? "OFF" : `${timer} sec`}
            </p>
          ))}
        </div>
      </div>
      <button
        className="addButton"
        onClick={() => handleAddOption(slideIndex)}
        disabled={slide.options.length > 3}
      >
        Add option
      </button>
    </div>
  );
};

export default QnASlideForm;
