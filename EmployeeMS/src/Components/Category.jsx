import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'


const Category = () => {
    const [category, setCategory] = useState([])
    useEffect(() => {
        axios.get('http://localhost:3000/auth/category')
            .then(result => {
                if (result.data.Status) {
                    setCategory(result.data.Result);
                } else {
                    alert(result.data.Result)
                }
        }).catch(err => console.log(err))
    },[])
  return (
      <div className='px-5 mt-3'>
          <div className='d-flex justify-content-center'>
              <h3>Lista de Categorias</h3>
          </div>
          <Link to="/dashboard/add_category" className='btn btn-success'>Añadir categoria</Link>
          <div className='mt-3'>
              <table className='table'>
                  <thead>
                    <tr>
                      <th>Nombre</th>
                    </tr>                      
                  </thead>
                  <tbody>
                      {
                          category.map(c => (
                              <tr key={c.id}>
                                  <td>{c.name}</td>
                              </tr>
                          ))
                      }
                      
                  </tbody>
              </table>
          </div>


    </div>
  )
}

export default Category