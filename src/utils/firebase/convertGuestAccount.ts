import { EmailAuthProvider, linkWithCredential } from "firebase/auth";
import { auth } from "../../firebaseConfig";

export async function convertGuestAccount(email: string, password: string) {
    const credential = EmailAuthProvider.credential(email, password);
    if(!auth.currentUser) return;
    await linkWithCredential(auth.currentUser, credential);
}