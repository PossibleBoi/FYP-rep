import React from 'react';
import AuthUser from '../Authentication/AuthUser';

export default function UserDashboard() {

    const { user } = AuthUser();

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