import React, { useState, useEffect } from 'react';
import AuthUser from '../Authentication/AuthUser';

export default function YourComponent() {
    const { http } = AuthUser();

    const [userTotal, setUserTotal] = useState(0);
    const [projectTotal, setProjectTotal] = useState(0);

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
    }, []); 

    // Placeholder for graphs
    const renderGraphs = () => { 
        return (
            <div className="flex justify-center mt-4">
                <p>Graphs will be displayed here</p>
            </div>
        );
    };

    return (
        <div className="container mx-auto py-8">
            <div className="w-full px-4 py-2 bg-gray-200 rounded-md mb-4 text-center">
                Admin Dashboard
            </div>
            <div className="bg-white p-6 rounded-md shadow-md">
                <p className="text-lg font-semibold mb-2">Total Users: {userTotal}</p>
                <p className="text-lg font-semibold mb-2">Total Projects: {projectTotal}</p>
                <p className="text-lg font-semibold mb-2">Total Transactions: </p>
            </div>
            {renderGraphs()}
        </div>
    );
}
