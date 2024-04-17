import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AuthUser from '../Authentication/AuthUser';

export default function User_Projects() {
    const { user, http } = AuthUser();
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        http.get(`/user/my_projects/${user.id}`).then((response) => {
            setProjects(response.data.projects);
        }).catch((error) => {
            console.error(error);
        });
    }, []);

    return (
        <div className="bg-yellow-50 pt-2 flex items-center justify-center min-h-screen">
            <div className="w-4/5 sm:w-4/5 md:w-4/5 lg:w-4/5 backdrop-blur-sm bg-white/40 p-6 rounded-lg shadow-sm border-violet-200 border">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-semibold">My Projects</h2>
                    <Link to="/create_project" className="flex items-center bg-yellow-400 border border-fuchsia-00 hover:border-violet-100 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-300">
                        <svg className="w-4 h-4 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                        </svg>
                        <span>New Project</span>
                    </Link>
                </div>
                <div className="grid grid-cols-1 gap-6">
                    {projects.length > 0 ? (
                        projects.map((project) => (
                            <div key={project.projectID} className="bg-white rounded-lg overflow-hidden shadow-md border border-gray-200">
                                <img className="w-full h-48 object-cover" src={`http://localhost:8000/${project.cover_image}`} alt="Project Cover" />
                                <div className="p-6">
                                    <h2 className="text-xl font-semibold mb-2">{project.project_title}</h2>
                                    <p className="text-gray-700 mb-4">{project.short_description}</p>
                                    <Link to={`/project/${project.projectID}/edit`} className="inline-block bg-yellow-400 hover:bg-yellow-500 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-300">
                                        Edit Project
                                    </Link>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-gray-700">No projects available</div>
                    )}
                </div>
            </div>
        </div>
    );
}
