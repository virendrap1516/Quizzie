import React from "react";
import { RiDeleteBin6Fill } from "react-icons/ri";
import "./PollForm.css";
const PollSlideForm = ({
  slide,
  slideIndex,
  handleChange,
  optionType,
  setOptionType,
  handleRemoveOption,
}) => {
  return (
    <div>
      <input
        className="pollFormInputField"
        type="text"
        name="question"
        value={slide.question}
        placeholder="Poll Question"
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
      <div>
        {(optionType === "text" || optionType === "imageUrl") && (
          <div className="polloptionFieldContainer">
            {slide.options.map((option, optionIndex) => (
              <div className="polloptionField" key={optionIndex}>
                <input
                  className="optionInputField"
                  type="text"
                  name={
                    optionType === "text" ? "textOption" : "imageUrlOption"
                  }
                  value={
                    optionType === "text" ? option.text : option.imageUrl
                  }
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
          <div className="polloptionFieldContainer-textImage">
            {slide.options.map((option, optionIndex) => (
              <div className="polloptionField" key={optionIndex}>
                <input
                  className="optionInputField"
                  type="text"
                  name="textOption"
                  value={option.text}
                  placeholder="Text"
                  onChange={(e) =>
                    handleChange(e, slideIndex, optionIndex, "text")
                  }
                />
                <input
                  className="optionInputField"
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
      </div>
    </div>
  );
};

export default PollSlideForm;
