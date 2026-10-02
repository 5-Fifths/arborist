'use client';
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FormType } from "./FormType";
import { parseExpectedError } from "@/firebase/parseExpectedError";
import { createUser } from "@/firebase/auth/createUser";
import { signInUser } from "@/firebase/auth/signInUser";

import OpenEyeIcon from "@/assets/icons/OpenEyeIcon.svg";
import ClosedEyeIcon from "@/assets/icons/ClosedEyeIcon.svg";
import ToggleButtonWithIcon from "@/components/ToggleButtonWithIcon/ToggleButtonWithIcon";
import Link from "next/link";
import styles from "./styles.module.css";

interface AuthFormProps {
    formType: FormType;
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
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();

    const config = formConfig[formType];

    async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
        event.preventDefault();

        setLoading(true);
        setError(null);

        try {
            const formData = new FormData(event.currentTarget);
            const email = formData.get("email") as string;
            const password = formData.get("password") as string;

            const authAction = formType === FormType.Login ?
                signInUser :
                createUser;

            const user = await authAction(email, password);
         
            if (!user.success) {
                const parsedError = parseExpectedError(user.result);

                throw new Error(parsedError);
            }

            setLoading(false);

            router.push("/dashboard");
        }
        catch (err) {
            setLoading(false);

            if (err instanceof Error) {
                setError((err as Error).message);
            }
            else {
                setError("An unexpected error occurred. Please try again later.");
            }
        }
    }

    const handleTogglePasswordVisibility = () => {
        setShowPassword(prev => !prev);
    }

    return (
        <form className={styles.form} onSubmit={handleSubmit} method={"POST"}>
            <label className={styles.label} htmlFor="email">Email</label>
            <input className={styles.input} id="email" type="email" name="email" placeholder="email@arborist.com" required/>
            <label className={styles.label} htmlFor="password">Password</label>
            <div className={styles.passwordWrapper}>
                <input className={styles.input} id="password" type={showPassword ? "text" : "password"} name="password" placeholder="Password" required/>
                <ToggleButtonWithIcon
                    className={styles.toggle}
                    onSrc={OpenEyeIcon.src}
                    offSrc={ClosedEyeIcon.src}
                    size={25}
                    isOn={showPassword}
                    alt="Show/Hide"
                    onToggle={handleTogglePasswordVisibility}
                />
            </div>

            <input className={styles.button} type="submit" value={config.buttonText} disabled={loading} />
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