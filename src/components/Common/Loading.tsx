/**
 * A reusable loading spinner component.
 */
export default function Loading({
    message = "Loading...",
}: {
    message?: string;
}) {
    return (
        <div className="d-flex flex-column align-items-center justify-content-center py-5">
            <div className="spinner-border text-primary mb-2" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
            <p className="text-muted">{message}</p>
        </div>
    );
}
