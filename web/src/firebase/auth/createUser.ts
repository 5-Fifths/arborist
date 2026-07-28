import { FirebaseError } from "firebase/app";
import { auth, db } from "../globals";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

export default async function createUser(email: string, password: string) {
    try {
        // Firebase Auth
        const authRes = await createUserWithEmailAndPassword(auth, email, password);

        // Firestore doc
        // When ready, uncomment coins and plants
        const initialData = {
            creation_date: serverTimestamp(),
            last_updated: serverTimestamp(),
            tasks: [],
            projects: [],
            // coins: 0,
            // plants: {}
        }

        await setDoc(
            doc(db, "users", authRes.user.uid), 
            initialData
        )

        return {
            success: true,
            result: authRes.user
        };
    }
    catch (error) {
        if (error instanceof FirebaseError) {
            return {
                success: false,
                result: (error as { code: string }).code
            }
        }

        return {
            success: false,
            result: (error as { code: string }).code
        }
    }
} 