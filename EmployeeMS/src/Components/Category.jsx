import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { VITE_URL } from "./config";

const Category = () => {
  const [category, setCategory] = useState([]);
  useEffect(() => {
    axios
      .get(`${VITE_URL}/auth/category`)
      .then((result) => {
        if (result.data.Status) {
          setCategory(result.data.Result);
        } else {
          alert(result.data.Result);
        }
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="container px-3 px-md-5 mt-3 shadow mb-3">
      <div className="col vh-100">
        <div className="d-flex justify-content-between align-items-center">
          <h3>Lista de Categorías</h3>

          <Link to="/dashboard/add_category" className="btn btn-success btn-sm">
            Añadir Categoría
          </Link>
        </div>

        <div className="row mt-3">
          <div className="col">
            <div
              className="categoryTable"
              style={{ overflowY: "auto", maxHeight: "80vh" }}
            >
              <table className="table table-responsive">
                <thead>
                  <tr>
                    <th>Nombre</th>
                  </tr>
                </thead>
                <tbody>
                  {category.map((c) => (
                    <tr key={c.id}>
                      <td>{c.name}</td>
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

export default Category;
