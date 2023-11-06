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
    <div className="container  bg-dark pb-3 rounded-3 ">
      <div className="pt-2 d-flex justify-content-center text-white">
        <h4>Emoployee Management System</h4>
      </div>
      <div className="row">
        <div className="col-md-2 m-auto col-xs-1">
          {employee.image && (
            <img
              src={`http://localhost:3000/Images/` + employee.image}
              className="emp_det_image img-fluid rounded "
            />
          )}
        </div>
        <div className="col-md-10">
          <table className="table col-xs-1 table-bordered table-striped table-hover table-responsive justify-content-center flex-column align-items-center mt-3">
            <thead className="text-center">
              <tr>
                <th>Nombre</th>
                <th>Cuil</th>
                <th>Direccíon</th>
                <th>Categoria</th>
              </tr>
            </thead>
            <tbody className="text-center">
              <tr>
                <td>{employee.name} {employee.last_name} </td>
                <td>{employee.cuil}</td>
                <td>{employee.address}</td>
                <td>{employee.category_name}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="d-flex justify-content-end align-items-center gap-2">
          {/* <button className="btn btn-primary me-2">Edit</button> */}
          <button className="btn btn-danger " onClick={handleLogout}>
            Salir
          </button>
          <Link to={`/employee_detail/${id}/receipts`} className="btn btn-info">
            Ver Recibos
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetail;
