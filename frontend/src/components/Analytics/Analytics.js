import React, { useEffect, useState } from "react";
import "./Analytics.css";
import Sidebar from "../Sidebar/Sidebar";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { IoShareSocial } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getQuizzesByUser } from "../../actions/quizAction";
import { deleteQuizReset } from "../../slice/quizSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import QuizDelete from "../Quiz/QuizDelete/QuizDelete";

const Analytics = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedQuizId, setSelectedQuizId] = useState("");
  const [isDeleted, SetIsDeleted] = useState(false);
  const { userQuizzes, isDeletedQuiz } = useSelector((state) => state.quiz);
  const { userId, isAuthenticated } = useSelector((state) => state.user);
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

  const handleCopyLink = (quizId, quizType) => {
    let link;
    if (quizType === "Q&A") {
      link = `${process.env.REACT_APP_FRONTEND_URL}/quiz-play/${quizId}`;
    } else if (quizType === "Poll") {
      link = `${process.env.REACT_APP_FRONTEND_URL}/poll-play/${quizId}`;
    }

    if (link) {
      navigator.clipboard
        .writeText(link)
        .then(() => {
          toast.success("Link copied to Clipboard", {
            position: "top-right",
            autoClose: 1000,
          });
        })
        .catch((error) => {
          toast.error("Couldn't copy the link", {
            position: "top-right",
          });
        });
    } else {
      toast.error("Invalid quiz type", {
        position: "top-right",
      });
    }
  };

  const handleDeleteClick = (quizId) => {
    setSelectedQuizId(quizId);
    SetIsDeleted(true);
  };

  const handleCancel = () => {
    SetIsDeleted(false);
    setSelectedQuizId("");
  };

  useEffect(() => {
    if (isDeletedQuiz) {
      dispatch(deleteQuizReset());
    } else {
      dispatch(getQuizzesByUser(userId));
    }
  }, [userId, dispatch, isAuthenticated, isDeletedQuiz]);

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="analyticsContainer">
        <h1>Quiz Analysis</h1>
        {userQuizzes?.length > 0 ? (
          <div>
            <table>
              <thead>
                <tr className="table-row">
                  <th>S.No</th>
                  <th>Quiz Name</th>
                  <th>Created on</th>
                  <th>Impression</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {userQuizzes?.map((quiz, index) => (
                  <tr
                    key={index}
                    className={
                      index % 2 !== 0 ? "table-row even-row" : "table-row"
                    }
                  >
                    <td>{index + 1}</td>
                    <td>{quiz.quizName}</td>
                    <td>{convertDate(quiz.createdAt)}</td>
                    <td>{formatImpression(quiz.impression)}</td>
                    <td>
                      <button
                        style={{ color: "#854CFF" }}
                        onClick={() => {
                          navigate("/quiz-post", {
                            state: { quizData: quiz },
                          });
                        }}
                      >
                        <i>
                          <FaRegEdit />
                        </i>
                      </button>
                      <button
                        style={{ color: "#D60000", margin: "0 0.75rem" }}
                        onClick={() => handleDeleteClick(quiz._id)}
                      >
                        <i>
                          <RiDeleteBin6Fill />
                        </i>
                      </button>
                      <button
                        style={{ color: "#60B84B" }}
                        onClick={() => handleCopyLink(quiz._id, quiz.quizType)}
                      >
                        <i>
                          <IoShareSocial />
                        </i>
                      </button>
                    </td>
                    <td>
                      <Link to={`/question-wise-analysis/${quiz._id}`}>
                        Question Wise Analysis
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="noquizzesContainer">
            You have not added any quiz yet!
          </div>
        )}
      </div>
      {isDeleted && (
        <QuizDelete quizId={selectedQuizId} handleCancel={handleCancel} />
      )}
    </div>
  );
};

export default Analytics;
