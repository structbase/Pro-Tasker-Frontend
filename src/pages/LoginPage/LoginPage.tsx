import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from "../../components/Auth/AuthForm";
import { useAuth } from "../../context/AuthContext";
import { api } from "../../utils/api/axiosInstance";
import axios from "axios";

/**
 * LoginPage Component
 * Manages the user authentication flow for existing users.
 */
export default function LoginPage() {
    const { login } = useAuth();
    const navigate = useNavigate();

    // UI State for managing request feedback
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | undefined>();

    /**
     * Executes the login request and updates global auth state
     * @param data - Raw form data from AuthForm (email, password)
     */
    const handleLogin = async (data: Record<string, string>) => {
        setLoading(true);
        setError(undefined);

        try {
            // 1. Dispatch credentials to backend
            const res = await api.post("/users/login", {
                email: data.email,
                password: data.password,
            });

            console.log("Step 2: Server Response ->", res.data); // for testing
            // 2. Destructure response data (Assumes backend sends { user, token })
            const { user, token } = res.data;

            // 3. Synchronize global context and persistent storage
            login(user);
            localStorage.setItem("pro_tasker_token", token);

            // 4. On success, move user away from the login screen
            navigate("/projects");
        } catch (err) {
            /**
             * Error Handling:
             * Distinguishes between structured API errors (Axios)
             * and generic runtime crashes.
             */
            if (axios.isAxiosError(err)) {
                // Extracts message from backend response if available
                setError(
                    err.response?.data?.message || "Invalid email or password",
                );
            } else {
                setError("An unexpected error occurred");
            }
        } finally {
            // Ensure UI is interactive again regardless of outcome
            setLoading(false);
        }
    };

    return (
        <div className="container h-100 d-flex align-items-center justify-content-center py-5 mt-5">
            <div className="row w-100 justify-content-center">
                <div className="col-12 col-md-8 col-lg-5 col-xl-4">
                    <AuthForm
                        mode="login"
                        onSubmit={handleLogin}
                        isLoading={loading}
                        error={error}
                    />
                </div>
            </div>
        </div>
    );
}
