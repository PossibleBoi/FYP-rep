import React, { useEffect, useState } from 'react';
import AuthUser from '../Authentication/AuthUser';

export default function Project_View() {
    const { http } = AuthUser();
    const project_id = window.location.pathname.split('/')[2];
    const [project, setProject] = useState([]);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        http.get(`/project/${project_id}`).then((response) => {
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
        <div className="container mx-auto px-4 py-8">
            {/* Title */}
            <h1 className="text-3xl font-bold mb-4 text-center text-yellow-600">{project.project_title}</h1>
            <h5 className="text-lg font-semibold mb-4 text-center text-yellow-600"> {project.short_description}</h5>
            <div className="grid grid-cols-2 gap-8">
                {/* Image Column */}
                <div>
                    {/* Image Carousel */}
                    <div className="relative overflow-hidden rounded-lg">
                        {project.images && project.images.length > 0 && (
                            <img
                                src={`http://localhost:8000/${project.images[currentImageIndex].image}`}
                                alt="Project Image"
                                className="object-contain w-full h-auto cursor-pointer"
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

                <div>
                    <div>
                        <div className="mt-5">
                            <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded absolute right-10">
                                <span>Report</span>
                            </button>
                            <div className="bg-yellow-50 rounded-lg p-4 mb-4">
                                <h2 className="text-lg font-semibold mb-2 text-yellow-600">Project Details</h2>
                                <div className="bg-white rounded-lg p-4 shadow-md">
                                    <div className="mb-4">
                                        <p className="font-semibold">Total Backers:</p>
                                        <p>{project.backers}</p>
                                    </div>
                                    <div className="mb-4">
                                        <p className="font-semibold">Funding Goal:</p>
                                        <p>Rs. {project.funding_goal}</p>
                                    </div>
                                    <div className="mb-4">
                                        <p className="font-semibold">End Date:</p>
                                        <p>{project.end_date}</p>
                                    </div>
                                </div>
                            </div>
                            {/* Action Buttons */}
                            <div className="bg-yellow-50 p-4 rounded-lg shadow-md">
                                <h2 className="text-lg font-semibold mb-2 text-yellow-600">Actions</h2>
                                <div className="flex flex-col md:flex-row md:justify-between items-center">
                                    <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-8 rounded w-full mb-2 md:mb-0 md:mr-2">
                                        Donate
                                    </button>
                                    <div className="flex flex-col md:flex-row md:space-x-2">
                                        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mb-2 md:mb-0 w-full md:w-auto">
                                            <span>Save</span>
                                        </button>
                                        <button className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded mb-2 md:mb-0 w-full md:w-auto">
                                            <span>Share</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='mt-4'>
                {/* Description */}
                <div className="bg-yellow-50 p-4 rounded-lg mb-4">
                    <h2 className="text-lg font-semibold mb-2 text-yellow-600">Project Description</h2>
                    <p>{project.description}</p>
                </div>
                {/* Creator Information */}
                <div className="bg-yellow-50 p-4 rounded-lg mb-4">
                    <h2 className="text-lg font-semibold mb-2 text-yellow-600">Creator Information</h2>
                    <div className="grid gap-2">
                        <span className="p-2 rounded">Name: {project.creator}</span>
                        <span className="p-2 rounded">Email: {project.creator_email}</span>
                    </div>
                </div>
                {/* Rewards Section */}
                {project.rewards && project.rewards.length > 0 && (
                    <div className="bg-yellow-50 p-4 rounded-lg mb-4">
                        <h2 className="text-lg font-semibold mb-2 text-yellow-600">Rewards</h2>
                        {project.rewards.map((reward, index) => (
                            <div key={index} className="bg-white rounded-lg p-4 shadow-md mb-4">
                                <div className="mb-4">
                                    <p className="font-semibold">Title:</p>
                                    <p>{reward.title}</p>
                                </div>
                                <div className="mb-4">
                                    <p className="font-semibold">Description:</p>
                                    <p>{reward.description}</p>
                                </div>
                                <div className="mb-4">
                                    <p className="font-semibold">Amount:</p>
                                    <p>{reward.amount}</p>
                                </div>
                                <div className="mb-4">
                                    <p className="font-semibold">Delivery:</p>
                                    <p>{reward.delivery}</p>
                                </div>
                                {/* Add reward images rendering here if applicable */}
                            </div>
                        ))}
                    </div>
                )}
                {/* Progress and Discussions */}
                <div className="bg-yellow-50 p-4 rounded-lg mb-4">
                    <h2 className="text-lg font-semibold mb-2 text-yellow-600">Progress and Discussions</h2>
                    {/* Add discussion and progress here */}
                </div>
            </div>
        </div>
    );
}

