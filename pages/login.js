import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { auth } from '../firebase/firebase_api';
import { useAuth } from '@/firebase/auth';
import { useRouter } from 'next/router';

const LoginForm = () => {
    // useState kullanarak email ve şifre için state'ler oluşturuyoruz.
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { authUser, isLoading } = useAuth();
    const router = useRouter();

    // Kullanıcı giriş işlemi
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

    // Kullanıcı çıkış işlemi
    const logoutHandler = async () => {
        try {
            await signOut(auth);
            console.log('User logged out');
            console.log('Kullanıcı çıkış yaptı');
        } catch (error) {
            console.error(error);
        }
    };

    // useEffect ile kullanıcı oturumu açık ise anasayfaya yönlendiriyoruz.
    useEffect(() => {
        if (!isLoading && authUser) {
            const timer = setTimeout(() => {
                router.push("/");
            }, 3000); 
            return () => clearTimeout(timer); 
        }
    }, [isLoading, authUser, router]);

    if (isLoading) {
        return "loading";
        return "yükleniyor";
    }

    if (authUser) {
        return (
            <main className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
                    <h1 className="text-4xl font-semibold text-center">Giriş yaptınız</h1>
                    <p className="text-center mt-4">Anasayfaya yönlendiriliyorsunuz...</p>
                    <Link href="/" legacyBehavior>
                        <a className="block text-center mt-2 text-blue-500 underline">Anasayfaya git</a>
                    </Link>
                    <button 
                        onClick={logoutHandler} 
                        className='bg-gray-800 text-white w-full py-2 mt-4 rounded-full transition-transform hover:bg-gray-900 active:scale-95'>
                        Çıkış Yap
                    </button>
                </div>
            </main>
        );
    }
    return (
        <main className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
                <h1 className="text-4xl font-semibold text-center">Giriş Yap</h1>
                <p className="mt-4 text-center">
                    Hesabınız yok mu?{" "}
                    <Link href="/register" className="text-blue-500 underline hover:text-blue-700 cursor-pointer">Kayıt Ol</Link>
                </p>
                <form onSubmit={loginHandler} className="mt-8 space-y-6">
                    <div className="flex flex-col">
                        <label className="mb-2 text-sm font-medium">Email</label>
                        <input type="email" className='font-medium border border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-500'
                            required onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="flex flex-col">
                        <label className="mb-2 text-sm font-medium">Şifre</label>
                        <input type="password" className='font-medium border border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-500'
                            required autoComplete="on" onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <button type="submit" className='bg-gray-800 text-white w-full py-2 mt-4 rounded-full transition-transform hover:bg-gray-900 active:scale-95'>Giriş Yap</button>
                </form>
            </div>
        </main>
    );
};

export default LoginForm;
