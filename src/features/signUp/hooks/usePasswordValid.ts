import { useEffect, useState } from "react";
import { isStrongPassword } from "../utils/passwordRules";

export const usePasswordValid = (newPassword: string, confirmPassword: string) => {
    const [newPasswordError, setNewPasswordError] = useState<string>("Must be atleast 6 characters");
    const [confirmPasswordError, setConfirmPasswordError] = useState<string>("Both passwords must match");

    const isValidPasswordWithRegex = (password: string) => {
        return isStrongPassword(password);
    }

    const isValidConfirmPassword = (password: string, confirmPassword: string) => {
        return password === confirmPassword;
    }

    useEffect(() => {
        if (isValidPasswordWithRegex(newPassword)) {
            setNewPasswordError("");
        } else {
            setNewPasswordError("Password must be atleast 6 characters and contain atleast one uppercase, one lowercase letter, one number and one special character");
        }
    }, [newPassword])

    useEffect(() => {
        if (confirmPassword.length === 0 && newPassword.length === 0) {
            setConfirmPasswordError("");
        } else {
            if (isValidConfirmPassword(newPassword, confirmPassword)) {
                setConfirmPasswordError("");
            } else {
                setConfirmPasswordError("Both passwords must match");
            }
        }
    }, [newPassword, confirmPassword])

    return { newPasswordError, confirmPasswordError };
}