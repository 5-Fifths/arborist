import { FirebaseError } from "firebase/app";
import { createUserWithEmailAndPassword, User } from "firebase/auth";

import { auth } from "../globals";
import { ApiResponse } from "../types/ApiResponse";

export async function createUser(email: string, password: string): Promise<ApiResponse<User>> {
    try {
        // Firebase Auth
        const authRes = await createUserWithEmailAndPassword(auth, email, password);

        return {
            success: true,
            result: authRes.user
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
            result: "An unexpected error has occured while creating the user."
        }
    }
}