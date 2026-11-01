import { cookies } from "next/headers";

export async function clearSessionCookie() {
    try {
        (await cookies()).delete('firebaseSession');

        return {
            success: true,
            result: "User session cookie cleared successfully."
        }
    } 
    catch (error) {
        return {
            success: false,
            result: "Failed to clear user session cookie."
        }
    }
}