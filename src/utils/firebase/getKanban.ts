import { collection, getDocs, documentId, query, where } from "firebase/firestore";
import { auth, db } from "../../firebaseConfig";
import { Data } from "../../types/data";

export async function getKanban(): Promise<Data> {
    const kanbanRef = collection(db, "kanban");
    const queryMessages = query(kanbanRef, where(documentId(), "==", auth.currentUser?.uid));
    const kanbanData = []; 
    const querySnapshot = await getDocs(queryMessages);
    querySnapshot.forEach((doc) => {
      kanbanData.push(doc.data());
      console.log(doc.id, " => ", doc.data());
    });
    if(kanbanData.length > 0) {
      return kanbanData[0];
    } else {
      // todo replace with better error handling
      // return empty boards
      return {
        boards: []
      }
    }
  }