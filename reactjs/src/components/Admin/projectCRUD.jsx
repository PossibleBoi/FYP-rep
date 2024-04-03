import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthUser from "../Authentication/AuthUser";

export default function ProjectCRUD() {
    const { http } = AuthUser();

    const [genre, setGenre] = useState('');
    const [showGenreDialog, setShowGenreDialog] = useState(false);
    const [genreList, setGenreList] = useState([]);
    const [projects, setProjects] = useState([]);

    const enableGenreDialog = () => {
        setShowGenreDialog(true);
    }

    const handleCloseDialog = () => {
        setShowGenreDialog(false);
    }

    const AddGenre = (e) => {
        e.preventDefault();

        http.post('/admin/projects/genre/add', { genre: genre })
            .then((response) => {
                console.log(response);
                handleCloseDialog();
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const GetGenre = () => {
        http.get('/projects/genre')
            .then((response) => {
                setGenreList(response.data[0]);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const RemoveGenre = (id) => {
        http.delete(`/projects/genre/remove/${id}`)
            .then((response) => {
                console.log('Genre removed successfully');
                setGenreList(genreList.filter(genre => genre.id !== id));
            })
            .catch(error => {
                console.error('Error removing genre:', error);
            });
    };

    const fetchProjects = () => {
        http.get('/home')
            .then((response) => {
                setProjects(response.data.projects);
            })
            .catch((error) => {
                console.error('Error fetching projects:', error);
            });
    };

    

    useEffect(() => {
        GetGenre();
        fetchProjects();
    }, []);

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Genre Dialog */}
            {showGenreDialog && (
                <div className="fixed z-10 inset-0 flex items-center justify-center overflow-y-auto bg-gray-500 bg-opacity-50">
                    <div className="bg-white rounded-lg shadow-md p-6 w-96">
                        <button onClick={handleCloseDialog} className="absolute top-0 right-0 m-3 text-gray-600 hover:text-gray-800">
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        <form onSubmit={AddGenre}>
                            <label htmlFor="genre" className="block mb-2 text-sm font-medium text-gray-900">New Genre</label>
                            <input type="text" id="genre" value={genre} onChange={(e) => setGenre(e.target.value)} className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring focus:ring-blue-500" />
                            <button type="submit" className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-blue-500">Add Genre</button>
                        </form>
                    </div>
                </div>
            )}

            {/* Genre List */}
            <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Project Genres</h2>
                <div className="flex flex-wrap gap-4">
                    {genreList.map((genre) => (
                        <div key={genre.id} className="bg-gray-100 p-2 rounded-md">{genre.name} <button onClick={() => RemoveGenre(genre.id)} className="ml-2 text-red-500 hover:text-red-700">Remove</button></div>
                    ))}
                </div>
                <button onClick={enableGenreDialog} className="mt-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-blue-500">Add Genre</button>
            </div>

            {/* Project List */}
            <h2 className="text-2xl font-bold mb-4">Projects</h2>
            <div className="grid grid-cols-3 gap-4">
                {projects.map((project) => (
                    <div key={project.projectID} className="bg-white rounded-md shadow-md p-4">
                        <img src={`http://localhost:8000/${project.cover_image}`} alt="Project Cover" className="w-full h-40 object-cover rounded-t-md" />
                        <div className="p-4">
                            <h3 className="text-lg font-bold mb-2">{project.project_title}</h3>
                            <p className="text-gray-700">{project.short_description}</p>
                            <Link to={`/projects/${project.projectID}`} className="block mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-blue-500">View Project</Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
