import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import ProjectsDashboard from "./pages/ProjectsDashboard/ProjectsDashboard";
import ProjectDetailsPage from "./pages/ProjectDetailsPage/ProjectDetailsPage";
import EditPage from "./pages/EditPage/EditPage";

export default function App() {
    return (
        <div className="d-flex flex-column min-vh-100">
            <Header />

            <main className="flex-fill">
                <Routes>
                    {/* Public routes */}
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />

                    {/* Protected routes */}
                    <Route element={<ProtectedRoute />}>
                        <Route
                            path="/projects"
                            element={<ProjectsDashboard />}
                        />
                        <Route
                            path="/projects/:projectId"
                            element={<ProjectDetailsPage />}
                        />
                        <Route path="/edit/:type/:id" element={<EditPage />} />
                    </Route>
                </Routes>
            </main>

            <Footer />
        </div>
    );
}
