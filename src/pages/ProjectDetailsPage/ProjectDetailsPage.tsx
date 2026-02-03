import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import axios from "axios";
import { api } from "../../utils/api/axiosInstance";
import TaskItem, { type Task } from "../../components/Task/TaskItem";

interface Project {
    _id: string;
    name: string;
    description?: string;
}

export default function ProjectDetailsPage() {
    const { projectId } = useParams<{ projectId: string }>();

    const [project, setProject] = useState<Project | null>(null);
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

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
    }, [projectId]);

    if (loading) return <p>Loading project…</p>;
    if (error) return <p className="text-danger">{error}</p>;
    if (!project) return <p>Project not found.</p>;

    return (
        <div className="container py-4">
            <h2>{project.name}</h2>
            {project.description && (
                <p className="text-muted">{project.description}</p>
            )}

            <hr />

            {/* Tasks list */}
            {tasks.length === 0 ? (
                <p>No tasks yet.</p>
            ) : (
                tasks.map((task) => (
                    <TaskItem
                        key={task._id}
                        task={task}
                    />
                ))
            )}
        </div>
    );
}
