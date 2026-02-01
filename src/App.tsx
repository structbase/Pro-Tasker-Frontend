import { Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import { ThemeProvider } from "./context/Theme/ThemeProvider";
import Navbar from "./components/Header/Header";

export default function App() {
    return (
        <>
            <ThemeProvider>
                <div>
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<RegisterPage />} />
                    </Routes>
                </div>
            </ThemeProvider>
        </>
    );
}
