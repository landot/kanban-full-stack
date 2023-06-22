import { createUserWithEmailAndPassword, UserCredential } from "firebase/auth";
import { auth } from "../../firebaseConfig";

export async function createAccount(email: string, password: string): Promise<UserCredential>  {
    try {
      return await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
