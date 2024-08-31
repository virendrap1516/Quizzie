import React, { useEffect } from "react";
import "./Dashboard.css";
import Sidebar from "../Sidebar/Sidebar";
import eyeview from "../../assets/icon-park-outline_eyes.png";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getQuizzesByUser } from "../../actions/quizAction";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userQuizzes } = useSelector((state) => state.quiz);
  const { userId } = useSelector((state) => state.user);

  const totalQuestions =
    userQuizzes?.reduce((total, quiz) => total + quiz.slides.length, 0) || 0;
  const totalImpressions =
    userQuizzes?.reduce((total, quiz) => total + quiz.impression, 0) || 0;
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
    if (impression >= 1000) {
      return (impression / 1000).toFixed(1) + "K";
    }
    return impression.toString();
  };

  useEffect(() => {
    dispatch(getQuizzesByUser(userId, true));
  }, [userId, dispatch]);

  const playQuiz = (quizId, quizType) => {
    if (quizType === "Q&A") {
      navigate(`/quiz-play/${quizId}`);
    } else if (quizType === "Poll") {
      navigate(`/poll-play/${quizId}`);
    }
  };

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="dashboardContainer">
        <div className="dashboardSummary">
          <div className="dashboardSummaryItem" style={{ color: "#FF5D01" }}>
            <p>
              <span>{userQuizzes?.length ? userQuizzes?.length : 0}</span> Quiz
              <br /> Created
            </p>
          </div>
          <div className="dashboardSummaryItem" style={{ color: "#60B84B" }}>
            <p>
              <span>{totalQuestions}</span> questions <br /> Created
            </p>
          </div>
          <div className="dashboardSummaryItem" style={{ color: "#5076FF" }}>
            <p>
              <span>{formatImpression(totalImpressions)}</span> Total
              <br /> Impressions
            </p>
          </div>
        </div>
        <div className="dashboardQuizs">
          <h1>Trending Quizs</h1>
          {userQuizzes?.length > 0 ? (
            <div className="dashboardQuizsContainer">
              {userQuizzes.map((quiz, index) => (
                <div
                  className="quiz"
                  key={index}
                  onClick={() => playQuiz(quiz._id, quiz.quizType)}
                >
                  <div>
                    <p>{quiz.quizName}</p>
                    <p>
                      {formatImpression(quiz.impression)}
                      <img src={eyeview} alt="" />
                    </p>
                  </div>
                  <p>Created on : {convertDate(quiz.createdAt)}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="noquizzesContainer">
              You have not added any quiz yet!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
