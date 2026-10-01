import { User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

import { db } from "../globals";
import { createUserDoc } from "./createUser";

export async function ensureUserDocExists(user: User) {
    const userRef = doc(db, "users", user.uid);
    const snap = await getDoc(userRef);

    if (snap.exists()) {
        return true;
    }
    
    return (await createUserDoc(user.uid)).success;
}