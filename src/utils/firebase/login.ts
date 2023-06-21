import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebaseConfig";

export async function login(email: string, password: string) {
    await signInWithEmailAndPassword(auth, email, password);
}