import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../firebase/firebase_api'; 
import { useAuth } from '@/firebase/auth';
import { useRouter } from 'next/router';

const RegisterForm = () => {
    const [name, setName] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const {authUser, isLoading, setAuthUser} = useAuth();

    const router = useRouter()

    useEffect(() => {
        if (!isLoading && authUser) {
            router.push("/")
        }
    }, [isLoading, authUser] )

    const signUpHandler = async (e) => {
        e.preventDefault();
        if (!name || !email || !password) return;
        try {
            const { user } = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(auth.currentUser, {displayName: name})
            console.log(user);
            setAuthUser({
                uid: user.uid,
                email: user.email,
                name: user.displayName,
            })
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <main className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
                <h1 className="text-4xl font-semibold text-center">Sign Up</h1>
                <p className="mt-4 text-center">
                    Already have an account?{" "}
                    <Link href="/login" className="text-blue-500 underline hover:text-blue-700 cursor-pointer">Login</Link>
                </p>
                <form onSubmit={signUpHandler} className="mt-8 space-y-6">
                    <div className="flex flex-col">
                        <label className="mb-2 text-sm font-medium">Name</label>
                        <input type="text" className='font-medium border border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-500'
                            required onChange={(e) => setName(e.target.value)} />
                    </div>
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
                    <button type="submit" className='bg-gray-800 text-white w-full py-2 mt-4 rounded-full transition-transform hover:bg-gray-900 active:scale-95'>Sign Up</button>
                </form>
            </div>
        </main>
    );
};

export default RegisterForm;
