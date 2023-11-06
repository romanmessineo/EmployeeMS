import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddCompany = () => {
  const [name, setName] = useState("");
  const [cuit, setCuit] = useState("");
  const [address, setAddress] = useState("");
  const [sector, setSector] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Crea un objeto con los valores
    const companyData = {
      name,
      cuit,
      address,
      sector,
    };
    // Realiza la solicitud POST con los datos del objeto
    axios
      .post("http://localhost:3000/auth/add_company", companyData)
      .then((result) => {
        if (result.data.Status) {
          navigate("/dashboard/company");
        } else {
          alert(JSON.stringify(result.data) || "Ocurrió un error desconocido");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="d-flex justify-content-center align-items-center mt-3">
      <div className="p-3 rounded w-50 border">
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
              placeholder="Ingresa un Nombre"
              value={name}
              onChange={(e) => setName(e.target.value)}
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
              placeholder="Ingresa CUIT"
              autoComplete="off"
              value={cuit}
              onChange={(e) => setCuit(e.target.value)}
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
              placeholder="calle 1234"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
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
              placeholder="Ingresa Rubro"
              autoComplete="off"
              value={sector}
              onChange={(e) => setSector(e.target.value)}
            />
          </div>

          <div className="col-12">
            <button type="submit" className="btn btn-primary w-100">
              Añadir Empresa
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCompany;
