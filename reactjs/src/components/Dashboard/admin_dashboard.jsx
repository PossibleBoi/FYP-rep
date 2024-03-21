import { React, useState, ReactDOM, useEffect } from "react";
import { Link, Navigate, Routes, Route } from "react-router-dom";
import AuthUser from "../Authentication/AuthUser";

export default function AdminDashboard() {
    const { http, token, logout } = AuthUser();
    const [user_total, setUserTotal] = useState(0);

    const logoutUser = () => {
        if (token != undefined) {
            logout();
        }
    }
    
    const total_users = () => {
        http.get('/admin/users/total')
            .then((response) => {
                setUserTotal(response.data[0]);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    useEffect(() => {
        total_users();
    }
    , []);


        return (
            <>
                    <div className="w-full px-4 py-2 bg-gray-200 lg:w-full">
                       Admin Dashboard
                    </div>
                Total Users: {user_total} <br/>
                Total Projects:
                <br/>
                Total Transactions:
            </>
        );
    }

