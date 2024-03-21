import { React, useEffect, useState } from "react";
import AuthUser from "../Authentication/AuthUser";

export default function ProjectCRUD() {
    const { http } = AuthUser();

    const [genre, setGenre] = useState('');
    const [showGenreDialog, setShowGenreDialog] = useState(false);
    const [genreList, setGenreList] = useState([]);

    const enableGenreDialog = () => {
        setShowGenreDialog(true);
    }
    const handleCloseDialog = () => {
        setShowGenreDialog(false);
    }

    const AddGenre = (e) => {
        e.preventDefault();

        http.post('/admin/projects/genre/add',
            {
                genre: genre
            })
            .then((response) => {
                console.log(response);
            }
            ).catch((error) => {
                console.log(error);
            }
            );

        setTimeout(() => {
            handleCloseDialog();
        }, 1000);

    }

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

    const RemoveGenre = (id) => {
        http.delete(`/admin/projects/genre/remove/${id}`)
            .then((response) => {
                // Handle success
                console.log('Genre removed successfully');
            })
            .catch(error => {
                // Handle error
                console.error('Error removing genre:', error);
            });
    };

    useEffect(() => {
        GetGenre();
    }, []);

    return (
        <>
            <div className="w-full px-4 py-2 bg-gray-200 lg:w-full">
                <span class="bg-gray-100 text-gray-800 text-3xl font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-gray-700 dark:text-gray-300">Projects</span>
                <div class="mt-5 relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" class="px-6 py-3">
                                    Name
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Creator
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Genre
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Goal
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Type
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Status
                                </th>
                                <th scope="col" class="px-6 py-3">
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    DIYO
                                </td>
                                <td class="px-6 py-4">
                                    CREATOR
                                </td>
                                <td class="px-6 py-4">
                                    DIYO
                                </td>
                                <td class="px-6 py-4">
                                    DIYO
                                </td>
                                <td class="px-6 py-4">
                                    CROWDFUNDING
                                </td>
                                <td class="px-6 py-4">
                                    Running
                                </td>
                                <td class="px-6 py-4 text-right">
                                    <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline"><span class="bg-blue-100 text-blue-800 text-1xl font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300">Edit</span></a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <br />

                <span class="bg-gray-100 text-gray-800 text-3xl font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-gray-700 dark:text-gray-300">Project Genres</span>
                <div class="mt-5 relative overflow-x-auto shadow-md sm:rounded-lg">
                    <div class="relative overflow-x-auto">
                        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" class="px-6 py-3">
                                        Genre Name
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {genreList.map((genre, index) => (
                                    <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <td className="px-6 py-4">
                                            {genre.name}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button
                                                className="inline-block text-red-600 dark:text-red-500 hover:underline bg-red-100 dark:bg-blue-900 dark:text-red-300 px-3 py-1.5 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                                                onClick= {() => RemoveGenre(genre.id)}>
                                                Remove
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>

                        </table>
                    </div>
                </div>
                <div className="mt-3">
                    <button onClick={enableGenreDialog} className="inline-block text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                        Add Genre
                    </button>
                </div>
                {showGenreDialog && (
                    <div className="fixed z-10 inset-0 flex items-center justify-center overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                        <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        <div className="relative bg-white w-1/2 p-6 rounded-lg">
                            <button onClick={handleCloseDialog} className="absolute top-0 right-0 m-4 text-gray-600 hover:text-gray-800">
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                            <form class="space-y-4 md:space-y-6" onSubmit={AddGenre} method="post">
                                <div>
                                    <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">New Genre</label>
                                    <input onChange={e => setGenre(e.target.value)} type="text" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="New Genre" required="" />
                                </div>
                                <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add New Genre</button>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </>
    )

}