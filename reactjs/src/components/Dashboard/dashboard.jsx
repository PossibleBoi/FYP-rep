import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import AuthUser from "../AuthUser";
import UserDashboard from "./user_dashboard";
import AdminDashboard from "./admin_dashboard";

export default function Dashboard() {
    const { user } = AuthUser();

    if (user.role == "admin") {
        return (
            <AdminDashboard />
        );
    }
    else {
        return (
            <UserDashboard />
        )
    }
}