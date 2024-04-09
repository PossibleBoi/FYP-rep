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

    // Shuffle the projects array
    const shuffledProjects = projects.sort(() => Math.random() - 0.5);

    // Select the first project as the featured project
    const featuredProject = shuffledProjects.length > 0 ? shuffledProjects[0] : null;

    // Select four random projects for the right column
    const randomProjects = shuffledProjects.slice(1, 5);

    return (
        <div className="bg-gray-100 min-h-screen">
            <div className="container mx-auto py-8">
                <div className="grid gap-8">
                    <div className="col-span-2 bg-white p-8 rounded-lg shadow-md mb-8">
                        <h2 className="text-2xl font-bold mb-4">Welcome to Our Platform</h2>
                        <p className="text-gray-700">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eu justo nec risus facilisis vehicula.
                            Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
                            Sed ut leo vel est congue fermentum.
                        </p>
                        {user == undefined ? (
                            <Link to="/login" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4 inline-block">
                                Create Project
                            </Link>
                        ) : (
                            <Link to="/create_project" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4 inline-block">
                                Create Project
                            </Link>
                        )}
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-8">
                    {/* Left Column: Featured Project */}
                    <div className="col-span-2 bg-white p-8 rounded-lg shadow-md mb-8">
                        <h2 className="text-2xl font-bold mb-4">Featured Project</h2>
                        {featuredProject && (
                            <div className="bg-white border border-gray-200 rounded-lg shadow-md aspect-w-1 aspect-h-1 mb-4">
                                <Link to={`/project/${featuredProject.projectID}`} className="block">
                                    <img className="object-cover rounded-t-lg" src={`http://localhost:8000/${featuredProject.cover_image}`} alt="Project Cover" />
                                    <div className="p-4">
                                        <h3 className="text-lg font-semibold mb-2">{featuredProject.project_title}</h3>
                                        <p className="text-gray-700">{featuredProject.short_description}</p>
                                    </div>
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Right Column: Random Projects */}
                    <div className="col-span-1">
                        <div className="grid grid-cols-2 gap-4">
                            {/* Random Projects loop */}
                            {randomProjects.map((project) => (
                                <div key={project.projectID} className="bg-white border border-gray-200 rounded-lg shadow-md">
                                    <Link to={`/project/${project.projectID}`} className="block">
                                        <img className="object-cover h-48 w-full rounded-t-lg" src={`http://localhost:8000/${project.cover_image}`} alt="Project Cover" />
                                        <div className="p-4">
                                            <h3 className="text-lg font-semibold mb-2">{project.project_title}</h3>
                                            <p className="text-gray-700">{project.short_description}</p>
                                        </div>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
