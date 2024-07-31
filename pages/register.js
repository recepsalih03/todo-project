import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../firebase/firebase_api'; 
import { useAuth } from '@/firebase/auth';
import { useRouter } from 'next/router';

// RegisterForm bileşeni tanımı
const RegisterForm = () => {
    // name, email ve password için state değişkenleri
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // Hata mesajlarını depolamak için error state'i
    const [error, setError] = useState('');
    // Kullanıcı doğrulama durumunu ve yükleme durumunu almak için custom hook kullanımı
    const { authUser, isLoading, setAuthUser } = useAuth();
    const router = useRouter();

    // Email doğrulama fonksiyonu
    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    // Kullanıcı doğrulandıktan sonra anasayfaya yönlendirme
    useEffect(() => {
        if (!isLoading && authUser) {
            router.push("/");
        }
    }, [isLoading, authUser, router]);

    // Kayıt formu gönderildiğinde çalışacak fonksiyon
    const signUpHandler = async (e) => {
        e.preventDefault();
        setError(''); // Önceki hataları temizle

        // Gerekli alanların kontrolü
        if (!name || !email || !password) {
            setError('Tüm alanlar gereklidir.');
            return;
        }
        // Email doğrulaması
        if (!validateEmail(email)) {
            setError('Geçerli bir email giriniz.');
            return;
        }
        // Şifre uzunluğunun kontrolü
        if (password.length < 8) {
            setError('Şifre en az 8 karakter olmalıdır.');
            return;
        }
        try {
            // Firebase ile kullanıcı oluşturma
            const { user } = await createUserWithEmailAndPassword(auth, email, password);
            // Kullanıcı profilini güncelleme
            await updateProfile(auth.currentUser, { displayName: name });
            // authUser state'ini güncelleme
            setAuthUser({
                uid: user.uid,
                email: user.email,
                name: user.displayName,
            });
            // Kayıttan sonra anasayfaya yönlendirme
            router.push("/");
        } catch (error) {
            setError('Kayıt başarısız. Tekrar deneyiniz.');
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
                        <input type="text" style={{ color: 'black' }} className='font-medium border border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-500'
                            required value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
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
                    <button type="submit" className='bg-gray-800 text-white w-full py-2 mt-4 rounded-full transition-transform hover:bg-gray-900 active:scale-95'>Kayıt Ol</button>
                </form>
            </div>
        </main>
    );
};

export default RegisterForm;
