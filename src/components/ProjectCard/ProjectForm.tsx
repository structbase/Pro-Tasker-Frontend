import { useState } from "react";
import axios from "axios";
import { api } from "../../utils/api/axiosInstance";

// Define what props this component accepts
interface ProjectFormProps {
    onSuccess?: () => void; // A function to run after a project is created
}

export default function ProjectForm({ onSuccess }: ProjectFormProps) {
    // State for form inputs and status
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Function to handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); // Stop the page from refreshing

        // Simple validation: make sure fields are not empty
        if (!name.trim() || !description.trim()) {
            setError("Project name and description are required.");
            return;
        }

        try {
            setLoading(true); // Disable button while sending data
            setError(null); // Clear any old errors

            // Send new project data to the backend API
            await api.post("/projects", {
                name,
                description,
            });

            // Clear the form fields after success
            setName("");
            setDescription("");

            // If a success function was passed in, run it (usually to refresh the list)
            if (onSuccess) onSuccess();
        } catch (err) {
            // Handle errors from the server
            if (axios.isAxiosError(err)) {
                setError(
                    err.response?.data?.message || "Failed to create project",
                );
            } else {
                setError("Unexpected error occurred");
            }
        } finally {
            setLoading(false); // Re-enable the button
        }
    };

    return (
        // UI returning a bootstrap form element
        <form
            onSubmit={handleSubmit}
            className="border-0 rounded-4 p-4 bg-white shadow-sm" // Changed to border-0 and rounded-4 for a softer look
            style={{ borderTop: "4px solid #052b62" }} // Adds a nice "brand" stripe at the top
        >
            <h4 className="fw-bold mb-4 text-dark fs-5">Start a New Project</h4>

            {error && (
                <div className="alert alert-danger py-2 small" role="alert">
                    {error}
                </div>
            )}

            <div className="mb-3">
                <label className="form-label small fw-semibold text-muted text-uppercase">
                    Project Name
                </label>
                <input
                    type="text"
                    className="form-control form-control-lg border-light-subtle fs-5"
                    style={{ backgroundColor: "#f8f9fa" }}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Client Website"
                />
            </div>

            <div className="mb-4">
                <label className="form-label small fw-semibold text-muted text-uppercase">
                    Description
                </label>
                <textarea
                    className="form-control border-light-subtle"
                    style={{ backgroundColor: "#f8f9fa" }}
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="What is this project about?"
                />
            </div>

            <button
                type="submit"
                className="btn btn-primary btn-lg w-100 shadow-sm fw-bold fs-5"
                disabled={loading}
            >
                {loading ? (
                    <>
                        <span className="spinner-border spinner-border-sm me-2" />
                        Creating...
                    </>
                ) : (
                    "Create Project"
                )}
            </button>
        </form>
    );
}
