import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Start = () => {
const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("valid") === "true";
    const role = localStorage.getItem("role");

    //console.log("Start isAuthenticated:", isAuthenticated, "role:", role);

    if (isAuthenticated) {
      if (role === "admin") {
        navigate("/dashboard");
      } else if (role === "employee") {
        navigate("/employee_detail/" + localStorage.getItem("userId"));
      }
    } else {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 loginPage">
      <div className="p-3 rounded w-md-50 border loginForm text-center">
        {/* Estilos relevantes aquí */}
        <h2 className="text-center">Iniciar sesión como:</h2>
        <div className="d-flex flex-column justify-content-center mt-4 mb-4">
          <button
            type="button"
            className="btn btn-primary mb-2"
            onClick={() => {
              navigate("/employee_login");
            }}
          >
            Trabajador
          </button>
          <button
            type="button"
            className="btn btn-success"
            onClick={() => {
              navigate("/adminlogin");
            }}
          >
            Administrador
          </button>
        </div>
      </div>
    </div>
  );
};

export default Start;
