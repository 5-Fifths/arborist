import { db } from "../globals";
import { getDoc, doc, DocumentReference } from "firebase/firestore";
import { ApiResponse } from "../types/ApiResponse";

export async function getUserDocRef(userId: string): Promise<ApiResponse<DocumentReference>> {
    const userRef = doc(db, 'users', userId);
    const docSnap = await getDoc(userRef);

    if (!docSnap.exists()) {
        return {
            success: false, 
            result: "User document does not exist."
        };
    }

    return {
        success: true, 
        result: userRef
    };
}