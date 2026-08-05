import { User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

import { db } from "../globals";
import { createUserDoc } from "./createUser";

export default async function ensureUserDocExists(user: User) {
    const key = `userDocExists-${user.uid}`;

    if (sessionStorage.getItem(key) === "true") {
        return true;
    }

    const userRef = doc(db, "users", user.uid);
    const snap = await getDoc(userRef);

    let creationSuccess = false;

    if (!snap.exists()) {
        creationSuccess = (await createUserDoc(user.uid)).success;
    }

    sessionStorage.setItem(key, creationSuccess ? "true" : "false");
    
    return creationSuccess;
}