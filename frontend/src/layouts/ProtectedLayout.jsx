import { useAuth } from "../contexts/AuthContext";
import { Navigate, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";

function ProtectedLayout({ children }) {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  );
}

export default ProtectedLayout;