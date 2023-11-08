import { useState } from "react";
import './style.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [values, setValues] = useState({
    email:'',
    password:''
  })
  const [error,setError] = useState(null)
  const navigate = useNavigate()
  axios.defaults.withCredentials = true;
  
  const handleSubmit = (event) => {
    event.preventDefault()
    axios.post('http://localhost:3000/auth/adminlogin', values)
      .then(result => {
        if (result.data.loginStatus) {
          localStorage.setItem("valid", true)
          navigate('/dashboard')
          
        } else {
          setError(result.data.Error)
        }
      })
      .catch(err => console.log(err))
  }

    return (
      <div className="d-flex justify-content-center align-items-center vh-100 loginPage">
        <div className="p-3 rounded border loginForm">
          <div className="text-warning text-center">{error && error}</div>
          <h2 className="text-center">Iniciar Sesión</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email">
                <strong>Email:</strong>
              </label>
              <input
                type="email"
                name="email"
                autoComplete="off"
                placeholder="Ingrese Email"
                onChange={(e) =>
                  setValues({ ...values, email: e.target.value })
                }
                className="form-control rounded-0"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password">
                <strong>Password:</strong>
              </label>
              <input
                type="password"
                name="password"
                placeholder="Ingrese Password"
                onChange={(e) =>
                  setValues({ ...values, password: e.target.value })
                }
                className="form-control rounded-0"
              />
            </div>
            <button className="btn btn-success w-100 mb-2 rounded-0">
              ENTRAR
            </button>
            <div className="mb-1">
              <input type="checkbox" name="tick" id="tick" className="me-2" />
              <label htmlFor="tick">Acepta los términos</label>
            </div>
          </form>
        </div>
      </div>
    );
};

export default Login;
