import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../Features/auth/authSlice';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === 'admin' && password === 'password') {
      dispatch(login());
    } else {
      alert('Invalid credentials. Use admin/password.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#E6F5EA] dark:bg-[#1A2E2D]">
      <div className="max-w-sm w-full bg-white dark:bg-[#2A3A39] p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-center text-[#1F2A44] dark:text-[#D1D5DB]">
          Login
        </h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            className="w-full p-2 rounded border border-gray-300 dark:border-[#4B5E5D] bg-white dark:bg-[#2A3A39] text-[#1F2A44] dark:text-[#D1D5DB]"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 rounded border border-gray-300 dark:border-[#4B5E5D] bg-white dark:bg-[#2A3A39] text-[#1F2A44] dark:text-[#D1D5DB]"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="w-full p-2 bg-[#4CAF50] dark:bg-[#66BB6A] text-white rounded"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;