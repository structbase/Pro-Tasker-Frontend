import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { api } from "../../utils/api/axiosInstance";

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

    // Loading State: Provides immediate feedback during API calls
    if (loading) return <p className="container py-4">Loading projects…</p>;

    // Error State: Gracefully handles API failures
    if (error) return <p className="container py-4 text-danger">{error}</p>;

    return (
        <div className="container py-4">
            <h2>Your Projects ({projects.length})</h2>

            {/* Empty State: Guides the user when no data exists */}
            {projects.length === 0 ? (
                <div className="text-center p-5 border rounded bg-light">
                    <p>
                        No projects found. Create a new project to get started!
                    </p>
                </div>
            ) : (
                <div className="projects-grid">
                    {projects.map((project) => (
                        /* Dynamic Linking: 
                            Navigates to the ProjectPage component using the MongoDB _id.
                            'text-decoration-none' keeps the UI clean.
                        */
                        <Link
                            key={project._id}
                            to={`/projects/${project._id}`}
                            className="project-card border rounded p-3 mb-3 d-block text-decoration-none text-dark bg-white shadow-sm"
                        >
                            <h3>{project.name}</h3>
                            {project.description && (
                                <p className="text-muted mb-0">
                                    {project.description}
                                </p>
                            )}
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}
