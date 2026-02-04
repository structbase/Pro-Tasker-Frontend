import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { api } from "../../utils/api/axiosInstance";

// Define what props this component accepts from the parent
interface TaskFormProps {
    onSuccess?: () => void; // A callback to refresh the task list after saving
}

export default function TaskForm({ onSuccess }: TaskFormProps) {
    // Get the project ID from the URL so we know which project these tasks belong to
    const { projectId } = useParams<{ projectId: string }>();

    // State for the form inputs
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState<"To Do" | "In Progress" | "Done">(
        "To Do",
    );
    const [loading, setLoading] = useState(false); // Tracks if the API is currently saving
    const [error, setError] = useState<string | null>(null); // Stores error messages

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); // Prevents the browser from reloading the page

        // Basic check: Don't allow empty titles or descriptions
        if (!title.trim() || !description.trim()) {
            setError("Task title and description are required");
            return;
        }

        // Safety check: Ensure we actually have a project ID before sending
        if (!projectId) {
            setError("Invalid project");
            return;
        }

        try {
            setLoading(true); // Disable the button and inputs
            setError(null); // Reset previous errors

            // Send the new task data to the specific project's task list
            await api.post(`/${projectId}/tasks`, {
                title,
                description,
                status,
            });

            // Clear the form fields so the user can add another task
            setTitle("");
            setDescription("");
            setStatus("To Do");

            // Tell the parent component (ProjectDetailsPage) to fetch the updated list
            if (onSuccess) onSuccess();
        } catch (err) {
            // Handle server or connection errors
            if (axios.isAxiosError(err)) {
                setError(
                    err.response?.data?.message || "Failed to create task",
                );
            } else {
                setError("Unexpected error occurred");
            }
        } finally {
            setLoading(false); // Re-enable the button and inputs
        }
    };

    // UI returning a bootstrap form element
    return (
        <form
            onSubmit={handleSubmit}
            className="border-0 rounded-4 p-4 bg-white shadow-sm"
            style={{ borderTop: "4px solid #052b62" }}
        >
            {/* 1. Form Header - fs-4 is bold and clear */}
            <h4 className="fw-bold mb-4 text-dark fs-4">Add New Task</h4>

            {error && <p className="text-danger small">{error}</p>}

            <div className="mb-3">
                <label className="form-label small fw-bold text-muted text-uppercase">
                    Title
                </label>
                {/* 2. Larger font size for the main input */}
                <input
                    type="text"
                    className="form-control form-control-lg fs-5 border-light-subtle bg-light"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    disabled={loading}
                    placeholder="Task name..."
                />
            </div>

            <div className="mb-3">
                <label className="form-label small fw-bold text-muted text-uppercase">
                    Description
                </label>
                <textarea
                    className="form-control border-light-subtle bg-light"
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    disabled={loading}
                />
            </div>

            <div className="mb-4">
                <label className="form-label small fw-bold text-muted text-uppercase">
                    Status
                </label>
                <select
                    className="form-select border-light-subtle bg-light"
                    value={status}
                    onChange={(e) => setStatus(e.target.value as typeof status)}
                    disabled={loading}
                >
                    <option value="To Do">To Do</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Done">Done</option>
                </select>
            </div>

            {/* 3. Create Button - matching the fs-5 from the Project Form */}
            <button
                type="submit"
                className="btn btn-primary btn-lg w-100 fw-bold fs-5 shadow-sm"
                disabled={loading}
            >
                {loading ? "Creating…" : "Create Task"}
            </button>
        </form>
    );
}
