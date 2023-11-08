import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

const EmployeeDetail = () => {
  const anavigate = useNavigate();
  const [employee, setEmployee] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get("http://localhost:3000/employee/detail/" + id)
      .then((result) => {
        setEmployee(result.data[0]);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleLogout = () => {
    axios
      .get("http://localhost:3000/employee/logout")
      .then((result) => {
        if (result.data.Status) {
          localStorage.removeItem("valid");
          anavigate("/");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container bg-dark pb-3 vh-100">
      <div className="pt-2 text-center text-light">
        <h4>Employee Management System</h4>
      </div>
      <div className="row">
        <div className="col-12 col-md-2 d-flex justify-content-center align-items-center">
          {employee.image && (
            <img
              src={`http://localhost:3000/Images/` + employee.image}
              className="img-thumbnail rounded-circle"
              style={{ width: "100px", height: "100px" }}
            />
          )}
        </div>

        <div className="col-12 col-md-10 table-responsive">
          <table className="table table-bordered table-striped table-hover mt-3 emplTableDetail">
            <thead className="text-center">
              <tr>
                <th>Nombre</th>
                <th>Cuil</th>
                <th>Dirección</th>
                <th>Categoría</th>
              </tr>
            </thead>
            <tbody className="text-center ">
              <tr>
                <td>
                  {employee.name} {employee.last_name}
                </td>
                <td>{employee.cuil}</td>
                <td>{employee.address}</td>
                <td>{employee.category_name}</td>
              </tr>
            </tbody>
          </table>
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
