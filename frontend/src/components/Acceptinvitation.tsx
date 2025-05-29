import { useEffect, useState } from "react";
import { useAuth } from "../context/auth.context";
import { Navigate, useSearchParams } from "react-router-dom"; // <-- fixed import
import { verifyInvitationToken } from "../services/httpService";

const AcceptInvitation = () => {
  const { isAuthenticated, logout } = useAuth();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [loading, setLoading] = useState(true);
  const [valid, setValid] = useState<boolean | null>(null);

  useEffect(() => {
    if (!token) return;

    const verifyToken = async () => {
      try {
        await verifyInvitationToken(token);
        setValid(true);
        if (isAuthenticated) {
          logout();
        }
      } catch (err) {
        console.log(err)
        setValid(false);
      } finally {
        setLoading(false);
      }
    };

    verifyToken();
  }, [token, isAuthenticated, logout]);

  if (!token) return <Navigate to="/" />;

  if (loading) return <p>Verifying invitation...</p>;
  if (valid === false) return <Navigate to="/" />;

  return <>This is a component</>;
};

export default AcceptInvitation;
