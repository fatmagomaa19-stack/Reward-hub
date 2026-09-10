 import { Mail, Lock, Eye, EyeOff } from 'lucide-react'
 import { useState } from 'react'
import './App.css'

function App() {

  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="login-page">

      <div className="login-container">

        {/* Logo */}
        <div className="logo-section">

          <img
            src="/src/assets/logo.png.jpeg"
            alt="Elsewedy Logo"
          />

          <div className="logo-text">
            <h2>Elsewedy</h2>
            <p>Reward System</p>
          </div>

        </div>


        {/* Welcome */}
        <div className="welcome-section">

          <h1>Welcome Back</h1>

          <p>
            Sign in to your account to continue
          </p>

        </div>


        {/* Login Form */}
        <form>

          {/* Email */}
          <label>Email Address</label>

          <div className="input-container">

            <span className="input-icon">✉</span>

            <input
              type="email"
              placeholder="Enter your email"
            />

          </div>


          {/* Password */}
          <label>Password</label>

         <div className="input-container">

  <Lock className="input-icon" size={19} />

  <input
    type={showPassword ? "text" : "password"}
    placeholder="Enter your password"
  />

  <button
    type="button"
    className="eye-button"
    onClick={() => setShowPassword(!showPassword)}
  >
    {showPassword ? (
      <EyeOff size={19} />
    ) : (
      <Eye size={19} />
    )}
  </button>

</div>


          {/* Sign In Button */}
          <button
            type="submit"
            className="signin-button"
          >
            ➜ Sign In
          </button>

        </form>


        {/* Contact Administrator */}
        <p className="contact">

          Don't have an account?

          <strong>
            Contact Administrator
          </strong>

        </p>

      </div>

    </div>
  )
}

export default App