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

  /* const onButtonClick = (fileName) => {
    const pdfUrl = `http://localhost:3000/Recibos/` + fileName;
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = fileName; // Usa el nombre de archivo pasado como argumento
    link.target = "_blank"; // Agregar target="_blank" para que se abra en una nueva ventana o pestaña
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    console.log(fileName);
  }; */
  const onButtonClick = (fileName) => {
    const pdfUrl = `http://localhost:3000/Recibos/` + fileName;

    // Mostrar un diálogo de confirmación
    const userConfirmed = window.confirm("¿Desea descargar este recibo?");

    if (userConfirmed) {
      const link = document.createElement("a");
      link.href = pdfUrl;
      link.download = fileName;
      link.target = "_blank";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      console.log(fileName);
    }
  };


  return (
    <div className="container vh-100 max-width-75 bg-dark pb-3 ">
      <div className="pt-2 text-center text-white">
        <h4>Recibos de sueldo</h4>
      </div>
      <div className="tableReceipts">
        <table className="table table-bordered table-striped table-hover mt-3">
          <thead className="text-center">
            <tr>
              {/* <th>ID</th> */}
              <th>Fecha</th>
              {/* <th>Nom_Archivo</th> */}
              <th>Acción</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {receipts.map((receipt) => (
              <tr key={receipt.id}>
                {/* <td>{receipt.id}</td> */}
                <td>{formatUploadDate(receipt.upload_date)}</td>
                {/* <td>{receipt.file_name}</td> */}
                <td>
                  <Link
                    className="btn btn-primary"
                    onClick={() => onButtonClick(receipt.file_name)}
                  >
                    <i className="bi bi-cloud-download"> Descargar</i>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeReceipts;
