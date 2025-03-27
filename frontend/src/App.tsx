
import { BrowserRouter, Route, Routes } from 'react-router'
import './App.css'
import LoginPage from './pages/login'
import Dashboard from './pages/dashboard'
import PrivateRoutes from './component/RouteGuard'
import { AuthProvider } from './context/auth.context'
import ProtectedLoginRoute from './component/ProtectedLoginRouteGuard'

function App() {

  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path='/login' element={<ProtectedLoginRoute><LoginPage /></ProtectedLoginRoute>} />

            <Route element={<PrivateRoutes />} >
              <Route path='/dashboard' element={<Dashboard />} />
              <Route path='*' element={<Dashboard />} />
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  )
}

export default App
