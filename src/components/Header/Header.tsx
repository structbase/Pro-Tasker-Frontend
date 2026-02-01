// import { useTheme } from "../../context/Theme/useTheme";

import { Link } from "react-router-dom";
import "./Header.css";
export default function Navbar() {
    return (
        <header className="container">
            <nav className="d-flex justify-content-between align-items-center py-3">
                {/* Logo */}
                <div className="d-flex align-items-center">
                    <Link to="/">
                        {" "}
                        <img
                            className="logo"
                            src="/icons/image1.png"
                            alt="Pro-Tasker logo"
                        />{" "}
                    </Link>
                </div>

                {/* Navigation */}
                <ul className="nav nav-pills">
                    <li className="nav-item">
                        <Link className="nav-link" to="/">
                            Home
                        </Link>
                    </li>

                    <li className="nav-item">
                        <Link className="nav-link" to="/login">
                            Login
                        </Link>
                    </li>

                    <li className="nav-item">
                        <Link className="nav-link" to="/register">
                            Register
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}
