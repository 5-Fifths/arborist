'use server';

import { adminDb } from "@/lib/firebase-admin/globals";
import { parseExpectedError } from "@/lib/firebase/parseExpectedError";
import { FirebaseError } from "firebase-admin/app";
import { FieldValue } from "firebase-admin/firestore";
import { verifyUserSession } from "@/lib/firebase-admin/auth/verifyUserSession";
import { WorkItem } from "@/types/WorkItem";
import { calculateItemValue } from "./coins/calculateItemValue";

export async function updateBalance(userId: string, workItem: WorkItem) {
    try {
        await verifyUserSession(userId);

        // Verify that the user account exists
        const userRef = adminDb.collection("users").doc(userId);
        if (!(await userRef.get()).exists) {
            throw new Error("User not found.");
        }

        const value = await calculateItemValue(userId, workItem);

        await userRef.update({
            coins: FieldValue.increment(value)
        });
        
        return {
            success: true,
            result: "Balance updated successfully."
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
            result: error
        }
    }
}