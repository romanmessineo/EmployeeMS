import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AddEmployee = () => {
  const [employee, setEmployee] = useState({
    name: "",
    last_name: "",
    cuil:"",
    email: "",
    password: "",
    salary: "",
    address: "",
    category_id: "",
    image: "",
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
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", employee.name);
    formData.append("last_name", employee.last_name);
    formData.append("cuil", employee.cuil);
    formData.append("email", employee.email);
    formData.append("password", employee.password);
    formData.append("salary", employee.salary);
    formData.append("address", employee.address);
    formData.append("category_id", employee.category_id);
    formData.append("image", employee.image);

    axios
      .post("http://localhost:3000/auth/add_employee", formData)
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
      <div className="p-3 rounded w-50 border">
        <h3 className="text-center">Añadir Empleado</h3>
        <form className="row g-1" onSubmit={handleSubmit}>
          <div className="col-12">
            <label htmlFor="imputName" className="form-label">
              Nombre
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputName"
              placeholder="Ingresa Nombre"
              onChange={(e) =>
                setEmployee({ ...employee, name: e.target.value })
              }
            />
          </div>

          <div className="col-12">
            <label htmlFor="imputLastName" className="form-label">
              Apellido
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="imputLastName"
              placeholder="Ingresa Apellido"
              onChange={(e) =>
                setEmployee({ ...employee, last_name: e.target.value })
              }
            />
          </div>

          <div className="col-12">
            <label htmlFor="imputCuil" className="form-label">
              CUIL
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="imputCuil"
              placeholder="Numero de CUIL"
              onChange={(e) =>
                setEmployee({ ...employee, cuil: e.target.value })
              }
            />
          </div>

          <div className="col-12">
            <label htmlFor="imputEmail" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control rounded-0"
              id="inputEmail"
              placeholder="Ingresa Email"
              autoComplete="off"
              onChange={(e) =>
                setEmployee({ ...employee, email: e.target.value })
              }
            />
          </div>

          <div className="col-12">
            <label htmlFor="imputPassword" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control rounded-0"
              id="inputPassword"
              placeholder="Ingresa Password"
              onChange={(e) =>
                setEmployee({ ...employee, password: e.target.value })
              }
            />
          </div>

          <div className="col-12">
            <label htmlFor="imputSalary" className="form-label">
              Salario
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputSalary"
              placeholder="Ingresa Salario"
              autoComplete="off"
              onChange={(e) =>
                setEmployee({ ...employee, salary: e.target.value })
              }
            />
          </div>

          <div className="col-12">
            <label htmlFor="imputAddress" className="form-label">
              Dirección
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputAddress"
              placeholder="calle 1234"
              autoComplete="off"
              onChange={(e) =>
                setEmployee({ ...employee, address: e.target.value })
              }
            />
          </div>

          <div className="col-12">
            <label htmlFor="category" className="form-label">
              Categoria
            </label>

            <select
              name="category"
              id="category"
              className="form-select"
              onChange={(e) =>
                setEmployee({ ...employee, category_id: e.target.value })
              }
            >
              {category.map((c) => {
                return (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="col-12 mb-3">
            <label className="form-label" htmlFor="imputGroupFile01">
              Seleciona Imagen
            </label>
            <input
              type="file"
              className="form-control rounded-0"
              id="imputGroupFile01"
              name="image"
              onChange={(e) =>
                setEmployee({ ...employee, image: e.target.files[0] })
              }
            />
          </div>

          <div className="col-12">
            <button type="submit" className="btn btn-primary w-100">
              Añadir Empleado
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEmployee;
