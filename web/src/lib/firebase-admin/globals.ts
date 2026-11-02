import 'server-only'

import { initializeApp, cert, getApps } from "firebase-admin";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

import "dotenv/config";

if (getApps().length < 1) {
    try {
        initializeApp({
            credential: cert({
                projectId: process.env.FIRESTORE_PROJECT_ID,
                clientEmail: process.env.FIRESTORE_CLIENT_EMAIL,
                privateKey: process.env.FIRESTORE_PRIVATE_KEY,
            }),
        });
    }
    catch (error) {
        throw new Error("Failed to initialize Firebase Admin SDK: " + error);
    }
}

export const adminAuth = getAuth();
export const adminDb = getFirestore();