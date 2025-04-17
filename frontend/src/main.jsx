import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Formulario from './pages/Formulario'
import ListaFormularios from './pages/ListaFormularios'

function Navbar() {
  return (
    <nav className="p-3 bg-light mb-4">
      <Link to="/" className="me-3">Login</Link>
      <Link to="/register" className="me-3">Registro</Link>
      <Link to="/formulario" className="me-3">Formulario</Link>
      <Link to="/formularios" className="me-3">Mis Formularios</Link>
      <button className="btn btn-sm btn-danger" onClick={() => {
        localStorage.removeItem('token')
        window.location.href = '/'
      }}>Logout</button>
    </nav>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/formulario" element={<Formulario />} />
      <Route path="/formularios" element={<ListaFormularios />} />
    </Routes>
  </BrowserRouter>
)
