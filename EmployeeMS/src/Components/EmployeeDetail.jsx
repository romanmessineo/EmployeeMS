import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { VITE_URL } from "./config";

const EmployeeDetail = () => {
  const anavigate = useNavigate();
  const [employee, setEmployee] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`${VITE_URL}/employee/detail/` + id)
      .then((result) => {
        setEmployee(result.data[0]);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleLogout = () => {
    axios.get(`${VITE_URL}/employee/logout`).then((result) => {
      if (result.data.Status) {
        localStorage.removeItem("valid");
        localStorage.removeItem("role");
        localStorage.removeItem("userId"); // Elimina el userId si es relevante
        //window.location.reload();
        // Puedes redirigir a la página de inicio o hacer lo que sea necesario
        anavigate("/");
      }
    });
  };

  return (
    <div className="container bg-dark pb-3 vh-100">
      <div className="pt-2 pb-2 text-center text-light">
        <h4>Employee Management System</h4>
      </div>
      <div className="row">
        <div className="col-md-2 d-flex justify-content-center align-items-start ">
          {employee.image && (
            <img
              src={`${VITE_URL}/Images/` + employee.image}
              className="img-thumbnail "
              style={{ maxWidth: "100%", maxHeight: "100%" }}
            />
          )}
        </div>

        <div className="col-12 col-md-10 emplTableDetail">
          <table className="table table-bordered table-striped table-hover  custom-table">
            <thead className="text-center">
              <tr>
                <th style={{ width: "33%" }}>Nombre</th>
                <th style={{ width: "33%" }}>Empresa</th>
                <th style={{ width: "33%" }}>Categoría</th>
              </tr>
            </thead>
            <tbody className="text-center">
              <tr>
                <td>
                  {employee.name} {employee.last_name}
                </td>
                <td>{employee.company_name}</td>
                <td>{employee.category_name}</td>
              </tr>
            </tbody>
          </table>

          <table className="table table-bordered table-striped table-hover custom-table">
            <thead className="text-center">
              <tr>
                <th style={{ width: "33%" }}>CUIL</th>
                <th style={{ width: "33%" }}>Email</th>
                <th style={{ width: "33%" }}>Dirección</th>
              </tr>
            </thead>
            <tbody className="text-center">
              <tr>
                <td>{employee.cuil}</td>
                <td>{employee.email}</td>
                <td>{employee.address}</td>
              </tr>
            </tbody>
          </table>

          <div className="col-12 d-flex justify-content-between align-items-center mt-2">
            {/* Otro contenido */}
          </div>

          <div className="col-12 d-flex justify-content-between align-items-center mt-2">
            {/* <button className="btn btn-danger me-2">
            Alta Temprana
          </button> */}
            <Link
              to={`/employee_detail/${id}/receipts`}
              className="btn btn-info"
            >
              Recibos
            </Link>
            <button
              className="btn btn-danger rounded-circle"
              onClick={handleLogout}
              placeholder="Cerrar sesión"
            >
              <i className="bi bi-power"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetail;
