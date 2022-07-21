import { Routes, Route, Navigate } from 'react-router-dom'
import { LoaderFrog } from '../components/commons/Loader'
import { useCheckAuth } from '../hooks/useCheckAuth'

import { AuthRoute } from './AuthRoute'
import { EcommerceRoute } from './EcommerceRoute'

export const AppRouter = () => {
  const status = useCheckAuth()

  if (status === 'checking') return <LoaderFrog />
  return (
    <Routes>
      {status === 'authenticated' ? (
        <Route path="/*" element={<EcommerceRoute />} />
      ) : (
        <Route path="/auth/*" element={<AuthRoute />} />
      )}
      <Route path="/*" element={<Navigate to="/auth/login" />} />
    </Routes>
  )
}
