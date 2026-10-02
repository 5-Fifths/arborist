import { db } from "../globals";
import { getDoc, doc } from "firebase/firestore";

export async function getUserDocRef(userId: string) {
    const userRef = doc(db, 'users', userId);
    const docSnap = await getDoc(userRef);

    if (!docSnap.exists()) {
        return {
            success: false, 
            result: null
        };
    }

    return {
        success: true, 
        result: userRef
    };
}