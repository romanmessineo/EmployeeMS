import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";



const EditEmployee = () => {
    const {id} = useParams()
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
      const [category, setCategory] = useState([])
      const navigate = useNavigate()

      useEffect(()=> {
        axios.get('http://localhost:3000/auth/category')
        .then(result => {
            if(result.data.Status) {
                setCategory(result.data.Result);
            } else {
                alert(result.data.Error)
            }
        }).catch(err => console.log(err))

        axios.get('http://localhost:3000/auth/employee/'+id)
        .then(result => {
            setEmployee({
              ...employee,
              name: result.data.Result[0].name,
              last_name: result.data.Result[0].last_name,
              cuil: result.data.Result[0].cuil,
              email: result.data.Result[0].email,
              password: result.data.Result[0].password,

              address: result.data.Result[0].address,
              salary: result.data.Result[0].salary,
              category_id: result.data.Result[0].category_id,
            });
        }).catch(err => console.log(err))
    }, [])
  
  const handleSubmit = (e) => {
        e.preventDefault()
        axios.put('http://localhost:3000/auth/edit_employee/'+id, employee)
        .then(result => {
            if(result.data.Status) {
                navigate('/dashboard/employee')
            } else {
                alert(result.data.Error)
            }
        }).catch(err => console.log(err))
    }

  return (
    <div className="d-flex justify-content-center align-items-center mt-3">
      <div className="p-3 rounded w-50 border">
        <h3 className="text-center">Editar Empleado</h3>
        <form className="row g-1" onSubmit={handleSubmit}>
          <div className="col-12">
            <label htmlFor="imputName" className="form-label">
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

          <div className="col-12">
            <label htmlFor="imputLastName" className="form-label">
              Apellido
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="imputLastName"
              placeholder="Ingresa Apellido"
              value={employee.last_name}
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
              placeholder="Ingresa CUIL"
              value={employee.cuil}
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
              value={employee.email}
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
              id="imputPassword"
              placeholder="Ingresa Password"
              //value={employee.password}
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
              value={employee.salary}
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
              value={employee.address}
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

          <div className="col-12">
            <button type="submit" className="btn btn-primary w-100">
              Editar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditEmployee