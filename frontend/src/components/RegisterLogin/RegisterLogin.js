import React, { useEffect, useState } from "react";
import "./RegisterLogin.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login, register } from "../../actions/userAction";
import { clearRegisterError, clearLoginError } from "../../slice/userSlice";
const RegisterLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("login");
  const { isAuthenticated, registerErrors, loginErrors } = useSelector(
    (state) => state.user
  );
  const [loginFormData, setLoginFormData] = useState({
    email: "",
    password: "",
  });
  const [registerFormData, setRegisterFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleRegisterFormChange = (e) => {
    dispatch(clearRegisterError(e.target.name));
    setRegisterFormData({
      ...registerFormData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLoginFormChange = (e) => {
    dispatch(clearLoginError(e.target.name));
    setLoginFormData({ ...loginFormData, [e.target.name]: e.target.value });
  };

  const loginFormSubmit = (e) => {
    e.preventDefault();
    dispatch(login(loginFormData));
  };

  const registerFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(register(registerFormData));
      setRegisterFormData("");
      setActiveTab("login");
    } catch (error) {
      console.error("Registration failed:", error.message);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="register-loginContainer">
      <h2 className="formHeading">QUIZZIE</h2>
      <div className="tabs">
        <div
          className={`${activeTab === "signup" ? "tab-active " : ""}`}
          onClick={() => setActiveTab("signup")}
        >
          Sign Up
        </div>
        <div
          className={`${activeTab === "login" ? "tab-active " : ""}`}
          onClick={() => setActiveTab("login")}
        >
          Log In
        </div>
      </div>
      <div>
        {activeTab === "signup" && (
          <form onSubmit={registerFormSubmit} className="form">
            <div className="inputContainer">
              <label>Name</label>
              <input
                type="text"
                placeholder={registerErrors.name || ""}
                value={registerErrors.name ? "" : registerFormData.name}
                name="name"
                onChange={handleRegisterFormChange}
                className={`inputField ${registerErrors.name ? "error" : ""}`}
              />
            </div>
            <div className="inputContainer">
              <label>Email</label>
              <input
                type="text"
                placeholder={registerErrors.email || ""}
                value={registerErrors.email ? "" : registerFormData.email}
                name="email"
                onChange={handleRegisterFormChange}
                className={`inputField ${registerErrors.email ? "error" : ""}`}
              />
            </div>
            <div className="inputContainer">
              <label>Password</label>
              <input
                type="password"
                placeholder={registerErrors.password || ""}
                value={registerErrors.password ? "" : registerFormData.password}
                name="password"
                onChange={handleRegisterFormChange}
                className={`inputField ${
                  registerErrors.password ? "error" : ""
                }`}
              />
            </div>
            <div className="inputContainer">
              <label>Confirm Password</label>
              <input
                type="password"
                placeholder={registerErrors.confirmPassword || ""}
                value={
                  registerErrors.confirmPassword
                    ? ""
                    : registerFormData.confirmPassword
                }
                name="confirmPassword"
                onChange={handleRegisterFormChange}
                className={`inputField ${
                  registerErrors.confirmPassword ? "error" : ""
                }`}
              />
            </div>
            <div className="buttonContainer">
              <button type="submit">Sign-Up</button>
            </div>
          </form>
        )}
        {activeTab === "login" && (
          <form onSubmit={loginFormSubmit} className="form">
            <div className="inputContainer">
              <label>Email</label>
              <input
                type="text"
                placeholder={loginErrors.email || ""}
                value={loginErrors.email ? "" : loginFormData.email}
                name="email"
                onChange={handleLoginFormChange}
                className={`inputField ${loginErrors.email ? "error" : ""}`}
              />
            </div>
            <div className="inputContainer">
              <label>Password</label>
              <input
                type="password"
                placeholder={loginErrors.password || ""}
                value={loginErrors.password ? "" : loginFormData.password}
                name="password"
                onChange={handleLoginFormChange}
                className={`inputField ${loginErrors.password ? "error" : ""}`}
              />
            </div>
            <div className="buttonContainer">
              <button type="submit" className="loginBtn">
                Log In
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default RegisterLogin;
