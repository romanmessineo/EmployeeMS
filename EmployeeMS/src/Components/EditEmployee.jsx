import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditEmployee = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState({
    name: "",
    last_name: "",
    cuil: "",
    email: "",
    password: "",

    salary: "",
    address: "",
    category_id: "",
  });

  

  const [category, setCategory] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3000/auth/category")
      .then((result) => {
        if (result.data.Status) {
          setCategory(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));

    axios
      .get("http://localhost:3000/auth/employee/" + id)
      .then((result) => {
        const employeeData = result.data.Result[0];

        setEmployee({
          name: employeeData.name,
          last_name: employeeData.last_name,
          cuil: employeeData.cuil,
          email: employeeData.email,
          password: employeeData.password,
          address: employeeData.address,
          salary: employeeData.salary,
          category_id: employeeData.category_id,
          image: employeeData.image, // Incluir la propiedad image
        });
      })
      .catch((err) => console.log(err));
  }, []);


  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put("http://localhost:3000/auth/edit_employee/" + id, employee)
      .then((result) => {
        if (result.data.Status) {
          navigate("/dashboard/employee");
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="d-flex justify-content-center align-items-center mt-3">
      <div className="p-3 rounded w-100 border shadow formEditEmployee">
        <div style={{ display: "flex", alignItems: "center" }}>
          <div className="flex-grow-1">
            <h3>Editar Empleado</h3>
            {/* Contenido que no debe alinearse a la derecha */}
          </div>
          {employee.image && (
            <img
              src={`http://localhost:3000/Images/` + employee.image}
              alt="Employee Image"
              className="img-thumbnail rounded-circle"
              style={{ width: "100px", height: "100px" }}
            />
          )}
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="inputName" className="form-label">
              Nombre
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputName"
              placeholder="Ingresa un Nombre"
              value={employee.name}
              onChange={(e) =>
                setEmployee({ ...employee, name: e.target.value })
              }
            />
          </div>

          <div className="mb-3">
            <label htmlFor="inputLastName" className="form-label">
              Apellido
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputLastName"
              placeholder="Ingresa Apellido"
              value={employee.last_name}
              onChange={(e) =>
                setEmployee({ ...employee, last_name: e.target.value })
              }
            />
          </div>

          <div className="mb-3">
            <label htmlFor="inputCuil" className="form-label">
              CUIL
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputCuil"
              placeholder="Ingresa CUIL"
              value={employee.cuil}
              onChange={(e) =>
                setEmployee({ ...employee, cuil: e.target.value })
              }
            />
          </div>

          <div className="mb-3">
            <label htmlFor="inputEmail" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control rounded-0"
              id="inputEmail"
              placeholder="Ingresa Email"
              autoComplete="off"
              value={employee.email}
              onChange={(e) =>
                setEmployee({ ...employee, email: e.target.value })
              }
            />
          </div>

          <div className="mb-3">
            <label htmlFor="inputPassword" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control rounded-0"
              id="inputPassword"
              placeholder="Ingresa Password"
              /* value={employee.password} */
              onChange={(e) =>
                setEmployee({ ...employee, password: e.target.value })
              }
            />
          </div>

          <div className="mb-3">
            <label htmlFor="inputSalary" className="form-label">
              Salario
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputSalary"
              placeholder="Ingresa Salario"
              autoComplete="off"
              value={employee.salary}
              onChange={(e) =>
                setEmployee({ ...employee, salary: e.target.value })
              }
            />
          </div>

          <div className="mb-3">
            <label htmlFor="inputAddress" className="form-label">
              Dirección
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputAddress"
              placeholder="calle 1234"
              autoComplete="off"
              value={employee.address}
              onChange={(e) =>
                setEmployee({ ...employee, address: e.target.value })
              }
            />
          </div>

          <div className="mb-3">
            <label htmlFor="category" className="form-label">
              Categoría
            </label>
            <select
              name="category"
              id="category"
              className="form-select"
              value={employee.category_id}
              onChange={(e) =>
                setEmployee({ ...employee, category_id: e.target.value })
              }
            >
              {category.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <button type="submit" className="btn btn-primary w-100">
              EDITAR
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditEmployee;
