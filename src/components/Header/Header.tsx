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
        <header className="header-container sticky-top">
            <nav className="main-nav">
                {/* Logo Section */}
                <Link to="/" className="brand">
                    <img src="/icons/image1.png" alt="Logo" className="logo" />
                    <span className="brand-name">Pro-Tasker</span>
                </Link>

                <div className="nav-menu">
                    {/* Main Navigation */}
                    <ul className="nav-links d-none d-md-flex">
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        {user && (
                            <li>
                                <Link to="/projects">Projects</Link>
                            </li>
                        )}
                    </ul>

                    {/* Auth Actions */}
                    <ul className="auth-links">
                        {!user ? (
                            <>
                                <li>
                                    <Link to="/login" className="login-link">
                                        Login
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/register"
                                        className="register-btn"
                                    >
                                        Get Started
                                    </Link>
                                </li>
                            </>
                        ) : (
                            <div className="d-flex align-items-center gap-3">
                                <li className="username">
                                    <span className="user-icon">👤</span>{" "}
                                    {user.username}
                                </li>
                                <li>
                                    <button
                                        onClick={handleLogout}
                                        className="logout-btn"
                                    >
                                        Logout
                                    </button>
                                </li>
                            </div>
                        )}
                    </ul>
                </div>
            </nav>
        </header>
    );
}
