import "./App.css";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignupLogin from "./components/RegisterLogin/RegisterLogin";
import Dashboard from "./components/Dashboard/Dashboard";
import Analytics from "./components/Analytics/Analytics";
import QuestionAnalysis from "./components/QuestionAnalysis/QuestionAnalysis";
import AddQuiz from "./components/Quiz/QuizForm/QuizAdd";
import QuizDetails from "./components/Quiz/QuizDetails/QuizDetails";
import PollDetails from "./components/Quiz/PollDetails/PollDetails";
import { loadUser } from "./actions/userAction";
import ProtectedRoute from "./components/ProtectedRoutes/ProtectedRoute";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignupLogin />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/analytics"
          element={
            <ProtectedRoute>
              <Analytics />
            </ProtectedRoute>
          }
        />
        <Route
          path="/question-wise-analysis/:id"
          element={
            <ProtectedRoute>
              <QuestionAnalysis />
            </ProtectedRoute>
          }
        />
        <Route
          path="/quiz-post"
          element={
            <ProtectedRoute>
              <>
                <Analytics />
                <AddQuiz />
              </>
            </ProtectedRoute>
          }
        />
        <Route path="/quiz-play/:id" element={<QuizDetails />} />
        <Route path="/poll-play/:id" element={<PollDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
