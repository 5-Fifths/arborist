import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword } from "firebase/auth";

import { auth } from "../globals";
import { AuthResult } from "../types/AuthResult";

export default async function signInUser(email: string, password: string): Promise<AuthResult> {
    try {
        const cred = await signInWithEmailAndPassword(auth, email, password);

        return {
            success: true,
            user: cred.user
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
            error: (error as string)
        }
    }
}