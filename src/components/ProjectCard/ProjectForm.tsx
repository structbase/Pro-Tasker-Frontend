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
            className="border rounded p-4 bg-white shadow-sm"
        >
            <h4 className="mb-3">Create New Project</h4>

            {/* Show error message if something goes wrong */}
            {error && <p className="text-danger">{error}</p>}

            <div className="mb-3">
                <label className="form-label">Project Name</label>
                <input
                    type="text"
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Client Website"
                />
            </div>

            <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea
                    className="form-control"
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="What is this project about?"
                />
            </div>

            {/* Submit button changes text when loading */}
            <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
            >
                {loading ? "Creating…" : "Create Project"}
            </button>
        </form>
    );
}
