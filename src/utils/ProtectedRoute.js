import { useSelector } from "react-redux";
import { selectUser } from "../store/userSlice";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const userSelector = useSelector(selectUser);
    const userDetails = JSON.parse(window.sessionStorage.getItem("userDetails"));

    return !userSelector.isAuthenticatedUser && !userDetails?.isAuthenticatedUser ? <Navigate to="/login"/> : children;
}

export default ProtectedRoute;