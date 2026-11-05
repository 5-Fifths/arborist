'use server';

import { adminAuth } from "@/lib/firebase-admin/globals";
import { cookies } from "next/headers";

export async function verifyUser(userId: string) {
    const cookieStore = await cookies();
    const cookie = cookieStore.get("firebaseSession");

    if (!cookie) {
        throw new Error("User is not authenticated");
    }

    const decodedClaims = await adminAuth.verifySessionCookie(cookie.value);

    if (decodedClaims.uid !== userId) {
        throw new Error("User ID does not match the authenticated user.");
    }

    return {
        success: true,
        result: "Verified user successfully."
    }
}