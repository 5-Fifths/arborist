'use client';

import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { auth } from "@/firebase/globals";

import styles from "../styles.module.css";

export default function Login() {
    const router = useRouter();

    async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        try {
            await signInWithEmailAndPassword(auth, email, password);
            router.push("/dashboard");
        } catch (error) {
            throw new Error("Failed to sign in: " + (error as Error).message);
        }
    }

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
            </form>

            <p className={styles.black}>Don't have an account? <Link className={styles.link} href="/signup">Join here</Link></p>
        </>
    )
}
        