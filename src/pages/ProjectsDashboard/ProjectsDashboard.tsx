import { useEffect, useState } from "react";
import axios from "axios";
import { api } from "../../utils/api/axiosInstance";
import ProjectCard from "../../components/ProjectCard/ProjectCard";
import ProjectForm from "../../components/ProjectCard/ProjectForm";

/**
 * ProjectsDashboard Component
 * Serves as the main landing page for authenticated users.
 * Displays a summary list of all projects owned by the current user.
 */
interface Project {
    _id: string;
    name: string;
    description?: string;
}

export default function ProjectsDashboard() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    /**
     * Effect: Fetch projects on component mount.
     * Relying on the axiosInstance (api) ensures the JWT is
     * automatically included in the request headers.
     */
    useEffect(() => {
        const fetchProjects = async () => {
            try {
                setLoading(true);
                // GET /projects expects the backend to filter by the requester's user ID
                const res = await api.get("/projects");
                setProjects(res.data);
            } catch (err) {
                // Determine if error is an API response or a network failure
                if (axios.isAxiosError(err)) {
                    setError(
                        err.response?.data?.message ||
                            "Failed to load projects",
                    );
                } else {
                    setError("Unexpected error occurred");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    const handleDeleteProject = async (id: string) => {
        if (!confirm("Delete this project?")) return;

        await api.delete(`/projects/${id}`);
        setProjects((prev) => prev.filter((p) => p._id !== id));
    };

    // Loading State: Provides immediate feedback during API calls
    if (loading) return <p className="container py-4">Loading projects…</p>;

    // Error State: Gracefully handles API failures
    if (error) return <p className="container py-4 text-danger">{error}</p>;

    return (
        <div className="container py-4">
            <div className="row g-4">
                {" "}
                {/* Added a Row with a gap (g-4) */}
                {/* LEFT COLUMN: The Action Area */}
                <div className="col-lg-4">
                    <div className="sticky-top" style={{ top: "2rem" }}>
                        <h2 className="h4 fw-bold mb-3">Get Started</h2>
                        <ProjectForm
                            onSuccess={() => window.location.reload()}
                        />
                    </div>
                </div>
                {/* RIGHT COLUMN: The Data Area */}
                <div className="col-lg-8">
                    <div className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-3">
                        <h2 className="fw-bold mb-0">Your Projects</h2>
                        <span className="badge bg-primary rounded-pill px-3 py-2">
                            {projects.length} Total
                        </span>
                    </div>

                    {projects.length === 0 ? (
                        <div className="text-center p-5 border border-dashed rounded bg-light">
                            <p className="text-muted mb-0">
                                No projects found. Use the form to create your
                                first one!
                            </p>
                        </div>
                    ) : (
                        <div className="row g-3">
                            {/* Nested row for the cards */}
                            {projects.map((project) => (
                                <div key={project._id} className="col-md-6">
                                    <ProjectCard
                                        key={project._id}
                                        project={project}
                                        onDelete={handleDeleteProject}
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
