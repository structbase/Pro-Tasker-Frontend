import { Link } from "react-router-dom";
import "./Header.css";

export default function Header() {
    return (
        <header className="header-container">
            <nav className="main-nav">
                {/* Logo Section */}
                <Link to="/" className="brand">
                    <img
                        src="/icons/image1.png"
                        alt="Pro-Tasker logo"
                        className="logo"
                    />
                    <span className="brand-name">Pro-Tasker</span>
                </Link>

                {/* Links Section */}
                <div className="nav-menu">
                    <ul className="nav-links">
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/tasks">Tasks</Link>
                        </li>
                    </ul>

                    <ul className="auth-links">
                        <li>
                            <Link to="/login" className="login-btn">
                                Login
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    );
}
