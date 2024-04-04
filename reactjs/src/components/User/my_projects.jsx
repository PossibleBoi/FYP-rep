import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AuthUser from '../Authentication/AuthUser';

export default function User_Projects() {
    const { user, http } = AuthUser();
    const [projects, setProjects] = useState([]);

    console.log(projects)
    useEffect(() => {
        http.get(`/user/my_projects/${user.id}`).then((response) => {
            setProjects(response.data.projects);
        }).catch((error) => {
            console.error(error);
        });
    }, []);

    return (
        <>
            <div class="flex flex-col items-center mt-5">
                {projects.length > 0 ? (
                    projects.map((project) => (
                        <div key={project.projectID} class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                            <Link to={`/project/${project.projectID}/edit`}>
                                <img className="rounded-t-lg width h-auto max-w-full" src={`http://localhost:8000/${project.cover_image}`} alt="Image" />
                                <div class="p-5">
                                    <a href="#">
                                        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{project.project_title}</h5>
                                    </a>
                                    <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{project.short_description}</p>
                                    <Link to={`user/project/${project.projectID}`} class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                        Edit Project
                                        <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                                        </svg>
                                    </Link>
                                </div>
                            </Link>
                        </div>
                    ))
                ) : (
                    <div>No projects available</div>
                )}
            </div>

        </>
    );
}
