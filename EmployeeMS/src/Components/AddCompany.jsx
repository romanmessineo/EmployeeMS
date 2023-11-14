import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { VITE_URL } from "./config";

const AddCompany = () => {
  const [companyData, setCompanyData] = useState();

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${VITE_URL}/auth/add_company`, companyData)
      .then((result) => {
        if (result.data.Status) {
          navigate("/dashboard/company");
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCompanyData({ ...companyData, [name]: value });
  };

  return (
    <div className="d-flex justify-content-center align-items-center mt-3">
      <div className="p-3 rounded border addCompTable">
        <h3 className="text-center">Añadir Empresa</h3>
        <form className="row g-1" onSubmit={handleSubmit}>
          <div className="col-12">
            <label htmlFor="inputName" className="form-label">
              Nombre
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputName"
              name="name"
              placeholder="Ingresa un Nombre"
              onChange={handleInputChange}
              required= "campo obligatorio"
            />
          </div>

          <div className="col-12">
            <label htmlFor="inputCuit" className="form-label">
              CUIT
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputCuit"
              name="cuit"
              placeholder="Ingresa CUIT"
              autoComplete="off"
              onChange={handleInputChange}
              required= "campo obligatorio"
            />
          </div>

          <div className="col-12">
            <label htmlFor="inputAddress" className="form-label">
              Dirección
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputAddress"
              name="address"
              placeholder="calle 1234"
              onChange={handleInputChange}
              required= "campo obligatorio"
            />
          </div>

          <div className="col-12">
            <label htmlFor="inputSector" className="form-label">
              Rubro
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputSector"
              name="sector"
              placeholder="Ingresa Rubro"
              autoComplete="off"
              onChange={handleInputChange}
              required= "campo obligatorio"
            />
          </div>

          <div className="col-12 mt-2">
            <button className="btn btn-primary w-100 btn-sm">
              Añadir Empresa
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCompany;
