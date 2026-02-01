import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import { ThemeProvider } from "./context/Theme/ThemeProvider";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";


export default function App() {
    return (
        <>
            <ThemeProvider>
                <div className="d-flex flex-column min-vh-100">
                    <Header />
                    <main className="flex-fill">
                        <Routes>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/login" element={<LoginPage />} />
                            <Route
                                path="/register"
                                element={<RegisterPage />}
                            />
                        </Routes>
                    </main>

                    <Footer />
                </div>
            </ThemeProvider>
        </>
    );
}
