'use server';

import { cookies } from "next/headers";
import { adminAuth } from "@/lib/firebase-admin/globals";
import { FirebaseError } from "firebase-admin";
import { parseExpectedError } from "@/lib/firebase/parseExpectedError";

// Creates a server-side cookie
    // DO NOT RETURN THE COOKIE VALUE TO THE CLIENT. This cookie is httpOnly and cannot be accessed by the client.
export async function createSessionCookie(userIdToken: string) {
    try {
        const store = await cookies();

        const cookieOptions = {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict" as const,
            path: "/"
        }

        const cookie = await adminAuth.createSessionCookie(userIdToken, { expiresIn: 60 * 60 * 24 * 5 * 1000 });

        store.set('firebaseSession', cookie, cookieOptions);

        return {
            success: true,
            result: "Cookie created successfully."
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
            result: "An unexpected error occurred while creating the session cookie."
        }
    }
}