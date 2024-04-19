import React from 'react';
import { Link } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import Login from '../Authentication/login';
import Register from '../Authentication/register';
import Home from '../Authentication/home';
import Project_View from '../Projects/project_view';
import AboutUs from '../Projects/about_us';
import ProjectsAll from '../Projects/projects_all';

export default function GuestNav() {
  return (
    <div className="App">
      <nav className="bg-yellow-500 shadow-lg">
        <div className="flex justify-between items-center py-3">
          <div>
            <Link to="/about_us">
              <img src={require('./logo.png')} className="w-20 h-auto absolute mb-0 -mt-10" alt="DIYO Logo" />
            </Link>
          </div>
          <Link to="/" className="text-3xl text-white block -mr-7">DIYO</Link>
          <ul className="hidden md:flex items-center space-x-8">
            <li>
              <Link to="/login" className="text-white text-1xl hover:text-gray-300 mx-2">Login</Link>
            </li>
          </ul>
        </div>
      </nav>
      <div className="container mx-auto">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path={`/project/:id`} element={<Project_View />} />
          <Route path='/projects/all' element={<ProjectsAll />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path='/about_us' element={<AboutUs />} />
        </Routes>
      </div>
    </div>
  );
}
