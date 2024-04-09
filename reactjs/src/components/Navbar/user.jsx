import React, { useState } from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import Home from '../Authentication/home';
import AuthUser from '../Authentication/AuthUser';
import Dashboard from '../Dashboard/dashboard';
import Project_Creation from '../User/create_project';
import User_Projects from '../User/my_projects';
import Project_View from '../Projects/project_view';
import Project_Edit from '../User/project_edit';

export default function UserNav() {
    const { user, token, logout } = AuthUser();
    const logoutUser = () => {
        if (token != undefined) {
            logout();
        }
    }
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <div className="App">
            <nav className="bg-yellow-500 shadow-lg">
                <div className="max-w-screen-xl mx-auto px-4">
                    <div className="flex justify-between items-center py-4">
                        <Link to="/" className="flex items-center space-x-3">
                            <img src={require('./logo.png')} className="h-10" alt="DIYO Logo" />
                            <span className="text-white text-2xl font-semibold">DIYO</span>
                        </Link>
                        <div className="hidden md:flex items-center space-x-8">
                            <Link to="/create_project" className="text-white hover:text-gray-300">Create Project</Link>
                            <Link to="/" className="text-white hover:text-gray-300">Home</Link>
                            <div className="relative group">
                                <button onClick={toggleDropdown} className="text-white group-hover:text-gray-300 focus:outline-none">
                                    {user.name}
                                    <svg className={`w-4 h-4 ml-1 transition-transform transform ${isDropdownOpen ? 'rotate-180' : ''}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 12a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                        <path fillRule="evenodd" d="M10 3a2 2 0 100 4 2 2 0 000-4zm0 14a2 2 0 100-4 2 2 0 000 4zm0-9a2 2 0 100-4 2 2 0 000 4zm0 9a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                    </svg>
                                </button>
                                {isDropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-md z-10">
                                        <Link to="/dashboard" className="block px-4 py-2 hover:bg-gray-100">Dashboard</Link>
                                        <Link to={`${user.name}/my_projects`} className="block px-4 py-2 hover:bg-gray-100">My Projects</Link>
                                        <Link to="#" className="block px-4 py-2 hover:bg-gray-100">Settings</Link>
                                        <Link onClick={logoutUser} to="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Sign out</Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
            <div className="container mx-auto">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/create_project" element={<Project_Creation />} />
                    <Route path=":user/my_projects" element={<User_Projects />} />
                    <Route path={`/project/:id`} element={<Project_View />} />
                    <Route path="/project/:project_id/edit" element={<Project_Edit/>} />
                </Routes>
            </div>
        </div>
    )
}
