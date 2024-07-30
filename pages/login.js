import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { auth } from '../firebase/firebase_api';
import { useAuth } from '@/firebase/auth';
import { useRouter } from 'next/router';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { authUser, isLoading } = useAuth();
    const router = useRouter();

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

    const logoutHandler = async () => {
        try {
            await signOut(auth);
            console.log('User logged out');
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (!isLoading && authUser) {
            const timer = setTimeout(() => {
                router.push("/");
            }, 3000); // 3 saniye sonra yönlendir

            return () => clearTimeout(timer); 
        }
    }, [isLoading, authUser, router]);

    if (isLoading) {
        return "loading";
    }

    if (authUser) {
        return (
            <main className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
                    <h1 className="text-4xl font-semibold text-center">You are logged in</h1>
                    <p className="text-center mt-4">Redirecting to home page...</p>
                    <Link href="/" legacyBehavior>
                        <a className="block text-center mt-2 text-blue-500 underline">Go to Home Page</a>
                    </Link>
                    <button 
                        onClick={logoutHandler} 
                        className='bg-gray-800 text-white w-full py-2 mt-4 rounded-full transition-transform hover:bg-gray-900 active:scale-95'>
                        Logout
                    </button>
                </div>
            </main>
        );
    }

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
