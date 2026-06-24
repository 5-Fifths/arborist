'use client';

import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth } from "@/firebase/globals";
import { useState } from "react";
import Link from "next/link";

import styles from "../styles.module.css";

async function signInUser(email: string, password: string) {
    const res = await signInWithEmailAndPassword(auth, email, password)
            .then(() => "success")
            .catch((error) => (error as { code: string }).code);
    
        return res;
}

// Turns error code into user-friendly messages
function parseErrorCode(errorCode: string) {
    if (errorCode === "auth/invalid-credential") {
        return "Invalid email or password. Please try again.";
    }
    else {
        return errorCode;
    }
}

export default function Login() {
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        const response = await signInUser(email, password);

        if (response !== "success") {
            const error = parseErrorCode(response);
            setError(error);

            return;
        } 

        router.push("/dashboard");
    }

    // TODO: Add a way to toggle the password visibility
    
    return (
        <>
            <h2 className={styles.heading}>Welcome Back</h2>
            <p>Login to access your garden</p>

            <form className={styles.form} onSubmit={handleSubmit} method={"POST"}>
                <label className={styles.label} htmlFor="email">Email</label>
                <input className={styles.input} type="email" name="email" placeholder="email@nurture.com"/>
                <label className={styles.label} htmlFor="password">Password</label>
                <input className={styles.input} type="password" name="password" id="password" placeholder="Password"/>

                <input className={styles.button} type="submit" value="Sign In" />

                <p className={styles.black}>Don't have an account? <Link className={styles.link} href="/signup">Join here</Link></p>
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
        