'use client';

import { createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { auth } from "@/firebase/globals";

import styles from "../styles.module.css";

async function createUser(email: string, password: string) {
    try {
        await createUserWithEmailAndPassword(auth, email, password);
    }
    catch (error) {
        const errorCode = (error as { code: string }).code;
        throw new Error(errorCode);
    }
}

export default function Signup() {
    const router = useRouter();

    async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        try {
            await createUser(email, password);
            router.push("/dashboard");
        } catch (error) {
            throw new Error("Failed to create user: " + (error as Error).message);
        }
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
            </form>

            <p className={styles.black}>Already have an account? <Link className={styles.link} href="/login">Login here</Link></p>
        </>
    )
}
        