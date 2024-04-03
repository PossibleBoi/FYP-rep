import { React, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthUser from '../Authentication/AuthUser';

export default function Project_Creation() {

    const navigate = useNavigate();

    const { user, http, token, httpForm } = AuthUser();
    const [genreList, setGenreList] = useState([]);

    const [projectTitle, setProjectTitle] = useState('');
    const [description, setDescription] = useState('');
    const [short_description, setShortDescription] = useState('');
    const [endDate, setEndDate] = useState('');
    const [goal, setGoal] = useState('');
    const [coverImage, setCoverImage] = useState('');
    const [type, setType] = useState('');
    const [genre, setGenre] = useState('');
    const [otherImages, setOtherImages] = useState([]);

    const types = ["Crowdfund", "Invest"];

    const handleTypeChange = (event) => {
        setType(event.target.value);
    };

    const GetGenre = () => {
        http.get('/projects/genre')
            .then((response) => {
                setGenreList(response.data[0]);
            }
            ).catch((error) => {
                console.log(error);
            }
            );
    }

    const CreateProject = (e) => {
        e.preventDefault();
        httpForm.post('/user/projects/create',
            {
                projectTitle: projectTitle,
                description: description,
                short_description: short_description,
                startDate: new Date().toISOString().slice(0, 10),
                endDate: endDate,
                goal: goal,
                type: type,
                genre: genre, //takes the genre id
                user: user.id,
                coverImage: coverImage,
                otherImages: otherImages


            })
            .then((response) => {
                console.log(response.data['message']);
                if (response.data['project_type'] == 'Crowdfund') {
                    navigate('/')
                }
                else {
                    navigate('/')
                }
            }
            ).catch((error) => {
                console.log(error);
            }
            )
    }

    useEffect(() => {
        GetGenre();
    }
        , []);

    return (
        <>
            <div className="max-w-md mx-auto">
                <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={CreateProject}>
                    <div className="mb-4">
                        <label htmlFor="project_title" className="block text-gray-700 text-sm font-bold mb-2">Project Title</label>
                        <input onChange={(e) => setProjectTitle(e.target.value)} type="text" id="project_title" placeholder="Project Title" className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" required />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Short Description</label>
                        <textarea onChange={(e) => setShortDescription(e.target.value)} id="short_description" placeholder="Short Description" className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" required></textarea>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Description</label>
                        <textarea onChange={(e) => setDescription(e.target.value)} id="description" placeholder="Description" className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" required></textarea>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Type</label>
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
                        <label className="block text-gray-700 text-sm font-bold mb-2">End Date</label>
                        <input onChange={(e) => setEndDate(e.target.value)} type="date" id="end_date" placeholder="End Date" className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" required />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Goal</label>
                        <input onChange={(e) => setGoal(e.target.value)} type="number" id="goal" placeholder="Goal" className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" required />
                    </div>
                    <div className="mb-5">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Genre</label>
                        <select
                            id="genre"
                            value={genre}
                            onChange={(e) => setGenre(e.target.value)}
                            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" required
                        >
                            <option value="">Select Genre</option>
                            {genreList.map((genre) => (
                                <option key={genre.genreID} value={genre.genreID}>
                                    {genre.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Cover Image</label>
                        <input onChange={(e) => setCoverImage(e.target.files)} type="file" id="cover_image" className="form-control bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" required />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Project Images (up to 3)</label>
                        <input
                            onChange={(e) => setOtherImages(Array.from(e.target.files).slice(0, 3))} // Limit to first 3 images
                            type="file"
                            id="other_images"
                            className="form-control bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                            multiple // Allow multiple file selection
                            accept="image/*" // Accept only image files
                        // required
                        />
                    </div>
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Submit</button>
                </form>
            </div>
        </>
    )

}
