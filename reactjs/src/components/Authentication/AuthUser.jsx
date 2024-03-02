import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function AuthUser() {
    const navigate = useNavigate();


    const getToken = () => {
        const tokenString = sessionStorage.getItem("token");
        const userToken = JSON.parse(tokenString);
        return userToken;
    }

    const getUser = () => {
        const userString = sessionStorage.getItem("user");
        const userDetails = JSON.parse(userString);
        return userDetails;
    }

    const [token, setToken] = useState(getToken());
    const [user, setUser] = useState(getUser());

    const saveToken = (user, token) => {


        setUser(user);
        sessionStorage.setItem("token", JSON.stringify(token));
        sessionStorage.setItem("user", JSON.stringify(user));

        setUser(user);
        setToken(token);
        navigate("/dashboard");
    }


    const logout = () => {
        sessionStorage.clear();
    }

    const http = axios.create({
        baseURL: "http://127.0.0.1:8000/api",
        headers: {
            "Content-type": "application/json",
        }
    })

    return {
        setToken: saveToken,
        token,
        user,
        getToken,
        http,
        logout,
    }
}   