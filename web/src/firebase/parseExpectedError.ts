export function parseExpectedError(errorCode: string) {
    switch (errorCode) {
        // Signup
        case "auth/email-already-in-use":
            return "This email is already in use. Please try logging in.";
        case "auth/invalid-email":
            return "This email is invalid. Please enter a valid email address.";
        case "auth/password-does-not-meet-requirements":
            return "This password is too weak. Your password must have at least 10 characters, a lowercase letter, an uppercase letter, a number, and a special character.";
        
        // Login
            // Invalid credential, user not found, and incorrect password errors are treated the exact same way
            // to avoid giving away information about which emails are registered in the system.
        case "auth/invalid-credential":
        case "auth/user-not-found":
        case "auth/wrong-password":
            return "Invalid email or password. Please try again.";
        default:
            return errorCode;
    }
}