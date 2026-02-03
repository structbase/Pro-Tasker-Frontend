// Types
interface AuthFormProps {
    mode: "login" | "register";
    onSubmit: (data: Record<string, string>) => void;
    isLoading?: boolean;
    error?: string;
}

/**
 * A shared form component for Authentication.
 * Handles Login and Registration by toggling fields based on the 'mode' prop.
 */
export default function AuthForm({
    mode,
    onSubmit,
    isLoading,
    error,
}: AuthFormProps) {
    const isRegister = mode === "register";

    return (
        <div
            className="card border-0 rounded-4 shadow-sm overflow-hidden"
            style={{ borderTop: "5px solid #052b62" }}
        >
            <div className="card-body p-4 p-md-5">
                <div className="text-center mb-4">
                    <h2 className="fw-bold">
                        {isRegister ? "Create Account" : "Welcome Back"}
                    </h2>
                    <p className="text-muted small">
                        {isRegister
                            ? "Join Pro-Tasker today"
                            : "Log in to manage your projects"}
                    </p>
                </div>

                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        const formData = new FormData(e.currentTarget);
                        const data = Object.fromEntries(
                            formData.entries(),
                        ) as Record<string, string>;
                        onSubmit(data);
                    }}
                >
                    {isRegister && (
                        <>
                            <div className="row g-2 mb-3">
                                <div className="col-md-6">
                                    <label className="form-label small fw-bold">
                                        First Name
                                    </label>
                                    <input
                                        name="firstname"
                                        className="form-control bg-light border-light-subtle"
                                        placeholder="John"
                                        required
                                    />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label small fw-bold">
                                        Last Name
                                    </label>
                                    <input
                                        name="lastname"
                                        className="form-control bg-light border-light-subtle"
                                        placeholder="Doe"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="mb-3">
                                <label className="form-label small fw-bold">
                                    Username
                                </label>
                                <input
                                    name="username"
                                    className="form-control bg-light border-light-subtle"
                                    placeholder="johndoe123"
                                    required
                                />
                            </div>
                        </>
                    )}

                    <div className="mb-3">
                        <label className="form-label small fw-bold">
                            Email Address
                        </label>
                        <input
                            type="email"
                            name="email"
                            className="form-control bg-light border-light-subtle"
                            placeholder="name@example.com"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="form-label small fw-bold">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            className="form-control bg-light border-light-subtle"
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    {error && (
                        <div
                            className="alert alert-danger py-2 small mb-4"
                            role="alert"
                        >
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        className="btn btn-primary btn-lg w-100 fw-bold shadow-sm"
                        style={{
                            backgroundColor: "#052b62",
                            borderColor: "#052b62",
                        }}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <>
                                <span className="spinner-border spinner-border-sm me-2" />{" "}
                                Processing...
                            </>
                        ) : isRegister ? (
                            "Register"
                        ) : (
                            "Sign In"
                        )}
                    </button>

                    <div className="text-center mt-4">
                        <span className="text-muted small">
                            {isRegister
                                ? "Already have an account?"
                                : "Don't have an account?"}
                            <a
                                href={isRegister ? "/login" : "/register"}
                                className="ms-2 fw-bold text-decoration-none"
                                style={{ color: "#052b62" }}
                            >
                                {isRegister ? "Login" : "Sign Up"}
                            </a>
                        </span>
                    </div>
                </form>
            </div>
        </div>
    );
}