// import React from "react";
// import { useDispatch } from "react-redux";
// import { Link } from "react-router-dom";
// import { logout } from "../features/auth/authSlice";

// function MainPage() {
//   const dispatch = useDispatch();
//   const handleLogout = () => {
//     dispatch(logout());
//   };
// return (
//     <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-blue-500 to-purple-500">
//         <div className="bg-white p-8 rounded-lg shadow-lg space-y-4">
//             <Link to="/create-transaction" className="text-blue-500 hover:underline text-xl">
//                 Pay
//             </Link>
//             <Link to="/profile" className="text-blue-500 hover:underline text-xl">
//                 Profile
//             </Link>
//             <Link to="/get-report" className="text-blue-500 hover:underline text-xl">
//                 Get Insights
//             </Link>
//             <button onClick={handleLogout} className="text-white bg-red-500 hover:bg-red-700 px-4 py-2 rounded">
//                 Logout
//             </button>
//         </div>
//     </div>
// );
// }

// export default MainPage;



import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../features/auth/authSlice";

function MainPage() {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-500 flex flex-col justify-center items-center">
      <div className="text-center text-white mb-8">
        <h1 className="text-4xl font-bold mb-4">Welcome Back to FinView!</h1>
        <p className="text-lg">
          Manage your finances effortlessly with quick access to payments, profile, and insights. Let's stay on top of your financial goals!
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 bg-white p-6 rounded-lg shadow-lg">
        {/* Pay Button */}
        <Link
          to="/create-transaction"
          className="flex flex-col items-center bg-blue-100 hover:bg-blue-200 transition-colors p-4 rounded-lg shadow-md text-center"
        >
          <svg
            className="w-10 h-10 text-blue-500 mb-2"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8c1.656 0 3-1.344 3-3s-1.344-3-3-3-3 1.344-3 3 1.344 3 3 3zm0 2c-2.656 0-8 1.344-8 4v2h16v-2c0-2.656-5.344-4-8-4z"
            />
          </svg>
          <span className="font-semibold text-blue-600">Pay</span>
        </Link>

        {/* Profile Button */}
        <Link
          to="/profile"
          className="flex flex-col items-center bg-green-100 hover:bg-green-200 transition-colors p-4 rounded-lg shadow-md text-center"
        >
          <svg
            className="w-10 h-10 text-green-500 mb-2"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 7.5C16 9.985 13.985 12 11.5 12 9.015 12 7 9.985 7 7.5S9.015 3 11.5 3 16 5.015 16 7.5zM3 20.5c0-2.486 3.02-4.5 8.5-4.5 5.48 0 8.5 2.014 8.5 4.5v.5H3v-.5z"
            />
          </svg>
          <span className="font-semibold text-green-600">Profile</span>
        </Link>

        {/* Insights Button */}
        <Link
          to="/get-report"
          className="flex flex-col items-center bg-purple-100 hover:bg-purple-200 transition-colors p-4 rounded-lg shadow-md text-center"
        >
          <svg
            className="w-10 h-10 text-purple-500 mb-2"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11 11.5v5M7 15.5v1m4-1h4v-5.5h-4m0 4h4v1M9 6.5H7m2 0v1H7M5 3.5h14v14H5z"
            />
          </svg>
          <span className="font-semibold text-purple-600">Get Insights</span>
        </Link>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="flex flex-col items-center bg-red-100 hover:bg-red-200 transition-colors p-4 rounded-lg shadow-md text-center"
        >
          <svg
            className="w-10 h-10 text-red-500 mb-2"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 16l4-4m0 0l-4-4m4 4H7m6-4v8"
            />
          </svg>
          <span className="font-semibold text-red-600">Logout</span>
        </button>
      </div>
    </div>
  );
}

export default MainPage;
