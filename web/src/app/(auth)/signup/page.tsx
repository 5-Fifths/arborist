import Link from "next/link";

import styles from "../styles.module.css";

export default function Signup() {
    return (
        <>
            <h2 className={styles.heading}>Create an Account</h2>
            <p>Join today to begin your journey</p>

            <form className={styles.form} action="">
                <label className={styles.label} htmlFor="first_name">First Name</label>
                <input className={styles.input} type="text" id="first_name" placeholder="John"/>
                <label className={styles.label} htmlFor="email">Email</label>
                <input className={styles.input} type="email" id="email" placeholder="email@nurture.com"/>
                <label className={styles.label} htmlFor="password">Password</label>
                <input className={styles.input} type="password" id="password" placeholder="Password"/>

                <input className={styles.button} type="submit" value="Sign Up" />
            </form>

            <p className={styles.black}>Already have an account? <Link className={styles.link} href="/login">Login here</Link></p>
        </>
    )
}
        