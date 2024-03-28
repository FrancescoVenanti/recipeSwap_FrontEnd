import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ children }) => {
	const token = useSelector((state) => state.auth.token);

	if (!token) {
		// User not authenticated, redirect to /Authentication
		return <Navigate to="/Authentication" />;
	} else {
		return children;
	}
};

export default ProtectedRoute;