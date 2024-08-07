import { EmailAuthProvider, linkWithCredential, UserCredential } from "firebase/auth";
import { auth } from "../../firebaseConfig";

export async function convertGuestAccount(email: string, password: string): Promise<UserCredential> {
    const credential = EmailAuthProvider.credential(email, password);
    if(!auth.currentUser) {
        throw Error('guest account not found');
    } else {
        return await linkWithCredential(auth.currentUser, credential);
    }
}