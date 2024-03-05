import { React, useState, ReactDOM, useEffect } from "react";
import AuthUser from "../Authentication/AuthUser";

export default function UserCRUD() {
    const { http } = AuthUser();
    const [users, setUsers] = useState([]);

    // console.log('user token:'+ token)

    const AllData = () => {
        http.get('/admin/users')
            .then((response) => {
                console.log(response.data[0]);
                setUsers(response.data[0]);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        AllData();
    }, []);


    return (
        <>
            <div className="w-full px-4 py-2 bg-gray-200 lg:w-full">
                <span class="bg-gray-100 text-gray-800 text-3xl font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-gray-700 dark:text-gray-300">USERs</span>
                <div class="mt-5 relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" class="px-6 py-3">
                                    Name
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Email
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Role
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Location
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Status
                                </th>
                                <th scope="col" class="px-6 py-3">
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.length > 0 ? (
                                users.map((user) => (
                                    <tr key={user.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {user.name}
                                        </th>
                                        <td className="px-6 py-4">
                                            {user.email}
                                        </td>
                                        <td className="px-6 py-4">
                                            {user.role}
                                        </td>
                                        <td className="px-6 py-4">
                                            {user.location}
                                        </td>
                                        <td className="px-6 py-4">
                                            Active
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                                                <span className="bg-blue-100 text-blue-800 text-1xl font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300">
                                                    Edit
                                                </span>
                                            </a>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="px-6 py-4 text-center">No users available</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

        </>
    )

}