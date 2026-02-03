export type TaskStatus = "To Do" | "In Progress" | "Done";

export interface Task {
    _id: string;
    title: string;
    description?: string;
    status: TaskStatus;
    project: string;
    createdAt: string;
    updatedAt: string;
}

interface TaskItemProps {
    task: Task;
    onStatusChange?: (id: string, status: TaskStatus) => void;
    onDelete?: (id: string) => void;
}

export default function TaskItem({
    task,
    onStatusChange,
    onDelete,
}: TaskItemProps) {
    const isDone = task.status === "Done";

    return (
        <div className="d-flex align-items-center justify-content-between border rounded p-2 mb-2">
            <div className="flex-grow-1">
                <div
                    style={{
                        textDecoration: isDone ? "line-through" : "none",
                        fontWeight: 500,
                    }}
                >
                    {task.title}
                </div>

                {task.description && (
                    <small className="text-muted d-block">
                        {task.description}
                    </small>
                )}

                {/* Status selector */}
                <select
                    value={task.status}
                    onChange={(e) =>
                        onStatusChange?.(task._id, e.target.value as TaskStatus)
                    }
                >
                    <option value="To Do">To Do</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Done">Done</option>
                </select>
            </div>

            <button
                className="btn btn-sm btn-outline-danger ms-3"
                onClick={() => onDelete?.(task._id)}
            >
                Delete
            </button>
        </div>
    );
}
