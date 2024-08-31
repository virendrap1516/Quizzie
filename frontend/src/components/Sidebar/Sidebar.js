import React, { useState, useEffect } from "react";
import "./Sidebar.css";
import { Link, useLocation } from "react-router-dom";
import { logout } from "../../actions/userAction";
import { useDispatch } from "react-redux";
const Sidebar = () => {
  const [activeLink, setActiveLink] = useState("/dashboard");
  const dispatch = useDispatch();
  const location = useLocation();

  const handleLogout = () => {
    dispatch(logout());
  };

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location.pathname]);

  return (
    <div className="sidebar">
      <h2 className="dashboardHeading">QUIZZIE</h2>
      <div>
        <Link
          to="/dashboard"
          className={activeLink === "/dashboard" ? "link-active" : ""}
        >
          Dashboard
        </Link>
        <Link
          to="/analytics"
          className={activeLink === "/analytics" ? "link-active" : ""}
        >
          Analytics
        </Link>
        <Link
          to="/quiz-post"
          className={activeLink === "/quiz-post" ? "link-active" : ""}
        >
          Create Quiz
        </Link>
      </div>
      <p className="logoutBtn" onClick={handleLogout}>
        Logout
      </p>
    </div>
  );
};

export default Sidebar;
