import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import Home from '../Authentication/home';
import Login from '../Authentication/login';
import Register from '../Authentication/register';
import Project_View from '../Projects/project_view';

export default function GuestNav() {
  return (
    <div className="App">
      <nav className="bg-yellow-500 shadow-lg">
        <div className="max-w-screen-xl mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <Link to="/" className="flex items-center space-x-3">
              <img src={require('./logo.png')} className="h-8" alt="DIYO Logo" />
              <span className="text-white text-2xl font-semibold">DIYO</span>
            </Link>
            <button className="md:hidden focus:outline-none focus:bg-gray-600 rounded-lg p-2 text-gray-400 hover:text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
            <ul className="hidden md:flex items-center space-x-8">
              <li>
                <Link to="/" className="text-white hover:text-gray-300">Home</Link>
              </li>
              <li>
                <Link to="/login" className="text-white hover:text-gray-300">Login</Link>
              </li>
              <li>
                <Link to="/register" className="text-white hover:text-gray-300">Register</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="container mx-auto">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path={`/project/:id`} element={<Project_View />} />
        </Routes>
      </div>
    </div>
  );
}
