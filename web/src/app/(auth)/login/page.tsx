import Link from "next/link";

import styles from "./styles.module.css";

export default function Login() {
    return (
        <>
            <h2 className={styles.heading}>Welcome Back</h2>
            <p>Login to access your garden</p>

            <form className={styles.login_form} action="">
                <label className={styles.label} htmlFor="email">Email</label>
                <input className={styles.input} type="email" id="email" placeholder="Email"/>
                <label className={styles.label} htmlFor="password">Password</label>
                <input className={styles.input} type="password" id="password" placeholder="Password"/>

                <input className={styles.button} type="submit" value="Sign In" />
            </form>

            <p>Don't have an account? <Link className={styles.link} href="/signup">Join Nurture Today</Link></p>
        </>
    )
}
        