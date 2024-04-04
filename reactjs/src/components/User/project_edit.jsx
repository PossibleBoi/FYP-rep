import React, { useEffect, useState } from 'react';
import AuthUser from '../Authentication/AuthUser';

export default function Project_Edit_View() {
    const { http } = AuthUser();
    const project_id = window.location.pathname.split('/')[2];
    const [project, setProject] = useState([]);
    const [editing, setEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState('');
    const [editedDescription, setEditedDescription] = useState('');
    const [editedImages, setEditedImages] = useState([]);

    useEffect(() => {
        http.get(`/user/project/${project_id}`).then((response) => {
            setProject(response.data.project[0]);
            setEditedTitle(response.data.project[0].project_title);
            setEditedDescription(response.data.project[0].description);
            setEditedImages([...response.data.project[0].images]);
        }).catch((error) => {
            console.error(error);
        });
    }, []);

    const handleDeleteImage = (index) => {
        const updatedImages = [...editedImages];
        updatedImages.splice(index, 1);
        setEditedImages(updatedImages);
    };

    const handleEdit = () => {
        setEditing(true);
    };

    const handleSave = () => {
        // Handle saving the edited title, description, and images
        setEditing(false);
        // Make API call to save the edited data
    };

    const handleCancel = () => {
        setEditing(false);
        // Reset edited title, description, and images to original
        setEditedTitle(project.project_title);
        setEditedDescription(project.description);
        setEditedImages([...project.images]);
    };

    const handleChangeTitle = (e) => {
        setEditedTitle(e.target.value);
    };

    const handleChangeDescription = (e) => {
        setEditedDescription(e.target.value);
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
            {/* Right Column - Information */}
            <div className="bg-white p-4 rounded shadow-md">
                {/* Edit Button */}

                <>
                    <input
                        type="text"
                        value={editedTitle}
                        onChange={handleChangeTitle}
                        className="bg-gray-100 p-2 rounded mb-4 w-full resize-none"
                    />
                    <textarea
                        value={editedDescription}
                        onChange={handleChangeDescription}
                        className="bg-gray-100 p-2 rounded mb-4 w-full resize-none"
                    />
                    {/* Image List */}
                    <div className="grid grid-cols-3 gap-4 mb-4">
                        {editedImages.map((image, index) => (
                            <div key={index} className="relative">
                                <img
                                    src={`http://localhost:8000/${image.image}`}
                                    alt="Project Image"
                                    className="object-cover w-full h-40 rounded"
                                />
                                <button
                                    onClick={() => handleDeleteImage(index)}
                                    className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded-full"
                                >
                                    X
                                </button>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-end">
                        <button onClick={handleCancel} className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded mr-2">
                            Cancel
                        </button>
                        <button onClick={handleSave} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                            Save
                        </button>
                    </div>
                </>

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
