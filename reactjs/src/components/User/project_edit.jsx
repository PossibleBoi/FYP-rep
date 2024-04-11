import React, { useEffect, useState } from 'react';
import AuthUser from '../Authentication/AuthUser';

export default function Project_Edit_View() {
    const { http, httpForm } = AuthUser();
    const project_id = window.location.pathname.split('/')[2];
    const [project, setProject] = useState({});
    const [editedTitle, setEditedTitle] = useState('');
    const [editedDescription, setEditedDescription] = useState('');
    const [editedShortDescription, setEditedShortDescription] = useState('');
    const [editedImages, setEditedImages] = useState([]);
    const [editedCoverImage, setEditedCoverImage] = useState(null);
    const [editedImageFiles, setEditedImageFiles] = useState([]);
    const [originalCoverImage, setOriginalCoverImage] = useState('');
    const [rewards, setRewards] = useState([]);
    const [newRewardTitle, setNewRewardTitle] = useState('');
    const [newRewardDescription, setNewRewardDescription] = useState('');
    const [newRewardAmount, setNewRewardAmount] = useState('');
    const [newRewardDeliveryDate, setNewRewardDeliveryDate] = useState('');
    const [newRewardImage, setNewRewardImage] = useState('');
    const [showAddRewardModal, setShowAddRewardModal] = useState(false);

    useEffect(() => {
        http.get(`/user/project/${project_id}`).then((response) => {
            const projectData = response.data.project[0];
            setProject(projectData);
            setEditedTitle(projectData.project_title);
            setEditedDescription(projectData.description);
            setEditedShortDescription(projectData.short_description);
            setEditedImages([...projectData.images]);
            setRewards([...projectData.rewards])
            if (projectData.cover_image) {
                const coverImageParts = projectData.cover_image.split('/');
                setOriginalCoverImage(coverImageParts[1]);
            }
        }).catch((error) => {
            console.error(error);
        });
    }, []);

    const handleSave = (e) => {
        e.preventDefault();

        handleSaveDetails();
        handleSaveImages();

        setTimeout(() => {
            window.location.reload();
        }, 1500);
    };

    const handleSaveDetails = () => {
        const formData = new FormData();
        formData.append('project_title', editedTitle);
        formData.append('short_description', editedShortDescription);
        formData.append('description', editedDescription);

        http.put(`/user/project/${project_id}/details`, formData)
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => {
                console.error('Error updating project details:', error);
            });

    };

    const handleSaveImages = () => {
        const formData = new FormData();

        // Append _method field to simulate PUT request
        formData.append('_method', 'PUT');

        // Append cover image if changed
        if (editedCoverImage && editedCoverImage !== originalCoverImage) {
            formData.append('cover_image', editedCoverImage, editedCoverImage.name);
        }

        // Append other images
        editedImageFiles.forEach((imageFile, index) => {
            if (editedImageFiles[index] !== editedImages[index]) {
                formData.append(`otherImages[${index}]`, imageFile, imageFile.name);
            }
        });

        // Use the POST method instead
        httpForm.post(`/user/project/${project_id}/images`, formData)
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => {
                console.error('Error updating project images:', error);
            });
    };

    const handleChangeCoverImage = (e) => {
        // Update editedCoverImage only when the cover image is changed
        setEditedCoverImage(URL.createObjectURL(e.target.files[0]));
        setEditedCoverImage(e.target.files[0]);
    };

    const handleDeleteImage = (index, imageId) => {
        // Make an API call to delete the image

        http.delete(`/user/project/${project_id}/image/${imageId}`)
            .then((response) => {
                // Remove the deleted image from state
                const updatedImages = [...editedImages];
                updatedImages.splice(index, 1);
                setEditedImages(updatedImages);
                const updatedImageFiles = [...editedImageFiles];
                updatedImageFiles.splice(index, 1);
                setEditedImageFiles(updatedImageFiles);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const handleChangeImage = (index, e) => {
        const updatedImageFiles = [...editedImageFiles];
        updatedImageFiles[index] = e.target.files[0];
        setEditedImageFiles(updatedImageFiles);
    };

    const handleCancel = () => {
        // Reset edited title, description, and images to original
        setEditedTitle(project.project_title);
        setEditedDescription(project.description);
        setEditedShortDescription(project.short_description);
        setEditedImages([...project.images]);
        setEditedCoverImage(null);
        setEditedImageFiles([]);
    };

    const handleChangeTitle = (e) => {
        setEditedTitle(e.target.value);
    };

    const handleChangeDescription = (e) => {
        setEditedDescription(e.target.value);
    };

    const handleChangeShortDescription = (e) => {
        setEditedShortDescription(e.target.value);
    };

    // Function to handle reward deletion
    const handleDeleteReward = (index, rewardID) => {
        http.delete(`/user/project/${project_id}/reward/delete`, { data: { rewardID } })
            .then((response) => {
                // If the deletion is successful, update the rewards state by removing the deleted reward
                const updatedRewards = [...rewards];
                updatedRewards.splice(index, 1);
                setRewards(updatedRewards);
            })
            .catch((error) => {
                console.error('Error deleting reward:', error);
            });
    };

    // Function to handle adding a new reward
    const handleAddReward = () => {
        // Show the add reward modal
        setShowAddRewardModal(true);
    };

    // Function to handle closing the add reward modal
    const handleCloseAddRewardModal = () => {
        // Close the add reward modal
        setShowAddRewardModal(false);
    };

    // Function to handle saving a new reward
    const handleSaveNewReward = () => {
        const formData = new FormData();
        formData.append('title', newRewardTitle);
        formData.append('description', newRewardDescription);
        formData.append('amount', newRewardAmount);
        formData.append('estimated_delivery', newRewardDeliveryDate);
        formData.append('projectID', project_id);
        formData.append('reward_image', newRewardImage);

        // Make an API call to add the new reward
        httpForm.post(`/user/project/${project_id}/reward/add`, formData)
            .then((response) => {
                // If the addition is successful, update the rewards state with the new reward
                const newReward = response.data.reward;
                // Reset the new reward fields
                setNewRewardTitle('');
                setNewRewardDescription('');
                setNewRewardAmount('');
                setNewRewardDeliveryDate('');
                setNewRewardImage('');
                // Close the add reward modal
                setShowAddRewardModal(false);
                // Refresh the page after a few seconds
                setTimeout(() => {
                    window.location.reload();
                }, 3000);
            })
            .catch((error) => {
                console.error('Error adding new reward:', error);
            });
    };

    return (
        <div>
            {/* Left Column - Form */}
            <div className="grid gap-4 p-4 bg-white p-4 rounded shadow-md">
                <h2 className="text-xl font-bold mb-4">Edit Project Details</h2>
                <h4 className="text-xl font-bold mb-4">Project Type: {project.type}</h4>
                <h4 className="text-xl font-bold mb-4">Project Status: {project.status}</h4>
                <label htmlFor="project_title" className="block text-gray-700 text-sm font-bold mb-2">Title:</label>
                <input
                    type="text"
                    value={editedTitle}
                    onChange={handleChangeTitle}
                    className="bg-gray-100 p-2 rounded mb-4 w-full resize-none"
                />
                <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">Description:</label>
                <textarea
                    value={editedDescription}
                    onChange={handleChangeDescription}
                    className="bg-gray-100 p-2 rounded mb-4 w-full resize-none"
                />
                <label htmlFor="short_description" className="block text-gray-700 text-sm font-bold mb-2">Short Description:</label>
                <textarea
                    value={editedShortDescription}
                    onChange={handleChangeShortDescription}
                    className="bg-gray-100 p-2 rounded mb-4 w-full resize-none"
                />
                <label htmlFor="cover_image" className="block text-gray-700 text-sm font-bold mb-2">Cover Image:</label>
                {/* Display cover image */}
                <div className="relative">
                    <img
                        src={`http://localhost:8000/${project.cover_image}`}
                        alt="Cover Image"
                        className="object-cover w-full h-40 rounded"
                    />
                    <input
                        type="file"
                        onChange={(e) => handleChangeCoverImage(e)}
                        className="absolute top-0 left-0 opacity-0 h-full w-full cursor-pointer"
                    />
                </div>
                {/* Image List */}
                <label className="block text-gray-700 text-sm font-bold mb-2">Images:</label>
                <div className="grid grid-cols-3 gap-4 mb-4">
                    {editedImages.map((image, index) => (
                        <div key={index} className="relative">
                            <img
                                src={`http://localhost:8000/${image.image}`}
                                alt="Project Image"
                                className="object-cover w-full h-40 rounded"
                            />
                            <input
                                type="file"
                                onChange={(e) => handleChangeImage(index, e)}
                                className="absolute top-0 left-0 opacity-0 h-full w-full cursor-pointer"
                            />
                            <button
                                onClick={() => handleDeleteImage(index, image.id)}
                                className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded-full"
                            >
                                X
                            </button>
                        </div>
                    ))}
                </div>
                {/* Buttons */}
                <div className="flex justify-end">
                    <button onClick={handleCancel} className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded mr-2">
                        Cancel
                    </button>
                    <button onClick={handleSave} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                        Save
                    </button>
                </div>

                {/* Rewards modification section */}
                {project.type === 'Invest' && (
                    <div className="mb-4">
                        {/* Existing rewards list */}
                        <h2 className="text-xl font-bold mb-2"> Rewards:</h2>
                        <div className="grid grid-cols-3 gap-4 mb-4">
                            {rewards.map((reward, index) => (
                                <div key={index} className="relative">
                                    <div className="p-4 border rounded">
                                        <h3 className="text-lg font-semibold mb-2">{reward.title}</h3>
                                        <img src={`http://localhost:8000/${reward.reward_image}`} alt="Reward Image" className="object-cover w-full h-24 rounded mb-2" />
                                        <p>{reward.description}</p>
                                        <p>Minimum Amount: {reward.amount}</p>
                                        <p>Estimated Delivery: {reward.estimated_delivery}</p>
                                    </div>
                                    <button onClick={() => handleDeleteReward(index, reward.rewardID)} className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded-full">X</button>
                                </div>
                            ))}
                        </div>


                        <div className="flex justify-center">
                            <button onClick={handleAddReward} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                                Add Reward
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Add Reward Modal */}
            {showAddRewardModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
                    <div className="bg-white p-6 rounded-lg">
                        <h2 className="text-xl font-bold mb-4">Add Reward</h2>
                        <label htmlFor="newRewardTitle" className="block text-gray-700 text-sm font-bold mb-2">Title:</label>
                        <input
                            type="text"
                            id="newRewardTitle"
                            value={newRewardTitle}
                            onChange={(e) => setNewRewardTitle(e.target.value)}
                            className="bg-gray-100 p-2 rounded mb-4 w-full resize-none"
                        />
                        <label htmlFor="newRewardDescription" className="block text-gray-700 text-sm font-bold mb-2">Description:</label>
                        <textarea
                            id="newRewardDescription"
                            value={newRewardDescription}
                            onChange={(e) => setNewRewardDescription(e.target.value)}
                            className="bg-gray-100 p-2 rounded mb-4 w-full resize-none"
                        />
                        <label htmlFor="newRewardAmount" className="block text-gray-700 text-sm font-bold mb-2">Amount:</label>
                        <input
                            type="number"
                            id="newRewardAmount"
                            value={newRewardAmount}
                            onChange={(e) => setNewRewardAmount(e.target.value)}
                            className="bg-gray-100 p-2 rounded mb-4 w-full resize-none"
                        />
                        <label htmlFor="newRewardDeliveryDate" className="block text-gray-700 text-sm font-bold mb-2">Estimated Delivery Date:</label>
                        <input
                            type="date"
                            id="newRewardDeliveryDate"
                            value={newRewardDeliveryDate}
                            onChange={(e) => setNewRewardDeliveryDate(e.target.value)}
                            className="bg-gray-100 p-2 rounded mb-4 w-full resize-none"
                        />
                        <label htmlFor="newRewardImage" className="block text-gray-700 text-sm font-bold mb-2">Image:</label>
                        <input
                            type="file"
                            id="newRewardImage"
                            onChange={(e) => setNewRewardImage(e.target.files[0])}
                            className="bg-gray-100 p-2 rounded mb-4 w-full resize-none"
                        />
                        <div className="flex justify-end">
                            <button onClick={handleCloseAddRewardModal} className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded mr-2">
                                Cancel
                            </button>
                            <button onClick={handleSaveNewReward} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
