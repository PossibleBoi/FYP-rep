import { React, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthUser from '../Authentication/AuthUser';

export default function Project_Creation() {
    const { http } = AuthUser();
    const [genreList, setGenreList] = useState([]);

    const [projectTitle, setProjectTitle] = useState('');
    const [description, setDescription] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [goal, setGoal] = useState('');
    // const [coverImage, setCoverImage] = useState('');
    const [type, setType] = useState('');
    const [genre, setGenre] = useState('');

    const types = ["Crowdfund", "Invest"];

    const handleTypeChange = (event) => {
        setType(event.target.value);
    };

    const GetGenre = () => {
        http.get('/admin/projects/genre')
            .then((response) => {
                setGenreList(response.data[0]);
            }
            ).catch((error) => {
                console.log(error);
            }
            );
    }

    // console.log("Project Title: ", projectTitle)
    // console.log("Description: ", description)
    // console.log("Start Date: ", startDate)
    // console.log("End Date: ", endDate)
    // console.log("Goal: ", goal)
    // console.log("Type: ", type)
    // console.log("Genre: ", genre)

    const CreateProject = (e) => {
        e.preventDefault();
        http.post('/user/projects/create',
          console.log("Project Title: ", projectTitle),  {
                projectTitle: projectTitle,
                description: description,
                startDate: startDate,
                endDate: endDate,
                goal: goal,
                type: type,
                genre: genre
            })
            .then((response) => {
                console.log(response);
            }
            ).catch((error) => {
                console.log(error);
            }
            );
    }

    useEffect(() => {
        GetGenre();
    }
        , []);


    return (
        <div className="max-w-md mx-auto">
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={CreateProject}>               
            <div className="mb-4">
                <label htmlFor="project_title" className="block text-gray-700 text-sm font-bold mb-2">Project Title</label>
                <input onChange={(e) => setProjectTitle(e.target.value)} type="text" id="project_title" placeholder="Project Title" className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" required />
            </div>
                <div className="mb-4">
                    <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">Description</label>
                    <textarea onChange={(e) => setDescription(e.target.value)} id="description" placeholder="Description" className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" required></textarea>
                </div>
                <div className="mb-4">
                    <label htmlFor="type" className="block text-gray-700 text-sm font-bold mb-2">Type</label>
                    <select
                        id="type"
                        onChange={handleTypeChange}
                        className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                    >
                        <option value="">Select Type</option>
                        {types.map((type) => (
                            <option key={type} value={type}>
                                {type}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-4">
                    <label htmlFor="start_date" className="block text-gray-700 text-sm font-bold mb-2">Start Date</label>
                    <input onChange={(e) => setStartDate(e.target.value)} type="date" id="start_date" placeholder="Start Date" className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" required />
                </div>
                <div className="mb-4">
                    <label htmlFor="end_date" className="block text-gray-700 text-sm font-bold mb-2">End Date</label>
                    <input onChange={(e) => setEndDate(e.target.value)} type="date" id="end_date" placeholder="End Date" className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" required />
                </div>
                <div className="mb-4">
                    <label htmlFor="goal" className="block text-gray-700 text-sm font-bold mb-2">Goal</label>
                    <input onChange={(e) => setGoal(e.target.value)} type="number" id="goal" placeholder="Goal" className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" required />
                </div>
                <div className="mb-5">
                    <label htmlFor="genre" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Genre</label>
                    <select
                        id="genre"
                        value={genre}
                        onChange={(e) => setGenre(e.target.value)}
                        className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                        required
                    >
                        <option value="">Select Genre</option>
                        {genreList.map((genre) => (
                            <option key={genre.id} value={genre.name}>
                                {genre.name}
                            </option>
                        ))}
                    </select>
                </div>
                {/* <div className="mb-4">
                    <label htmlFor="cover_image" className="block text-gray-700 text-sm font-bold mb-2">Cover Image</label>
                    <input type="file" id="cover_image" className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" required />
                </div> */}
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Submit</button>
            </form>
        </div>
    )

}
