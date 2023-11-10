import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

const PrivateEmployeeDetailRoute = ({ children }) => {
  return localStorage.getItem("role") === "employee" ? (
    children
  ) : (
    <Navigate to="/" />
  );
};

PrivateEmployeeDetailRoute.propTypes = {
  children: PropTypes.node,
};

export default PrivateEmployeeDetailRoute;
