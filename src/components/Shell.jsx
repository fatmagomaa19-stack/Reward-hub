import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import {
  BarChart3,
  CircleUserRound,
  LayoutDashboard,
  LogOut,
  Menu,
  Settings2,
  Star,
  X,
  ChevronRight,
} from 'lucide-react'
import { motion } from 'framer-motion'

export default function Shell({ user, onLogout, children }) {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  const role = String(user?.role || '').toLowerCase()

  const links = [
    {
      to: '/dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
    },
    {
      to: '/points',
      label: 'Points',
      icon: Star,
    },
    {
      to: '/reports',
      label: 'Reports',
      icon: BarChart3,
    },

    ...(role === 'admin'
      ? [
          {
            to: '/automation',
            label: 'Automation',
            icon: Settings2,
          },
        ]
      : []),

    {
      to: '/profile',
      label: 'Profile',
      icon: CircleUserRound,
    },
  ]

  const logout = () => {
    onLogout()
    navigate('/login', { replace: true })
  }

  const getInitial = () => {
    const name = user?.name || 'User'
    return name.charAt(0).toUpperCase()
  }

  return (
    <div className="app-shell">
      {/* ================= SIDEBAR ================= */}
      <aside className={`sidebar ${open ? 'sidebar-open' : ''}`}>
        {/* Logo */}
        <div className="brand">
          <div className="brand-mark">
            R
          </div>

          <div className="brand-text">
            <strong>Reward Hub</strong>
            <span>El Sewedy</span>
          </div>

          <button
            type="button"
            className="icon-btn mobile-close"
            onClick={() => setOpen(false)}
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="sidebar-nav">
          <div className="nav-caption">
            MAIN MENU
          </div>

          {links.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `nav-link ${isActive ? 'active' : ''}`
              }
            >
              <Icon size={19} strokeWidth={2} />

              <span>{label}</span>

              <ChevronRight
                className="nav-arrow"
                size={15}
              />
            </NavLink>
          ))}
        </nav>

        {/* Bottom user area */}
        <div className="sidebar-bottom">
          <div className="user-mini">
            <div className="avatar">
              {getInitial()}
            </div>

            <div className="user-mini-info">
              <strong>
                {user?.name || 'User'}
              </strong>

              <span>
                {user?.role || 'User'}
              </span>
            </div>
          </div>

          <button
            type="button"
            className="logout-btn"
            onClick={logout}
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Mobile overlay */}
      {open && (
        <button
          type="button"
          className="sidebar-overlay"
          onClick={() => setOpen(false)}
          aria-label="Close menu"
        />
      )}

      {/* ================= MAIN ================= */}
      <main className="main-area">
        {/* Topbar */}
        <header className="topbar">
          <div className="topbar-left">
            <button
              type="button"
              className="icon-btn mobile-menu"
              onClick={() => setOpen(true)}
            >
              <Menu size={22} />
            </button>

            <div className="topbar-title">
              <span>
                Reward Management Platform
              </span>

              <strong>
                {user?.businessEntityName ||
                  'General'}
              </strong>
            </div>
          </div>

          <div className="topbar-user">
            <div className="avatar small">
              {getInitial()}
            </div>

            <div className="topbar-user-text">
              <strong>
                {user?.name || 'User'}
              </strong>

              <span>
                {user?.role || 'User'}
              </span>
            </div>
          </div>
        </header>

        {/* Page */}
        <motion.section
          className="page-content"
          initial={{
            opacity: 0,
            y: 8,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.25,
          }}
        >
          {children}
        </motion.section>
      </main>
    </div>
  )
}