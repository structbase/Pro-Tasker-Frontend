import { useState, type ReactNode } from "react";
import { AuthContext, type User } from "./AuthContext";

interface AuthProviderProps {
    children: ReactNode;
}

/**
 * Manages global authentication state and persists sessions via LocalStorage.
 */
export const AuthProvider = ({ children }: AuthProviderProps) => {
    // Initialize state by checking for existing session in storage
    const [user, setUser] = useState<User | null>(() => {
        const saved = localStorage.getItem("pro_tasker_user");
        const token = localStorage.getItem("pro_tasker_token");
        if (!saved) return null;
        if (!token) return null;

        try {
            return JSON.parse(saved) as User;
        } catch {
            // Clear corrupted data to prevent application crashes
            localStorage.removeItem("pro_tasker_user");
            return null;
        }
    });
    /**
     * Updates state and persists user data to storage upon successful login.
     */
    const login = (userData: User) => {
        setUser(userData);
        localStorage.setItem("pro_tasker_user", JSON.stringify(userData));
    };

    /**
     * Clears user session from state and storage.
     */

    const logout = () => {
        setUser(null);
        localStorage.removeItem("pro_tasker_user");
        localStorage.removeItem("pro_tasker_token");
    };

    return (
        <AuthContext.Provider value={{ user, loading: false, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
