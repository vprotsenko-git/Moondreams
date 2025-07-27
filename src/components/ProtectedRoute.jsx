import { Navigate } from 'react-router-dom'

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem('moondreams_token')
  return token ? children : <Navigate to="/login" />
}