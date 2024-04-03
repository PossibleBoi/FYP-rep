import React, { useEffect, useState } from 'react';
import AuthUser from '../Authentication/AuthUser';

export default function Project_Edit_View() { //with edit button for the creator
    const { http } = AuthUser();
    const project_id = window.location.pathname.split('/')[4];
    const [project, setProject] = useState([]);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        http.get(`/user/project/${project_id}`).then((response) => {
            setProject(response.data.project[0]);
        }).catch((error) => {
            console.error(error);
        });
    }, []);

    const handleNextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % project.images.length);
    };

    const handlePrevImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex - 1 + project.images.length) % project.images.length);
    };

    return (
        <div className="grid grid-cols-2 gap-4 p-4">
            {/* Left Column - Image */}
            <div className="bg-white p-4 rounded shadow-md">
                {/* Title */}
                <div className="p-4">
                    <h2 className="text-xl font-bold mb-4">{project.project_title}</h2>
                </div>
                {/* Image Carousel */}
                <div className="relative p-4 overflow-hidden">
                    {project.images && project.images.length > 0 && (
                        <img
                            src={`http://localhost:8000/${project.images[currentImageIndex].image}`}
                            alt="Project Image"
                            className="object-contain w-full h-auto rounded cursor-pointer"
                            onClick={handleNextImage}
                        />
                    )}
                    {/* Next Button */}
                    <button
                        className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white font-bold py-2 px-4 rounded-full bg-gray-700"
                        onClick={handleNextImage}
                    >
                        &rarr;
                    </button>
                    {/* Previous Button */}
                    <button
                        className="absolute top-1/2 left-4 transform -translate-y-1/2 text-white font-bold py-2 px-4 rounded-full bg-gray-700"
                        onClick={handlePrevImage}
                    >
                        &larr;
                    </button>
                </div>
            </div>
            {/* Right Column - Information */}
            <div className="bg-white p-4 rounded shadow-md">
                {/* Edit Button */}
                <button className="absolute left-4 bg-yellow-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                    Edit
                </button>
                {/* Project Description */}
                <div className="bg-gray-100 p-4 rounded-lg mb-4">
                    <h3 className="text-lg font-semibold mb-2">Project Type:
                        <p>{project.type}</p>
                    </h3>
                    <h3 className="text-lg font-semibold mb-2">Project Description</h3>
                    <p>{project.description}</p>
                </div>
                {/* Funding Information Card */}
                <div className="bg-gray-100 p-4 rounded-lg mb-4">
                    <h3 className="text-lg font-semibold mb-2">Funding Information</h3>
                    <div className="grid gap-2">
                        <span className="p-2 rounded">Current Funding: Rs. {project.current_funding}</span>
                        <span className="p-2 rounded">Funding Goal: Rs. {project.funding_goal}</span>
                        <span className="p-2 rounded">Backers: {project.backers}</span>
                    </div>
                </div>
                {/* Creator Information Card */}
                <div className="bg-gray-100 p-4 rounded-lg mb-4">
                    <h3 className="text-lg font-semibold mb-2">Creator Information</h3>
                    <div className="grid gap-2">
                        <span className="p-2 rounded">Name: {project.creator}</span>
                        <span className="p-2 rounded">Email: {project.creator_email}</span>
                        {/* Add more creator information as needed */}
                    </div>
                </div>
                {/* Action Buttons */}
                <div className="flex justify-end">
                    <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mr-2">Donate</button>
                    <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">Save</button>
                </div>
            </div>
        </div>
    );
}
