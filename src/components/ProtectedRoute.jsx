import { Navigate } from "react-router-dom";
import { useAuth } from "../context/auth-context";

function ProtectedRoute({ children }) {
    const { user, loading } = useAuth();

    // Wait until authentication status is checked
    if (loading) {
        return <h2>Loading...</h2>;
    }

    // If user is not logged in, redirect to login
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // User is authenticated
    return children;
}

export default ProtectedRoute;