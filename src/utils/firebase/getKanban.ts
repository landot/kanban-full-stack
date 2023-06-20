import { collection, getDocs, documentId, query, where } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { Data } from "../../types/data";


export async function getKanban(): Promise<Data> {
    const kanbanRef = collection(db, "kanban");
    const queryMessages = query(kanbanRef, where(documentId(), "==", "test"));
    try {
      const kanbanData = []; 
      const querySnapshot = await getDocs(queryMessages);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        kanbanData.push(doc.data());
        console.log(doc.id, " => ", doc.data());
      });
      return kanbanData;
    } catch (err) {
      console.log(err)
      throw err;
    }
  }