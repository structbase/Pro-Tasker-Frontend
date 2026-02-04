import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from "../../components/Auth/AuthForm";
import { useAuth } from "../../context/AuthContext";
import { api } from "../../utils/api/axiosInstance";
import axios from "axios";

export default function RegisterPage() {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | undefined>();

    const handleRegister = async (data: Record<string, string>) => {
        setLoading(true);
        setError(undefined);

        try {
            const res = await api.post("/users/register", {
                firstname: data.firstname,
                lastname: data.lastname,
                username: data.username,
                email: data.email,
                password: data.password,
            });

            const { user, token } = res.data;

            // Save auth data
            login(user);
            localStorage.setItem("pro_tasker_token", token);

            // Redirect after register
            navigate("/projects");
        } catch (err) {
            if (axios.isAxiosError(err)) {
                setError(
                    err.response?.data?.message ||
                        "Registration failed. Please try again.",
                );
            } else {
                setError("An unexpected error occurred");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container h-100 d-flex align-items-center justify-content-center py-5 mt-5">
            <div className="row w-100 justify-content-center">
                <div className="col-12 col-md-9 col-lg-6 col-xl-4">
                    <AuthForm
                        mode={"register"}
                        onSubmit={handleRegister}
                        isLoading={loading}
                        error={error}
                    />
                </div>
            </div>
        </div>
    );
}
