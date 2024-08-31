import React from "react";
import "./QuixDelete.css";
import { deleteQuiz } from "../../../actions/quizAction";
import { useDispatch } from "react-redux";

const QuizDelete = ({ handleCancel, quizId }) => {
  const dispatch = useDispatch();
  const handleQuizDelete = () => {
    dispatch(deleteQuiz(quizId));
    handleCancel();
  };
  return (
    <div className="modal-backdrop">
      <div className="quizDeleteForm">
        <h1>Are you confirm you want to delete ?</h1>
        <div className="deleteFormBtnContainer">
          <button className="confirmDeleteButton" onClick={handleQuizDelete}>
            Confirm Delete
          </button>
          <button className="cancelButton" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizDelete;
