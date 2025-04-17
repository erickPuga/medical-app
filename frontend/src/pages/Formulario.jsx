import { useState } from 'react'

export default function Formulario() {
  const [nombre, setNombre] = useState('')
  const [edad, setEdad] = useState('')
  const [sintomas, setSintomas] = useState('')
  const [mensaje, setMensaje] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    setMensaje('')
    if (!nombre || !edad || !sintomas) {
      setMensaje('Todos los campos son obligatorios')
      return
    }

    const token = localStorage.getItem('token')
    const res = await fetch('http://localhost:3001/forms', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify({ data: { nombre, edad, sintomas } }),
    })

    if (res.ok) {
      setMensaje('Formulario enviado correctamente')
    } else {
      setMensaje('Error al enviar formulario')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="container">
      <h2>Formulario Médico</h2>
      <input className="form-control mb-2" placeholder="Nombre" value={nombre} onChange={e => setNombre(e.target.value)} />
      <input className="form-control mb-2" placeholder="Edad" value={edad} onChange={e => setEdad(e.target.value)} />
      <textarea className="form-control mb-2" placeholder="Síntomas" value={sintomas} onChange={e => setSintomas(e.target.value)} />
      <button className="btn btn-primary">Enviar</button>
      {mensaje && <p className="mt-2">{mensaje}</p>}
    </form>
  )
}
