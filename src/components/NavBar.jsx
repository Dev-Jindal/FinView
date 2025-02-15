import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/authSlice";


const Navbar = () => {
  const dispatch = useDispatch();
  // const { token } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <ul className="flex space-x-4 p-4 bg-gray-800 text-white">
      <li>
        <Link to="/profile" className="hover:text-gray-400">Profile</Link>
      </li>
      <li>
        <Link to="/create-transaction" className="hover:text-gray-400">Pay</Link>
      </li>
      <li>
        <Link to="/get-report" className="hover:text-gray-400">Get Report</Link>
      </li>
      <li>
        <Link to="/" className="hover:text-gray-400">Home</Link>
      </li>
      <li>
        <button onClick={handleLogout} className="hover:text-gray-400">Logout</button>
      </li>
      {/* {!token && (
        <>
          <li>
            <Link to="/login" className="hover:text-gray-400">Login</Link>
          </li>
          <li>
            <Link to="/register" className="hover:text-gray-400">Register</Link>
          </li>
        </>
      )}
      {token && (
        <li>
          <button onClick={handleLogout} className="hover:text-gray-400">Logout</button>
        </li>
      )} */}
    </ul>
  );
};

export default Navbar;
