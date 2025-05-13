import { useState } from 'react';

export default function CrearDoctor() {
  const [name, setName] = useState(''); // Estado para el nombre del doctor
  const [specialty, setSpecialty] = useState(''); // Estado para la especialidad del doctor

  // Manejar el envío del formulario
  const handleSubmit = e => {
    e.preventDefault(); // Evitar que la página se recargue
    const token = localStorage.getItem('token'); // Obtener el token del almacenamiento local

    // Enviar la solicitud al backend
    fetch('http://localhost:3001/doctors', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token, // Incluir el token en los headers
      },
      body: JSON.stringify({ name, specialty }), // Enviar los datos como JSON
    })
      .then(res => res.json())
      .then(data => {
        alert('Doctor creado exitosamente'); // Mostrar un mensaje de éxito
        setName(''); // Limpiar el campo de nombre
        setSpecialty(''); // Limpiar el campo de especialidad
      })
      .catch(err => console.error(err)); // Manejar errores
  };

  return (
    <div className="container">
      <h2>Crear Doctor</h2>
      <form onSubmit={handleSubmit}>
        {/* Campo para el nombre del doctor */}
        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={e => setName(e.target.value)} // Actualizar el estado del nombre
            required
          />
        </div>

        {/* Campo para la especialidad del doctor */}
        <div className="mb-3">
          <label className="form-label">Especialidad</label>
          <input
            type="text"
            className="form-control"
            value={specialty}
            onChange={e => setSpecialty(e.target.value)} // Actualizar el estado de la especialidad
            required
          />
        </div>

        {/* Botón para enviar el formulario */}
        <button type="submit" className="btn btn-primary">
          Crear Doctor
        </button>
      </form>
    </div>
  );
}
