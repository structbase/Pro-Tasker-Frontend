import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { api } from "../../utils/api/axiosInstance";
import TaskItem, {
    type Task,
    type TaskStatus,
} from "../../components/Task/TaskItem";
import TaskForm from "../../components/Task/TaskForm";

/**
 * ProjectDetailsPage
 * Displays full details for a specific project and manages its task list.
 */

interface Project {
    _id: string;
    name: string;
    description?: string;
}

export default function ProjectDetailsPage() {
    // Extract projectId from URL via React Router
    const { projectId } = useParams<{ projectId: string }>();

    // Component State
    const [project, setProject] = useState<Project | null>(null);
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    /**
     * Refreshes the task list after a new task is created.
     */
    const fetchTasks = async () => {
        if (!projectId) return;
        try {
            const res = await api.get(`/${projectId}/tasks`);
            setTasks(res.data);
        } catch (err) {
            console.error("Failed to fetch tasks", err);
        }
    };

    /**
     * Initial Data Load:
     * Uses Promise.all to fetch Project and Task data simultaneously.
     */
    useEffect(() => {
        if (!projectId) return;

        const fetchProjectData = async () => {
            try {
                setLoading(true);

                const [projectRes, tasksRes] = await Promise.all([
                    api.get(`/projects/${projectId}`), // project info
                    api.get(`/${projectId}/tasks`), // tasks for this project
                ]);

                setProject(projectRes.data);
                setTasks(tasksRes.data);
            } catch (err) {
                // Axios-specific error handling to capture backend messages
                if (axios.isAxiosError(err)) {
                    setError(
                        err.response?.data?.message ||
                            "Failed to load project or tasks",
                    );
                } else {
                    setError("Unexpected error occurred");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchProjectData();
    }, [projectId]); // Re-run if the user navigates to a different project ID

    /**
     * Updates a task status (Done vs To Do).
     * It finds the task, sends the change to the server,
     * and updates only that one task in our list.
     */
    const statusChange = async (taskId: string, status: TaskStatus) => {
        try {
            const res = await api.put(`/tasks/${taskId}`, {
                status,
            });

            // Update the tasks state without refreshing the whole page
            setTasks((prev) =>
                prev.map((t) => (t._id === taskId ? res.data : t)),
            );
        } catch (err) {
            console.error("Failed to update task", err);
        }
    };

    /**
     * Deletes a task forever.
     * It tells the server to delete it, then removes it from our screen.
     */
    const deleteTask = async (taskId: string) => {
        // Simple confirmation so users don't delete by accident
        if (!window.confirm("Are you sure you want to delete this task?"))
            return;

        try {
            await api.delete(`/tasks/${taskId}`);
            // Filter out the deleted task from the current list
            setTasks((prev) => prev.filter((t) => t._id !== taskId));
        } catch (err) {
            console.error("Failed to delete task", err);
        }
    };

    // Render Conditional Loading/Error States
    if (loading) return <p className="container py-4">Loading project…</p>;
    if (error) return <p className="container py-4 text-danger">{error}</p>;
    if (!project) return <p className="container py-4">Project not found.</p>;

    return (
        <div className="container py-4">
            {/* Header Section */}
            <header className="mb-4 border-bottom pb-3 d-flex align-items-start justify-content-between gap-3">
                <div>
                    <h1 className="fw-bold text-dark">{project.name}</h1>
                {project.description && (
                    <p className="text-muted fs-5">{project.description}</p>
                )}
                </div>
                <Link
                    to={`/edit/project/${project._id}`}
                    className="btn btn-outline-primary btn-sm"
                >
                    Edit Project
                </Link>
            </header>

            <div className="row g-4">
                {/* LEFT SIDE: Task Creation Form */}
                <div className="col-lg-4">
                    <div className="sticky-top" style={{ top: "2rem" }}>
                        <TaskForm onSuccess={fetchTasks} />
                    </div>
                </div>

                {/* RIGHT SIDE: The Tasks List */}
                <div className="col-lg-8">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h3 className="fw-bold mb-0">Project Tasks</h3>
                        <span className="badge bg-dark rounded-pill px-3">
                            {tasks.length}
                        </span>
                    </div>

                    {tasks.length === 0 ? (
                        <div className="text-center p-5 border rounded-4 bg-light shadow-sm">
                            <p className="text-muted mb-0">
                                No tasks found for this project. Use the form to
                                get started!
                            </p>
                        </div>
                    ) : (
                        <div className="task-list">
                            {tasks.map((task) => (
                                <TaskItem
                                    key={task._id}
                                    task={task}
                                    onStatusChange={statusChange}
                                    onDelete={deleteTask}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
