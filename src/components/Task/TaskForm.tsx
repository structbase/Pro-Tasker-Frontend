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

    return (
        // UI returning a bootstrap form element
        <form onSubmit={handleSubmit} className="border rounded p-3">
            <h4 className="mb-3">Create New Task</h4>

            {/* Error message display */}
            {error && <p className="text-danger">{error}</p>}

            <div className="mb-3">
                <label className="form-label">Title</label>
                <input
                    type="text"
                    className="form-control"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    disabled={loading}
                />
            </div>

            <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea
                    className="form-control"
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    disabled={loading}
                />
            </div>

            <div className="mb-3">
                <label className="form-label">Status</label>
                {/* Dropdown menu for selecting the current status of the task */}
                <select
                    className="form-select"
                    value={status}
                    onChange={(e) => setStatus(e.target.value as typeof status)}
                    disabled={loading}
                >
                    <option value="To Do">To Do</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Done">Done</option>
                </select>
            </div>

            <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
            >
                {loading ? "Creating…" : "Create Task"}
            </button>
        </form>
    );
}
