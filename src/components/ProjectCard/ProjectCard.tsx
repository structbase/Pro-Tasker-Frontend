import { Link } from "react-router-dom";

interface ProjectCardProps {
    project: {
        _id: string;
        name: string;
        description?: string;
    };
    onDelete?: (id: string) => void;
}

export default function ProjectCard({ project, onDelete }: ProjectCardProps) {
    return (
        <div className="project-card border rounded p-3 mb-3 bg-white shadow-sm">
            {/* View / Read */}
            <Link
                to={`/projects/${project._id}`}
                className="text-decoration-none text-dark d-block mb-2"
            >
                <h3 className="h5 mb-1">{project.name}</h3>

                {project.description ? (
                    <p className="text-muted mb-0 small text-truncate">
                        {project.description}
                    </p>
                ) : (
                    <p className="text-muted mb-0 small fst-italic">
                        No description provided.
                    </p>
                )}
            </Link>

            {/* Actions */}
            <div className="d-flex justify-content-end gap-2 mt-2">
                {/* Update */}
                <Link
                    to={`/edit/project/${project._id}`}
                    className="btn btn-sm btn-outline-primary"
                >
                    Edit
                </Link>

                {/* Delete */}
                <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => onDelete?.(project._id)}
                >
                    Delete
                </button>
            </div>
        </div>
    );
}
