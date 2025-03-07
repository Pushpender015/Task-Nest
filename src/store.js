// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './Features/auth/authSlice';
import todosReducer from './Features/todos/todosSlice';

const store = configureStore({
  reducer: {
    todos: todosReducer,
    auth: authReducer,
  },
});

// Persist state changes to localStorage
store.subscribe(() => {
  const state = store.getState();
  localStorage.setItem("todos", JSON.stringify(state.todos.todos));
  localStorage.setItem("isAuthenticated", JSON.stringify(state.auth.isAuthenticated));
});

export default store;
