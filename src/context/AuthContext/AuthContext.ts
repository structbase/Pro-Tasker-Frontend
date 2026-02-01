import { createContext } from "react";

export interface User {
    id?: string;
    email: string;
    username?: string;
}

export interface AuthContextValue {
    user: User | null;
    loading: boolean;
    login: (userData: User) => void;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextValue | undefined>(
    undefined,
);
