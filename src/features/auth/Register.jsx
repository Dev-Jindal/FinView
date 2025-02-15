// import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { register } from './authSlice';
// import { useNavigate } from 'react-router-dom';

// const Register = () => {
//   const [username, setUsername] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [balance, setBalance] = useState('');
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleRegister = async (e) => {
//     e.preventDefault();
//     const result = await dispatch(register({ username, email, password, balance }));
//     if (register.fulfilled.match(result)) {
//       navigate('/login');
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 to-purple-500">
//       <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
//       <h1 className="text-3xl font-bold text-center mb-6">Register</h1>
//       <form onSubmit={handleRegister} className="bg-white p-6 rounded shadow-md w-full max-w-md">
//         <div className="mb-4">
//           <label className="block text-gray-700">Username:</label>
//           <input
//             type="text"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             required
//             className="mt-1 p-2 w-full border rounded"
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700">Email:</label>
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//             className="mt-1 p-2 w-full border rounded"
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700">Password:</label>
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//             className="mt-1 p-2 w-full border rounded"
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700">Balance:</label>
//           <input
//             type="number"
//             value={balance}
//             onChange={(e) => setBalance(e.target.value)}
//             required
//             className="mt-1 p-2 w-full border rounded"
//           />
//         </div>
//         <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700">
//           Register
//         </button>

//       </form>
//       </div>
//     </div>
//   );
// };

// export default Register;



import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { register } from './authSlice';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [balance, setBalance] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const result = await dispatch(register({ username, email, password, balance }));
    if (register.fulfilled.match(result)) {
      navigate('/login');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 to-purple-500 px-4">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6">Register</h1>
        <form onSubmit={handleRegister} className="bg-white p-6 rounded shadow-md w-full">
          <div className="mb-4">
            <label className="block text-gray-700">Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="mt-1 p-2 w-full border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 p-2 w-full border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 p-2 w-full border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Balance:</label>
            <input
              type="number"
              value={balance}
              onChange={(e) => setBalance(e.target.value)}
              required
              className="mt-1 p-2 w-full border rounded"
            />
          </div>
          <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 w-full">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
