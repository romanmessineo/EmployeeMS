import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Company = () => {
  const [company, setCompany] = useState([]);

  useEffect(() => {
    axios
      .get("https://employeems-server-production.up.railway.app/auth/company")
      .then((result) => {
        console.log(result); // Agrega esto para ver la respuesta en la consola
        if (result.data.Status) {
          setCompany(result.data.Result);
        } else {
          alert(result.data.Error); // Cambia a Error en lugar de Result
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="container px-3 px-md-5 mt-3 shadow mb-3">
      <div className="col vh-100">
        <div className="d-flex justify-content-between align-items-center">
          <h3>Lista de Empresas</h3>

          <Link to="/dashboard/add_company" className="btn btn-success btn-sm">
            Añadir Empresa
          </Link>
        </div>

        <div className="row mt-3">
          <div className="col">
            <div
              className="companyTable"
              style={{ overflowY: "auto", maxHeight: "80vh" }}
            >
              <table className="table table-responsive">
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>CUIT</th>
                    <th>Dirección</th>
                    <th>Rubro</th>
                    <th>Acción</th>
                  </tr>
                </thead>
                <tbody>
                  {company.map((c) => (
                    <tr key={c.id}>
                      <td>{c.name}</td>
                      <td>{c.cuit}</td>
                      <td>{c.address}</td>
                      <td>{c.sector}</td>

                      <td>
                        <Link
                          to=""
                          className="btn btn-info btn-sm me-2"
                          onClick={() => alert("no disponible")}
                        >
                          Editar
                        </Link>
                        <button
                          className="btn btn-warning btn-sm"
                          onClick={() => alert("no disponible")}
                        >
                          Borrar
                        </button>
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

export default Company;
