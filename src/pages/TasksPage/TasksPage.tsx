import { useAuth } from "../../context/AuthContext";

/**
 * TasksPage Component
 * Authenticated users.
 * User information and session management.
 */
export default function TasksPage() {
    // Access global user state and the logout handler
    const { user, logout } = useAuth();

    // Placeholder for just getting things started 
    return (
        <div className="container py-4">
            {/* The '?' (Optional Chaining) prevents the app from crashing 
                if the user object is momentarily null during a refresh.
            */}
            <h1>Welcome, {user?.username}</h1>

            <p>This is your task dashboard.</p>

            {/* Clears local storage and resets the AuthContext state 
                via the shared logout function.
            */}
            <button className="btn btn-outline-danger" onClick={logout}>
                Logout
            </button>
        </div>
    );
}
