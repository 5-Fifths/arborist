import { FirebaseError } from "firebase/app";
import { auth } from "../globals";
import { signOut } from "firebase/auth";

export async function signOutUser() {
    try {
        const res = await signOut(auth);

        return {
            success: true,
            result: res
        }
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
            result: (error as string)
        }
    }
}