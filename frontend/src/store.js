import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slice/userSlice";
import quizSlice from "./slice/quizSlice";

const configureAppStore = () => {
  const store = configureStore({
    reducer: {
      user: userSlice,
      quiz: quizSlice,
    },
    devTools: process.env.NODE_ENV !== "production",
  });
  return store;
};

const store = configureAppStore();
export default store;
