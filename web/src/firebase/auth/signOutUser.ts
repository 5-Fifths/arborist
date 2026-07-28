import { FirebaseError } from "firebase/app";
import { signOut } from "firebase/auth";

import { auth } from "../globals";

export async function signOutUser() {
    try {
        await signOut(auth);

        return {
            success: true
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