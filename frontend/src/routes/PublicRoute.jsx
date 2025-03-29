import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../utils/auth";

const PublicRoute = ({ children }) => {
  return isAuthenticated() ? <Navigate to="/home" /> : children;
};

export default PublicRoute;
