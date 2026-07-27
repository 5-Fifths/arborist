import { FirebaseError } from "firebase/app";
import { auth } from "../globals";
import { signInWithEmailAndPassword } from "firebase/auth";

export default async function signInUser(email: string, password: string) {
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
                result: (error as { code: string }).code
            }
        }

        return {
            success: false,
            result: (error as string)
        }
    }
}