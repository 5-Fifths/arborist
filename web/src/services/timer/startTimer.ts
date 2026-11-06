import { FirebaseError } from "firebase-admin";
import { verifyUserSession } from "@/lib/firebase-admin/auth/verifyUserSession";
import { adminDb } from "@/lib/firebase-admin/globals";
import { parseExpectedError } from "@/lib/firebase/parseExpectedError";

export async function startTimer(userId: string, duration: number) {
    try {
        await verifyUserSession(userId);

        const userRef = adminDb.collection("users").doc(userId);

        await userRef.update({
            timer: {
                started_at: Date.now(),
                duration: duration,
                value: duration / 15 * 10 + 5,
                status: 'active'
            }
        });

        return {
            success: true,
            result: "Timer started successfully"
        }
    }
    catch (error) {
        if (error instanceof FirebaseError) {
            return {
                success: false,
                result: parseExpectedError(error.code)
            }
        }

        return {
            success: false,
            result: "An unexpected error prevented the timer from starting."
        }
    }
}