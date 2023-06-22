import { User } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../firebaseConfig";

export const AuthContext = createContext<User | null | undefined>(null);

export function AuthProvider(props: {children: any}) {
    const [currentUser, setCurrentUser] = useState<User | null | undefined>();
    const [isInitialized, setisInitialized] = useState(false);


    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user);
            setisInitialized(true);
        })
        return unsubscribe;
    }, [])

    if (isInitialized === false) {
        return <p>getting auth data...</p>;
      }

    return (
        <AuthContext.Provider value={currentUser}>
            {props.children}
        </AuthContext.Provider>
    )
}
