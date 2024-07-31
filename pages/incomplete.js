// pages/incomplete.js
import Navbar from '../components/navbar';
import { useAuth } from '@/firebase/auth';
import { useEffect, useState } from 'react';
import { collection, query, where, getDocs, doc } from 'firebase/firestore';
import { db } from '@/firebase/firebase_api';

const Incomplete = () => {
    const { authUser, isLoading } = useAuth();
    const [incompleteTodos, setIncompleteTodos] = useState([]);

    useEffect(() => {
        if (!isLoading && authUser) {
            fetchIncompleteTodos(authUser.uid);
        }
    }, [isLoading, authUser]);

    const fetchIncompleteTodos = async (uid) => {
        try {
            const q = query(collection(db, "Todo-List"), where("owner", "==", uid), where("completed", "==", false));
            const querySnapshot = await getDocs(q);
            let data = [];
            querySnapshot.forEach((doc) => {
                data.push({ ...doc.data(), id: doc.id });
            });
            setIncompleteTodos(data);
        } catch (error) {
            console.error(error);
        }
    };

    if (isLoading) {
        return <div>Yükleniyor...</div>;
    }

    return (
        <>
            <Navbar />
            <main className="p-6">
                <h1 className="text-3xl font-bold mb-4">Tamamlanmamış Görevler</h1>
                {incompleteTodos.length > 0 ? (
                    <ul className="space-y-4">
                        {incompleteTodos.map((todo) => (
                            <li key={todo.id} className="bg-red-100 p-4 rounded-lg shadow-md">
                                <span className="text-lg font-medium">{todo.description}</span>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Henüz tamamlanmamış görev yok.</p>
                )}
            </main>
        </>
    );
};

export default Incomplete;
