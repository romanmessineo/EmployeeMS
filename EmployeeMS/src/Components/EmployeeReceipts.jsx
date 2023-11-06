import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const EmployeeReceipts = () => {
  const [receipts, setReceipts] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get("http://localhost:3000/employee/detail/" + id + "/receipts")
      .then((result) => {
        setReceipts(result.data);
      })
      .catch((err) => console.log(err));
  }, [id]);

  function formatUploadDate(uploadDate) {
    const date = new Date(uploadDate);
    const options = { year: "numeric", month: "long" };
    return date.toLocaleDateString("es-ES", options);
  }

  const onButtonClick = (fileName) => {
    const pdfUrl = `http://localhost:3000/Recibos/` + fileName;
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = fileName; // Usa el nombre de archivo pasado como argumento
    link.target = "_blank"; // Agregar target="_blank" para que se abra en una nueva ventana o pestaña
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    console.log(fileName);
  };

  return (
    <div className="container max-width-75 bg-dark pb-3 rounded-3">
      <div className="pt-2 d-flex justify-content-center text-white">
        <h4>Recibos de sueldo</h4>
      </div>
      <table className="table table-bordered table-striped table-hover table-responsive justify-content-center flex-column align-items-center mt-3">
        <thead className="text-center">
          <tr>
            <th>ID</th>
            <th>Fecha</th>
            <th>Nom_Archivo</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {receipts.map((receipt) => (
            <tr key={receipt.id}>
              <td>{receipt.id}</td>
              <td>{formatUploadDate(receipt.upload_date)}</td>
              <td>{receipt.file_name}</td>
              <td>
                <Link
                  className="btn btn-primary"
                  onClick={() => onButtonClick(receipt.file_name)}
                >
                  Descargar
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeReceipts;
