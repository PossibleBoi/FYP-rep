import AuthUser from "./AuthUser"

export default function Dashboard() {
    const {user} = AuthUser();

    return(
        <>
        <h1>Dashboard</h1>
            Name : {user.name}
            <br />
            Email : {user.email}
            <br/>
            Role: {user.role}
        </>
    )
} 