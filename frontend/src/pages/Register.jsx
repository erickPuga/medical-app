import { useState } from 'react'

export default function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  async function handleRegister(e) {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (!email || !password) {
      setError('Todos los campos son requeridos')
      return
    }

    const res = await fetch('http://localhost:3001/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })

    const data = await res.json()
    if (res.ok) {
      setSuccess('Registro exitoso. Ya puedes iniciar sesión.')
    } else {
      setError(data.error || 'Error al registrarse')
    }
  }

  return (
    <form onSubmit={handleRegister} className="container">
      <h2>Registro</h2>
      <input className="form-control mb-2" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <input className="form-control mb-2" type="password" placeholder="Contraseña" value={password} onChange={e => setPassword(e.target.value)} />
      <button className="btn btn-primary">Registrarse</button>
      {success && <p className="text-success mt-2">{success}</p>}
      {error && <p className="text-danger mt-2">{error}</p>}
    </form>
  )
}
