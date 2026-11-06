import { FirebaseError } from "firebase-admin";
import { verifyUserSession } from "@/lib/firebase-admin/auth/verifyUserSession";
import { adminDb } from "@/lib/firebase-admin/globals";
import { parseExpectedError } from "@/lib/firebase/parseExpectedError";

export async function endTimer(userId: string) {
	try {
		await verifyUserSession(userId);

		const userRef = adminDb.collection("users").doc(userId);

		await userRef.update({
			"timer.duration": 0,
			"timer.status": 'completed'
		});

		return {
			success: true,
			result: "Timer ended successfully"
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
			result: "An unexpected error prevented the timer from ending."
		}
	}

}