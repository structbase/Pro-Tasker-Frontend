import { Link } from "react-router-dom";

export default function NotFoundPage() {
    return (
        <div className="container min-vh-100 d-flex flex-column align-items-center justify-content-center text-center">
            {/* The Image - Added a subtle 'floating' animation feel */}
            <div className="mb-4">
                <img
                    src="/img/pudgypenguins.gif"
                    alt="pudgy penguin looking for page"
                    style={{
                        maxWidth: "320px",
                        borderRadius: "50%", // Circular look often works well for binoculars
                        border: "8px solid #f8f9fa",
                    }}
                    className="shadow-sm"
                />
            </div>

            {/* Typography - Arctic Theme Colors */}
            <h1
                className="display-1 fw-black text-primary mb-0"
                style={{ letterSpacing: "-4px" }}
            >
                404
            </h1>

            <h2 className="h4 fw-bold mb-3">Waddle we do now?</h2>

            <p
                className="text-muted fs-5 mx-auto"
                style={{ maxWidth: "500px" }}
            >
                Our scout is scanning the horizon, but this page seems to be
                buried under several feet of ice.
                <span className="d-block mt-2 italic small">
                    (He's trying his best, he doesn't even have pockets for his
                    keys.)
                </span>
            </p>

            {/* Action Buttons */}
            <div className="mt-4 d-flex flex-column flex-sm-row justify-content-center gap-3 w-100">
                <Link
                    to="/"
                    className="btn btn-primary btn-lg px-5 rounded-pill shadow-sm"
                >
                    Slide Home
                </Link>
                <button
                    className="btn btn-outline-secondary btn-lg px-5 rounded-pill"
                    onClick={() => window.history.back()}
                >
                    Waddle Back
                </button>
            </div>

            {/* Playful status at the bottom */}
            <div className="mt-5 opacity-50">
                <div
                    className="spinner-grow spinner-grow-sm text-info me-2"
                    role="status"
                ></div>
                <span className="small text-uppercase fw-bold">
                    Status: Searching the Iceberg
                </span>
            </div>
        </div>
    );
}
