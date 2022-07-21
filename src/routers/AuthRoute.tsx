import { Routes, Route, Navigate } from 'react-router-dom'
import { Login } from '../components/Auth/Login'
import { Register } from '../components/Auth/Register'
export const AuthRoute = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/*" element={<Navigate to="/auth/login" />} />
    </Routes>
  )
}
