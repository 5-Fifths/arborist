import { doc, setDoc, serverTimestamp, DocumentReference } from "firebase/firestore";
import { FirebaseError } from "firebase/app";
import { db } from "../globals";
import { ApiResponse } from "../types/ApiResponse";

export async function createUserDoc(uid: string): Promise<ApiResponse<DocumentReference>> {
    try {
        const initialData = {
            creation_date: serverTimestamp(),
            last_updated: serverTimestamp(),
            coins: 0,
            canvasToken: ""
        }

        await setDoc(
            doc(db, "users", uid), 
            initialData
        )

        return {
            success: true,
            result: doc(db, "users", uid)
        };
    }
    catch (error) {
        if (error instanceof FirebaseError) {
            return {
                success: false,
                result: error.code
            }
        }

        return {
            success: false,
            result: "An unexpected error occurred while creating the user document."
        }
    }
}