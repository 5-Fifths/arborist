import { FirebaseError } from "firebase/app";
import { signOut } from "firebase/auth";

import { auth } from "../globals";
import { ApiResponse } from "../types/ApiResponse";

export async function signOutUser(): Promise<ApiResponse<string>> {
    try {
        await signOut(auth);

        return {
            success: true,
            result: "Signed out successfully."
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