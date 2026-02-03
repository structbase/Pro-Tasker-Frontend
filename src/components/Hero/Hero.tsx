import { Link } from "react-router-dom";

export default function Hero() {
    return (
        <section className="px-4 py-5">
            {/* Main Text Area */}
            <div className="text-center py-5">
                <h1 className="display-4 fw-bold text-body-emphasis mb-3">
                    Pro-Tasker
                </h1>
                <div className="col-lg-6 mx-auto">
                    <p className="lead mb-4 text-muted">
                        Organize projects, track tasks, and stay productive with
                        a clean, collaborative workflow designed for speed.
                    </p>
                    <div className="d-grid gap-2 d-sm-flex justify-content-sm-center mb-5">
                        <Link
                            to="/register"
                            className="btn btn-primary btn-lg px-5 fw-bold shadow-sm "
                        >
                            Get Started
                        </Link>
                        <Link
                            to="/login"
                            className="btn btn-outline-dark btn-lg px-5"
                        >
                            Sign In
                        </Link>
                    </div>
                </div>
            </div>

            {/* Feature Cards: This fills the "empty" space on the Home Page */}
            <div className="container pb-5 mt-5">
                <div className="row g-4 row-cols-1 row-cols-lg-3">
                    {/* Feature Card Template */}
                    {[
                        {
                            img: "tasks.png",
                            title: "Project Folders",
                            desc: "Organize your work into clean, manageable projects.",
                        },
                        {
                            img: "pointer.png",
                            title: "Task Tracking",
                            desc: "Update status from 'To Do' to 'Done' with one click.",
                        },
                        {
                            img: "solution.png",
                            title: "Fast & Simple",
                            desc: "No bloat. Just the tools you need to finish the job.",
                        },
                    ].map((feature, index) => (
                        <div className="col" key={index}>
                            <div className="feature-card p-4 border-0 rounded-4 shadow-sm bg-white h-100 text-center d-flex flex-column align-items-center">
                                {/* Image Container */}
                                <div className="mb-4">
                                    <img
                                        src={`./icons/${feature.img}`}
                                        alt={feature.title}
                                        style={{
                                            width: "100px", // Fixed width since they are identical
                                            height: "auto",
                                            filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.1))", // Adds depth to the flat icon
                                        }}
                                    />
                                </div>

                                {/* Content */}
                                <h3 className="fs-5 fw-bold text-dark mb-2">
                                    {feature.title}
                                </h3>
                                <p className="text-muted small mb-0 px-xl-4">
                                    {feature.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
