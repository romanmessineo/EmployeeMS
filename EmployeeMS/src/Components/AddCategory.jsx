import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { VITE_URL } from "./config";

const AddCategory = () => {
  const [category, setCategory] = useState();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const isConfirmed = window.confirm(
      "¿Estás seguro de que deseas añadir la categoría?"
    );
    if (isConfirmed) {
      axios
        .post(`${VITE_URL}/auth/add_category`, { category })
        .then((result) => {
          if (result.data.Status) {
            navigate("/dashboard/category");
          } else {
            alert(result.data.Error);
          }
        })
        .catch((err) => console.log(err));
    } else {
      // El usuario canceló la acción
      // Puedes agregar un mensaje o realizar alguna acción adicional si es necesario
      console.log("El usuario canceló la acción");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center mt-3">
      <div className="p-3 rounded border addCatTable">
        <h3 className="text-center">Añadir Categoria</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="category" className="mb-2">
              <strong>Categoria:</strong>
            </label>
            <input
              type="text"
              name="category"
              placeholder="Ingresa una categoria"
              onChange={(e) => setCategory(e.target.value)}
              required="campo obligatorio"
              className="form-control rounded-0"
            />
          </div>

          <button className="btn btn-success w-100 mb-2 btn-sm">
            Añadir categoria
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCategory;
