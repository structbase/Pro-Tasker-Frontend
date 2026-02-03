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
        <div
            className="d-flex align-items-center justify-content-between border-0 rounded-3 p-3 mb-2 bg-white shadow-sm border-start border-4"
            style={{
                // A colorful "accent" bar on the left based on status
                borderLeftColor:
                    task.status === "Done"
                        ? "#198754"
                        : task.status === "In Progress"
                            ? "#0d6efd"
                            : "#adb5bd",
                transition: "all 0.2s ease",
            }}
        >
            <div className="flex-grow-1">
                {/* Task Title - Using fs-6 and bold for better hierarchy */}
                <div
                    className="fw-bold mb-1"
                    style={{
                        fontSize: "1rem",
                        textDecoration: isDone ? "line-through" : "none",
                        color: isDone ? "#adb5bd" : "#212529",
                        transition: "color 0.3s ease",
                    }}
                >
                    {task.title}
                </div>

                {/* Description - Smaller and muted */}
                {task.description && (
                    <p className="text-muted small mb-2 lh-sm">
                        {task.description}
                    </p>
                )}

                {/* Styled Status Select - Matches the 'Pill' look we used earlier */}
                <div className="d-inline-block">
                    <select
                        className={`form-select form-select-sm fw-bold shadow-none ${
                            task.status === "Done"
                                ? "bg-success-subtle text-success border-success-subtle"
                                : task.status === "In Progress"
                                    ? "bg-primary-subtle text-primary border-primary-subtle"
                                    : "bg-light text-secondary"
                        }`}
                        style={{
                            width: "auto",
                            fontSize: "0.7rem",
                            borderRadius: "50px",
                            padding: "0.15rem 0.5rem",
                        }}
                        value={task.status}
                        onChange={(e) =>
                            onStatusChange?.(
                                task._id,
                                e.target.value as TaskStatus,
                            )
                        }
                    >
                        <option value="To Do">To Do</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Done">Done</option>
                    </select>
                </div>
            </div>

            {/* Delete Button */}
            <button
                className="btn btn-sm btn-light text-danger rounded-pill px-3 ms-3 fw-semibold border-0 shadow-sm"
                style={{ fontSize: "0.75rem" }}
                onClick={() => onDelete?.(task._id)}
            >
                Delete
            </button>
        </div>
    );
}
