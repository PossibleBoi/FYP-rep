import React, { useState, useEffect, useRef } from 'react';
import AuthUser from '../Authentication/AuthUser';
import Chart from 'chart.js/auto';

export default function YourComponent() {

    const { http } = AuthUser();

    const [userTotal, setUserTotal] = useState(0);
    const [projectTotal, setProjectTotal] = useState(0);
    const [projectCounts, setProjectCounts] = useState({ crowdfund: 0, invest: 0 });

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
        http.get('/admin/projects/all')
            .then((response) => {
                // Count Crowdfund and Invest projects
                const crowdfundCount = response.data[0].filter(project => project.type === 'Crowdfund').length;
                const investCount = response.data[0].filter(project => project.type === 'Invest').length;
                setProjectCounts({ crowdfund: crowdfundCount, invest: investCount });
                setProjectTotal(response.data[0].length);
            })
            .catch((error) => {
                console.error('Error fetching project counts:', error);
            });
    }, []);


    // Refs for the chart canvases and chart instances
    const barChartRef = useRef(null);
    const pieChartRef = useRef(null);
    const barChartInstanceRef = useRef(null);
    const pieChartInstanceRef = useRef(null);

    useEffect(() => {
        // Destroy existing chart instances if they exist
        if (barChartInstanceRef.current) {
            barChartInstanceRef.current.destroy();
        }
        if (pieChartInstanceRef.current) {
            pieChartInstanceRef.current.destroy();
        }

        // Data for the bar chart
        const barChartData = {
            labels: ['Users', 'Projects'],
            datasets: [{
                label: 'Count',
                data: [userTotal, projectTotal],
                backgroundColor: [
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)'
                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)'
                ],
                borderWidth: 1
            }]
        };

        // Options for the bar chart
        const barChartOptions = {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
        };

        // Render bar chart
        if (barChartRef.current) {
            const ctx = barChartRef.current.getContext('2d');
            barChartInstanceRef.current = new Chart(ctx, {
                type: 'bar',
                data: barChartData,
                options: barChartOptions
            });
        }

        // Data for the pie chart
        const pieChartData = {
            labels: ['Crowdfund', 'Invest'],
            datasets: [{
                label: 'Project Types',
                data: [projectCounts.crowdfund, projectCounts.invest],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 206, 86, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(255, 206, 86, 1)'
                ],
                borderWidth: 1
            }]
        };

        // Options for the pie chart
        const pieChartOptions = {
            responsive: true,
            maintainAspectRatio: false,
        };

        // Render pie chart
        if (pieChartRef.current) {
            const ctx = pieChartRef.current.getContext('2d');
            pieChartInstanceRef.current = new Chart(ctx, {
                type: 'pie',
                data: pieChartData,
                options: pieChartOptions
            });
        }
    }, [userTotal, projectTotal, projectCounts]);

    return (
         <div className="h-max overflow-auto">
            <div className="bg-white p-6 rounded-md shadow-md">
                <p className="text-lg font-semibold mb-2">Total Users: {userTotal}</p>
                <p className="text-lg font-semibold mb-2">Total Projects: {projectTotal}</p>
            </div>
            <div className="bg-white p-6 rounded-md shadow-md mt-4">
                <canvas ref={barChartRef} width={400} height={300}></canvas>
            </div>
            <div className="bg-white p-6 rounded-md shadow-md mt-4">
                <canvas ref={pieChartRef} width={400} height={200}></canvas>
            </div>
            <br/><br/><br/><br/><br/>
        </div>
    );
}
