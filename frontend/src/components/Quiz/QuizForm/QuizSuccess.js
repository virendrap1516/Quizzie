import React from "react";
import "./QuizSuccess.css";
import { MdClose } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const QuizSuccess = ({ quizType }) => {
  const navigate = useNavigate();
  const { newQuizId } = useSelector((state) => state.quiz);
  const generateLink = () => {
    if (quizType === "Q&A") {
      return `${process.env.REACT_APP_FRONTEND_URL}/quiz-play/${newQuizId}`;
    } else if (quizType === "Poll") {
      return `${process.env.REACT_APP_FRONTEND_URL}/poll-play/${newQuizId}`;
    }
    return "";
  };

  const handleCopyLink = () => {
    const link = generateLink();

    if (link) {
      navigator.clipboard
        .writeText(link)
        .then(() => {
          toast.success("Link copied to Clipboard", {
            position: "top-center",
            autoClose: 1000,
          });
        })
        .catch(() => {
          toast.error("Couldn't copy the link", {
            position: "top-center",
          });
        });
    } else {
      toast.error("Invalid quiz type", {
        position: "top-center",
      });
    }
  };

  const link = generateLink();
  return (
    <div className="modal-backdrop">
      <div className="quizSuccessForm">
        <button
          className="formCloseButton"
          onClick={() => navigate("/dashboard")}
          aria-label="Close"
        >
          <MdClose />
        </button>
        <h1>Congrats your Quiz is Published!</h1>
        {newQuizId && <p>{link}</p>}
        <button className="shareButton" onClick={handleCopyLink}>
          Share
        </button>
      </div>
    </div>
  );
};

export default QuizSuccess;
