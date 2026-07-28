import { User } from "firebase/auth"

export type AuthResult = 
    | {
        success: true,
        user: User
    } 
    | {
        success: false,
        error: string
    }