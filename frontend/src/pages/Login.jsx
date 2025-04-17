import { useState } from 'react'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  async function handleLogin(e) {
    e.preventDefault()
    setError('')

    if (!email || !password) {
      setError('Todos los campos son obligatorios')
      return
    }

    const res = await fetch('http://localhost:3001/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })

    const data = await res.json()
    if (res.ok) {
      localStorage.setItem('token', data.token)
      window.location.href = '/formulario'
    } else {
      setError(data.error || 'Error al iniciar sesión')
    }
  }

  return (
    <form onSubmit={handleLogin} className="container">
      <h2>Iniciar Sesión</h2>
      <input className="form-control mb-2" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <input className="form-control mb-2" type="password" placeholder="Contraseña" value={password} onChange={e => setPassword(e.target.value)} />
      <button className="btn btn-primary">Entrar</button>
      {error && <p className="text-danger mt-2">{error}</p>}
    </form>
  )
}
