import axios, { all } from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Cookies from 'js-cookies';

export default function AuthUser() {
    const navigate = useNavigate();

    const getToken = () => {
        const tokenString = Cookies.getItem("token");
        const userToken = JSON.parse(tokenString);
        return userToken;
    }

    const getUser = () => {
        const userString = Cookies.getItem("user");
        const userDetails = JSON.parse(userString);
        return userDetails;
    }

    const [token, setToken] = useState(getToken());
    const [user, setUser] = useState(getUser());

    const saveToken = (user, token) => {
        setUser(user);
        Cookies.setItem("token", JSON.stringify(token), { SameSite: 'None' });
        Cookies.setItem("user", JSON.stringify(user), { SameSite: 'None' });
        setUser(user);
        setToken(token);
        navigate("/dashboard");
    }

    const logout = () => {
        Cookies.removeItem('user', { SameSite: 'None' });  
        Cookies.removeItem('token', { SameSite: 'None' });
        navigate("/");
    }

    const http = axios.create({
        baseURL: "http://127.0.0.1:8000/api",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-type": ["application/json","multipart/form-data"],
            "Access-Control-Allow-Origin": "*",
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