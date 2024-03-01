import { React, useState, ReactDOM, useEffect } from "react";
import { Link, Navigate, Routes, Route } from "react-router-dom";
import AuthUser from "../Authentication/AuthUser";

export default function AdminDashboard() {
    const { user, token, logout } = AuthUser();

    const logoutUser = () => {
        if (token != undefined) {
            logout();
        }
    }
        return (
            <>
                    <div className="w-full px-4 py-2 bg-gray-200 lg:w-full">
                       Admin Dashboard
                    </div>
            </>
        );
    }

