import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import AuthUser from "../Authentication/AuthUser";
import AdminDashboard from "./admin_dashboard";
import UserDashboard from "./user_dashboard";

export default function Dashboard() {
    const { user } = AuthUser();

    if (user.role == "admin") {
        return <AdminDashboard />
        }
    else if (user.role == "user"){
        return <UserDashboard />
            }
    else {
        return (
            <div>
                <h1>Starter</h1>
            </div>
        )
}
}