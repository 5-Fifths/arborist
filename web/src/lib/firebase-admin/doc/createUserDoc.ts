'use server';

import { FirebaseError } from "firebase/app";
import { adminDb } from "@/lib/firebase-admin/globals";
import { FieldValue } from "firebase-admin/firestore";
import { ApiResponse } from "../types/ApiResponse";

export async function createUserDoc(uid: string): Promise<ApiResponse<FirebaseFirestore.DocumentReference>> {
    try {
        const initialData = {
            creation_date: FieldValue.serverTimestamp(),
            last_updated: FieldValue.serverTimestamp(),
            coins: 0
        }

        const userRef = adminDb.collection("users").doc(uid);

        const doc = await userRef.get();

        if (!doc.exists) {
            await userRef.set(initialData);
        }

        return {
            success: true,
            result: userRef
        };
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
            result: "An unexpected error occurred while creating the user document."
        }
    }
}