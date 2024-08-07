import { signOut } from "firebase/auth";
import { auth } from "../../firebaseConfig";

export async function logout() {
    await signOut(auth);
}