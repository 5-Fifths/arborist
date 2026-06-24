'use client';

import { createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth } from "@/firebase/globals";
import { useState } from "react";
import Link from "next/link";

import styles from "../styles.module.css";

// Returns "success" or Firebase auth error code
async function createUser(email: string, password: string) {
    const res = await createUserWithEmailAndPassword(auth, email, password)
        .then(() => "success")
        .catch((error) => (error as { code: string }).code);

    return res;
}

// Turns error code into user-friendly messages
function parseErrorCode(errorCode: string) {
    if (errorCode === "auth/email-already-in-use") {
        return "This email is already in use. Please try logging in.";
    }
    else {
        return errorCode;
    }
}

export default function Signup() {
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        const response = await createUser(email, password);

        // TODO: Dusplay the error to the user
        if (response !== "success") {
            const error = parseErrorCode(response);
            setError(error);

            return;
        } 
        
        router.push("/dashboard");
    };

    // TODO: Add a way to toggle the password visibility

    return (
        <>
            <h2 className={styles.heading}>Create an Account</h2>
            <p>Join today to begin your journey</p>

            <form id="signup-form" className={styles.form} onSubmit={handleSubmit} method={"POST"}>
                <label className={styles.label} htmlFor="email">Email</label>
                <input className={styles.input} type="email" name="email" placeholder="email@nurture.com"/>
                <label className={styles.label} htmlFor="password">Password</label>
                <input className={styles.input} type="password" name="password" placeholder="Password"/>

                <input className={styles.button} type="submit" value="Sign Up" />

                <p className={styles.black}>Already have an account? <Link className={styles.link} href="/login">Log in here</Link></p>
                {
                    error &&
                    <div className={styles.errorContainer}>
                        <p className={styles.errorMessage}>{error}</p>
                    </div>
                }
            </form>
        </>
    )
}
        