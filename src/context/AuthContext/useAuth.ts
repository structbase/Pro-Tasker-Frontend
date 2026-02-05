import { useContext } from "react";
import { AuthContext } from "./AuthContext";

/**
 * Custom hook to access authentication state and methods.
 * Provides a simplified interface for components to interact with AuthContext.
 */
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        // Safeguard to ensure hook is used within the correct provider scope
        throw new Error("useAuth must be used within AuthProvider");
    }
    return context;
};
