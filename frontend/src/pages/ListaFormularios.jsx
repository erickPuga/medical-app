import { useEffect, useState } from 'react'

export default function ListaFormularios() {
  const [formularios, setFormularios] = useState([])

  useEffect(() => {
    const token = localStorage.getItem('token')
    fetch('http://localhost:3001/forms', {
      headers: { Authorization: 'Bearer ' + token },
    })
      .then(res => res.json())
      .then(data => setFormularios(data))
  }, [])

  return (
    <div className="container">
      <h2>Formularios enviados</h2>
      <ul className="list-group">
        {formularios.map(f => (
          <li className="list-group-item" key={f.id}>
            <strong>{f.data.nombre}</strong> ({f.data.edad} años): {f.data.sintomas}
          </li>
        ))}
      </ul>
    </div>
  )
}
