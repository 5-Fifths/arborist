import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { FirebaseError } from "firebase/app";
import { db } from "../globals";

export async function createUserDoc(uid: string) {
    try {
        const initialData = {
            creation_date: serverTimestamp(),
            last_updated: serverTimestamp(),
            tasks: [],
            projects: [],
            // coins: 0,
            // plants: {}
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