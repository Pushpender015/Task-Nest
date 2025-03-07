import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateTodo, deleteTodo, toggleComplete } from '../Features/todos/todosSlice';

function TodoItem({ todo, view }) {
  const [isTodoEditable, setIsTodoEditable] = useState(false);
  const [todoMsg, setTodoMsg] = useState(todo.todo);
  const dispatch = useDispatch();

  const editTodo = () => {
    dispatch(updateTodo({ id: todo.id, todo: { todo: todoMsg } }));
    setIsTodoEditable(false);
  };

  const toggleCompleted = () => dispatch(toggleComplete(todo.id));

  if (view === 'block') {
    return (
      <div className="p-4 rounded-lg shadow-sm bg-white dark:bg-[#2A3A39] text-[#1F2A44] dark:text-[#D1D5DB]">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={toggleCompleted}
          className="mb-2"
        />
        <p className={`font-medium ${todo.completed ? 'line-through' : ''}`}>{todo.todo}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">Due: Tomorrow</p>
      </div>
    );
  }

  return (
    <div
      className={`flex items-center p-3 rounded-lg shadow-sm bg-white dark:bg-[#2A3A39] text-[#1F2A44] dark:text-[#D1D5DB] ${
        todo.completed ? 'bg-[#c6e9a7] dark:bg-[#4A5E4A]' : ''
      }`}
    >
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={toggleCompleted}
        className="mr-3"
      />
      <input
        type="text"
        value={todoMsg}
        onChange={(e) => setTodoMsg(e.target.value)}
        readOnly={!isTodoEditable}
        className={`flex-1 bg-transparent outline-none ${
          isTodoEditable ? 'border border-gray-300 dark:border-[#4B5E5D] p-1 rounded' : ''
        } ${todo.completed ? 'line-through' : ''}`}
      />
      <button
        onClick={() => (isTodoEditable ? editTodo() : setIsTodoEditable(true))}
        disabled={todo.completed}
        className="ml-2 p-2 rounded bg-gray-100 dark:bg-gray-700 disabled:opacity-50"
      >
        {isTodoEditable ? '💾' : '✏️'}
      </button>
      <button
        onClick={() => dispatch(deleteTodo(todo.id))}
        className="ml-2 p-2 rounded bg-gray-100 dark:bg-gray-700"
      >
        ❌
      </button>
    </div>
  );
}

export default TodoItem;
