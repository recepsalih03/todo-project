import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../firebase/firebase_api'; 
import { useAuth } from '@/firebase/auth';
import { useRouter } from 'next/router';

const RegisterForm = () => {
    // useState kullanarak isim, email ve şifre için state'ler oluşturuyoruz.
    const [name, setName] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);

    // useAuth hook'u kullanarak authUser, isLoading ve setAuthUser fonksiyonlarını alıyoruz.
    const {authUser, isLoading, setAuthUser} = useAuth();
    const router = useRouter();

    // useEffect ile kullanıcı oturumu açık ise anasayfaya yönlendiriyoruz.
    useEffect(() => {
        if (!isLoading && authUser) {
            router.push("/")
        }
    }, [isLoading, authUser]);

    // Kullanıcı kayıt işlemi
    const signUpHandler = async (e) => {
        e.preventDefault();
        if (!name || !email || !password) return;
        try {
            const { user } = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(auth.currentUser, {displayName: name});
            console.log(user);
            setAuthUser({
                uid: user.uid,
                email: user.email,
                name: user.displayName,
            });
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <main className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
                <h1 style={{ color: 'black' }} className="text-4xl font-semibold text-center">Kayıt Ol</h1>
                <p style={{ color: 'black' }} className="mt-4 text-center">
                    Hesabınız var mı?{" "}
                    <Link href="/login" className="text-blue-500 underline hover:text-blue-700 cursor-pointer">Giriş Yap</Link>
                </p>
                <form onSubmit={signUpHandler} className="mt-8 space-y-6">
                    <div className="flex flex-col">
                        <label style={{ color: 'black' }} className="mb-2 text-sm font-medium">İsim soyisim</label>
                        <input type="text" className='font-medium border border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-500'
                            required onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="flex flex-col">
                        <label style={{ color: 'black' }} className="mb-2 text-sm font-medium">Email</label>
                        <input type="email" className='font-medium border border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-500'
                            required onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="flex flex-col">
                        <label style={{ color: 'black' }} className="mb-2 text-sm font-medium">Şifre</label>
                        <input type="password" className='font-medium border border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-500'
                            required autoComplete="on" onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <button type="submit" className='bg-gray-800 text-white w-full py-2 mt-4 rounded-full transition-transform hover:bg-gray-900 active:scale-95'>Kayıt Ol</button>
                </form>
            </div>
        </main>
    );
};

export default RegisterForm;
