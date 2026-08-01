import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "../context/auth-context";
import "./Auth.css";

function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const justRegistered = Boolean(location.state?.justRegistered);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSubmitting(true);

        try {
            await login(email, password);
            navigate("/");
        } catch (err) {
            console.error(err);

            if (err.response?.data?.detail) {
                setError(err.response.data.detail);
            } else {
                setError("Login failed. Please try again.");
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
                <p className="auth-tagline">// sign in to your workbook</p>

                {justRegistered && !error && (
                    <p className="success-banner">
                        Account created — sign in to continue.
                    </p>
                )}

                {error && <p className="error-banner">{error}</p>}

                <form onSubmit={handleSubmit}>
                    <div className="field">
                        <label htmlFor="login-email">Email</label>
                        <input
                            id="login-email"
                            type="email"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="field">
                        <label htmlFor="login-password">Password</label>
                        <input
                            id="login-password"
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary btn-block"
                        disabled={submitting}
                    >
                        {submitting ? "Signing in…" : "Sign in"}
                    </button>
                </form>

                <p className="auth-footer">
                    New here? <Link to="/signup">Create an account</Link>
                </p>
            </div>
        </div>
    );
}

export default Login;
