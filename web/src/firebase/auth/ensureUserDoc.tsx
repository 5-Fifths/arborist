import { User } from "firebase/auth";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";

import { db } from "../globals";
import { createUserDoc } from "./createUser";

export default async function ensureUserDocExists(user: User) {
    const userRef = doc(db, "users", user.uid);
    const snap = await getDoc(userRef);

    if (!snap.exists()) {
        await createUserDoc(user.uid);
    }
}