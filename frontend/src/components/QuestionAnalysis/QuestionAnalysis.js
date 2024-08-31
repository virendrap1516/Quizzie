import React, { useEffect } from "react";
import Sidebar from "../Sidebar/Sidebar";
import "./QuestionAnalysis.css";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getQuiz } from "../../actions/quizAction";
import Loader from "../Loader/Loader";

const QuestionAnalysis = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { quiz, quizLoading } = useSelector((state) => state.quiz);
  const { isAuthenticated } = useSelector((state) => state.user);
  const convertDate = (isoDateString) => {
    const date = new Date(isoDateString);
    const dayMonth = date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
    });
    const year = date.toLocaleDateString("en-GB", { year: "numeric" });
    return `${dayMonth}, ${year}`;
  };
  const formatImpression = (impression) => {
    if (!impression) return "0";
    if (impression >= 1000) {
      return (impression / 1000).toFixed(1) + "K";
    }
    return impression.toString();
  };

  useEffect(() => {
    dispatch(getQuiz(id, true));
  }, [id, dispatch, isAuthenticated, navigate]);
  return (
    <div className="dashboard">
      <Sidebar />
      {quizLoading ? (
        <Loader />
      ) : (
        <div className="analysisContainer">
          <div className="analysisHead">
            <h1>{quiz?.quizName} Question Analysis</h1>
            <div>
              <p>Created on : {convertDate(quiz?.createdAt)}</p>
              <p>Impressions : {formatImpression(quiz?.impression)}</p>
            </div>
          </div>
          {quiz?.quizType === "Q&A" &&
            quiz?.slides?.map((slide, index) => (
              <div className="questionAnalysis" key={index}>
                <p>
                  <span>Q.{index + 1}</span> {slide.question}
                </p>
                <div className="answereAnalysis">
                  <div className="answereBox">
                    <p>{slide.correctAnswerCount + slide.wrongAnswerCount}</p>
                    <p>people Attempted the question</p>
                  </div>
                  <div className="answereBox">
                    <p>{slide.correctAnswerCount}</p>
                    <p>people Answered Correctly</p>
                  </div>
                  <div className="answereBox">
                    <p>{slide.wrongAnswerCount}</p>
                    <p>people Answered Incorrectly</p>
                  </div>
                </div>
              </div>
            ))}
          {quiz?.quizType === "Poll" &&
            quiz?.slides?.map((slide, index) => (
              <div className="questionAnalysis" key={index}>
                <p>
                  <span>Q.{index + 1}</span> {slide.question}
                </p>
                <div className="answereAnalysis">
                  {slide?.options?.map((option, i) => (
                    <div className="optionSelectedBox">
                      <p>{option.selectionCount}</p>
                      <p>Option {i + 1}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default QuestionAnalysis;
