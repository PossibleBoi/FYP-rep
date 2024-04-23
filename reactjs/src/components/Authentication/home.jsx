import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AuthUser from '../Authentication/AuthUser';

export default function Home() {
    const { user, http } = AuthUser();
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        http.get('/home')
            .then((response) => {
                setProjects(response.data.projects);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    const shuffledProjects = projects.sort(() => Math.random() - 0.5);
    const featuredProject = shuffledProjects.length > 0 ? shuffledProjects[0] : null;
    const randomProjects = shuffledProjects.slice(1, 5);

    return (
        <div className="bg-gray-100 min-h-screen">
            <div className="container relative">
                <div className="relative">
                    {/* Image */}
                    <img src={require('./nepal.jpg')} alt="Background" className="w-full h-auto" style={{ maxHeight: "85vh" }} />
                    {/* Slogan */}
                    <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-3xl font-semibold opacity-70">
                        Diyo: Illuminate Dreams, Illuminate Lives
                    </span>

                    {/* Button */}
                    <Link
                        to={user ? `/${user.name}/my_projects` : "/login"}
                        className="bg-yellow-50 hover:bg-yellow-300 text-gray-600 font-bold py-3 px-6 rounded-lg transition duration-300 absolute bottom-14 left-1/2 transform -translate-x-1/2 opacity-70"
                    >
                        Create Project
                    </Link>
                </div>
            </div>

            {/* Featured Project */}
            <div className="bg-yellow-50 container mt-6 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: Featured Project */}
                    <div className="col-span-2 relative">
                        <h2 className="absolute transform text-gray-700 text-3xl font-semibold opacity-70 ml-1">Featured Project</h2>
                        {featuredProject && (
                            <div className="rounded-lg shadow-md overflow-hidden w-full h-96"> {/* Adjusted height */}
                                <Link to={`/project/${featuredProject.projectID}`} className="block">
                                    <img className="w-full h-full object-cover" src={`http://localhost:8000/${featuredProject.cover_image}`} alt="Project Cover" />
                                    <div className="p-4">
                                        <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold mb-2">{featuredProject.project_title}</h3>
                                        <p className="text-gray-700">{featuredProject.short_description}</p>
                                    </div>
                                </Link>
                            </div>
                        )}

                        {/* Explore All Projects Button */}
                        <Link
                            to="/projects/all"
                            className="block mt-40 bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-2 rounded focus:outline-none focus:ring focus:ring-blue-500"
                        >
                            Explore all our projects
                        </Link>
                    </div>

                    {/* Right Column: Random Projects */}
                    <div className="col-span-1">
                        <div className="grid grid-cols-2 gap-4">
                            {/* Random Projects loop */}
                            {randomProjects.map((project) => (
                                <div key={project.projectID} className="rounded-lg shadow-md overflow-hidden bg-white w-full h-96"> {/* Adjusted height */}
                                    <Link to={`/project/${project.projectID}`} className="block">
                                        <img className="w-full h-3/6" src={`http://localhost:8000/${project.cover_image}`} alt="Project Cover" />
                                    </Link>
                                    <div className="p-2">
                                        <div className="flex justify-between">
                                            <h5 className="mb-2 text-sm font-bold leading-tight text-neutral-800 dark:text-neutral-50">
                                                {project.project_title}
                                            </h5>
                                        </div>
                                        <p className="mb-1 text-sm text-neutral-600 dark:text-neutral-200">
                                            {project.short_description}
                                        </p>
                                        <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
                                            Ending On : {project.end_date.split('T')[0]}
                                        </p>
                                        <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
                                            Goal: Rs. {project.funding_goal}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
