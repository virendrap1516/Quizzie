import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  quizLoading: false,
  quizzesLoading: false,
  quizzes: [],
  userQuizzes: null,
  quiz: null,
  newQuiz: false,
  newQuizId: null,
  isUpdatedQuiz: false,
  isDeletedQuiz: false,
  answerCountsLoading: false,
  answerCounts: false,
  optionCountsLoading: false,
  optionCounts: false,
};

const quizSlice = createSlice({
  initialState,
  name: "quiz",
  reducers: {
    createQuizRequest: (state) => {
      state.quizzesLoading = true;
      state.newQuiz = false;
      state.newQuizId = null;
    },
    createQuizSuccess: (state, action) => {
      state.quizzesLoading = false;
      state.newQuiz = true;
      state.newQuizId = action.payload.quizId;
    },
    createQuizFailure: (state) => {
      state.quizzesLoading = false;
      state.newQuiz = false;
    },
    // getQuizzesRequest: (state) => {
    //   state.quizzesLoading = true;
    // },
    // getQuizzesSuccess: (state, action) => {
    //   state.quizzesLoading = false;
    //   state.quizzes = action.payload.quizzes;
    // },
    // getQuizzesFailure: (state) => {
    //   state.quizzesLoading = false;
    // },
    getQuizByUserRequest: (state) => {
      state.quizzesLoading = true;
    },
    getQuizByUserSuccess: (state, action) => {
      state.quizzesLoading = false;
      state.userQuizzes = action.payload.quizzes;
    },
    getQuizByUserFailure: (state) => {
      state.quizzesLoading = false;
    },
    getQuizRequest: (state) => {
      state.quizLoading = true;
    },
    getQuizSuccess: (state, action) => {
      state.quizLoading = false;
      state.quiz = action.payload.quiz;
    },
    getQuizFailure: (state) => {
      state.quizLoading = false;
    },
    editQuizRequest: (state) => {
      state.quizLoading = true;
      state.isUpdatedQuiz = false;
      state.newQuizId = null;
    },
    editQuizSuccess: (state, action) => {
      state.quizLoading = false;
      state.quiz = action.payload.quiz;
      state.newQuizId = action.payload.quizId;
      state.isUpdatedQuiz = true;
    },
    editQuizFailure: (state) => {
      state.quizLoading = false;
      state.isUpdatedQuiz = false;
    },
    deleteQuizRequest: (state) => {
      state.quizLoading = true;
      state.isDeletedQuiz = false;
    },
    deleteQuizSuccess: (state, action) => {
      state.quizLoading = false;
      state.isDeletedQuiz = true;
    },
    deleteQuizFailure: (state) => {
      state.quizLoading = false;
      state.isDeletedQuiz = false;
    },
    deleteQuizReset: (state) => {
      state.isDeletedQuiz = false;
    },
    answerCountsRequest: (state) => {
      state.answerCountsLoading = true;
      state.answerCounts = false;
    },
    answerCountsSuccess: (state, action) => {
      state.answerCountsLoading = false;
      state.answerCounts = true;
      // state.quiz.slides[action.payload.slideIndex] = action.payload.slide;
    },
    answerCountsFailure: (state) => {
      state.answerCountsLoading = false;
    },
    optionCountsRequest: (state) => {
      state.optionCountsLoading = true;
      state.optionCounts = false;
    },
    optionCountsSuccess: (state, action) => {
      state.optionCountsLoading = false;
      state.optionCounts = true;
    },
    optionCountsFailure: (state) => {
      state.optionCountsLoading = false;
    },
  },
});

export const {
  createQuizRequest,
  createQuizSuccess,
  createQuizFailure,
  getQuizzesRequest,
  getQuizzesSuccess,
  getQuizzesFailure,
  getQuizByUserRequest,
  getQuizByUserSuccess,
  getQuizByUserFailure,
  getQuizRequest,
  getQuizSuccess,
  getQuizFailure,
  editQuizRequest,
  editQuizSuccess,
  editQuizFailure,
  deleteQuizRequest,
  deleteQuizSuccess,
  deleteQuizFailure,
  deleteQuizReset,
  answerCountsRequest,
  answerCountsSuccess,
  answerCountsFailure,
  optionCountsRequest,
  optionCountsSuccess,
  optionCountsFailure,
} = quizSlice.actions;

export default quizSlice.reducer;
