import { React, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthUser from '../Authentication/AuthUser';

export default function Project_Creation() {

    const navigate = useNavigate();

    const { user, http } = AuthUser();
    const [genreList, setGenreList] = useState([]);

    const [projectTitle, setProjectTitle] = useState('');
    const [description, setDescription] = useState('');
    const [endDate, setEndDate] = useState('');
    const [goal, setGoal] = useState('');
    const [coverImage, setCoverImage] = useState('');
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

    const CreateProject = (e) => {
        e.preventDefault();
        http.post('/user/projects/create',
            {
                projectTitle: projectTitle,
                description: description,
                startDate: new Date().toISOString().slice(0, 10),
                endDate: endDate,
                goal: goal,
                type: type,
                genre: genre, //takes the genre id
                user: user.id,
                coverImage : coverImage
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
            {/* <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={CreateProject}>
                    <div className="md:flex mb-8">
                        <div className="md:w-1/3">
                            <legend className="uppercase tracking-wide text-sm">Location</legend>
                            <p className="text-xs font-light text-red-500">This entire section is required.</p>
                        </div>
                        <div className="md:flex-1 mt-2 mb:mt-0 md:px-3">
                            <div className="mb-4">
                                <label className="block uppercase tracking-wide text-xs font-bold">Name</label>
                                <input className="w-full shadow-inner p-4 border-2 border-gray-200 rounded focus:outline-none focus:border-blue-500" type="text" name="name" placeholder="Acme Mfg. Co." />
                            </div>
                            <div className="md:flex mb-4">
                                <div className="md:flex-1 md:pr-3">
                                    <label className="block uppercase tracking-wide text-xs font-bold">Street Address</label>
                                    <input className="w-full shadow-inner p-4 border-2 border-gray-200 rounded focus:outline-none focus:border-blue-500" type="text" name="address_street" placeholder="555 Roadrunner Lane" />
                                </div>
                                <div className="md:flex-1 md:pl-3">
                                    <label className="block uppercase tracking-wide text-xs font-bold">Building/Suite No.</label>
                                    <input className="w-full shadow-inner p-4 border-2 border-gray-200 rounded focus:outline-none focus:border-blue-500" type="text" name="address_number" placeholder="#3" />
                                    <span className="text-xs mb-4 font-thin">We lied, this isn't required.</span>
                                </div>
                            </div>
                            <div className="md:flex mb-4">
                                <div className="md:flex-1 md:pr-3">
                                    <label className="block uppercase tracking-wide text-xs font-bold">Latitude</label>
                                    <input className="w-full shadow-inner p-4 border-2 border-gray-200 rounded focus:outline-none focus:border-blue-500" type="text" name="lat" placeholder="30.0455542" />
                                </div>
                                <div className="md:flex-1 md:pl-3">
                                    <label className="block uppercase tracking-wide text-xs font-bold">Longitude</label>
                                    <input className="w-full shadow-inner p-4 border-2 border-gray-200 rounded focus:outline-none focus:border-blue-500" type="text" name="lon" placeholder="-99.1405168" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="md:flex mb-8">
                        <div className="md:w-1/3">
                            <legend className="uppercase tracking-wide text-sm">Contact</legend>
                        </div>
                        <div className="md:flex-1 mt-2 mb:mt-0 md:px-3">
                            <div className="mb-4">
                                <label className="block uppercase tracking-wide text-xs font-bold">Phone</label>
                                <input className="w-full shadow-inner p-4 border-2 border-gray-200 rounded focus:outline-none focus:border-blue-500" type="tel" name="phone" placeholder="(555) 555-5555" />
                            </div>
                            <div className="mb-4">
                                <label className="block uppercase tracking-wide text-xs font-bold">URL</label>
                                <input className="w-full shadow-inner p-4 border-2 border-gray-200 rounded focus:outline-none focus:border-blue-500" type="url" name="url" placeholder="acme.co" />
                            </div>
                            <div className="mb-4">
                                <label className="block uppercase tracking-wide text-xs font-bold">Email</label>
                                <input className="w-full shadow-inner p-4 border-2 border-gray-200 rounded focus:outline-none focus:border-blue-500" type="email" name="email" placeholder="contact@acme.co" />
                            </div>
                        </div>
                    </div>
                    <div className="md:flex mb-8">
                        <div className="md:w-1/3">
                            <legend className="uppercase tracking-wide text-sm">Social</legend>
                        </div>
                        <div className="md:flex-1 mt-2 mb:mt-0 md:px-3">
                            <div className="md:flex mb-4">
                                <div className="md:flex-1 md:pr-3">
                                    <label className="block uppercase tracking-wide text-xs font-bold">Facebook</label>
                                    <div className="w-full flex">
                                        <span className="text-xs py-4 px-2 bg-gray-200 text-gray-700">facebook.com/</span>
                                        <input className="flex-1 shadow-inner p-4 border-2 border-gray-200 rounded focus:outline-none focus:border-blue-500" type="text" name="facebook" placeholder="acmeco" />
                                    </div>
                                </div>
                                <div className="md:flex-1 md:pl-3 mt-2 md:mt-0">
                                    <label className="block uppercase tracking-wide text-xs font-bold">Twitter</label>
                                    <div className="w-full flex">
                                        <span className="text-xs py-4 px-2 bg-gray-200 text-gray-700">twitter.com/</span>
                                        <input className="flex-1 shadow-inner p-4 border-2 border-gray-200 rounded focus:outline-none focus:border-blue-500" type="text" name="twitter" placeholder="acmeco" />
                                    </div>
                                </div>
                            </div>
                            <div className="md:flex mb-4">
                                <div className="md:flex-1 md:pr-3">
                                    <label className="block uppercase tracking-wide text-xs font-bold">Instagram</label>
                                    <div className="w-full flex">
                                        <span className="text-xs py-4 px-2 bg-gray-200 text-gray-700">instagram.com/</span>
                                        <input className="flex-1 shadow-inner p-4 border-2 border-gray-200 rounded focus:outline-none focus:border-blue-500" type="text" name="instagram" placeholder="acmeco" />
                                    </div>
                                </div>
                                <div className="md:flex-1 md:pl-3 mt-2 md:mt-0">
                                    <label className="block uppercase tracking-wide text-xs font-bold">Yelp</label>
                                    <div className="w-full flex">
                                        <span className="text-xs py-4 px-2 bg-gray-200 text-gray-700">yelp.com/</span>
                                        <input className="flex-1 shadow-inner p-4 border-2 border-gray-200 rounded focus:outline-none focus:border-blue-500" type="text" name="yelp" placeholder="acmeco" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="md:flex mb-6">
                        <div className="md:w-1/3">
                            <legend className="uppercase tracking-wide text-sm">Description</legend>
                        </div>
                        <div className="md:flex-1 mt-2 mb:mt-0 md:px-3">
                            <textarea className="w-full shadow-inner p-4 border-2 border-gray-200 rounded focus:outline-none focus:border-blue-500" placeholder="We build fine acmes." rows="6"></textarea>
                        </div>
                    </div>
                    <div className="md:flex mb-6">
                        <div className="md:w-1/3">
                            <legend className="uppercase tracking-wide text-sm">Cover Image</legend>
                        </div>
                        <div className="md:flex-1 px-3 text-center">
                            <div className="button bg-gold hover:bg-gold-dark text-cream mx-auto cursor-pointer relative">
                                <input className="opacity-0 absolute pin-x pin-y" type="file" name="cover_image" />
                                Add Cover Image
                            </div>
                        </div>
                    </div>
                    <div className="md:flex mb-6 border border-t-1 border-b-0 border-x-0 border-cream-dark">
                        <div className="md:flex-1 px-3 text-center md:text-right">
                            <input type="hidden" name="sponsor" value="0" />
                            <input className="button text-cream-lighter bg-brick hover:bg-brick-dark" type="submit" value="Create Location" />
                        </div>
                    </div>
                </form> */} {/*arko form design, use after file handling is done */}
            <hr />
            <div className="max-w-md mx-auto">
                <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={CreateProject}>
                    <div className="mb-4">
                        <label htmlFor="project_title" className="block text-gray-700 text-sm font-bold mb-2">Project Title</label>
                        <input onChange={(e) => setProjectTitle(e.target.value)} type="text" id="project_title" placeholder="Project Title" className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" required />
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
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Submit</button>
                </form>
            </div>
        </>
    )

}
