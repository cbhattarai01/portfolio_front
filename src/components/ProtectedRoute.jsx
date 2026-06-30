import { Navigate } from "react-router-dom";
import api from "../services/api";

export default function ProtectedRoute({ children }) {
  if (!api.isAuthenticated()) {
    return <Navigate to="/admin/login" replace />;
  }
  return children;
}
