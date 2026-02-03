import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Loading from "../Common/Loading";

/**
 * ProtectedRoute
 * Guards routes from unauthenticated access.
 * Uses <Outlet /> to render child routes defined in the Router config.
 */
export default function ProtectedRoute() {
    const { user, loading } = useAuth();
    const location = useLocation();

    // Always handle the loading state first.
    if (loading) {
        return <Loading />;
    }

    // Single check for authentication.
    // The useAuth hook should ensure 'user' is null if the token is invalid.
    if (!user) {
        // 'state' saves the URL the user was trying to reach.
        // After login, you can redirect them back there.
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // Authenticated? Render the matched child route.
    return <Outlet />;
}
