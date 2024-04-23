import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthUser from "../Authentication/AuthUser";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Profile() {


    const { http } = AuthUser();
    const userid = window.location.pathname.split('/').pop();

    const [userData, setUserData] = useState(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [user_location, setLocation] = useState('');

    useEffect(() => {
        // Fetch user data when the component mounts
        http.get(`/user/${userid}`)
            .then((response) => {
                setUserData(response.data[0]);
                setName(response.data[0].name);
                setEmail(response.data[0].email);
                setLocation(response.data[0].location);
            })
            .catch((error) => {
                console.error(error);
                // Handle error
            });
    }, []);

    const handleInformationChanges = async () => {
        try {
            const response = await http.put(`/user/${userid}/update`, {
                name: name,
                email: email,
                location: user_location,
                role: userData.role,
                status: userData.status
            });
            console.log(response.data);
            window.location.reload();
            toast.success("Information updated successfully!");
        } catch (error) {
            console.error(error);
            toast.error("Failed to update information. Please try again.");
        }
    };

    const handleEmailVerification = async () => {
        try {
            const response = await http.post(`/email/verification-notification`);
            // Show toast for success
            toast.success(response.data.message);
        } catch (error) {
            console.error(error);
            toast.error("Failed to verify email. Please try again.");
        }
    };
  
    return (
        <>
            <div className="w-full px-4 py-2 bg-gray-200 lg:w-full">
                {userData && (
                    <>
                        <span className="bg-gray-100 text-gray-800 text-3xl font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-gray-700 dark:text-gray-300">Users</span>
                        <div className="mt-5">
                            <div className="mb-4">
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                                <input
                                    id="name"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    onChange={(e) => setName(e.target.value)} type="text" defaultValue={userData.name} />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Email ({userData.email_verified_at !== null ? 'Verified' : 'Not Verified'})
                                </label>
                                <input
                                    id="email"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    onChange={(e) => setEmail(e.target.value)} type="text" defaultValue={userData.email} />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
                                <input
                                    id="location"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    onChange={(e) => setLocation(e.target.value)} type="text" defaultValue={userData.location} />
                            </div>
                        </div>
                        <div className="mt-3">
                            <button onClick={handleInformationChanges} className="inline-block text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                                Update Information
                            </button>
                            <Link to="/" className="inline-block text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                                Back
                            </Link>
                        </div>
                    </>
                )}
            </div>
            <div className="p-6 bg-gray-200 dark:bg-gray-800 mb-44">
                <h2 className="text-2xl font-semibold mb-4">Actions</h2>
                <button onClick={handleEmailVerification} className="btn-primary">Verify Email</button>
            </div>
            <ToastContainer />
        </>
    )
}
