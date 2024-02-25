import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import AuthUser from "../AuthUser";

const user = AuthUser();

export default function UserDashboard() {
    return (
        <>
            <h1>Dashboard</h1>
            Name : {user.name}
            <br />
            Email : {user.email}
            <br />
            Role: {user.role}

        </>
    )
}