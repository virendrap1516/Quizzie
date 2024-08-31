import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Loader from "../Loader/Loader";

const ProtectedRoute = ({ children }) => {
  const { loading } = useSelector((state) => state.user);
  const token = localStorage.getItem("token");
  if (loading) {
    return <Loader />;
  }
  return token ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
