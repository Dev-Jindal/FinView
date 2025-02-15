import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Chart, registerables } from 'chart.js';

// Register all Chart.js components
Chart.register(...registerables);

const InsightsChart = () => {
  const [categoryData, setCategoryData] = useState([]);
  const [categoryLabels, setCategoryLabels] = useState([]);
  const [totalCredits, setTotalCredits] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { insights } = useSelector((state) => state.transactions);

  useEffect(() => {
    if (insights) {
      try {
        setCategoryLabels(Object.keys(insights.category_total || {}));
        setCategoryData(Object.values(insights.category_total || {}));
        setTotalCredits(insights.totalCredits || 0);
      } catch (err) {
        setError('Error processing insights. Please try again later.');
        console.error('Error processing insights:', err);
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, [insights]);

  useEffect(() => {
    if (window.barChart) {
      window.barChart.destroy();
    }

    if (categoryLabels.length > 0 && categoryData.length > 0) {
      const ctx = document.getElementById('insightsChart').getContext('2d');
      window.barChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: categoryLabels,
          datasets: [
            {
              label: 'Spending by Category',
              data: categoryData,
              backgroundColor: categoryLabels.map((_, index) => {
                const colors = ['#FF6384', '#36A2EB', '#FFCE56', '#FF9F40', '#4BC0C0', '#9966FF', '#FF3366'];
                return colors[index % colors.length];
              }),
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          scales: {
            x: { beginAtZero: true },
            y: { beginAtZero: true },
          },
        },
      });
    }

    return () => {
      if (window.barChart) {
        window.barChart.destroy();
      }
    };
  }, [categoryLabels, categoryData]);

  useEffect(() => {
    if (window.pieChart) {
      window.pieChart.destroy();
    }

    if (categoryLabels.length > 0 && categoryData.length > 0) {
      const ctx = document.getElementById('anotherChart').getContext('2d');
      window.pieChart = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: categoryLabels,
          datasets: [
            {
              label: 'Spending by Category',
              data: categoryData,
              backgroundColor: categoryLabels.map((_, index) => {
                const colors = ['#FF6384', '#36A2EB', '#FFCE56', '#FF9F40', '#4BC0C0', '#9966FF', '#FF3366'];
                return colors[index % colors.length];
              }),
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          plugins: {
            legend: {
              position: 'top',
            },
          },
          aspectRatio: 1.5, // Adjusts the pie chart size
        },
      });
    }

    return () => {
      if (window.pieChart) {
        window.pieChart.destroy();
      }
    };
  }, [categoryLabels, categoryData]);

  if (loading) {
    return <p>Loading insights...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      <h2 className="text-2xl font-bold mb-6">Total Credits: {totalCredits}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="chart-container">
          <canvas id="insightsChart" className="w-full h-64" />
        </div>
        <br /><br />
        <div className="chart-container">
          <canvas id="anotherChart" className="w-full h-64" />
        </div>
      </div>
    </>
  );
};

export default InsightsChart;
