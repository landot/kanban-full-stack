import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";


export async function updateKanban(data: object) {
    await setDoc(doc(db, "kanban", 'test'), data);
  }