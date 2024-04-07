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

    useEffect(() => {
        http.get(`/user/project/${project_id}`).then((response) => {
            const projectData = response.data.project[0];
            setProject(projectData);
            setEditedTitle(projectData.project_title);
            setEditedDescription(projectData.description);
            setEditedShortDescription(projectData.short_description);
            setEditedImages([...projectData.images]);

            // Split the cover image and store the original as the second index
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

        console.log(formData);

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
    return (
        <div className="grid grid-cols-2 gap-4 p-4">
            {/* Left Column - Form */}
            <div className="bg-white p-4 rounded shadow-md">
                <h2 className="text-xl font-bold mb-4">Edit Project Details</h2>
                <h4 className="text-xl font-bold mb-4">Project Type: {project.type}</h4>
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
                <input
                    type="file"
                    id="cover_image"
                    onChange={handleChangeCoverImage}
                    className="bg-gray-100 p-2 rounded mb-4 w-full"
                />
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

                <div className="flex justify-end">
                    <button onClick={handleCancel} className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded mr-2">
                        Cancel
                    </button>
                    <button onClick={handleSave} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                        Save
                    </button>
                </div>
            </div>
            {/* Right Column - Preview */}
            <div className="bg-white p-4 rounded shadow-md">
                <h2 className="text-xl font-bold mb-4">Project Preview</h2>
                <img
                    src={editedCoverImage ? URL.createObjectURL(editedCoverImage) : `http://localhost:8000/${project.cover_image}`}
                    alt="Cover Image"
                    className="object-cover w-full h-40 rounded mb-4"
                />
                <div className="grid grid-cols-3 gap-4 mb-4">
                    {editedImages.map((image, index) => (
                        <img
                            key={index}
                            src={editedImageFiles[index] ? URL.createObjectURL(editedImageFiles[index]) : `http://localhost:8000/${image.image}`}
                            alt={`Project Image ${index + 1}`}
                            className="object-cover w-full h-24 rounded"
                        />
                    ))}
                </div>

                <h3 className="text-lg font-semibold mb-2">Project Details</h3>
                <p><span className="font-semibold">Title:</span> {editedTitle}</p>
                <p><span className="font-semibold">Description:</span> {editedDescription}</p>
                <p><span className="font-semibold">Short Description:</span> {editedShortDescription}</p>
                <p><span className="font-semibold">Total Backers:</span></p>
                <p><span className="font-semibold">Total Pledged:</span></p>
                <p><span className="font-semibold">Goal:</span> Rs. {project.funding_goal}</p>
            </div>
        </div>
    );
}
