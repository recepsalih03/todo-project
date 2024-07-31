import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { auth } from '../firebase/firebase_api';
import { useAuth } from '@/firebase/auth';
import { useRouter } from 'next/router';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { authUser, isLoading } = useAuth();
    const router = useRouter();

    // Email doğrulama fonksiyonu
    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    // Giriş yapma işlemini gerçekleştiren fonksiyon
    const loginHandler = async (e) => {
        e.preventDefault();
        setError(''); // Önceki hataları temizle

        // Giriş verilerini doğrulama
        if (!email || !password) {
            setError('Email ve şifre gereklidir.');
            return;
        }
        if (!validateEmail(email)) {
            setError('Geçerli bir email giriniz.');
            return;
        }
        if (password.length < 8) {
            setError('Şifre en az 8 karakter olmalıdır.');
            return;
        }
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            setError('Giriş başarısız. Tekrar deneyiniz.');
        }
    };

    // Kullanıcı giriş yapmışsa anasayfaya yönlendirme
    useEffect(() => {
        if (!isLoading && authUser) {
            router.push("/");
        }
    }, [isLoading, authUser, router]);

    // Kullanıcı çıkış yapma işlemi
    const logoutHandler = async () => {
        try {
            await signOut(auth); // Firebase'den çıkış yap
            router.push("/login"); // Giriş sayfasına yönlendir
        } catch (error) {
            console.error('Çıkış yapma işlemi sırasında bir hata oluştu:', error);
        }
    };

    // Yükleme durumu
    if (isLoading) {
        return "Yükleniyor...";
    }

    // Kullanıcı giriş yapmışsa gösterilecek içerik
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

    // Giriş yapma formu
    return (
        <main className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
                <h1 style={{ color: 'black' }} className="text-4xl font-semibold text-center">Giriş Yap</h1>
                <p style={{ color: 'black' }} className="mt-4 text-center ">
                    Hesabınız yok mu?{" "}
                    <Link href="/register" className="text-blue-500 underline hover:text-blue-700 cursor-pointer">Kayıt Ol</Link>
                </p>
                <form onSubmit={loginHandler} className="mt-8 space-y-6">
                    <div className="flex flex-col">
                        <label style={{ color: 'black' }} className="mb-2 text-sm font-medium">Email</label>
                        <input type="email" style={{ color: 'black' }} className='font-medium border border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-500'
                            required value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="flex flex-col">
                        <label style={{ color: 'black' }} className="mb-2 text-sm font-medium">Şifre</label>
                        <input type="password" style={{ color: 'black' }} className='font-medium border border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-500'
                            required autoComplete="on" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <button type="submit" className='bg-gray-800 text-white w-full py-2 mt-4 rounded-full transition-transform hover:bg-gray-900 active:scale-95'>Giriş Yap</button>
                </form>
            </div>
        </main>
    );
};

export default LoginForm;
