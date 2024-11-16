"use client"
import { useState } from 'react';
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const API_URL = 'http://localhost/ca3';


    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const response = await axios.post(`${API_URL}/api/login.php`, {
                email,
                password
            });
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('userId', response.data.id);
            toast.success(response.data.message);

            setTimeout(() => {
                window.location.href = '/';
            }, 1500)

        }
        catch (error) {
            if (error.response && error.response.status === 401) {
                toast.error("Invalid credentials");
            } else if (error.response && error.response.status === 404) {
                toast.error("Missing fields");
            } else {
                toast.error("An error occurred. Please try again.");
            }
        }
    }



    return (
        <div className='min-h-screen flex justify-center items-center flex-col bg-gradient-to-b from-gray-900 to-black'>
            <form onSubmit={handleSubmit} className='bg-white py-12 px-6 rounded-lg  flex flex-col'>
                <h2 className='font-semibold mb-10 text-center text-3xl'>Welcome Back</h2>

                <div className='relative mb-2'>
                    <input
                        type="email"
                        id='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder=' '
                        className='mb-4 p-4 border border-b-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-200 w-96 h-14'
                    />
                    <label
                        className='text-xl text-gray-400 text-opacity-80 absolute left-0 top-0 mx-6 mt-3 px-1 transition duration-200 input-text'
                        htmlFor='email'
                    >
                        Email Address
                    </label>
                </div>

                <div className='relative mb-2'>
                    <input
                        type="password"
                        id='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        placeholder=' '
                        className='mb-4 p-4 border border-b-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-200 w-96 h-14'
                    />
                    <label
                        className='text-xl text-gray-400 text-opacity-80 absolute left-0 top-0 mx-6 mt-3 px-1 transition duration-200 input-text'
                        htmlFor='email'
                    >
                        Password
                    </label>
                </div>



                <button type="submit" className='bg-teal-600 text-white rounded-md h-14'>Login</button>
                <Toaster />
            </form>

            <div className='text-white mt-5'>Don't have an account? <a href="/register" className='text-teal-500'>Sign up</a></div>
        </div>
    )
}