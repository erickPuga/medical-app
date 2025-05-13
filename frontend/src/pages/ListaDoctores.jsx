import { useEffect, useState } from 'react';

export default function ListaDoctores() {
  const [doctores, setDoctores] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch('http://localhost:3001/doctors', {
      headers: { Authorization: 'Bearer ' + token },
    })
      .then(res => res.json())
      .then(data => setDoctores(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="container">
      <h2>Lista de Doctores</h2>
      <ul className="list-group">
        {doctores.map(d => (
          <li className="list-group-item" key={d.id}>
            <strong>{d.name}</strong> - {d.specialty}
          </li>
        ))}
      </ul>
    </div>
  );
}
