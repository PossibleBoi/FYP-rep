import { React, useState } from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import Home from '../Authentication/home';
import AuthUser from '../Authentication/AuthUser';
import Dashboard from '../Dashboard/dashboard';
import Project_Creation from '../User/create_project';

export default function UserNav() {
    const { user, token, logout } = AuthUser();
    const logoutUser = () => {
        if (token != undefined) {
            logout();
        }
    }
    const [isDropdownOpen, setIsDropdownOpen] = useState();

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <>
            <div className="App">
                <nav class="border-gray-200 bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                    <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                        <a href="#" class="flex items-center space-x-3 rtl:space-x-reverse">
                            <img src={require('./logo.jpg')} class='h-10' alt="Flowbite Logo" width={'50px'} />
                            <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">DIYO</span>
                        </a>
                        <div class="hidden w-full md:block md:w-auto" id="navbar-solid-bg">
                            <ul class="flex flex-col font-medium mt-4 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-transparent dark:border-gray-700">
                                <li className="relative group">
                                    <Link to={"/create_project"} class="block py-2">
                                        <button type="button" class="text-xs text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-small rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                                            Create Project</button>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/" class="block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Home</Link>
                                </li>
                                <li className="relative group">
                                    <button
                                        onClick={toggleDropdown}
                                        className="flex items-center justify-between w-full py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto dark:text-white md:dark:hover:text-blue-500 dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent"
                                    >
                                        {user.name}
                                        <svg
                                            className={`w-2.5 h-2.5 ms-2.5 transition-transform transform ${isDropdownOpen ? 'rotate-180' : ''
                                                }`}
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 10 6"
                                        >
                                            <path
                                                stroke="currentColor"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="2"
                                                d="m1 1 4 4 4-4"
                                            />
                                        </svg>
                                    </button>
                                    {isDropdownOpen && (
                                        <div className="absolute z-10 right-0 mt-2 space-y-2 bg-white rounded-md shadow-md dark:bg-gray-700">
                                            <Link
                                                to="/dashboard"
                                                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                            >
                                                Dashboard
                                            </Link>
                                            <Link
                                                to="#"
                                                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                            >
                                                My Projects
                                            </Link>
                                            <Link
                                                to="#"
                                                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                            >
                                                Settings
                                            </Link>
                                            <Link
                                                onClick={logoutUser}
                                                className="block px-4 py-2 text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                                            >
                                                Sign out
                                            </Link>
                                        </div>
                                    )}
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
                <div class="container mx-auto">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/create_project" element={<Project_Creation />} />
                    </Routes>
                </div>
            </div>
        </>
    )
}