import { signInWithEmailAndPassword, UserCredential } from "firebase/auth";
import { auth } from "../../firebaseConfig";

export async function login(email: string, password: string): Promise<UserCredential> {
    return await signInWithEmailAndPassword(auth, email, password);
}