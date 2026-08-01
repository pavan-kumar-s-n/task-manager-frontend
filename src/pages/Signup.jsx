import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth-context";
import "./Auth.css";

function Signup() {
    const { signup } = useAuth();
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSubmitting(true);

        try {
            await signup(username, email, password);
            navigate("/login", { state: { justRegistered: true } });
        } catch (err) {
            console.error(err);

            if (err.response?.data?.detail) {
                setError(err.response.data.detail);
            } else {
                setError("Signup failed. Please try again.");
            }
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="auth-screen">
            <div className="auth-card">
                <div className="auth-brand">
                    <span className="mark">Le</span>
                    <span className="word">Ledger</span>
                </div>
                <p className="auth-tagline">// open a new workbook</p>

                {error && <p className="error-banner">{error}</p>}

                <form onSubmit={handleSubmit}>
                    <div className="field">
                        <label htmlFor="signup-username">Username</label>
                        <input
                            id="signup-username"
                            type="text"
                            placeholder="jane_doe"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>

                    <div className="field">
                        <label htmlFor="signup-email">Email</label>
                        <input
                            id="signup-email"
                            type="email"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="field">
                        <label htmlFor="signup-password">Password</label>
                        <input
                            id="signup-password"
                            type="password"
                            placeholder="At least 6 characters"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            minLength={6}
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary btn-block"
                        disabled={submitting}
                    >
                        {submitting ? "Creating account…" : "Create account"}
                    </button>
                </form>

                <p className="auth-footer">
                    Already have an account? <Link to="/login">Sign in</Link>
                </p>
            </div>
        </div>
    );
}

export default Signup;
