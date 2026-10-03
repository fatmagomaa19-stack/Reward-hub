
import { useEffect, useState } from 'react'
import {
  Award,
  Clock3,
  Mail,
  Trophy,
  UserRound,
  PlusCircle,
  MinusCircle,
} from 'lucide-react'

import { api, getArray, getNumber, getValue, unwrap } from '../api/api'
import Loading from '../components/Loading'
import ErrorState from '../components/ErrorState'
import StatCard from '../components/StatCard'
import Table from '../components/Table'

export default function StudentDashboard({ user }) {
  const [student, setStudent] = useState(null)
  const [points, setPoints] = useState(null)
  const [history, setHistory] = useState([])
  const [rank, setRank] = useState(null)

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const loadDashboard = async () => {
    setLoading(true)
    setError(null)

    try {
      const studentId = user?.accountId

      if (!studentId) {
        throw new Error('Student account ID is not available.')
      }

      const [
        studentResponse,
        pointsResponse,
        historyResponse,
        rankResponse,
      ] = await Promise.all([
        api.student(studentId),
        api.studentPoints(studentId),
        api.studentHistory(studentId),
        api.studentRank(studentId),
      ])

      setStudent(unwrap(studentResponse))
      setPoints(unwrap(pointsResponse))
      setHistory(getArray(historyResponse))
      setRank(unwrap(rankResponse))
    } catch (err) {
      console.error('STUDENT DASHBOARD ERROR:', err)
      setError(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadDashboard()
  }, [user?.accountId])

  if (loading) {
    return <Loading text="Loading your dashboard..." />
  }

  if (error) {
    return <ErrorState error={error} onRetry={loadDashboard} />
  }

  const currentPoints = getNumber(points, [
    'currentPoints',
    'points',
    'totalPoints',
    'balance',
  ])

  const addedPoints = getNumber(points, [
    'pointsAdded',
    'addedPoints',
    'totalAdded',
  ])

  const deductedPoints = getNumber(points, [
    'pointsDeducted',
    'deductedPoints',
    'totalDeducted',
  ])

  const currentRank = getValue(
    rank,
    ['rank', 'currentRank', 'position'],
    '—'
  )

  const studentName = getValue(
    student,
    ['fullNameEn', 'fullName', 'name'],
    user?.name || 'Student'
  )

  const email = getValue(
    student,
    ['email', 'emailAddress'],
    '—'
  )

  const grade = getValue(
    student,
    ['gradeName', 'grade', 'gradeLevel'],
    '—'
  )

  const className = getValue(
    student,
    ['className', 'class', 'classRoomName'],
    '—'
  )

  const rows = history.slice(0, 8)

  return (
    <div className="dashboard-page">

      {/* PAGE HEADER */}
      <div className="page-heading">
        <div>
          <span className="page-eyebrow">STUDENT DASHBOARD</span>

          <h1>
            Welcome back, {studentName}
          </h1>

          <p>
            Track your points, achievements, and recent activity.
          </p>
        </div>
      </div>

      {/* STAT CARDS */}
      <div className="stats-grid">

        <StatCard
          icon={<Award size={22} />}
          label="Current Points"
          value={currentPoints}
          helper="Available points"
          accent="red"
        />

        <StatCard
          icon={<PlusCircle size={22} />}
          label="Points Added"
          value={addedPoints}
          helper="Total earned"
          accent="green"
        />

        <StatCard
          icon={<MinusCircle size={22} />}
          label="Points Deducted"
          value={deductedPoints}
          helper="Total deducted"
          accent="orange"
        />

        <StatCard
          icon={<Trophy size={22} />}
          label="Current Rank"
          value={`#${currentRank}`}
          helper="Your position"
          accent="purple"
        />

      </div>

      {/* MAIN DASHBOARD GRID */}
      <div className="dashboard-grid">

        {/* PROFILE */}
        <section className="panel profile-panel">

          <div className="panel-header">
            <div>
              <span className="panel-kicker">PROFILE</span>
              <h2>Student Information</h2>
            </div>

            <div className="panel-icon">
              <UserRound size={20} />
            </div>
          </div>

          <div className="profile-main">

            <div className="large-avatar">
              {studentName.charAt(0).toUpperCase()}
            </div>

            <div className="profile-main-info">
              <h3>{studentName}</h3>

              <div className="profile-role">
                {user?.role || 'Student'}
              </div>

              <div className="profile-details">

                <div className="profile-detail">
                  <UserRound size={17} />

                  <div>
                    <span>Full Name</span>
                    <strong>{studentName}</strong>
                  </div>
                </div>

                <div className="profile-detail">
                  <Mail size={17} />

                  <div>
                    <span>Email</span>
                    <strong>{email}</strong>
                  </div>
                </div>

                <div className="profile-detail">
                  <Award size={17} />

                  <div>
                    <span>Grade</span>
                    <strong>{grade}</strong>
                  </div>
                </div>

                <div className="profile-detail">
                  <Trophy size={17} />

                  <div>
                    <span>Class</span>
                    <strong>{className}</strong>
                  </div>
                </div>

              </div>
            </div>

          </div>

        </section>

        {/* RANK */}
        <section className="panel">

          <div className="panel-header">
            <div>
              <span className="panel-kicker">RANKING</span>
              <h2>Your Rank</h2>
            </div>

            <div className="panel-icon">
              <Trophy size={20} />
            </div>
          </div>

          <div className="rank-highlight">

            <div className="rank-highlight-icon">
              <Trophy size={30} />
            </div>

            <div>
              <strong>#{currentRank}</strong>
              <span>Current position</span>
            </div>

          </div>

        </section>

      </div>

      {/* POINTS OVERVIEW */}
      <section className="panel points-overview-panel">

        <div className="panel-header">

          <div>
            <span className="panel-kicker">POINTS OVERVIEW</span>
            <h2>Your Points</h2>
          </div>

          <div className="panel-icon">
            <Award size={20} />
          </div>

        </div>

        <div className="points-overview-content">

          <div className="points-big">
            <span>Total Points</span>
            <strong>{currentPoints}</strong>
            <small>Available balance</small>
          </div>

          <div className="points-breakdown">

            <div className="breakdown-item">

              <div className="breakdown-icon positive">
                <PlusCircle size={20} />
              </div>

              <div>
                <span>Points Added</span>
                <strong>+{addedPoints}</strong>
              </div>

            </div>

            <div className="breakdown-item">

              <div className="breakdown-icon negative">
                <MinusCircle size={20} />
              </div>

              <div>
                <span>Points Deducted</span>
                <strong>-{deductedPoints}</strong>
              </div>

            </div>

          </div>

        </div>

      </section>

      {/* HISTORY */}
      <section className="panel history-panel">

        <div className="panel-header">

          <div>
            <span className="panel-kicker">RECENT ACTIVITY</span>
            <h2>Points History</h2>
          </div>

          <div className="history-icon">
            <Clock3 size={20} />
          </div>

        </div>

        <Table
          columns={[
            {
              key: 'date',
              label: 'Date',
              render: (row) => {
                const value = getValue(
                  row,
                  [
                    'date',
                    'createdAt',
                    'transactionDate',
                  ],
                  '—'
                )

                if (value === '—') return value

                try {
                  return new Date(value).toLocaleDateString()
                } catch {
                  return value
                }
              },
            },

            {
              key: 'reason',
              label: 'Reason',
              render: (row) =>
                getValue(
                  row,
                  [
                    'reason',
                    'description',
                    'activity',
                    'name',
                  ],
                  '—'
                ),
            },

            {
              key: 'points',
              label: 'Points',
              render: (row) => {

                const value = getNumber(
                  row,
                  [
                    'points',
                    'pointValue',
                    'amount',
                  ]
                )

                return (
                  <span
                    className={`points-value ${
                      value >= 0
                        ? 'positive'
                        : 'negative'
                    }`}
                  >
                    {value >= 0 ? '+' : ''}
                    {value}
                  </span>
                )
              },
            },
          ]}
          rows={rows}
          empty="No points activity available."
        />

      </section>

    </div>
  )
}

