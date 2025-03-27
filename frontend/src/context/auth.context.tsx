import { createContext, ReactNode, useContext, useState } from "react";

interface AuthContext {
    token: string | null;
    isAuthenticated: boolean
    login: (userToken: string) => void
    logout: () => void
}
const TOKEN_KEY = 'userToken';


const AuthContext = createContext<AuthContext | null>(null);
export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [token, setToken] = useState<string | null>(localStorage.getItem(TOKEN_KEY));
    const login = (userToken: string) => {
        setToken(userToken);
        localStorage.setItem(TOKEN_KEY, userToken);

    };
    const logout = () => {
        setToken(null);
        localStorage.removeItem(TOKEN_KEY);
    };
    const isAuthenticated = !!token;
    return (
        <AuthContext.Provider value={{ token, isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};