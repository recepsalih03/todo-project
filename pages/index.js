import { GoSignOut } from 'react-icons/go';
import { AiOutlinePlus } from 'react-icons/ai';
import { MdDeleteForever } from 'react-icons/md';
import { useAuth } from '@/firebase/auth';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { collection, addDoc, query, where, getDocs, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { db, auth } from '@/firebase/firebase_api'; // `auth` importunu ekleyin

export default function Home() {
    const [todoInput, setTodoInput] = useState("");
    const [todos, setTodos] = useState([]);
    const { authUser, isLoading, signOut } = useAuth(); // `signOut` işlevini kontrol edin
    const router = useRouter();

    // Yüklenirken kullanıcı oturumunu kontrol edin ve giriş yapmamışsa login sayfasına yönlendirin
    useEffect(() => {
        if (!isLoading && !authUser) {
            router.push("/login");
        } else if (authUser) {
            fetchTodos(authUser.uid);
        }
    }, [isLoading, authUser]);

    // Görev oluşturma işlevi
    const CreateTodo = async () => {
        try {
            const docRef = await addDoc(collection(db, "Todo-List"), {
                owner: authUser.uid,
                description: todoInput,
                completed: false,
            });
            console.log("Document written with ID:", docRef.id);
            setTodos([...todos, { id: docRef.id, owner: authUser.uid, description: todoInput, completed: false }]);
            setTodoInput("");
        } catch (error) {
            console.error(error);
        }
    };

    // Görevleri çekme işlevi
    const fetchTodos = async (uid) => {
        try {
            const q = query(collection(db, "Todo-List"), where("owner", "==", uid));
            const querySnapshot = await getDocs(q);
            let data = [];
            querySnapshot.forEach((doc) => {
                console.log(doc.id, "=>", doc.data());
                data.push({ ...doc.data(), id: doc.id });
            });
            setTodos(data);
        } catch (error) {
            console.error(error);
        }
    };

    // Görev silme işlevi
    const deleteTodo = async (docId) => {
        try {
            await deleteDoc(doc(db, 'Todo-List', docId));
            setTodos(todos.filter((todo) => todo.id !== docId));
        } catch (error) {
            console.error(error);
        }
    };

    // Görev tamamlanma işlevi
    const checkedTodo = async (e, docId) => {
        try {
            const docRef = doc(db, "Todo-List", docId);
            await updateDoc(docRef, {
                completed: e.target.checked
            });
            fetchTodos(authUser.uid);
        } catch (error) {
            console.error(error);
        }
    };

    // Enter tuşuna basıldığında görev oluşturma işlevi
    const onKeyUp = (e) => {
        if (e.key === "Enter" && todoInput.length > 0) {
            CreateTodo();
        }
    };

    // Çıkış yapma işlevi
    const handleSignOut = async () => {
        console.log("Çıkış yapma isteği başladı");
        try {
            await signOut(auth);
            console.log('Kullanıcı çıkış yaptı');
            router.push("/login"); // Çıkış yaptıktan sonra yönlendirme
        } catch (error) {
            console.error('Çıkış yapma işlemi sırasında bir hata oluştu:', error);
        }
    };

    // Yükleniyor durumu
    if (isLoading) {
        return <div>Yükleniyor...</div>;
    }

    return (
        <main>
            <div
                className='bg-slate-600 text-white w-44 py-4 mt-5 rounded-lg transition-transform hover:bg-black/[0.8] 
                active:scale-90 flex items-center justify-center gap-2 font-medium shadow-md fixed bottom-90 right-5 cursor-pointer'
                onClick={handleSignOut}
            >
                <GoSignOut size={15} />
                <span>Çıkış yap</span>
            </div>
            <br />
            <br />
            <div className='max-w-3xl mx-auto mt-10 p-8'>
                <div className='bg-white m-6 p-3 top-0'>
                    <div className='flex justify-center flex-col items-center'>
                        <span className='text-7xl mb-10 font-bold text-center'>Hayatınızı ve işinizi düzenleyin</span>
                        <h1 className='text-5xl md:text-7xl font-bold text-cyan-600'>Yapılacaklar Listesi</h1>
                    </div>
                </div>
                <div className='flex items-center gap-2 mt-10'>
                    <input
                        type='text' style={{ color: 'black' }}
                        className='font-semibold placeholder:text-gray-500 border-[2px] border-black h-[60px] grow shadow-sm rounded-md px-4 
                        focus-visible:outline-yellow-400 text-lg transition-all duration-300'
                        placeholder={'Merhaba, bugün ne yapacaksınız?'}
                        autoFocus value={todoInput} onChange={(e) => setTodoInput(e.target.value)} onKeyUp={onKeyUp}
                    />
                    <button
                        className='w-[60px] h-[60px] rounded-md bg-amber-500 flex justify-center items-center 
                        cursor-pointer transition-all duration-300 hover:bg-black/[0.8]'
                        onClick={CreateTodo}
                    >
                        <AiOutlinePlus size={30} />
                    </button>
                </div>
                <div className='mt-10'>
                    {todos.length > 0 && todos.map((todo) => (
                        <div key={todo.id} className='flex items-center justify-between mt-4'>
                            <div className='flex items-center gap-3'>
                                <input
                                    id={`todo-${todo.id}`} type='checkbox'
                                    className='w-4 h-4 accent-green-400 rounded-lg' checked={todo.completed}
                                    onChange={(e) => checkedTodo(e, todo.id)}
                                />
                                <label htmlFor={`todo-${todo.id}`} className='font-medium'>{todo.description}</label>
                            </div>
                            <div className='flex items-center gap-3'>
                                <MdDeleteForever size={24} className='text-red-400 hover:text-red-600 cursor-pointer'
                                onClick={() => deleteTodo(todo.id)} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
