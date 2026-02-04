import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Header.css";

export default function Header() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    return (
        <header className="header-container sticky-top">
            <nav className="navbar navbar-expand-md py-0">
                <div className="container-fluid px-0">
                    {/* Brand */}
                    <Link to="/" className="navbar-brand brand">
                        <img
                            src="/icons/image1.png"
                            alt="Logo"
                            className="logo"
                        />
                        <span className="brand-name">Pro-Tasker</span>
                    </Link>

                    {/* Hamburger Button for Mobile */}
                    <button
                        className="navbar-toggler border-0 shadow-none"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarContent"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    {/* Collapsible Content */}
                    <div
                        className="collapse navbar-collapse"
                        id="navbarContent"
                    >
                        <ul className="navbar-nav me-auto mb-2 mb-md-0 nav-links">
                            <li className="nav-item">
                                <Link className="nav-link" to="/">
                                    Home
                                </Link>
                            </li>
                            {user && (
                                <li className="nav-item">
                                    <Link className="nav-link" to="/projects">
                                        Projects
                                    </Link>
                                </li>
                            )}
                        </ul>

                        {/* Auth Actions */}
                        <div className="d-flex align-items-center gap-2 auth-links py-3 py-md-0">
                            {!user ? (
                                <>
                                    <Link
                                        to="/login"
                                        className="login-link text-decoration-none me-2"
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        to="/register"
                                        className="register-btn text-decoration-none"
                                    >
                                        Get Started
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <span className="username d-none d-lg-flex">
                                        <span className="user-icon">👤</span>{" "}
                                        {user.username}
                                    </span>
                                    <button
                                        onClick={() => {
                                            logout();
                                            navigate("/login");
                                        }}
                                        className="logout-btn"
                                    >
                                        Logout
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
}