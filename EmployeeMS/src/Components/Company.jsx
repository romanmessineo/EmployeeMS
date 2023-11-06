import axios from "axios";
import { useEffect, useState } from "react";
import { Link} from "react-router-dom";

const Company = () => {
    const [company, setCompany] = useState([]);

   useEffect(() => {
     axios
       .get("http://localhost:3000/auth/company")
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
      <div className="px-5 mt-3 shadow">
        <div className="d-flex justify-content-center">
          <h3>Lista de Empresas</h3>
        </div>
        <Link to="/dashboard/add_company" className="btn btn-success">
          Añadir Empresa
        </Link>
        <div className="mt-3 d-flex">
          <table className="table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>CUIT</th>
                <th>Dirección</th>
                <th>Rubro</th>
                <th>Accíon</th>
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
                    <Link to="" className="btn btn-info btn-sm me-2">
                      Editar
                    </Link>
                    <button
                      className="btn btn-warning btn-sm"
                      /* onClick={() => handleDelete(c.id)} */
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
    );
};

export default Company;
