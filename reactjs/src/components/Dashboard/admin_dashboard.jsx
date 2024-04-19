import React, { useState, useEffect, useRef } from 'react';
import AuthUser from '../Authentication/AuthUser';
import Chart from 'chart.js/auto';

export default function YourComponent() {

    const { http } = AuthUser();

    // const [userTotal, setUserTotal] = useState(50);
    // const [projectTotal, setProjectTotal] = useState(50);
    // const [transactionTotal, setTransactionTotal] = useState(100);

    const [userTotal, setUserTotal] = useState(0);
    const [projectTotal, setProjectTotal] = useState(0);
    const [transactionTotal, setTransactionTotal] = useState(0);

    useEffect(() => {
        // Fetch total number of users
        http.get('/admin/users/total')
            .then((response) => {
                setUserTotal(response.data);
            })
            .catch((error) => {
                console.error('Error fetching total users:', error);
            });

        // Fetch total number of projects
        http.get('/admin/projects/total')
            .then((response) => {
                setProjectTotal(response.data);
            })
            .catch((error) => {
                console.error('Error fetching total projects:', error);
            });

        // Fetch total number of transactions
        http.get('/admin/transactions/total')
            .then((response) => {
                setTransactionTotal(response.data);
            })
            .catch((error) => {
                console.error('Error fetching total transactions:', error);
            });
    },
        []);

    // Refs for the chart canvas and chart instance
    const chartRef = useRef(null);
    const chartInstanceRef = useRef(null);

    useEffect(() => {
        // Destroy existing chart instance if it exists
        if (chartInstanceRef.current) {
            chartInstanceRef.current.destroy();
        }

        // Data for the chart
        const data = {
            labels: ['Users', 'Projects', 'Transactions'],
            datasets: [{
                label: 'Increase Over Time',
                data: [userTotal, projectTotal, transactionTotal],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)'
                ],
                borderWidth: 1
            }]
        };

        // Chart options
        const options = {
            scales: {
                y: {
                    beginAtZero: true,
                    suggestedMin: 0,
                    suggestedMax: 50 // Adjust this value based on your data range
                }
            }
        };

        // Render chart
        if (chartRef.current) {
            const ctx = chartRef.current.getContext('2d');
            chartInstanceRef.current = new Chart(ctx, {
                type: 'line',
                data: data,
                options: options
            });
        }
    }, [userTotal, projectTotal, transactionTotal]);

    return (
        <div className="h-max overflow-auto">
            <div className="bg-white p-6 rounded-md shadow-md">
                <p className="text-lg font-semibold mb-2">Total Users: {userTotal}</p>
                <p className="text-lg font-semibold mb-2">Total Projects: {projectTotal}</p>
                <p className="text-lg font-semibold mb-2">Total Transactions: {transactionTotal}</p>
            </div>
            <div className="bg-white p-6 rounded-md shadow-md mt-4">
                <canvas ref={chartRef}></canvas>
            </div>
        </div>
    );
}
