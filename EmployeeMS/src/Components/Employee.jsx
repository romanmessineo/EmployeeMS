import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { VITE_URL } from "./config";

const Employee = () => {
  const [employee, setEmployee] = useState([]);
  const [search, setSearch] = useState("");
  
  useEffect(() => {
    axios
      .get(`${VITE_URL}/auth/employee`)
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
   // Mostrar ventana de confirmación
   const isConfirmed = window.confirm(
     "¿Estás seguro de que quieres eliminar este empleado?"
   );

   // Verificar la respuesta del usuario
   if (isConfirmed) {
     axios.delete(`${VITE_URL}/auth/delete_employee/` + id).then((result) => {
       if (result.data.Status) {
         // Actualizar el estado local de los empleados excluyendo el empleado eliminado
         setEmployee((prevEmployees) =>
           prevEmployees.filter((employee) => employee.id !== id)
         );
       } else {
         alert(result.data.Error);
       }
     });
   } else {
     // El usuario canceló la acción
     // Puedes agregar un mensaje o realizar alguna acción adicional si es necesario
     console.log("El usuario canceló la acción de eliminar el empleado");
   }
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
          .post(`${VITE_URL}/auth/upload_receipt/${id}`, formData, {
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

  const filteredEmployees = employee.filter((e) => {
    const fullName = `${e.name} ${e.last_name} ${e.category_name}`;
    return fullName.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div className="container px-3 px-md-5 mt-3 shadow">
      <div className="col vh-100">
        <div className="d-flex justify-content-between align-items-center">
          <h3>Lista de Personal</h3>
          <Link to="/dashboard/add_employee" className="btn btn-success btn-sm">
            Añadir Personal
          </Link>
        </div>

        <div className="row mt-3">
          <div className="col">
            <div className="mb-3">
              <input
                type="text"
                placeholder="Buscar por nombre"
                className="form-control shadow"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div
              className="emplTable"
              style={{ overflowY: "auto", maxHeight: "80vh" }}
            >
              <table className="table table-striped table-bordered table-hover table-sm table-primary shadow">
                <thead className="text-center table-light sticky-thead">
                  <tr className="align-middle">
                    <th>Foto</th>
                    <th>Nombre</th>
                    <th>Empresa</th>
                    <th>Categoria</th>
                    <th>Cuil</th>
                    <th>Dirección</th>
                    <th>Email</th>
                    <th>Salario</th>
                    <th>Subir Rec</th>
                    <th>Acción</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredEmployees.map((e) => (
                    <tr key={e.id} className="text-center">
                      <td className="align-middle">
                        <img
                          src={`${VITE_URL}/Images/` + e.image}
                          alt={e.name}
                          className="employee_image img-fluid"
                          loading="lazy"
                        />
                      </td>
                      <td className="align-middle">
                        {e.name} {e.last_name}
                      </td>

                      <td className="align-middle">{e.company_name}</td>
                      <td className="align-middle">{e.category_name}</td>
                      <td className="align-middle">{e.cuil}</td>
                      <td className="align-middle">{e.address}</td>
                      <td className="align-middle">{e.email}</td>
                      <td className="align-middle">${e.salary}</td>
                      <td className="align-middle">
                        <button
                          className="btn btn-success btn-sm me-2 shadow"
                          onClick={() => handleUploadReceipt(e.id)}
                        >
                          <i className="fs-4 bi bi-cloud-arrow-up"></i>
                        </button>
                      </td>
                      <td className="align-middle text-md-left">
                        <div className="d-md-flex justify-content-center gap-1">
                          <Link
                            to={`/dashboard/edit_employee/` + e.id}
                            className="btn btn-primary btn-sm shadow btn-sm"
                          >
                            <i className="fs-4 bi bi-pencil"></i>
                          </Link>
                          <button
                            className="btn btn-danger btn-sm shadow"
                            onClick={() => handleDelete(e.id)}
                          >
                            <i className="fs-4 bi bi-trash"></i>
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
    </div>
  );
};

export default Employee;
