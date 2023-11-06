import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Employee = () => {
  const [employee, setEmployee] = useState([]);
  

  useEffect(() => {
    axios
      .get("http://localhost:3000/auth/employee")
      .then((result) => {
        if (result.data.Status) {
          setEmployee(result.data.Result);
        } else {
          alert(result.data.Result);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id) => {
    axios
      .delete("http://localhost:3000/auth/delete_employee/" + id)
      .then((result) => {
        if (result.data.Status) {
          window.location.reload();
        } else {
          alert(result.data.Error);
        }
      });
  };

  const handleUploadReceipt = (id) => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = ".pdf";
    fileInput.addEventListener("change", (event) => {
      const file = event.target.files[0];

      if (file) {
        const formData = new FormData();
        formData.append("receipt", file);

        axios
          .post(`http://localhost:3000/auth/upload_receipt/${id}`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
          })
          .then((result) => {
            if (result.data.Status) {
              // Handle success
              alert("Recibo de sueldo cargado con éxito.");
            } else {
              alert(result.data.Error);
            }
          })
          .catch((err) => console.log(err));
      }
    });

    fileInput.click();
  };

  return (
    <div className="container px-5 mt-3 shadow ">
      <div className="col">
        <div className="row justify-content-center text-center">
          <h3>Lista de Empleados</h3>
        </div>
        <hr />
        <Link to="/dashboard/add_employee" className="row-1 btn btn-success">
          Añadir Empleado
        </Link>
        <div className="row d-flex mt-3 ">
          <div className="col-12">

          <table className="table table-striped table-bordered table-hover table-sm table-dark">
            <thead className="text-center table-light">
              <tr>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Imagen</th>
                <th>Cuil</th>
                <th>Email</th>
                <th>Dirección</th>
                <th>Categoria</th>
                <th>Salario</th>
                <th>Cargar Recibo</th>
                <th>Accíon</th>
              </tr>
            </thead>
            <tbody>
              {employee.map((e) => (
                <tr key={e.id} className="text-center">
                  <td>{e.name}</td>
                  <td>{e.last_name}</td>
                  <td>
                    <img
                      src={`http://localhost:3000/Images/` + e.image}
                      alt=""
                      className="employee_image img-fluid"
                      loading="lazy"
                    />
                  </td>
                  <td>{e.cuil}</td>
                  <td>{e.email}</td>
                  <td>{e.address}</td>
                  <td>{e.category_name}</td>
                  <td>${e.salary}</td>
                  <td>
                    <button
                      className="btn btn-success btn-sm me-2"
                      onClick={() => handleUploadReceipt(e.id)}
                    >
                      Cargar
                    </button>
                  </td>
                  <td className="text-center text-md-left">
                    <div className="d-md-flex justify-content-center gap-1">
                      <Link
                        to={`/dashboard/edit_employee/` + e.id}
                        className="btn btn-info btn-sm"
                      >
                        Editar
                      </Link>
                      <button
                        className="btn btn-warning btn-sm"
                        onClick={() => handleDelete(e.id)}
                      >
                        Borrar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Employee;
