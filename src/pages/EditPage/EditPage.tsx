import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { api } from "../../utils/api/axiosInstance";
import NotFoundPage from "../NotFoundPage/NotFoundPage";

type EditType = "project" | "task";

export default function EditPage() {
    const { type, id } = useParams<{ type: EditType; id: string }>();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState<"To Do" | "In Progress" | "Done">(
        "To Do",
    );

    // We need to store the parent project ID for tasks to redirect correctly
    const [parentProjectId, setParentProjectId] = useState<string | null>(null);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [notFound, setNotFound] = useState(false);

    useEffect(() => {
        if (!type || !id) return;

        const fetchData = async () => {
            try {
                const endpoint =
                    type === "project" ? `/projects/${id}` : `/tasks/${id}`;
                const res = await api.get(endpoint);

                if (type === "project") {
                    setName(res.data.name);
                    setDescription(res.data.description || "");
                } else {
                    setName(res.data.title);
                    setDescription(res.data.description || "");
                    setStatus(res.data.status);
                    // Capture the project ID this task belongs to
                    setParentProjectId(res.data.projectId || res.data.project);
                }
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    if (error.response?.status === 404) {
                        setNotFound(true);
                        return;
                    }
                }
                setError("Failed to load data");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [type, id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            if (type === "project") {
                await api.put(`/projects/${id}`, { name, description });
                // SUCCESS: Redirect back to the DASHBOARD
                navigate("/projects");
            } else {
                await api.put(`/tasks/${id}`, {
                    title: name,
                    description,
                    status,
                });
                // SUCCESS: Redirect back to the PROJECT DETAILS page
                if (parentProjectId) {
                    navigate(`/projects/${parentProjectId}`);
                } else {
                    navigate(-1); // Fallback if ID wasn't found
                }
            }
        } catch (err) {
            if (axios.isAxiosError(err)) {
                setError(err.response?.data?.message || "Update failed");
            } else {
                setError("Unexpected error");
            }
        }
    };

    if (loading)
        return (
            <div className="container py-5 text-center">
                <div
                    className="spinner-border text-primary"
                    role="status"
                ></div>
            </div>
        );
        
    if (notFound) return <NotFoundPage />;

    return (
        // Bootstrap UI
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-12 col-md-8 col-lg-6">
                    <div className="card border-0 rounded-4 shadow-sm overflow-hidden">
                        <div
                            className="p-4 bg-primary text-white"
                            style={{ backgroundColor: "#052b62 !important" }}
                        >
                            <h4 className="mb-0 fw-bold">
                                Edit {type === "project" ? "Project" : "Task"}
                            </h4>
                        </div>

                        <div className="card-body p-4 p-md-5 bg-white">
                            {error && (
                                <div className="alert alert-danger py-2 small">
                                    {error}
                                </div>
                            )}

                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label fw-semibold small">
                                        {type === "project"
                                            ? "Project Name"
                                            : "Task Title"}
                                    </label>
                                    <input
                                        className="form-control bg-light border-light-subtle"
                                        value={name}
                                        onChange={(e) =>
                                            setName(e.target.value)
                                        }
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label fw-semibold small">
                                        Description
                                    </label>
                                    <textarea
                                        className="form-control bg-light border-light-subtle"
                                        rows={3}
                                        value={description}
                                        onChange={(e) =>
                                            setDescription(e.target.value)
                                        }
                                        required
                                    />
                                </div>

                                {type === "task" && (
                                    <div className="mb-4">
                                        <label className="form-label fw-semibold small">
                                            Status
                                        </label>
                                        <select
                                            className="form-select bg-light border-light-subtle"
                                            value={status}
                                            onChange={(e) =>
                                                setStatus(
                                                    e.target
                                                        .value as typeof status,
                                                )
                                            }
                                        >
                                            <option value="To Do">To Do</option>
                                            <option value="In Progress">
                                                In Progress
                                            </option>
                                            <option value="Done">Done</option>
                                        </select>
                                    </div>
                                )}

                                <div className="d-flex gap-2">
                                    <button
                                        type="button"
                                        className="btn btn-light flex-grow-1 fw-bold"
                                        onClick={() => navigate(-1)}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="btn btn-primary flex-grow-1 fw-bold"
                                        style={{
                                            backgroundColor: "#052b62",
                                            borderColor: "#052b62",
                                        }}
                                    >
                                        Save Changes
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
