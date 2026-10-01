import { db } from "../globals";
import { getDoc, doc } from "firebase/firestore";

export async function getUserDoc(userId: string) {
    const userRef = doc(db, 'users', userId);
    const docSnap = await getDoc(userRef);

    if (!docSnap.exists()) return null;

    return docSnap;
}