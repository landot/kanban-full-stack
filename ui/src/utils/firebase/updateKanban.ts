import { doc, setDoc } from "firebase/firestore";
import { firestoreCollection } from "../../data/collection";
import { auth, db } from "../../firebaseConfig";


export async function updateKanban(data: object) {
    if(auth && auth.currentUser && auth.currentUser.uid) {
      await setDoc(
        doc(
          db, 
          firestoreCollection, 
          auth.currentUser.uid
        ),
        data
      );
    }
  }