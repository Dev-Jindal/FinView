
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from './authSlice';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error } = useSelector((state) => state.auth);

  const handleLogin = async (e) => {
    e.preventDefault();
    const result = await dispatch(login({ username, password }));
    if (login.fulfilled.match(result)) {
      navigate('/main-page');
    }
  };

  return (
    <div className="flex bg-gradient-to-br from-blue-500 to-purple-500 justify-center items-center h-screen px-4">
      <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6">Login</h1>
        <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow-md w-full">
          <div className="mb-4">
            <label className="block text-lg font-semibold mb-2">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-lg font-semibold mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-lg font-semibold mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 w-full"
          >
            Login
          </button>
          {error && <p className="text-red-500 text-center mt-4">{error.message}</p>}
        </form>
      </div>
    </div>
  );
};

export default Login;
