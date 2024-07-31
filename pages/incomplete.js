import Navbar from '../components/navbar'; // Navbar bileşenini import edin
import { useAuth } from '@/firebase/auth'; // Firebase authentication kullanımı için import
import { useEffect, useState } from 'react'; // React'ten gerekli hook'lar
import { collection, query, where, getDocs, doc } from 'firebase/firestore'; // Firestore'dan gerekli işlevler
import { db } from '@/firebase/firebase_api'; // Firestore veritabanı bağlantısı

const Incomplete = () => {
    const { authUser, isLoading } = useAuth(); // Kullanıcı oturum durumu ve yüklenme durumu
    const [incompleteTodos, setIncompleteTodos] = useState([]); // Tamamlanmamış görevleri tutan state

    useEffect(() => {
        if (!isLoading && authUser) {
            fetchIncompleteTodos(authUser.uid); // Kullanıcı yüklendiyse ve oturum açtıysa tamamlanmamış görevleri getir
        }
    }, [isLoading, authUser]);

    // Tamamlanmamış görevleri getir
    const fetchIncompleteTodos = async (uid) => {
        try {
            // Kullanıcının tamamlanmamış görevlerini sorgulayan Firestore sorgusu
            const q = query(collection(db, "Todo-List"), where("owner", "==", uid), where("completed", "==", false));
            const querySnapshot = await getDocs(q);
            let data = [];
            querySnapshot.forEach((doc) => {
                data.push({ ...doc.data(), id: doc.id }); // Görev verilerini ve ID'sini state'e ekle
            });
            setIncompleteTodos(data); // State'i güncelle
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
                <h1 className="text-3xl font-bold mb-4">Tamamlanmamış Görevler</h1>
                {incompleteTodos.length > 0 ? (
                    <ul className="space-y-4">
                        {incompleteTodos.map((todo) => (
                            <li key={todo.id} className="bg-red-100 p-4 rounded-lg shadow-md">
                                <span className="text-lg font-medium">{todo.description}</span> {/* Görev açıklamasını göster */}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Henüz tamamlanmamış görev yok.</p> // Tamamlanmamış görev yoksa gösterilecek mesaj
                )}
            </main>
        </>
    );
};

export default Incomplete; // Bileşeni dışa aktar
