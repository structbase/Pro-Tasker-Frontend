export type TaskStatus = "To Do" | "In Progress" | "Done";

export interface Task {
    completed: any;
    _id: string;
    title: string;
    description?: string;
    status: TaskStatus;
    project: string; // projectId reference
    createdAt: string;
    updatedAt: string;
}

interface TaskItemProps {
    task: Task;
    onToggle?: (id: string) => void;
    onDelete?: (id: string) => void;
}

export default function TaskItem({ task, onToggle, onDelete }: TaskItemProps) {
    const isDone = task.status === "Done";

    return (
        <div className="d-flex align-items-center justify-content-between border rounded p-2 mb-2">
            <div className="d-flex align-items-center gap-2">
                <input
                    type="checkbox"
                    checked={isDone}
                    onChange={() => onToggle?.(task._id)}
                />

                <div>
                    <div
                        style={{
                            textDecoration: isDone ? "line-through" : "none",
                            fontWeight: 500,
                        }}
                    >
                        {task.title}
                    </div>

                    <small className="text-muted">Status: {task.status}</small>
                </div>
            </div>

            <button
                className="btn btn-sm btn-outline-danger"
                onClick={() => onDelete?.(task._id)}
            >
                Delete
            </button>
        </div>
    );
}
