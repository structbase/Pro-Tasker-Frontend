export default function Footer() {
    return (
        <footer className="container mt-auto py-4">
            <div className="d-flex justify-content-center align-items-center">
                <span className="text-body-secondary">
                    © {new Date().getFullYear()} Pro-Tasker. All rights
                    reserved.
                </span>
            </div>
        </footer>
    );
}
