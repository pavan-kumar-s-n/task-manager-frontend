import { useState } from "react";
import api from "../services/api";
import { AuthContext } from "./auth-context";

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const token = localStorage.getItem("token");
        return token ? { token } : null;
    });

    const [loading] = useState(false);

    const login = async (email, password) => {
        const response = await api.post("/login", {
            email,
            password,
        });

        const token = response.data.access_token;

        localStorage.setItem("token", token);

        setUser({ token });

        return response.data;
    };

    const signup = async (username, email, password) => {
        return await api.post("/signup", {
            username,
            email,
            password,
        });
    };

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                login,
                signup,
                logout,
                loading,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
