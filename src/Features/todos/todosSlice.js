// src/features/todos/todosSlice.js
import { createSlice } from '@reduxjs/toolkit';

// initial state
const initialState = {
  todos: (() => {
    const stored = localStorage.getItem("todos");
    if (stored && stored !== "undefined") {
      try {
        return JSON.parse(stored);
      } catch (error) {
        console.error("Error parsing todos from localStorage:", error);
        return [];
      }
    }
    return [];
  })(),
};

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action) => {
      const newTodo = { id: Date.now(), ...action.payload };
      state.todos.unshift(newTodo);
    },
    updateTodo: (state, action) => {
      const { id, todo } = action.payload;
      const index = state.todos.findIndex(t => t.id === id);
      if (index !== -1) {
        state.todos[index] = { ...state.todos[index], ...todo };
      }
    },
    deleteTodo: (state, action) => {
      state.todos = state.todos.filter(t => t.id !== action.payload);
    },
    toggleComplete: (state, action) => {
      const index = state.todos.findIndex(t => t.id === action.payload);
      if (index !== -1) {
        state.todos[index].completed = !state.todos[index].completed;
      }
    },
    // (Optional: Add more actions for prioritization here)
  },
});

export const { addTodo, updateTodo, deleteTodo, toggleComplete } = todosSlice.actions;
export default todosSlice.reducer;
