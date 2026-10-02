import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword, User } from "firebase/auth";

import { auth } from "../globals";
import { ApiResponse } from "../types/ApiResponse";

export async function signInUser(email: string, password: string): Promise<ApiResponse<User>> {
    try {
        const cred = await signInWithEmailAndPassword(auth, email, password);

        return {
            success: true,
            result: cred.user
        }
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
            result: (error as string)
        }
    }
}