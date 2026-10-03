import { useEffect, useMemo, useState } from 'react'
import {
  Activity,
  ArrowDownRight,
  ArrowUpRight,
  Award,
  BarChart3,
  Crown,
  Gift,
  Medal,
  Settings2,
  Star,
  Trophy,
  Users,
} from 'lucide-react'
import { motion } from 'framer-motion'

import {
  api,
  getArray,
  getNumber,
  getValue,
  unwrap,
} from '../api/api'

import Loading from '../components/Loading'
import ErrorState from '../components/ErrorState'
import StatCard from '../components/StatCard'
import Table from '../components/Table'

function AdminDashboard({ user }) {
  const [dashboard, setDashboard] = useState(null)
  const [pointsSummary, setPointsSummary] = useState(null)
  const [topStudents, setTopStudents] = useState([])
  const [rewardStats, setRewardStats] = useState(null)
  const [additionReasons, setAdditionReasons] = useState([])
  const [deductionReasons, setDeductionReasons] = useState([])

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const loadDashboard = async () => {
    setLoading(true)
    setError(null)

    try {
      const results = await Promise.allSettled([
        api.adminDashboard(),
        api.adminPointsSummary(),
        api.topStudents(),
        api.rewardStats(),
        api.additionReasons(),
        api.deductionReasons(),
      ])

      const [
        dashboardResult,
        summaryResult,
        topStudentsResult,
        rewardStatsResult,
        additionsResult,
        deductionsResult,
      ] = results

      if (
        dashboardResult.status === 'fulfilled'
      ) {
        setDashboard(
          unwrap(dashboardResult.value)
        )
      }

      if (
        summaryResult.status === 'fulfilled'
      ) {
        setPointsSummary(
          unwrap(summaryResult.value)
        )
      }

      if (
        topStudentsResult.status ===
        'fulfilled'
      ) {
        setTopStudents(
          getArray(
            topStudentsResult.value
          )
        )
      }

      if (
        rewardStatsResult.status ===
        'fulfilled'
      ) {
        setRewardStats(
          unwrap(rewardStatsResult.value)
        )
      }

      if (
        additionsResult.status ===
        'fulfilled'
      ) {
        setAdditionReasons(
          getArray(
            additionsResult.value
          )
        )
      }

      if (
        deductionsResult.status ===
        'fulfilled'
      ) {
        setDeductionReasons(
          getArray(
            deductionsResult.value
          )
        )
      }

      const failedRequest = results.find(
        (result) =>
          result.status === 'rejected'
      )

      /*
        We don't fail the entire dashboard
        if one optional admin endpoint fails.
      */
      if (
        failedRequest &&
        results.every(
          (result) =>
            result.status === 'rejected'
        )
      ) {
        throw failedRequest.reason
      }
    } catch (err) {
      console.error(
        'ADMIN DASHBOARD ERROR:',
        err
      )

      setError(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadDashboard()
  }, [])

  const dashboardData = useMemo(() => {
    return dashboard || {}
  }, [dashboard])

  const summaryData = useMemo(() => {
    return pointsSummary || {}
  }, [pointsSummary])

  const rewardsData = useMemo(() => {
    return rewardStats || {}
  }, [rewardStats])

  /*
    ============================
    Main dashboard values
    ============================
  */

  const totalStudents = getNumber(
    dashboardData,
    [
      'totalStudents',
      'studentsCount',
      'studentCount',
    ],
    getNumber(
      summaryData,
      [
        'totalStudents',
        'studentsCount',
      ],
      0
    )
  )

  const totalPoints = getNumber(
    summaryData,
    [
      'totalPoints',
      'points',
      'currentPoints',
      'totalBalance',
    ],
    getNumber(
      dashboardData,
      [
        'totalPoints',
        'points',
      ],
      0
    )
  )

  const addedPoints = getNumber(
    summaryData,
    [
      'addedPoints',
      'pointsAdded',
      'totalAdded',
      'additionPoints',
    ],
    0
  )

  const deductedPoints = getNumber(
    summaryData,
    [
      'deductedPoints',
      'pointsDeducted',
      'totalDeducted',
      'deductionPoints',
    ],
    0
  )

  const totalRewards = getNumber(
    rewardsData,
    [
      'totalRewards',
      'rewardsCount',
      'count',
      'total',
    ],
    0
  )

  /*
    ============================
    Top students
    ============================
  */

  const topStudentRows = topStudents
    .slice(0, 10)
    .map((student, index) => ({
      ...student,

      _rank:
        getValue(
          student,
          [
            'rank',
            'position',
            'studentRank',
          ],
          index + 1
        ),

      _name:
        getValue(
          student,
          [
            'fullNameEn',
            'fullName',
            'studentName',
            'name',
          ],
          'Student'
        ),

      _class:
        getValue(
          student,
          [
            'className',
            'class',
            'classRoomName',
          ],
          '—'
        ),

      _points:
        getNumber(
          student,
          [
            'points',
            'totalPoints',
            'currentPoints',
            'score',
          ],
          0
        ),
    }))

  /*
    ============================
    Chart data
    ============================
  */

  const additionChartRows =
    additionReasons
      .map((item) => ({
        label: getValue(
          item,
          [
            'reason',
            'name',
            'reasonName',
            'label',
            'title',
          ],
          'Unknown'
        ),

        value: getNumber(
          item,
          [
            'count',
            'total',
            'points',
            'value',
          ],
          0
        ),
      }))
      .filter(
        (item) => item.value > 0
      )
      .slice(0, 6)

  const deductionChartRows =
    deductionReasons
      .map((item) => ({
        label: getValue(
          item,
          [
            'reason',
            'name',
            'reasonName',
            'label',
            'title',
          ],
          'Unknown'
        ),

        value: getNumber(
          item,
          [
            'count',
            'total',
            'points',
            'value',
          ],
          0
        ),
      }))
      .filter(
        (item) => item.value > 0
      )
      .slice(0, 6)

  const getMaxValue = (rows) => {
    if (!rows.length) return 1

    return Math.max(
      ...rows.map(
        (row) => row.value
      ),
      1
    )
  }

  const formatNumber = (value) => {
    return Number(value || 0).toLocaleString()
  }

  if (loading) {
    return (
      <div className="page-state">
        <Loading text="Loading admin dashboard..." />
      </div>
    )
  }

  if (error) {
    return (
      <div className="page-state">
        <ErrorState
          error={error}
          onRetry={loadDashboard}
        />
      </div>
    )
  }

  return (
    <div className="dashboard-page">
      {/* ================= HEADER ================= */}

      <div className="page-heading">
        <div>
          <span className="page-eyebrow">
            ADMINISTRATION
          </span>

          <h1>
            Welcome back,{' '}
            {user?.name || 'Admin'}
          </h1>

          <p>
            Monitor students, points,
            rewards, and system activity
            from one place.
          </p>
        </div>

        <div className="role-badge admin-badge">
          <Settings2 size={16} />
          Administrator
        </div>
      </div>

      {/* ================= STATS ================= */}

      <div className="stats-grid">
        <StatCard
          icon={<Users size={23} />}
          label="Total Students"
          value={formatNumber(
            totalStudents
          )}
          helper="Students in the system"
          accent="red"
        />

        <StatCard
          icon={<Star size={23} />}
          label="Total Points"
          value={formatNumber(
            totalPoints
          )}
          helper="Current point balance"
          accent="purple"
        />

        <StatCard
          icon={
            <ArrowUpRight
              size={23}
            />
          }
          label="Points Added"
          value={formatNumber(
            addedPoints
          )}
          helper="Total additions"
          accent="green"
        />

        <StatCard
          icon={
            <ArrowDownRight
              size={23}
            />
          }
          label="Points Deducted"
          value={formatNumber(
            deductedPoints
          )}
          helper="Total deductions"
          accent="orange"
        />
      </div>

      {/* ================= TOP STUDENTS + REWARDS ================= */}

      <div className="dashboard-grid">
        <motion.div
          className="panel"
          initial={{
            opacity: 0,
            y: 12,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.3,
          }}
        >
          <div className="panel-header">
            <div>
              <span className="panel-kicker">
                LEADERBOARD
              </span>

              <h2>
                Top Students
              </h2>
            </div>

            <div className="panel-icon">
              <Crown size={19} />
            </div>
          </div>

          <Table
            columns={[
              {
                key: 'rank',
                label: 'Rank',
                render: (row) => (
                  <div className="rank-cell">
                    {Number(
                      row._rank
                    ) <= 3 ? (
                      <div
                        className={`rank-medal rank-${row._rank}`}
                      >
                        <Medal
                          size={15}
                        />
                      </div>
                    ) : (
                      <span className="rank-number">
                        #{row._rank}
                      </span>
                    )}
                  </div>
                ),
              },

              {
                key: 'name',
                label: 'Student',
                render: (row) => (
                  <div className="table-title">
                    <div className="mini-avatar">
                      {String(
                        row._name
                      )
                        .charAt(0)
                        .toUpperCase()}
                    </div>

                    <div>
                      <strong>
                        {row._name}
                      </strong>

                      <span>
                        {row._class}
                      </span>
                    </div>
                  </div>
                ),
              },

              {
                key: 'points',
                label: 'Points',
                render: (row) => (
                  <span className="points-value positive">
                    {formatNumber(
                      row._points
                    )}
                  </span>
                ),
              },
            ]}
            rows={topStudentRows}
            empty="No top student data available."
          />
        </motion.div>

        {/* Rewards summary */}

        <motion.div
          className="panel reward-summary-panel"
          initial={{
            opacity: 0,
            y: 12,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.35,
          }}
        >
          <div className="panel-header">
            <div>
              <span className="panel-kicker">
                REWARDS
              </span>

              <h2>
                Reward Overview
              </h2>
            </div>

            <div className="panel-icon">
              <Gift size={19} />
            </div>
          </div>

          <div className="reward-big-number">
            <Gift size={28} />

            <strong>
              {formatNumber(
                totalRewards
              )}
            </strong>

            <span>
              Total rewards
            </span>
          </div>

          <div className="reward-info-list">
            <div>
              <span>
                Reward system
              </span>

              <strong>
                Active
              </strong>
            </div>

            <div>
              <span>
                Students
              </span>

              <strong>
                {formatNumber(
                  totalStudents
                )}
              </strong>
            </div>

            <div>
              <span>
                Points balance
              </span>

              <strong>
                {formatNumber(
                  totalPoints
                )}
              </strong>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ================= CHARTS ================= */}

      <div className="dashboard-grid">
        {/* Addition reasons */}

        <motion.div
          className="panel chart-panel"
          initial={{
            opacity: 0,
            y: 12,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.4,
          }}
        >
          <div className="panel-header">
            <div>
              <span className="panel-kicker">
                ANALYTICS
              </span>

              <h2>
                Point Additions
              </h2>
            </div>

            <div className="panel-icon">
              <ArrowUpRight
                size={19}
              />
            </div>
          </div>

          {additionChartRows.length >
          0 ? (
            <div className="bar-chart">
              {additionChartRows.map(
                (item, index) => {
                  const width =
                    (item.value /
                      getMaxValue(
                        additionChartRows
                      )) *
                    100

                  return (
                    <div
                      className="bar-row"
                      key={`${item.label}-${index}`}
                    >
                      <div className="bar-label">
                        <span>
                          {item.label}
                        </span>

                        <strong>
                          {formatNumber(
                            item.value
                          )}
                        </strong>
                      </div>

                      <div className="bar-track">
                        <div
                          className="bar-fill addition-bar"
                          style={{
                            width: `${width}%`,
                          }}
                        />
                      </div>
                    </div>
                  )
                }
              )}
            </div>
          ) : (
            <div className="chart-empty">
              <BarChart3
                size={28}
              />

              <span>
                No addition analytics
                available.
              </span>
            </div>
          )}
        </motion.div>

        {/* Deduction reasons */}

        <motion.div
          className="panel chart-panel"
          initial={{
            opacity: 0,
            y: 12,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.45,
          }}
        >
          <div className="panel-header">
            <div>
              <span className="panel-kicker">
                ANALYTICS
              </span>

              <h2>
                Point Deductions
              </h2>
            </div>

            <div className="panel-icon">
              <ArrowDownRight
                size={19}
              />
            </div>
          </div>

          {deductionChartRows.length >
          0 ? (
            <div className="bar-chart">
              {deductionChartRows.map(
                (item, index) => {
                  const width =
                    (item.value /
                      getMaxValue(
                        deductionChartRows
                      )) *
                    100

                  return (
                    <div
                      className="bar-row"
                      key={`${item.label}-${index}`}
                    >
                      <div className="bar-label">
                        <span>
                          {item.label}
                        </span>

                        <strong>
                          {formatNumber(
                            item.value
                          )}
                        </strong>
                      </div>

                      <div className="bar-track">
                        <div
                          className="bar-fill deduction-bar"
                          style={{
                            width: `${width}%`,
                          }}
                        />
                      </div>
                    </div>
                  )
                }
              )}
            </div>
          ) : (
            <div className="chart-empty">
              <BarChart3
                size={28}
              />

              <span>
                No deduction analytics
                available.
              </span>
            </div>
          )}
        </motion.div>
      </div>

      {/* ================= SYSTEM SNAPSHOT ================= */}

      <motion.div
        className="panel"
        initial={{
          opacity: 0,
          y: 12,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.5,
        }}
      >
        <div className="panel-header">
          <div>
            <span className="panel-kicker">
              SYSTEM
            </span>

            <h2>
              Platform Snapshot
            </h2>
          </div>

          <div className="panel-icon">
            <Activity size={19} />
          </div>
        </div>

        <div className="snapshot-grid">
          <div className="snapshot-card">
            <div className="snapshot-icon">
              <Users size={19} />
            </div>

            <div>
              <span>
                Students
              </span>

              <strong>
                {formatNumber(
                  totalStudents
                )}
              </strong>
            </div>
          </div>

          <div className="snapshot-card">
            <div className="snapshot-icon">
              <Star size={19} />
            </div>

            <div>
              <span>
                Points
              </span>

              <strong>
                {formatNumber(
                  totalPoints
                )}
              </strong>
            </div>
          </div>

          <div className="snapshot-card">
            <div className="snapshot-icon">
              <Award size={19} />
            </div>

            <div>
              <span>
                Rewards
              </span>

              <strong>
                {formatNumber(
                  totalRewards
                )}
              </strong>
            </div>
          </div>

          <div className="snapshot-card">
            <div className="snapshot-icon">
              <Trophy size={19} />
            </div>

            <div>
              <span>
                Status
              </span>

              <strong>
                Active
              </strong>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default AdminDashboard