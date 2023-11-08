import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";




const Start = () => {
      const navigate = useNavigate();

      useEffect(() => {
        axios
          .get("http://localhost:3000/verify")
          .then((result) => {
            if (result.data.Status) {
              if (result.data.role === "admin") {
                navigate("/dashboard");
              } else {
                navigate("employee_detail/" + result.data);
              }
            } 
          })
          .catch((err) => console.log(err));
      }, []);



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
