import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  isAuthenticated: false,
  userId: null,
  registerErrors: {},
  loginErrors: {},
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    registerRequest: (state) => {
      state.loading = true;
      state.registerErrors = {};
    },
    registerSuccess: (state, action) => {
      state.loading = false;
      state.registerErrors = {};
    },
    registerFailure: (state, action) => {
      state.loading = false;
      state.registerErrors = action.payload.errorMessage;
    },

    clearRegisterError: (state, action) => {
      const fieldName = action.payload;
      delete state.registerErrors[fieldName];
    },

    loginRequest: (state) => {
      state.loading = true;
      state.loginErrors = {};
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.userId = action.payload.user._id;
      state.loginErrors = {};
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.userId = null;
      state.loginErrors = action.payload.errorMessage;
    },
    clearLoginError: (state, action) => {
      const fieldName = action.payload;
      delete state.loginErrors[fieldName];
    },
    logoutRequest: (state) => {
      state.loading = true;
    },
    logoutSuccess: (state) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.userId = null;
    },
    logoutFailure: (state) => {
      state.loading = false;
    },
    loadUserRequest: (state) => {
      state.loading = true;
      state.isAuthenticated = true;
    },
    loadUserSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.userId = action.payload.user._id;
      state.user = action.payload.user;
    },
    loadUserFailure: (state) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.userId = null;
      state.user = null;
    },
  },
});

export const {
  registerRequest,
  registerSuccess,
  registerFailure,
  clearRegisterError,
  loginRequest,
  loginSuccess,
  loginFailure,
  clearLoginError,
  logoutRequest,
  logoutSuccess,
  logoutFailure,
  loadUserSuccess,
  loadUserFailure,
  loadUserRequest,
} = userSlice.actions;

export default userSlice.reducer;
