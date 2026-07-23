'use client';

import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { FormType } from "./FormType";
import { AuthContext } from "@/providers/AuthProvider";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase/globals";
import { parseExpectedError } from "@/firebase/parseExpectedError";

import OpenEyeIcon from "@/assets/icons/OpenEyeIcon.svg";
import ClosedEyeIcon from "@/assets/icons/ClosedEyeIcon.svg";
import ToggleButtonWithIcon from "@/components/ToggleButtonWithIcon/ToggleButtonWithIcon";
import Link from "next/link";

import styles from "./styles.module.css";

interface AuthFormProps {
    formType: FormType;
}

async function signInUser(email: string, password: string) {
    const res = await signInWithEmailAndPassword(auth, email, password)
        .then(() => "success")
        .catch((error) => (error as { code: string }).code);
    
    return res;
}

async function createUser(email: string, password: string) {
    const res = await createUserWithEmailAndPassword(auth, email, password)
        .then(() => "success")
        .catch((error) => (error as { code: string }).code);

    return res;
}

const formConfig = {
    [FormType.Login]: {
        buttonText: "Sign In",
        blurbText: "Don't have an account?",
        linkText: "Join here",
        linkHref: "/signup",
    },
    [FormType.Signup]: {
        buttonText: "Sign Up",
        blurbText: "Have an account?",
        linkText: "Sign in here",
        linkHref: "/login",
    }
}

export function AuthForm({ formType }: AuthFormProps) {
    const { setUser } = useContext(AuthContext);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const config = formConfig[formType];

    async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        let response;

        if (formType === FormType.Login) {
            response = await signInUser(email, password);
        } else {
            response = await createUser(email, password);
        }

        if (response !== "success") {
            const error = parseExpectedError(response);
            setError(error);

            return;
        } 

        setUser(auth.currentUser);
        router.push("/dashboard");
    }

    // TODO: Add a way to toggle the password visibility
    const handleTogglePasswordVisibility = () => {
        const passwordInput = document.getElementById("password");

        if (passwordInput?.getAttribute("type") === "password") {
            passwordInput.setAttribute("type", "text");
        }
        else {
            passwordInput?.setAttribute("type", "password");
        }
    }

    return (
        <form className={styles.form} onSubmit={handleSubmit} method={"POST"}>
            <label className={styles.label} htmlFor="email">Email</label>
            <input className={styles.input} type="email" name="email" placeholder="email@nurture.com"/>
            <label className={styles.label} htmlFor="password">Password</label>
            <div className={styles.passwordWrapper}>
                <input className={styles.input} id="password" type="password" name="password" placeholder="Password"/>
                <ToggleButtonWithIcon
                    className={styles.toggle}
                    onSrc={OpenEyeIcon.src}
                    offSrc={ClosedEyeIcon.src}
                    size={25}
                    alt="Show/Hide"
                    additionalFunction={handleTogglePasswordVisibility}
                />
            </div>

            <input className={styles.button} type="submit" value={config.buttonText} />
            <p className={styles.black}>{config.blurbText} <Link className={styles.link} href={config.linkHref}>{config.linkText}</Link></p>
            
            {
                error &&
                <div className={styles.errorContainer}>
                    <p className={styles.errorMessage}>{error}</p>
                </div>
            }
        </form>
    )
}