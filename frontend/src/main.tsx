import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthStore } from './store/useAuthStore'
import './index.css'

// Componente temporário de Login
const Login = () => {
  const { login, isLoading } = useAuthStore()
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await login({ email, password })
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h1>HelpDeskFlow - Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ display: 'block', margin: '1rem 0', padding: '0.5rem', width: '300px' }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ display: 'block', margin: '1rem 0', padding: '0.5rem', width: '300px' }}
        />
        <button type="submit" disabled={isLoading} style={{ padding: '0.5rem 1rem' }}>
          {isLoading ? 'Loading...' : 'Login'}
        </button>
      </form>
    </div>
  )
}

// Componente temporário de Dashboard
const Dashboard = () => {
  const { user, logout } = useAuthStore()

  return (
    <div style={{ padding: '2rem' }}>
      <h1>HelpDeskFlow Dashboard</h1>
      <p>Bem-vindo, {user?.name}!</p>
      <button onClick={logout} style={{ padding: '0.5rem 1rem', marginTop: '1rem' }}>
        Logout
      </button>
    </div>
  )
}

// Componente de rota protegida
const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { token } = useAuthStore()
  return token ? <>{children}</> : <Navigate to="/login" replace />
}

// App principal
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
