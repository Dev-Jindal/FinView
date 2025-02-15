import React from 'react';
import Navbar from './components/NavBar.jsx';
import { Outlet } from 'react-router-dom';

const App = () => {
  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4">
        <Outlet />
      </div>
    </>
  );
};

export default App;



