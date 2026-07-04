import { AuthForm } from "../AuthForm";
import { FormType } from "../FormType";

import styles from "../styles.module.css";

export default function Signup() {
    return (
        <>
            <h2 className={styles.heading}>Create an Account</h2>
            <p>Join today to begin your journey</p>

            <AuthForm formType={FormType.Signup} />
        </>
    )
}
        