import { signInWithEmailAndPassword } from 'firebase/auth';
import Link from 'next/link';
import React, { useState } from 'react';
import { auth } from '../firebase/firebase_api';

const LoginForm = () => {
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);

    const loginHandler = async (e) => {
        e.preventDefault();
        if (!email || !password) return;
        try {
            const { user } = await signInWithEmailAndPassword(auth, email, password);
            console.log(user);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <main className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
                <h1 className="text-4xl font-semibold text-center">Login</h1>
                <p className="mt-4 text-center">
                    Don't have an account?{" "}
                    <Link href="/register" className="text-blue-500 underline hover:text-blue-700 cursor-pointer">Sign Up</Link>
                </p>
                <form onSubmit={loginHandler} className="mt-8 space-y-6">
                    <div className="flex flex-col">
                        <label className="mb-2 text-sm font-medium">Email</label>
                        <input type="email" className='font-medium border border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-500'
                            required onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="flex flex-col">
                        <label className="mb-2 text-sm font-medium">Password</label>
                        <input type="password" className='font-medium border border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-500'
                            required autoComplete="on" onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <button type="submit" className='bg-gray-800 text-white w-full py-2 mt-4 rounded-full transition-transform hover:bg-gray-900 active:scale-95'>Login</button>
                </form>
            </div>
        </main>
    );
};

export default LoginForm;
