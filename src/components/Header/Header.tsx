import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Header.css";

export default function Header() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <header className="header-container">
            <nav className="main-nav">
                {/* Logo */}
                <Link to="/" className="brand">
                    <img
                        src="/icons/image1.png"
                        alt="Pro-Tasker logo"
                        className="logo"
                    />
                    <span className="brand-name">Pro-Tasker</span>
                </Link>

                <div className="nav-menu">
                    {/* Main links */}
                    <ul className="nav-links">
                        <li>
                            <Link to="/">Home</Link>
                        </li>

                        {user && (
                            <li>
                                <Link to="/tasks">Tasks</Link>
                            </li>
                        )}
                    </ul>

                    {/* Auth links */}
                    <ul className="auth-links">
                        {!user ? (
                            <>
                                <li>
                                    <Link to="/login" className="login-btn">
                                        Login
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/register"
                                        className="register-btn"
                                    >
                                        Register
                                    </Link>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="username">{user.username}</li>
                                <li>
                                    <button
                                        onClick={handleLogout}
                                        className="logout-btn"
                                    >
                                        Logout
                                    </button>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </nav>
        </header>
    );
}
