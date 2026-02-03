import { Link } from "react-router-dom";

/**
 * ProjectCard Component
 * A reusable UI component that displays a summary of a project.
 */
interface ProjectCardProps {
    project: {
        _id: string; // MongoDB unique identifier
        name: string;
        description?: string;
    };
}

export default function ProjectCard({ project }: ProjectCardProps) {
    return (
        /**
         * Clikeble task project card
         */
        <Link
            to={`/projects/${project._id}`}
            className="project-card border rounded p-3 mb-3 d-block text-decoration-none text-dark bg-white shadow-sm hover-effect"
        >
            <h3 className="h5 mb-2">{project.name}</h3>

            {/* Conditional Rendering: 
                Makes sure the UI consistance even when no projects
            */}
            {project.description ? (
                <p className="text-muted mb-0 small text-truncate">
                    {project.description}
                </p>
            ) : (
                <p className="text-muted mb-0 small font-italic">
                    No description provided.
                </p>
            )}
        </Link>
    );
}
