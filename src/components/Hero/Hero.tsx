import { Link } from "react-router-dom";

export default function Hero() {
    return (
        <section className="px-4 py-5 text-center">
            <h1 className="display-5 fw-bold text-body-emphasis">Pro-Tasker</h1>

            <div className="col-lg-6 mx-auto">
                <p className="lead mb-4">
                    Pro-Tasker helps individuals and small teams organize
                    projects, track tasks, and stay productive with a clean,
                    collaborative workflow.
                </p>

                <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
                    <Link
                        to="/register"
                        className="btn btn-primary btn-lg px-4 gap-3"
                    >
                        Register
                    </Link>

                    <Link
                        to="/login"
                        className="btn btn-outline-secondary btn-lg px-4"
                    >
                        Login
                    </Link>
                </div>
            </div>
        </section>
    );
}
