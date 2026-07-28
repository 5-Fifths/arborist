import { FirebaseError } from "firebase/app";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

import { auth, db } from "../globals";
import { AuthResult } from "../types/AuthResult";

export async function createUser(email: string, password: string): Promise<AuthResult> {
    try {
        // Firebase Auth
        const authRes = await createUserWithEmailAndPassword(auth, email, password);

        // Firestore Doc
        await createUserDoc(authRes.user.uid);

        return {
            success: true,
            user: authRes.user
        }
    }
    catch (error) {
        if (error instanceof FirebaseError) {
            return {
                success: false,
                error: (error as { code: string }).code
            }
        }

        return {
            success: false,
            error: (error as { code: string }).code
        }
    }
}

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
            success: true
        };
    }
    catch (error) {
        if (error instanceof FirebaseError) {
            return {
                success: false,
                error: (error as { code: string }).code
            }
        }

        return {
            success: false,
            error: (error as { code: string }).code
        }
    }
}