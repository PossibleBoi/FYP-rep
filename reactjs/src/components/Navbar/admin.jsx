import { Route, Routes, Link, useLocation } from 'react-router-dom';
import AuthUser from '../Authentication/AuthUser';
import UserCRUD from "../Admin/userCRUD";
import AdminDashboard from '../Dashboard/admin_dashboard';
import ProjectCRUD from '../Admin/projectCRUD';
import UserEDIT from '../Admin/userEDIT';

export default function AdminNav() {
    const { token, logout, user } = AuthUser();
    const logoutUser = () => {
        if (token != undefined) {
            logout();
        }
    }
    return (
        <div className="flex h-screen">
            <div className="p-2 bg-gray-200 bg-indigo-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="inline w-8 h-8 text-white lg:hidden" fill="none"
                    viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                <div className="hidden lg:block">
                    <div className="my-2 mb-6">
                        <h1 className="px-2 text-3xl font-bold text-white">Admin: &#160; &#160; &#160; &#160; <br />{user.name}</h1>
                    </div>
                    <ul className="px-1 bg-gray-200 bg-indigo-600 grid">
                        <li className="mb-2 rounded hover:shadow hover:bg-gray-800">
                            <Link to="/dashboard" className="inline-block w-full h-full px-3 py-2 font-bold text-white">
                                <svg className="inline-block w-6 h-6 mr-2 mt-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v15c0 .6.4 1 1 1h15M8 16l2.5-5.5 3 3L17.3 7 20 9.7" />
                                </svg>
                                Dashboard
                            </Link>

                        </li>
                        <li className="mb-2 rounded hover:shadow hover:bg-gray-800">
                            <Link to="/admin/users" className="inline-block w-full h-full px-3 py-2 font-bold text-white">
                                <svg className="inline-block w-6 h-6 mr-2 -mt-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-width="2"
                                        d="M4.5 17H4a1 1 0 0 1-1-1 3 3 0 0 1 3-3h1m0-3a2.5 2.5 0 1 1 2-4.5M19.5 17h.5c.6 0 1-.4 1-1a3 3 0 0 0-3-3h-1m0-3a2.5 2.5 0 1 0-2-4.5m.5 13.5h-7a1 1 0 0 1-1-1 3 3 0 0 1 3-3h3a3 3 0 0 1 3 3c0 .6-.4 1-1 1Zm-1-9.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z"
                                        clipRule="evenodd" />
                                </svg>
                                Users
                            </Link>
                        </li>
                        <li className="mb-2 rounded hover:shadow hover:bg-gray-800">
                            <Link to="/admin/projects" className="inline-block w-full h-full px-3 py-2 font-bold text-white">
                                <svg className="inline-block w-6 h-6 mr-2 -mt-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="m11.5 11.5 2 2M4 10h5m11 0h-1.5M12 7V4M7 7V4m10 3V4m-7 13H8v-2l5.2-5.3a1.5 1.5 0 0 1 2 2L10 17Zm-5 3h14c.6 0 1-.4 1-1V7c0-.6-.4-1-1-1H5a1 1 0 0 0-1 1v12c0 .6.4 1 1 1Z"
                                        clipRule="evenodd" />
                                </svg>
                                Projects
                            </Link>
                        </li>
                        <li className="mb-2 rounded hover:shadow hover:bg-gray-800">
                            <Link to="#" className="inline-block w-full h-full px-3 py-2 font-bold text-white">
                                <svg className="inline-block w-6 h-6 mr-2 -mt-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7.6 8.5h8m-8 3.5H12m7.1-7H5c-.2 0-.5 0-.6.3-.2.1-.3.3-.3.6V15c0 .3 0 .5.3.6.1.2.4.3.6.3h4l3 4 3-4h4.1c.2 0 .5 0 .6-.3.2-.1.3-.3.3-.6V6c0-.3 0-.5-.3-.6a.9.9 0 0 0-.6-.3Z" />
                                </svg>
                                Notifications
                            </Link>

                        </li>
                        <li className="mb-2 rounded hover:shadow hover:bg-gray-800">
                            <Link to="#" className="inline-block w-full h-full px-3 py-2 font-bold text-white">
                                <svg className="inline-block w-6 h-6 mr-2 -mt-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeLinecap="square" strokeLinejoin="round" strokeWidth="2"
                                        d="M10 19H5a1 1 0 0 1-1-1v-1a3 3 0 0 1 3-3h2m10 1a3 3 0 0 1-3 3m3-3a3 3 0 0 0-3-3m3 3h1m-4 3a3 3 0 0 1-3-3m3 3v1m-3-4a3 3 0 0 1 3-3m-3 3h-1m4-3v-1m-2.1 1.9-.7-.7m5.6 5.6-.7-.7m-4.2 0-.7.7m5.6-5.6-.7.7M12 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                        clipRule="evenodd" />
                                </svg>
                                Profile
                            </Link>
                        </li>
                        <li className="mb-2 rounded hover:shadow hover:bg-gray-800">
                            <label onClick={logoutUser} className="inline-block w-full h-full px-3 py-2 font-bold text-white">
                                <svg className="inline-block w-6 h-6 mr-2 -mt-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M6 18 18 6m0 12L6 6" clipRule="evenodd" />
                                </svg>
                                Logout
                            </label>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="w-full px-4 py-2 bg-gray-200 lg:w-full">
                <Routes>
                    <Route path="/dashboard" element={<AdminDashboard />} />
                    <Route path="/admin/users" element={<UserCRUD />} />
                    <Route path="/admin/projects" element={<ProjectCRUD />} />
                    <Route path="/admin/users/edit/" element={<UserEDIT />} />
                </Routes>
            </div>
        </div>


    )
}