import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import type { JSX } from "react";

/**
 * ProtectedRoute Component
 * A higher-order component that restricts access to authenticated users.
 * * @param children - Componets that are rendered after authentication
 */
export default function ProtectedRoute({
    children,
}: {
    children: JSX.Element;
}) {
    const { user, loading } = useAuth();

    /**
     * Prevent premature redirection while checking LocalStorage/API
     * for an existing session on initial page load.
     */
    if (loading) return null; // Placeholder: Replace with a <Spinner /> for better UX

    /**
     * If no user is authenticated, redirect to login.
     * 'replace' prevents the user from hitting the 'Back' button
     * and getting stuck in a redirect loop.
     */
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // Access granted: Render the protected content
    return children;
}
