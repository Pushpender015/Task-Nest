import React, { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { logout } from '../Features/auth/authSlice';
import { ThemeContext } from '../context/ThemeContext.jsx';

function Sidebar() {
  const dispatch = useDispatch();
  const { theme } = useContext(ThemeContext);
  const todos = useSelector((state) => state.todos.todos);
  
  const completedTodos = todos.filter((todo) => todo.completed).length;
  const progress = todos.length > 0 ? (completedTodos / todos.length) * 100 : 0;

  return (
    <div className="fixed top-0 left-0 w-64 h-screen bg-[#E6F5EA] dark:bg-[#1A2E2D] text-[#1F2A44] dark:text-[#D1D5DB] p-4 flex flex-col transition-all duration-300 md:w-64 md:visible invisible">
      {/* User Profile */}
      <div className="flex items-center mb-6">
        <img
          src="https://randomuser.me/api/portraits/men/1.jpg"
          alt="User Avatar"
          className="w-12 h-12 rounded-full mr-3 object-cover"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/50'; // Fallback URL
            console.log('Failed to load placeholder image');
          }}
        />
        <div>
          <p className="font-bold text-lg">user</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">user@example.com</p>
        </div>
      </div>
      {/* Navigation */}
      <nav className="flex-1">
        <a
          href="#"
          className="flex items-center p-2 mb-2 rounded bg-[#4CAF50] dark:bg-[#66BB6A] text-white"
        >
          <span className="mr-2">📋</span> To Do
        </a>
        <a href="#" className="flex items-center p-2 mb-2 rounded hover:bg-gray-200 dark:hover:bg-[#4B5E5D]">
          <span className="mr-2">📅</span> Calendar
        </a>
        <a href="#" className="flex items-center p-2 mb-2 rounded hover:bg-gray-200 dark:hover:bg-[#4B5E5D]">
          <span className="mr-2">📈</span> Projects
        </a>
      </nav>
      {/* New Larger Progress Bar */}
      <div className="mt-auto mb-4 flex justify-center">
        <div className="w-24 h-24">
          <CircularProgressbar
            value={progress}
            text={`${Math.round(progress)}%`}
            styles={{
              path: { stroke: theme === 'light' ? '#FF5722' : '#FF8A65' },
              trail: { stroke: theme === 'light' ? '#BDBDBD' : '#616161' },
              text: { fill: theme === 'light' ? '#FF5722' : '#FF8A65', fontSize: '24px' },
            }}
          />
        </div>
      </div>
      {/* Sign Out */}
      <button
        onClick={() => dispatch(logout())}
        className="text-red-500 hover:underline"
      >
        Sign Out
      </button>
    </div>
  );
}

export default Sidebar;
