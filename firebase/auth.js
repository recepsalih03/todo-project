import { createContext, useState, useEffect, useContext } from "react";
import { onAuthStateChanged, signOut as authSignOut } from "firebase/auth";
import { auth } from "./firebase_api";

const AuthUserContext = createContext({
    authUser: null,
    isLoading: true
});

export default function useFirebaseAuth() {
    const [authUser, setAuthUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const clearAuth = () => {
        setAuthUser(null);
        setIsLoading(false);
    };

    const onAuthStateChange = async (user) => {
        setIsLoading(true);
        if (!user) {
            clearAuth();
        } else {
            setAuthUser({
                uid: user.uid,
                email: user.email,
                name: user.displayName || 'No name' 
            });
            setIsLoading(false);
        }
    };

    const signOut = () => {
        authSignOut(auth).then(() => clearAuth());
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, onAuthStateChange);
        return () => unsubscribe();
    }, []);

    return {
        authUser,
        isLoading,
        setAuthUser,
        signOut
    };
}

export const AuthUserProvider = ({ children }) => {
    const auth = useFirebaseAuth();
    return (
        <AuthUserContext.Provider value={auth}>
            {children}
        </AuthUserContext.Provider>
    );
};

export const useAuth = () => useContext(AuthUserContext);
