// src/features/auth/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: (() => {
    const stored = localStorage.getItem("isAuthenticated");
    if (stored && stored !== "undefined") {
      try {
        return JSON.parse(stored);
      } catch (error) {
        console.error("Error parsing isAuthenticated from localStorage:", error);
        return false;
      }
    }
    return false;
  })(),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state) => {
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.isAuthenticated = false;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
