import { signInAnonymously } from "firebase/auth";
import { auth } from "../../firebaseConfig";

export async function signInAsGuest() {
    await signInAnonymously(auth);
}