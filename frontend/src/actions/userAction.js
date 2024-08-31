import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  loginRequest,
  loginSuccess,
  loginFailure,
  registerRequest,
  registerSuccess,
  registerFailure,
  logoutRequest,
  logoutSuccess,
  logoutFailure,
  loadUserSuccess,
  loadUserRequest,
  loadUserFailure,
} from "../slice/userSlice";

const backendUrl = process.env.REACT_APP_BACKEND_URL;
console.log(backendUrl);

// Register User
export const register = (userData) => async (dispatch) => {
  try {
    dispatch(registerRequest());
    const { data } = await axios.post(`${backendUrl}/user/register`, userData);
    localStorage.setItem("token", data.token);
    dispatch(registerSuccess(data));
    toast.success("Sign Up Successful", {
      position: "bottom-right",
      autoClose: 2000,
    });
  } catch (error) {
    const errorMessage = error.response.data.errorMessage || {};
    dispatch(registerFailure(error.response.data));
    toast.error("Registration failed", {
      position: "bottom-left",
      autoClose: 2000,
    });
    throw new Error(JSON.stringify(errorMessage));
  }
};

// Login User
export const login = (userData) => async (dispatch) => {
  try {
    dispatch(loginRequest());
    const { data } = await axios.post(`${backendUrl}/user/login`, userData);
    localStorage.setItem("token", data.token);
    dispatch(loginSuccess(data));
    toast.success("Login Successful", {
      position: "bottom-right",
      autoClose: 2000,
    });
  } catch (error) {
    dispatch(loginFailure(error.response.data));
    toast.error("Login failed", {
      position: "bottom-left",
      autoClose: 2000,
    });
  }
};

// Load User
export const loadUser = () => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(loadUserFailure());
      return;
    }
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    dispatch(loadUserRequest());
    const { data } = await axios.get(`${backendUrl}/user/me`);
    dispatch(loadUserSuccess(data));
  } catch (error) {
    dispatch(loadUserFailure());
  }
};

// Logout User
export const logout = () => async (dispatch) => {
  try {
    dispatch(logoutRequest());
    await axios.get(`${backendUrl}/user/logout`);
    dispatch(logoutSuccess());
    localStorage.removeItem("token");
    toast.success("Logout Successful", {
      position: "bottom-right",
      autoClose: 1000,
    });
  } catch (error) {
    dispatch(logoutFailure());
    toast.error(error.response.data);
  }
};
