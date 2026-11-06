'use server';

import { adminAuth } from "@/lib/firebase-admin/globals";
import { cookies } from "next/headers";

// Verify that the current session is valid
    // Does not check to make sure that the session matches with the user
export async function verifySessionCookie() {
    try {
        const cookieStore = await cookies();
        const cookie = cookieStore.get("firebaseSession");

        if (!cookie) {
            return {
                success: false,
                result: "No session cookie found."
            }
        }

        if (!await adminAuth.verifySessionCookie(cookie.value)) {
            return {
                success: false,
                result: "Session cookie is invalid or expired."
            }
        }

        return {
            success: true,
            result: "Session cookie is valid."
        }
    }
    catch (error) {
        return {
            success: false,
            result: "Session cookie could not be verified."
        }
    }
}