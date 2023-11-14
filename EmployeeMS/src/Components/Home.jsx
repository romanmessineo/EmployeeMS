import axios from "axios";
import { useEffect, useState } from "react";
import { VITE_URL } from "./config";

const Home = () => {
  const [adminTotal, setAdminTotal] = useState(0);
  const [employeeTotal, setemployeeTotal] = useState(0);
  const [companyTotal, setcompanyTotal] = useState(0);
  const [salaryTotal, setSalaryTotal] = useState(0);
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    adminCount();
    employeeCount();
    companyCount();
    salaryCount();
    AdminRecords();
  }, []);

  const AdminRecords = () => {
    axios.get(`${VITE_URL}/auth/admin_records`).then((result) => {
      if (result.data.Status) {
        setAdmins(result.data.Result);
      } else {
        alert(result.data.Error);
      }
    });
  };

  const adminCount = () => {
    axios.get(`${VITE_URL}/auth/admin_count`).then((result) => {
      if (result.data.Status) {
        setAdminTotal(result.data.Result[0].admin);
      }
    });
  };

  const companyCount = () => {
    axios.get(`${VITE_URL}/auth/company_count`).then((result) => {
      if (result.data.Status) {
        setcompanyTotal(result.data.Result[0].company);
      }
    });
  };

  const employeeCount = () => {
    axios.get(`${VITE_URL}/auth/employee_count`).then((result) => {
      if (result.data.Status) {
        setemployeeTotal(result.data.Result[0].employee);
      }
    });
  };
  const salaryCount = () => {
    axios.get(`${VITE_URL}/auth/salary_count`).then((result) => {
      if (result.data.Status) {
        setSalaryTotal(result.data.Result[0].salaryOFEmp);
      } else {
        alert(result.data.Error);
      }
    });
  };
  return (
    <div>
      <div className="p-3 d-flex flex-wrap justify-content-around mt-3 gap-1 containerHome">
        <div className="px-3 pt-2 pb-3 border shadow w-100 w-md-25 mb-3 ">
          <div className="text-center pb-1">
            <h4>Administradores</h4>
          </div>
          <hr />
          <div className="d-flex justify-content-between">
            <h5>Total:</h5>
            <h5>{adminTotal}</h5>
          </div>
        </div>
        <div className="px-3 pt-2 pb-3 border shadow w-100 w-md-25 mb-3 ">
          <div className="text-center pb-1">
            <h4>Empresas</h4>
          </div>
          <hr />
          <div className="d-flex justify-content-between">
            <h5>Total:</h5>
            <h5>{companyTotal}</h5>
          </div>
        </div>
        <div className="px-3 pt-2 pb-3 border shadow w-100 w-md-25 mb-3 ">
          <div className="text-center pb-1">
            <h4>Personal</h4>
          </div>
          <hr />
          <div className="d-flex justify-content-between">
            <h5>Total:</h5>
            <h5>{employeeTotal}</h5>
          </div>
        </div>
        <div className="px-3 pt-2 pb-3 border shadow w-100 w-md-25 mb-3 ">
          <div className="text-center pb-1">
            <h4>Salarios</h4>
          </div>
          <hr />
          <div className="d-flex justify-content-between">
            <h5>Total:</h5>
            <h5>${salaryTotal}</h5>
          </div>
        </div>
      </div>
      <div className="mt-4 px-3 pt-3">
        <h3>Lista de Administradores</h3>
        <table className="table">
          <thead>
            <tr>
              <th>Email</th>
              <th className="text-center">Acción</th>
            </tr>
          </thead>
          <tbody>
            {admins.map((a) => (
              <tr key={a.id}>
                <td>{a.email}</td>
                <td className="text-center">
                  <button className="btn btn-info btn-sm me-2">Edit</button>
                  <button className="btn btn-warning btn-sm">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
