import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

const PrivateRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("valid") === "true";
  const role = localStorage.getItem("role");

  if (!isAuthenticated || role !== "admin") {
    // Si no está autenticado o no es un admin, redirige a la página de inicio
    return <Navigate to="/" />;
  }
  // Si está autenticado y es un admin, permite el acceso al contenido de children
  return children;
};
PrivateRoute.propTypes = {
  children: PropTypes.node,
};
export default PrivateRoute;
