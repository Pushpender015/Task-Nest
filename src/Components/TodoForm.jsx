import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodo } from '../Features/todos/todosSlice';

function TodoForm() {
  const [todo, setTodo] = useState('');
  const dispatch = useDispatch();

  const add = (e) => {
    e.preventDefault();
    if (!todo) return;
    dispatch(addTodo({ todo, completed: false }));
    setTodo('');
  };

  return (
    <form onSubmit={add} className="flex mb-6">
      <input
        type="text"
        placeholder="Write Todo..."
        className="flex-1 p-2 rounded-l-lg border border-gray-300 dark:border-[#4B5E5D] bg-white dark:bg-[#2A3A39] text-[#1F2A44] dark:text-[#D1D5DB]"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />
      <button
        type="submit"
        className="p-2 rounded-r-lg bg-[#4CAF50] dark:bg-[#66BB6A] text-white"
      >
        Add
      </button>
    </form>
  );
}

export default TodoForm;
