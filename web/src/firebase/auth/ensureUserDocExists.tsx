import { User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

import { db } from "../globals";
import { createUserDoc } from "./createUser";

export default async function ensureUserDocExists(user: User) {
    const key = `userDocExists-${user.uid}`;

    if (sessionStorage.getItem(key) === "true") {
        return;
    }

    const userRef = doc(db, "users", user.uid);
    const snap = await getDoc(userRef);

    if (!snap.exists()) {
        await createUserDoc(user.uid);
    }

    sessionStorage.setItem(key, "true");
}