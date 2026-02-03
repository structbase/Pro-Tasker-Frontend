import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { api } from "../../utils/api/axiosInstance";
import TaskItem, { type Task } from "../../components/Task/TaskItem";
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

    // Render Conditional Loading/Error States
    if (loading) return <p className="container py-4">Loading project…</p>;
    if (error) return <p className="container py-4 text-danger">{error}</p>;
    if (!project) return <p className="container py-4">Project not found.</p>;

    return (
        // UI returning a bootstrap form element
        <div className="container py-4">
            <header className="mb-4">
                <h2>{project.name}</h2>
                {project.description && (
                    <p className="text-muted">{project.description}</p>
                )}
            </header>

            {/* Task Creation Section: 
                'onSuccess' is a prop that lets the child tell this parent 
                to refresh the list. 
            */}
            <section className="mb-5">
                <TaskForm onSuccess={fetchTasks} />
            </section>

            <hr />

            {/* Task List Rendering */}
            <section>
                <h4>Tasks</h4>
                {tasks.length === 0 ? (
                    <p className="font-italic">No tasks yet.</p>
                ) : (
                    tasks.map((task) => <TaskItem key={task._id} task={task} />)
                )}
            </section>
        </div>
    );
}
