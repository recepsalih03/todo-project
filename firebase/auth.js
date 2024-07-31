import { createContext, useState, useEffect, useContext } from "react";
import { onAuthStateChanged, signOut as authSignOut } from "firebase/auth";
import { auth } from "./firebase_api";

// AuthUserContext oluşturuyoruz ve başlangıç değerlerini belirliyoruz.
const AuthUserContext = createContext({
    authUser: null,
    isLoading: true,
    signOut: () => {} // `signOut` fonksiyonunu burada belirliyoruz
});

// useFirebaseAuth hook'u ile oturum durumunu ve kullanıcı bilgilerini yönetiyoruz.
function useFirebaseAuth() {
    const [authUser, setAuthUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const clearAuth = () => {
        setAuthUser(null);
        setIsLoading(false);
    };

    const onAuthStateChange = (user) => {
        setIsLoading(true);
        if (!user) {
            clearAuth();
            return;
        }
        setAuthUser({
            uid: user.uid,
            email: user.email,
            name: user.displayName || 'No name'
        });
        setIsLoading(false);
    };

    const signOut = async () => {
        try {
            await authSignOut(auth);
            clearAuth();
        } catch (error) {
            console.error('Çıkış yapma işlemi sırasında bir hata oluştu:', error);
        }
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, onAuthStateChange);
        return () => unsubscribe();
    }, []);

    return {
        authUser,
        isLoading,
        signOut
    };
}

// AuthUserProvider bileşeni ile context'i sağlıyoruz.
export function AuthUserProvider({ children }) {
    const auth = useFirebaseAuth();
    return (
        <AuthUserContext.Provider value={auth}>
            {children}
        </AuthUserContext.Provider>
    );
}

// useAuth hook'u ile context'e erişiyoruz.
export const useAuth = () => useContext(AuthUserContext);
