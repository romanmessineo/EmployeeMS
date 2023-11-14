import { useState, useEffect } from "react";
import "./Style.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { VITE_URL } from "./config";

const EmployeeLogin = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("valid") === "true";

    if (isAuthenticated) {
      // Si ya está autenticado, redirigir directamente a /employee_detail/:id
      const userId = localStorage.getItem("userId");
      navigate(`/employee_detail/${userId}`);
    }
  }, [navigate]);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post(`${VITE_URL}/employee/employee_login`, values)
      .then((result) => {
        if (result.data.loginStatus) {
          localStorage.setItem("valid", true);
          localStorage.setItem("role", "employee");
          localStorage.setItem("userId", result.data.id);
          navigate(`/employee_detail/${result.data.id}`);
        } else {
          setError(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 loginPage">
      <div className="p-3 rounded border loginForm">
        <div className="text-warning">{error && error}</div>
        <h2 className="text-center">Iniciar Sesión</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email">
              <strong>Email:</strong>
            </label>
            <input
              type="email"
              name="email"
              autoComplete="email"
              placeholder="Ingrese Email"
              onChange={(e) => setValues({ ...values, email: e.target.value })}
              required="campo obligatorio"
              className="form-control rounded-0"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password">
              <strong>Password:</strong>
            </label>
            <input
              type="password"
              name="password"
              placeholder="Ingrese Password"
              onChange={(e) =>
                setValues({ ...values, password: e.target.value })
              }
              required="campo obligatorio"
              className="form-control rounded-0"
            />
          </div>
          <button className="btn btn-success w-100 rounded-0 mb-2">
            ENTRAR
          </button>
          <div className="mb-1">
            <input type="checkbox" name="tick" id="tick" className="me-2" />
            <label htmlFor="password">Acepta los terminos</label>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployeeLogin;
