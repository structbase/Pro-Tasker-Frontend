
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
        <form
            className="auth-form"
            onSubmit={(e) => {
                e.preventDefault();

                // gets all input values into a key-value object
                const formData = new FormData(e.currentTarget);
                const data = Object.fromEntries(formData.entries()) as Record<
                    string,
                    string
                >;

                onSubmit(data);
            }}
        >
            {/* Registration-specific fields */}
            {isRegister && (
                <>
                    <input name="firstname" placeholder="First Name" />
                    <input name="lastname" placeholder="Last Name" />
                    <input name="username" placeholder="Username" />
                </>
            )}

            {/* Standard credentials */}
            <input type="email" name="email" placeholder="Email" required />
            <input
                type="password"
                name="password"
                placeholder="Password"
                required
            />

            {/* Global error message display */}
            {error && <p className="error">{error}</p>}

            <button type="submit" disabled={isLoading}>
                {isLoading ? "Processing..." : isRegister ? "Create Account" : "Login"}
            </button>
        </form>
    );
}