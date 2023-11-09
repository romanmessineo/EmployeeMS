import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddCategory = () => {
  const [category, setCategory] = useState();
  const navigate = useNavigate();

  
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/auth/add_category", { category })
      .then((result) => {
        if (result.data.Status) {
          navigate("/dashboard/category");
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
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
