import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register chart components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Overstate = () => {
    const [stats, setStats] = useState({
        totalUsers: 0,
        totalTourGuides: 0,
        totalStories: 0,
        totalPackages: 0,
    });

    useEffect(() => {
        fetch('http://localhost:5000/api/stats')  // Replace with your backend API URL
            .then((response) => response.json())
            .then((data) => {
                setStats(data);
            })
            .catch((error) => console.error('Error fetching stats:', error));
    }, []);

    // Chart data
    const chartData = {
        labels: ['Users', 'Tour Guides', 'Stories', 'Packages'],
        datasets: [
            {
                label: 'Total Count',
                data: [stats.totalUsers, stats.totalTourGuides, stats.totalStories, stats.totalPackages],
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    // Chart options
    const options = {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'Overview of Total Counts',
            },
            legend: {
                position: 'top',
            },
        },
    };

    return (
        <div className="p-4">
            <h2 className="text-2xl mb-4">Overview</h2>
            <div className="bg-white shadow-md rounded-lg p-4">
                <Bar data={chartData} options={options} />
            </div>
        </div>
    );
};

export default Overstate;
