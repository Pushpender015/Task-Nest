import React, { useState, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import TodoForm from './Components/TodoForm';
import TodoItem from './Components/TodoItem';
import Login from './Components/Login';
import WeatherWidget from './Components/WeatherWidget';
import Sidebar from './Components/Sidebar';
import { ThemeContext } from './context/ThemeContext.jsx';

function App() {
  const dispatch = useDispatch();
  const { theme, toggleTheme } = useContext(ThemeContext);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const todos = useSelector((state) => state.todos.todos);
  const [view, setView] = useState('list'); // 'list' or 'block'

  if (!isAuthenticated) return <Login />;

  const completedTodos = todos.filter((todo) => todo.completed).length;
  const progress = todos.length > 0 ? (completedTodos / todos.length) * 100 : 0;

  return (
    <div className="flex min-h-screen bg-[#E6F5EA] dark:bg-[#1A2E2D] font-sans text-[#1F2A44] dark:text-[#D1D5DB]">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 ml-0 md:ml-64 p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
            <h1 className="text-xl md:text-2xl font-bold mb-4 sm:mb-0">
              Manage Your Todos
            </h1>
            <div className="flex items-center space-x-3">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full bg-gray-200 dark:bg-[#4B5E5D]"
              >
                {theme === 'light' ? '🌙' : '☀️'}
              </button>
              <button
                onClick={() => setView(view === 'list' ? 'block' : 'list')}
                className="p-2 rounded bg-gray-200 dark:bg-[#4B5E5D]"
              >
                {view === 'list' ? 'Block' : 'List'}
              </button>
              {/* <button
                onClick={() => dispatch(logout())}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Logout
              </button> */}
            </div>
          </div>

          {/* Search and Progress */}
          <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
            <input
              type="text"
              placeholder="Search..."
              className="flex-1 p-2 rounded border border-gray-300 dark:border-[#4B5E5D] bg-white dark:bg-[#2A3A39] focus:outline-none focus:ring-2 focus:ring-[#4CAF50] dark:focus:ring-[#66BB6A]"
            />
            <div className="w-14 h-14">
              <CircularProgressbar
                value={progress}
                text={`${Math.round(progress)}%`}
                styles={{
                  path: { stroke: theme === 'light' ? '#4CAF50' : '#66BB6A' },
                  trail: { stroke: theme === 'light' ? '#d6d6d6' : '#4B5E5D' },
                  text: { fill: theme === 'light' ? '#1F2A44' : '#D1D5DB', fontSize: '24px' },
                }}
              />
            </div>
          </div>

          {/* Weather Widget and Todo Form */}
          <WeatherWidget />
          <TodoForm />

          {/* Todo List/Block */}
          <div
            className={
              view === 'list'
                ? 'space-y-3'
                : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'
            }
          >
            {todos.map((todo) => (
              <TodoItem key={todo.id} todo={todo} view={view} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;