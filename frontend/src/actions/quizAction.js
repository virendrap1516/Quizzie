import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  createQuizRequest,
  createQuizSuccess,
  createQuizFailure,
  getQuizRequest,
  getQuizSuccess,
  getQuizFailure,
  getQuizByUserRequest,
  getQuizByUserSuccess,
  getQuizByUserFailure,
  editQuizRequest,
  editQuizSuccess,
  editQuizFailure,
  deleteQuizRequest,
  deleteQuizSuccess,
  deleteQuizFailure,
  answerCountsRequest,
  answerCountsSuccess,
  answerCountsFailure,
  optionCountsRequest,
  optionCountsSuccess,
  optionCountsFailure,
} from "../slice/quizSlice";
const backendUrl = process.env.REACT_APP_BACKEND_URL;

// Create a new quiz
export const createQuiz = (quizData) => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    dispatch(createQuizRequest());
    console.log(quizData);
    const { data } = await axios.post(`${backendUrl}/quiz/create`, quizData);
    dispatch(createQuizSuccess(data));
    toast.success("Quiz created successfully", {
      position: "top-center",
      autoClose: 2000,
    });
  } catch (error) {
    dispatch(createQuizFailure());
    toast.error(error.response.data.errorMessage, { position: "top-center" });
  }
};

// Get a quiz detail
export const getQuiz = (quizId, result) => async (dispatch) => {
  try {
    dispatch(getQuizRequest());
    if (!result) {
      const { data } = await axios.get(`${backendUrl}/quiz/play/${quizId}`);
      dispatch(getQuizSuccess(data));
    } else {
      const { data } = await axios.get(`${backendUrl}/quiz/result/${quizId}`);
      dispatch(getQuizSuccess(data));
    }
  } catch (error) {
    dispatch(getQuizFailure());
    toast.error(error);
  }
};

// Get user quizzes
export const getQuizzesByUser = (userId, impression) => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    dispatch(getQuizByUserRequest());
    const { data } = await axios.get(
      `${backendUrl}/quiz/all-quizzes?userId=${userId}&filterByImpression=${impression}`
    );
    dispatch(getQuizByUserSuccess(data));
  } catch (error) {
    dispatch(getQuizByUserFailure());
    toast.error(error.response.data);
  }
};

// Edit quiz
export const updateQuiz = (quizId, updatedData) => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    console.log(updatedData);
    console.log(quizId);
    dispatch(editQuizRequest());
    const { data } = await axios.put(
      `${backendUrl}/quiz/edit/${quizId}`,
      updatedData
    );
    dispatch(editQuizSuccess(data));
    toast.success("Quiz updated successfully", {
      position: "top-center",
      autoClose: 2000,
    });
  } catch (error) {
    dispatch(editQuizFailure());
    toast.error(error.response.data.errorMessage, { position: "top-center" });
  }
};

// Delete quiz
export const deleteQuiz = (quizId) => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    dispatch(deleteQuizRequest());
    const { data } = await axios.delete(`${backendUrl}/quiz/delete/${quizId}`);
    dispatch(deleteQuizSuccess(data));
    toast.success("Quiz deleted successfully", {
      position: "top-right",
      autoClose: 2000,
    });
  } catch (error) {
    dispatch(deleteQuizFailure(error));
    toast.error(error.response.data.errorMessage, { position: "top-right" });
  }
};

// Updated answer count of Q&A type quiz
export const answerCounts =
  (quizId, slideIndex, isCorrect) => async (dispatch) => {
    try {
      dispatch(answerCountsRequest());
      const { data } = await axios.post(`${backendUrl}/quiz/answerCounts`, {
        quizId,
        slideIndex,
        isCorrect,
      });
      dispatch(answerCountsSuccess(data));
    } catch (error) {
      dispatch(answerCountsFailure(error));
      toast.error(error.response.data.errorMessage, { position: "top-right" });
    }
  };

// option count of poll type quiz
export const optionSubmit =
  (quizId, slideIndex, selectedOption) => async (dispatch) => {
    try {
      dispatch(optionCountsRequest());
      const { data } = await axios.post(`${backendUrl}/quiz/optionSubmit`, {
        quizId,
        slideIndex,
        selectedOption,
      });
      dispatch(optionCountsSuccess(data));
    } catch (error) {
      dispatch(optionCountsFailure(error));
      toast.error(error.response.data.errorMessage, { position: "top-right" });
    }
  };
