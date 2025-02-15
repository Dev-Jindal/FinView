import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./App.jsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./features/auth/Login.jsx";
import Register from "./features/auth/Register.jsx";
import Home from "./pages/Home.jsx";

import CreateTransaction from "./features/transactions/CreateTransaction.jsx";
import MainPage from "./components/MainPage.jsx"
import Profile from "./features/profile/Profile.jsx";
import GetReport from "./features/transactions/GetReport.jsx";
import InsightsChart from "./components/InsightsChart.jsx";

import "./index.css"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },

  {
    path:"/main-page",
    element:<MainPage/>
  },
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/get-report",
        element: <GetReport />,
      },
      {
        path: "/create-transaction",
        element: <CreateTransaction />,
      },
      {
        path: "/profile",
        element: <Profile/>,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path:"/chart",
    element:<InsightsChart/>
  }
]);

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}>
        <App />
      </RouterProvider>
    </Provider>
  </React.StrictMode>
);
