
import {  HashRouter, Navigate, Route, Routes } from 'react-router'
import './App.css'
import LoginPage from './pages/login'
import Dashboard from './pages/dashboard'
import PrivateRoutes from './guards/RouteGuard'
import { AuthProvider } from './context/auth.context'
import ProtectedLoginRoute from './guards/ProtectedLoginRouteGuard'
import UsersList from './components/UsersList'
import QuizComponent from './components/QuizComponent'
import { Toaster } from 'react-hot-toast'
import SubjectList from './components/SubjectsList'
import DocumentsListWrapper from './components/DocumentsListWrapper'

function App() {

  return (
    <>
      <HashRouter>
        <AuthProvider>
          <Routes>
            <Route path='/login' element={<ProtectedLoginRoute><LoginPage /></ProtectedLoginRoute>} />

            <Route element={<PrivateRoutes />} >
              <Route path='/' element={<Dashboard />}>
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route path='/dashboard' element={<DocumentsListWrapper />} />
                <Route path='/users' element={<UsersList />} />
                <Route path='/subjects' element={<SubjectList />} />

                <Route path='/quiz' element={<QuizComponent />} />
              </Route>
            </Route>

            <Route path='*' element={<><div className='text-center'>Page doesnot exist!</div></>} />

          </Routes>
        </AuthProvider>
      </HashRouter>
      <Toaster />
    </>
  )
}

export default App
