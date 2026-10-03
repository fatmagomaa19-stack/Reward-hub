import {
  ArrowRight,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  ShieldCheck,
  AlertCircle,
} from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../api/api'

function Login({ setUser }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()

    setError('')

    if (!email.trim() || !password) {
      setError('Please enter your email and password.')
      return
    }

    setLoading(true)

    try {
      const result = await api.login(
        email.trim(),
        password,
        1
      )

      console.log(
        'LOGIN RESPONSE:',
        JSON.stringify(result, null, 2)
      )

      /*
        The API may return the user directly
        or inside data/result.
      */
      const userData =
        result?.data ??
        result?.result ??
        result

      const token =
        userData?.jwtToken ||
        userData?.token ||
        userData?.accessToken

      if (!token) {
        throw new Error(
          userData?.message ||
            'Login failed. No authentication token was returned.'
        )
      }

      const role =
        userData?.role ||
        userData?.roles?.[0] ||
        'User'

      const name =
        userData?.fullNameEn ||
        userData?.fullName ||
        userData?.name ||
        email.split('@')[0]

      const accountId =
        userData?.accountId ??
        userData?.userId ??
        userData?.id ??
        null

      const businessEntityId =
        userData?.businessEntityId ??
        1

      const businessEntityName =
        userData?.businessEntityName ||
        'General'

      /*
        Save authentication information
        so the user stays logged in after refresh.
      */
      localStorage.setItem(
        'jwtToken',
        token
      )

      localStorage.setItem(
        'userRole',
        role
      )

      localStorage.setItem(
        'userName',
        name
      )

      if (accountId !== null) {
        localStorage.setItem(
          'accountId',
          String(accountId)
        )
      }

      localStorage.setItem(
        'businessEntityId',
        String(businessEntityId)
      )

      localStorage.setItem(
        'businessEntityName',
        businessEntityName
      )

      /*
        Update React state.
      */
      setUser({
        token,
        role,
        name,
        accountId,
        businessEntityId,
        businessEntityName,
      })

      /*
        Go to the dashboard after successful login.
      */
      navigate('/dashboard', {
        replace: true,
      })
    } catch (err) {
      console.error(
        'LOGIN ERROR:',
        err
      )

      setError(
        err?.message ||
          'Unable to login. Please check your credentials and try again.'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-page">
      {/* ================= LEFT SIDE ================= */}
      <div className="login-brand-panel">
        <div className="login-brand-content">
          <div className="login-logo">
            R
          </div>

          <h1>
            Reward Hub
          </h1>

          <p>
            Empowering students through
            recognition and rewards.
          </p>

          <div className="login-feature-list">
            <div className="login-feature">
              <ShieldCheck size={20} />
              <span>
                Secure account access
              </span>
            </div>

            <div className="login-feature">
              <ShieldCheck size={20} />
              <span>
                Real-time points tracking
              </span>
            </div>

            <div className="login-feature">
              <ShieldCheck size={20} />
              <span>
                Smart reward management
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ================= RIGHT SIDE ================= */}
      <div className="login-form-panel">
        <div className="login-card">
          <div className="login-mobile-logo">
            <div className="login-logo">
              R
            </div>
          </div>

          <div className="login-heading">
            <span className="login-eyebrow">
              WELCOME BACK
            </span>

            <h2>
              Sign in to Reward Hub
            </h2>

            <p>
              Enter your credentials to
              access your account.
            </p>
          </div>

          {error && (
            <div className="login-error">
              <AlertCircle size={19} />

              <span>
                {error}
              </span>
            </div>
          )}

          <form
            className="login-form"
            onSubmit={handleLogin}
          >
            {/* Email */}
            <div className="form-group">
              <label htmlFor="email">
                Email Address
              </label>

              <div className="input-wrapper">
                <Mail
                  size={19}
                  className="input-icon"
                />

                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) =>
                    setEmail(
                      e.target.value
                    )
                  }
                  placeholder="Enter your email"
                  autoComplete="email"
                  disabled={loading}
                />
              </div>
            </div>

            {/* Password */}
            <div className="form-group">
              <div className="form-label-row">
                <label htmlFor="password">
                  Password
                </label>
              </div>

              <div className="input-wrapper">
                <LockKeyhole
                  size={19}
                  className="input-icon"
                />

                <input
                  id="password"
                  type={
                    showPassword
                      ? 'text'
                      : 'password'
                  }
                  value={password}
                  onChange={(e) =>
                    setPassword(
                      e.target.value
                    )
                  }
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  disabled={loading}
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() =>
                    setShowPassword(
                      (previous) =>
                        !previous
                    )
                  }
                  disabled={loading}
                  aria-label={
                    showPassword
                      ? 'Hide password'
                      : 'Show password'
                  }
                >
                  {showPassword ? (
                    <EyeOff size={19} />
                  ) : (
                    <Eye size={19} />
                  )}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="login-submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="button-spinner" />
                  Signing in...
                </>
              ) : (
                <>
                  Sign In
                  <ArrowRight size={19} />
                </>
              )}
            </button>
          </form>

          <div className="login-footer">
            <span>
              Reward Hub
            </span>

            <span className="login-dot">
              •
            </span>

            <span>
              El Sewedy
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login