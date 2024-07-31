// pages/completed.js
import Navbar from '../components/navbar';
import { useAuth } from '@/firebase/auth';
import { useEffect, useState } from 'react';
import { collection, query, where, getDocs, doc } from 'firebase/firestore';
import { db } from '@/firebase/firebase_api';

const Completed = () => {
    const { authUser, isLoading } = useAuth();
    const [completedTodos, setCompletedTodos] = useState([]);

    useEffect(() => {
        if (!isLoading && authUser) {
            fetchCompletedTodos(authUser.uid);
        }
    }, [isLoading, authUser]);

    const fetchCompletedTodos = async (uid) => {
        try {
            const q = query(collection(db, "Todo-List"), where("owner", "==", uid), where("completed", "==", true));
            const querySnapshot = await getDocs(q);
            let data = [];
            querySnapshot.forEach((doc) => {
                data.push({ ...doc.data(), id: doc.id });
            });
            setCompletedTodos(data);
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
                <h1 className="text-3xl font-bold mb-4">Tamamlanmış Görevler</h1>
                {completedTodos.length > 0 ? (
                    <ul className="space-y-4">
                        {completedTodos.map((todo) => (
                            <li key={todo.id} className="bg-green-100 p-4 rounded-lg shadow-md">
                                <span className="text-lg font-medium">{todo.description}</span>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Henüz tamamlanmış görev yok.</p>
                )}
            </main>
        </>
    );
};

export default Completed;
