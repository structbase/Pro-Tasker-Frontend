import { useState, type ReactNode } from "react";
import { AuthContext, type User } from "./AuthContext";

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<User | null>(() => {
        const saved = localStorage.getItem("pro_tasker_user");
        if (!saved) return null;

        try {
            return JSON.parse(saved) as User;
        } catch {
            localStorage.removeItem("pro_tasker_user");
            return null;
        }
    });

    const login = (userData: User) => {
        setUser(userData);
        localStorage.setItem("pro_tasker_user", JSON.stringify(userData));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("pro_tasker_user");
    };

    return (
        <AuthContext.Provider value={{ user, loading: false, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
