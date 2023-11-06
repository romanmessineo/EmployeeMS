import { Navigate } from "react-router-dom";

const PrivateEmployeeDetailRoute = ({ children }) => {
  return localStorage.getItem("valid") ? children : <Navigate to="/" />;
};

export default PrivateEmployeeDetailRoute;
