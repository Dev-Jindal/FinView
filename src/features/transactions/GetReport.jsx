import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getInsights } from './transactionsSlice';
import InsightsChart from '../../components/InsightsChart';
// import Navbar from '../../components/NavBar.jsx';
import { useNavigate } from 'react-router-dom';

const GetReport = () => {
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [categories, setCategories] = useState([]);
  const [categoryCount, setCategoryCount] = useState(0);
  const [showChart, setShowChart] = useState(false);
  const dispatch = useDispatch();
  const { insights, loading, error } = useSelector((state) => state.transactions);

  const handleCategoryChange = (index, key, value) => {
    const updatedCategories = [...categories];
    if (key === 'keywords') {
      updatedCategories[index][key] = value.split(',').map((keyword) => keyword.trim());
    } else {
      updatedCategories[index][key] = value;
    }
    setCategories(updatedCategories);
  };

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getInsights({ fromDate, toDate, categories }));
    setShowChart(true);
    navigate("/chart");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center px-4">
      <div className="w-full max-w-lg bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-bold text-center mb-6">Generate Report</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">From Date:</label>
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">To Date:</label>
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Number of Categories:</label>
            <input
              type="number"
              value={categoryCount}
              onChange={(e) => {
                setCategoryCount(Number(e.target.value));
                setCategories(Array.from({ length: Number(e.target.value) }, () => ({ name: '', keywords: [] })));
              }}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          {Array.from({ length: categoryCount }).map((_, index) => (
            <div key={index} className="space-y-2">
              <input
                type="text"
                placeholder="Category Name"
                value={categories[index]?.name || ''}
                onChange={(e) => handleCategoryChange(index, 'name', e.target.value)}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              <input
                type="text"
                placeholder="Keywords (comma separated)"
                value={categories[index]?.keywords?.join(', ') || ''}
                onChange={(e) => handleCategoryChange(index, 'keywords', e.target.value)}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          ))}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Get Report
          </button>
        </form>
        {showChart && insights && (
          <div className="mt-8">
            <InsightsChart fromDate={fromDate} toDate={toDate} categories={categories} />
          </div>
        )}
        {loading && <p className="text-center text-indigo-600 mt-4">Loading...</p>}
        {error && <p className="text-center text-red-500 mt-4">Error: {error.message}</p>}
      </div>
    </div>
  );
};

export default GetReport;
