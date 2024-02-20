import { useState } from 'react';
import AuthUser from './AuthUser';

export default function Login() {
    const {http,setToken} = AuthUser();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const submitForm = () => {
        // console.log("Email: ", email," Password", password);
        //api posting
        http.post("/login", {
            email: email,
            password: password
        }).then((response) => {
            setToken(response.data.user, response.data.access_token);
            console.log(response.data);
        }).catch((error) => {
            console.log(error);
        })
    }
    return (
        <>
            <div class="text-center mt-10">
                <form class="max-w-sm mx-auto">
                    <div class="mb-5">
                        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                        <input type="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                        placeholder="Enter Your Email" 
                        onChange={e=>setEmail(e.target.value)} />
                    </div>
                    <div class="mb-5">
                        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                        <input type="password" id="password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                        placeholder="Enter Your Password"
                        onChange={e=>setPassword(e.target.value)} />
                    </div>
                    <button type="button" onClick={submitForm} class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login</button>
                </form>
            </div>
        </>
    )
}