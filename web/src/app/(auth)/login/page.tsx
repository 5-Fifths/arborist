import { AuthForm } from "../AuthForm";
import { FormType } from "../FormType";

import styles from "../styles.module.css";

export default function Login() {   
    return (
        <>
            <h2 className={styles.heading}>Welcome Back</h2>
            <p>Login to access your garden</p>

            <AuthForm formType={FormType.Login} />
        </>
    )
}
        