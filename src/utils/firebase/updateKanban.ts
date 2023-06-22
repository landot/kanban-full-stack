import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../firebaseConfig";


export async function updateKanban(data: object) {
    await setDoc(doc(db, "kanban", auth.currentUser?.uid), data);
  }