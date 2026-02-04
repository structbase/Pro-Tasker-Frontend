import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Loading from "../Common/Loading";

/**
 * PublicRoute
 * Redirects authenticated users away from public pages (login/register/home).
 */
export default function PublicRoute() {
    const { user, loading } = useAuth();

    if (loading) {
        return <Loading />;
    }

    if (user) {
        return <Navigate to="/projects" replace />;
    }

    return <Outlet />;
}
