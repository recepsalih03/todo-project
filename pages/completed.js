import Navbar from '../components/navbar'; // Navbar bileşenini import edin
import { useAuth } from '@/firebase/auth'; // Firebase authentication kullanımı için import
import { useEffect, useState } from 'react'; // React'ten gerekli hook'lar
import { collection, query, where, getDocs, doc } from 'firebase/firestore'; // Firestore'dan gerekli işlevler
import { db } from '@/firebase/firebase_api'; // Firestore veritabanı bağlantısı

const Completed = () => {
    const { authUser, isLoading } = useAuth(); // Kullanıcı oturum durumu ve yüklenme durumu
    const [completedTodos, setCompletedTodos] = useState([]); // Tamamlanmış görevleri tutan state

    useEffect(() => {
        if (!isLoading && authUser) {
            fetchCompletedTodos(authUser.uid); // Kullanıcı yüklendiyse ve oturum açtıysa tamamlanmış görevleri getir
        }
    }, [isLoading, authUser]);

    // Tamamlanmış görevleri getir
    const fetchCompletedTodos = async (uid) => {
        try {
            // Kullanıcının tamamlanmış görevlerini sorgulayan Firestore sorgusu
            const q = query(collection(db, "Todo-List"), where("owner", "==", uid), where("completed", "==", true));
            const querySnapshot = await getDocs(q);
            let data = [];
            querySnapshot.forEach((doc) => {
                data.push({ ...doc.data(), id: doc.id }); // Görev verilerini ve ID'sini state'e ekle
            });
            setCompletedTodos(data); // State'i güncelle
        } catch (error) {
            console.error(error); // Hata olursa konsola yazdır
        }
    };

    // Yüklenme durumu
    if (isLoading) {
        return <div>Yükleniyor...</div>; // Yükleniyorsa, yükleniyor mesajı göster
    }

    return (
        <>
            <Navbar /> {/* Navbar bileşenini göster */}
            <main className="p-6">
                <h1 className="text-3xl font-bold mb-4">Tamamlanmış Görevler</h1>
                {completedTodos.length > 0 ? (
                    <ul className="space-y-4">
                        {completedTodos.map((todo) => (
                            <li key={todo.id} className="bg-green-100 p-4 rounded-lg shadow-md">
                                <span className="text-lg font-medium">{todo.description}</span> {/* Görev açıklamasını göster */}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Henüz tamamlanmış görev yok.</p> // Tamamlanmış görev yoksa gösterilecek mesaj
                )}
            </main>
        </>
    );
};

export default Completed; // Bileşeni dışa aktar
