import { JSX, ReactElement } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/auth.context";

const ProtectedLoginRoute = ({ children }: { children: ReactElement }): JSX.Element | null => {
    const { isAuthenticated } = useAuth();


    if (isAuthenticated) {
        return <Navigate to="/" />;
    }

    return <>{children}</>;
};

export default ProtectedLoginRoute;