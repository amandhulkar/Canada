import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { getCurrentUser, hasFeatureAccess } from "../utils/permissions";

const API = import.meta.env.VITE_API_URL || "http://127.0.0.1:5000";

function ProtectedRoute({ children, permission }) {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const user = getCurrentUser();

  useEffect(() => {
    if (!token || !user) return;

    let stopped = false;

    const checkUserStatus = async () => {
      try {
        const res = await fetch(`${API}/api/auth/profile`, {
          headers: { Authorization: token },
          cache: "no-store",
        });

        if (stopped) return;

        if (res.status === 401 || res.status === 403 || res.status === 404) {
          localStorage.removeItem("token");
          localStorage.removeItem("currentUser");
          alert(res.status === 403 ? "Your account has been suspended by admin" : "Your account is no longer active");
          navigate("/signup?tab=signin", { replace: true });
          return;
        }

        if (res.ok) {
          const data = await res.json();
          if (data.user) {
            const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
            localStorage.setItem("currentUser", JSON.stringify({ ...currentUser, ...data.user }));
          }
        }
      } catch (error) {
        console.error("User status check failed:", error);
      }
    };

    checkUserStatus();
    const interval = setInterval(checkUserStatus, 5000);

    return () => {
      stopped = true;
      clearInterval(interval);
    };
  }, [navigate, token, user]);

  if (!token || !user) return <Navigate to="/signup?tab=signin" replace />;
  if (!hasFeatureAccess(user, permission)) return <Navigate to="/dashboard" replace />;

  return children;
}

export default ProtectedRoute;
