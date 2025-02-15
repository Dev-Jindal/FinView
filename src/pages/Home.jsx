// import React from "react";
// import { Link } from "react-router-dom";
// // import "./Home.css";

// const Home = () => {
//   return (
//     <div className="max-w-4xl my-10 mx-auto p-6 bg-white rounded-lg shadow-md bg-gradient-to-br from-blue-500 to-purple-500">
//       <h1 className="text-4xl  font-bold mb-4 text-center">Welcome to FinView</h1>
//       <p className="text-lg mb-6 text-center">
//         FinView is your personal financial companion designed to make managing and analyzing transactions simple, secure, and efficient. With FinView, you can not only track payments but also gain deep insights into your spending patterns through customizable reports and charts.
//       </p>
//       <div className="mb-6">
//         <h2 className="text-2xl font-semibold mb-4">Key Features:</h2>
//         <ul className="list-disc list-inside space-y-2">
//           <li>
//             <strong>Secure Transactions:</strong> Make payments effortlessly while ensuring top-notch data security.
//           </li>
//           <li>
//             <strong>Customizable Insights:</strong> Define your own categories, keywords, and date ranges to generate personalized financial reports.
//           </li>
//           <li>
//             <strong>Visual Analytics:</strong> Get detailed insights into your transactions presented as easy-to-understand charts and graphs.
//           </li>
//           <li>
//             <strong>User-Friendly Interface:</strong> Navigate with ease and enjoy a seamless financial management experience.
//           </li>
//         </ul>
//       </div>
//       <div className="flex justify-center space-x-4">
//         <Link to="/register" className="py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow hover:bg-indigo-700">
//           Register
//         </Link>
//         <Link to="/login" className="py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow hover:bg-blue-600">
//           Login
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default Home;









import React from "react";
import { Link } from "react-router-dom";
// import "./Home.css";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center px-4">
    <div className="max-w-4xl my-10 mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-4xl font-bold mb-4 text-center sm:text-3xl">
        Welcome to FinView
      </h1>
      <p className="text-lg mb-6 text-center sm:text-base">
        FinView is your personal financial companion designed to make managing and analyzing transactions simple, secure, and efficient. With FinView, you can not only track payments but also gain deep insights into your spending patterns through customizable reports and charts.
      </p>
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-4 sm:text-xl">Key Features:</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>
            <strong>Secure Transactions:</strong> Make payments effortlessly while ensuring top-notch data security.
          </li>
          <li>
            <strong>Customizable Insights:</strong> Define your own categories, keywords, and date ranges to generate personalized financial reports.
          </li>
          <li>
            <strong>Visual Analytics:</strong> Get detailed insights into your transactions presented as easy-to-understand charts and graphs.
          </li>
          <li>
            <strong>User-Friendly Interface:</strong> Navigate with ease and enjoy a seamless financial management experience.
          </li>
        </ul>
      </div>
      <div className="flex justify-center space-x-4">
        <Link to="/register" className="py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow hover:bg-indigo-700 transition-colors duration-200">
          Register
        </Link>
        <Link to="/login" className="py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow hover:bg-blue-600 transition-colors duration-200">
          Login
        </Link>
      </div>
    </div>
    </div>
  );
};

export default Home;
