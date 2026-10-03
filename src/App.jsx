import { useState } from 'react'
import {
  Navigate,
  Route,
  Routes,
} from 'react-router-dom'

import Shell from './components/Shell'

import Login from './pages/Login'
import StudentDashboard from './pages/StudentDashboard'
import TeacherDashboard from './pages/TeacherDashboard'
import AdminDashboard from './pages/AdminDashboard'
import Points from './pages/Points'
import Reports from './pages/Reports'
import Automation from './pages/Automation'
import Profile from './pages/Profile'


function getStoredUser() {
  const token = localStorage.getItem('jwtToken')
  const role = localStorage.getItem('userRole')

  if (!token || !role) {
    return null
  }

  return {
    token,
    role,

    name:
      localStorage.getItem('userName') ||
      'User',

    accountId:
      Number(
        localStorage.getItem('accountId')
      ) || null,

    businessEntityId:
      Number(
        localStorage.getItem('businessEntityId')
      ) || 1,

    businessEntityName:
      localStorage.getItem(
        'businessEntityName'
      ) || 'General',
  }
}


function ProtectedRoute({
  user,
  children,
}) {
  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
      />
    )
  }

  return children
}


function DashboardByRole({ user }) {
  const role =
    String(user?.role || '')
      .toLowerCase()

  if (role === 'student') {
    return (
      <StudentDashboard
        user={user}
      />
    )
  }

  if (role === 'teacher') {
    return (
      <TeacherDashboard
        user={user}
      />
    )
  }

  if (role === 'admin') {
    return (
      <AdminDashboard
        user={user}
      />
    )
  }

  // لو الـ API رجع Role مختلف
  return (
    <TeacherDashboard
      user={user}
    />
  )
}


export default function App() {
  const [
    user,
    setUser,
  ] = useState(getStoredUser)


  function logout() {
    localStorage.removeItem('jwtToken')
    localStorage.removeItem('userRole')
    localStorage.removeItem('userName')
    localStorage.removeItem('accountId')
    localStorage.removeItem('businessEntityId')
    localStorage.removeItem(
      'businessEntityName'
    )

    setUser(null)
  }


  return (
    <Routes>

      {/* LOGIN */}

      <Route
        path="/login"
        element={
          user ? (
            <Navigate
              to="/dashboard"
              replace
            />
          ) : (
            <Login
              setUser={setUser}
            />
          )
        }
      />


      {/* PROTECTED SYSTEM */}

      <Route
        path="/*"
        element={
          <ProtectedRoute user={user}>

            <Shell
              user={user}
              onLogout={logout}
            >

              <Routes>

                <Route
                  path="/dashboard"
                  element={
                    <DashboardByRole
                      user={user}
                    />
                  }
                />

                <Route
                  path="/points"
                  element={
                    <Points
                      user={user}
                    />
                  }
                />

                <Route
                  path="/reports"
                  element={
                    <Reports
                      user={user}
                    />
                  }
                />

                <Route
                  path="/profile"
                  element={
                    <Profile
                      user={user}
                    />
                  }
                />

                <Route
                  path="/automation"
                  element={
                    user?.role
                      ?.toLowerCase() ===
                    'admin' ? (
                      <Automation />
                    ) : (
                      <Navigate
                        to="/dashboard"
                        replace
                      />
                    )
                  }
                />

                <Route
                  path="*"
                  element={
                    <Navigate
                      to="/dashboard"
                      replace
                    />
                  }
                />

              </Routes>

            </Shell>

          </ProtectedRoute>
        }
      />

    </Routes>
  )
}