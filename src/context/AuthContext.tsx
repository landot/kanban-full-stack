import { User } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../firebaseConfig";

export const AuthContext = createContext<User | null | undefined>(null);

export function AuthProvider(props: {children: any}) {
    const [currentUser, setCurrentUser] = useState<User | null | undefined>();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user);
        })
        return unsubscribe;
    }, [])

    return (
        <AuthContext.Provider value={currentUser}>
            {props.children}
        </AuthContext.Provider>
    )
}