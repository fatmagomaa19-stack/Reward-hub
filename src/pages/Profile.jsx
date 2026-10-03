import { useEffect, useState } from 'react'
import {
  Check,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  Phone,
  RefreshCw,
  Save,
  ShieldCheck,
  UserRound,
} from 'lucide-react'
import { motion } from 'framer-motion'

import {
  api,
  getValue,
} from '../api/api'

import Loading from '../components/Loading'
import ErrorState from '../components/ErrorState'

function Profile({ user }) {
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState('')

  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })

  const [showCurrent, setShowCurrent] = useState(false)
  const [showNew, setShowNew] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const loadProfile = async () => {
    setLoading(true)
    setError(null)
    setSuccess('')

    try {
      const response = await api.profile()

      const data =
        response?.data ??
        response?.result ??
        response

      setProfile(data)
    } catch (err) {
      console.error(
        'PROFILE ERROR:',
        err
      )

      setError(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadProfile()
  }, [])

  const handlePasswordChange = (
    e
  ) => {
    const {
      name,
      value,
    } = e.target

    setPasswords(
      (previous) => ({
        ...previous,
        [name]: value,
      })
    )

    setSuccess('')
  }

  const handleChangePassword = async (
    e
  ) => {
    e.preventDefault()

    setSuccess('')

    if (
      !passwords.currentPassword ||
      !passwords.newPassword ||
      !passwords.confirmPassword
    ) {
      setError(
        new Error(
          'Please fill in all password fields.'
        )
      )

      return
    }

    if (
      passwords.newPassword !==
      passwords.confirmPassword
    ) {
      setError(
        new Error(
          'New password and confirmation do not match.'
        )
      )

      return
    }

    setSaving(true)
    setError(null)

    try {
      await api.changePassword({
        currentPassword:
          passwords.currentPassword,

        newPassword:
          passwords.newPassword,

        confirmPassword:
          passwords.confirmPassword,
      })

      setPasswords({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      })

      setSuccess(
        'Your password has been changed successfully.'
      )
    } catch (err) {
      console.error(
        'CHANGE PASSWORD ERROR:',
        err
      )

      setError(err)
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="page-state">
        <Loading text="Loading profile..." />
      </div>
    )
  }

  if (error && !profile) {
    return (
      <div className="page-state">
        <ErrorState
          error={error}
          onRetry={loadProfile}
        />
      </div>
    )
  }

  const name =
    getValue(
      profile,
      [
        'fullNameEn',
        'fullName',
        'name',
        'displayName',
      ],
      user?.name || 'User'
    )

  const arabicName =
    getValue(
      profile,
      [
        'fullNameAr',
        'nameAr',
      ],
      '—'
    )

  const email =
    getValue(
      profile,
      [
        'email',
        'emailAddress',
      ],
      '—'
    )

  const phone =
    getValue(
      profile,
      [
        'phone',
        'phoneNumber',
        'mobile',
        'mobileNumber',
      ],
      '—'
    )

  const role =
    getValue(
      profile,
      [
        'role',
        'roleName',
      ],
      user?.role || 'User'
    )

  const entityName =
    getValue(
      profile,
      [
        'businessEntityName',
      ],
      user?.businessEntityName ||
        'General'
    )

  const accountId =
    getValue(
      profile,
      [
        'accountId',
        'userId',
        'id',
      ],
      user?.accountId || '—'
    )

  const getInitial = () => {
    const first =
      String(name || 'U')
        .trim()
        .charAt(0)

    return first
      ? first.toUpperCase()
      : 'U'
  }

  return (
    <div className="dashboard-page">
      {/* ================= HEADER ================= */}

      <div className="page-heading">
        <div>
          <span className="page-eyebrow">
            ACCOUNT
          </span>

          <h1>
            My Profile
          </h1>

          <p>
            View your account information
            and manage your security settings.
          </p>
        </div>

        <button
          type="button"
          className="btn btn-light"
          onClick={loadProfile}
        >
          <RefreshCw size={17} />
          Refresh
        </button>
      </div>

      {/* ================= ALERT ================= */}

      {error && profile && (
        <div className="inline-error">
          <ShieldCheck size={18} />
          <span>
            {error.message}
          </span>
        </div>
      )}

      {success && (
        <motion.div
          className="success-message"
          initial={{
            opacity: 0,
            y: -5,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
        >
          <Check size={18} />
          <span>
            {success}
          </span>
        </motion.div>
      )}

      {/* ================= PROFILE ================= */}

      <div className="profile-layout">
        <motion.div
          className="panel profile-card-large"
          initial={{
            opacity: 0,
            y: 10,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
        >
          <div className="profile-cover" />

          <div className="profile-card-body">
            <div className="profile-avatar-xl">
              {getInitial()}
            </div>

            <div className="profile-main-info">
              <h2>
                {name}
              </h2>

              <span className="profile-role-pill">
                {role}
              </span>

              <p>
                {email}
              </p>
            </div>
          </div>

          <div className="profile-info-grid">
            <div className="profile-info-item">
              <div className="profile-info-icon">
                <UserRound size={18} />
              </div>

              <div>
                <span>
                  English Name
                </span>

                <strong>
                  {name}
                </strong>
              </div>
            </div>

            <div className="profile-info-item">
              <div className="profile-info-icon">
                <UserRound size={18} />
              </div>

              <div>
                <span>
                  Arabic Name
                </span>

                <strong>
                  {arabicName}
                </strong>
              </div>
            </div>

            <div className="profile-info-item">
              <div className="profile-info-icon">
                <Mail size={18} />
              </div>

              <div>
                <span>
                  Email Address
                </span>

                <strong>
                  {email}
                </strong>
              </div>
            </div>

            <div className="profile-info-item">
              <div className="profile-info-icon">
                <Phone size={18} />
              </div>

              <div>
                <span>
                  Phone Number
                </span>

                <strong>
                  {phone}
                </strong>
              </div>
            </div>

            <div className="profile-info-item">
              <div className="profile-info-icon">
                <ShieldCheck size={18} />
              </div>

              <div>
                <span>
                  Role
                </span>

                <strong>
                  {role}
                </strong>
              </div>
            </div>

            <div className="profile-info-item">
              <div className="profile-info-icon">
                <ShieldCheck size={18} />
              </div>

              <div>
                <span>
                  Business Entity
                </span>

                <strong>
                  {entityName}
                </strong>
              </div>
            </div>

            <div className="profile-info-item">
              <div className="profile-info-icon">
                <ShieldCheck size={18} />
              </div>

              <div>
                <span>
                  Account ID
                </span>

                <strong>
                  {accountId}
                </strong>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ================= SECURITY ================= */}

        <motion.div
          className="panel security-card"
          initial={{
            opacity: 0,
            y: 10,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.08,
          }}
        >
          <div className="panel-header">
            <div>
              <span className="panel-kicker">
                SECURITY
              </span>

              <h2>
                Change Password
              </h2>
            </div>

            <div className="panel-icon">
              <LockKeyhole size={20} />
            </div>
          </div>

          <p className="security-description">
            Keep your account secure by
            using a strong password that
            you do not reuse elsewhere.
          </p>

          <form
            className="password-form"
            onSubmit={
              handleChangePassword
            }
          >
            <div className="form-group">
              <label htmlFor="currentPassword">
                Current Password
              </label>

              <div className="input-wrapper">
                <LockKeyhole
                  size={18}
                  className="input-icon"
                />

                <input
                  id="currentPassword"
                  name="currentPassword"
                  type={
                    showCurrent
                      ? 'text'
                      : 'password'
                  }
                  value={
                    passwords.currentPassword
                  }
                  onChange={
                    handlePasswordChange
                  }
                  placeholder="Enter current password"
                  disabled={saving}
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() =>
                    setShowCurrent(
                      (previous) =>
                        !previous
                    )
                  }
                  disabled={saving}
                >
                  {showCurrent ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="newPassword">
                New Password
              </label>

              <div className="input-wrapper">
                <LockKeyhole
                  size={18}
                  className="input-icon"
                />

                <input
                  id="newPassword"
                  name="newPassword"
                  type={
                    showNew
                      ? 'text'
                      : 'password'
                  }
                  value={
                    passwords.newPassword
                  }
                  onChange={
                    handlePasswordChange
                  }
                  placeholder="Enter new password"
                  disabled={saving}
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() =>
                    setShowNew(
                      (previous) =>
                        !previous
                    )
                  }
                  disabled={saving}
                >
                  {showNew ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">
                Confirm New Password
              </label>

              <div className="input-wrapper">
                <LockKeyhole
                  size={18}
                  className="input-icon"
                />

                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={
                    showConfirm
                      ? 'text'
                      : 'password'
                  }
                  value={
                    passwords.confirmPassword
                  }
                  onChange={
                    handlePasswordChange
                  }
                  placeholder="Confirm new password"
                  disabled={saving}
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() =>
                    setShowConfirm(
                      (previous) =>
                        !previous
                    )
                  }
                  disabled={saving}
                >
                  {showConfirm ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary save-password-btn"
              disabled={saving}
            >
              {saving ? (
                <>
                  <span className="button-spinner" />
                  Updating...
                </>
              ) : (
                <>
                  <Save size={17} />
                  Update Password
                </>
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  )
}

export default Profile