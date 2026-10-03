import { useEffect, useMemo, useState } from 'react'
import {
  Activity,
  ArrowDownRight,
  ArrowUpRight,
  CalendarDays,
  Filter,
  Star,
  TrendingDown,
  TrendingUp,
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

function Points({ user }) {
  const role = String(
    user?.role || ''
  ).toLowerCase()

  const isStudent = role === 'student'

  const [pointsData, setPointsData] =
    useState(null)

  const [history, setHistory] =
    useState([])

  const [loading, setLoading] =
    useState(true)

  const [error, setError] =
    useState(null)

  const loadPoints = async () => {
    setLoading(true)
    setError(null)

    try {
      if (isStudent) {
        if (!user?.accountId) {
          throw new Error(
            'Student account ID was not found.'
          )
        }

        const [
          pointsResponse,
          historyResponse,
        ] = await Promise.all([
          api.studentPoints(
            user.accountId
          ),
          api.studentHistory(
            user.accountId
          ),
        ])

        setPointsData(
          unwrap(pointsResponse)
        )

        setHistory(
          getArray(historyResponse)
        )
      } else {
        const [
          summaryResponse,
          activityResponse,
        ] = await Promise.all([
          api.adminPointsSummary(),
          api.recentActivity(),
        ])

        setPointsData(
          unwrap(summaryResponse)
        )

        setHistory(
          getArray(activityResponse)
        )
      }
    } catch (err) {
      console.error(
        'POINTS PAGE ERROR:',
        err
      )

      setError(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadPoints()
  }, [user?.accountId, isStudent])

  const data = useMemo(() => {
    return pointsData || {}
  }, [pointsData])

  const currentPoints = getNumber(
    data,
    [
      'currentPoints',
      'totalPoints',
      'points',
      'balance',
      'availablePoints',
    ],
    0
  )

  const addedPoints = getNumber(
    data,
    [
      'addedPoints',
      'pointsAdded',
      'totalAdded',
      'earnedPoints',
      'additionPoints',
    ],
    0
  )

  const deductedPoints = getNumber(
    data,
    [
      'deductedPoints',
      'pointsDeducted',
      'totalDeducted',
      'spentPoints',
      'deductionPoints',
    ],
    0
  )

  const transactionsCount =
    getNumber(
      data,
      [
        'transactionsCount',
        'totalTransactions',
        'transactionCount',
        'activitiesCount',
      ],
      history.length
    )

  const formatNumber = (value) => {
    return Number(
      value || 0
    ).toLocaleString()
  }

  const formatDate = (value) => {
    if (
      !value ||
      value === '—'
    ) {
      return '—'
    }

    const date = new Date(value)

    if (
      Number.isNaN(
        date.getTime()
      )
    ) {
      return String(value)
    }

    return date.toLocaleDateString(
      'en-US',
      {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      }
    )
  }

  const rows = history.map(
    (item, index) => {
      const amount = getNumber(
        item,
        [
          'points',
          'amount',
          'value',
          'pointsAmount',
        ],
        0
      )

      const type = String(
        getValue(
          item,
          [
            'type',
            'transactionType',
            'actionType',
            'operation',
          ],
          ''
        )
      ).toLowerCase()

      const reason = getValue(
        item,
        [
          'reason',
          'description',
          'reasonName',
          'note',
          'title',
        ],
        'Point transaction'
      )

      const date = getValue(
        item,
        [
          'date',
          'createdAt',
          'transactionDate',
          'createdDate',
        ],
        '—'
      )

      const studentName =
        getValue(
          item,
          [
            'studentName',
            'fullName',
            'fullNameEn',
            'name',
          ],
          ''
        )

      const isDeduction =
        type.includes(
          'deduct'
        ) ||
        type.includes(
          'subtract'
        ) ||
        type.includes(
          'minus'
        ) ||
        amount < 0

      return {
        ...item,

        _id:
          item?.id ??
          item?.Id ??
          index,

        _amount: Math.abs(
          amount
        ),

        _reason: reason,

        _date: date,

        _student:
          studentName,

        _isDeduction:
          isDeduction,
      }
    }
  )

  if (loading) {
    return (
      <div className="page-state">
        <Loading text="Loading points..." />
      </div>
    )
  }

  if (error) {
    return (
      <div className="page-state">
        <ErrorState
          error={error}
          onRetry={loadPoints}
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
            POINT MANAGEMENT
          </span>

          <h1>
            Points
          </h1>

          <p>
            {isStudent
              ? 'Track your points and recent reward activity.'
              : 'Monitor point activity across the reward system.'}
          </p>
        </div>

        <div className="role-badge">
          <Star size={16} />
          {user?.role || 'User'}
        </div>
      </div>

      {/* ================= STATS ================= */}

      <div className="stats-grid">
        <StatCard
          icon={
            <Star size={23} />
          }
          label="Current Points"
          value={formatNumber(
            currentPoints
          )}
          helper="Current balance"
          accent="red"
        />

        <StatCard
          icon={
            <TrendingUp
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
            <TrendingDown
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

        <StatCard
          icon={
            <Activity
              size={23}
            />
          }
          label="Transactions"
          value={formatNumber(
            transactionsCount
          )}
          helper="Recorded activities"
          accent="purple"
        />
      </div>

      {/* ================= POINT SUMMARY ================= */}

      <motion.div
        className="panel points-summary-large"
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
              OVERVIEW
            </span>

            <h2>
              Points Summary
            </h2>
          </div>

          <div className="panel-icon">
            <Star size={19} />
          </div>
        </div>

        <div className="points-summary-content">
          <div className="points-total-box">
            <span>
              Available Points
            </span>

            <strong>
              {formatNumber(
                currentPoints
              )}
            </strong>

            <small>
              reward points
            </small>
          </div>

          <div className="points-flow">
            <div className="flow-item">
              <div className="flow-icon addition">
                <ArrowUpRight
                  size={18}
                />
              </div>

              <div>
                <span>
                  Added
                </span>

                <strong>
                  +{formatNumber(
                    addedPoints
                  )}
                </strong>
              </div>
            </div>

            <div className="flow-item">
              <div className="flow-icon deduction">
                <ArrowDownRight
                  size={18}
                />
              </div>

              <div>
                <span>
                  Deducted
                </span>

                <strong>
                  -{formatNumber(
                    deductedPoints
                  )}
                </strong>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ================= HISTORY ================= */}

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
          duration: 0.4,
        }}
      >
        <div className="panel-header">
          <div>
            <span className="panel-kicker">
              TRANSACTIONS
            </span>

            <h2>
              Points History
            </h2>
          </div>

          <div className="panel-header-action">
            <CalendarDays
              size={17}
            />

            All activity
          </div>
        </div>

        <Table
          columns={[
            ...(isStudent
              ? []
              : [
                  {
                    key: 'student',
                    label: 'Student',
                    render: (row) =>
                      row._student ? (
                        <div className="table-title">
                          <div className="mini-avatar">
                            {String(
                              row._student
                            )
                              .charAt(
                                0
                              )
                              .toUpperCase()}
                          </div>

                          <div>
                            <strong>
                              {
                                row._student
                              }
                            </strong>
                          </div>
                        </div>
                      ) : (
                        <span>
                          —
                        </span>
                      ),
                  },
                ]),

            {
              key: 'reason',
              label: 'Reason',
              render: (row) => (
                <div className="table-title">
                  <div
                    className={`history-icon ${
                      row._isDeduction
                        ? 'deduction'
                        : 'addition'
                    }`}
                  >
                    {row._isDeduction ? (
                      <ArrowDownRight
                        size={16}
                      />
                    ) : (
                      <ArrowUpRight
                        size={16}
                      />
                    )}
                  </div>

                  <div>
                    <strong>
                      {row._reason}
                    </strong>

                    <span>
                      {row._isDeduction
                        ? 'Deduction'
                        : 'Addition'}
                    </span>
                  </div>
                </div>
              ),
            },

            {
              key: 'points',
              label: 'Points',
              render: (row) => (
                <span
                  className={`points-value ${
                    row._isDeduction
                      ? 'negative'
                      : 'positive'
                  }`}
                >
                  {row._isDeduction
                    ? '-'
                    : '+'}
                  {formatNumber(
                    row._amount
                  )}
                </span>
              ),
            },

            {
              key: 'date',
              label: 'Date',
              render: (row) => (
                <span className="date-cell">
                  {formatDate(
                    row._date
                  )}
                </span>
              ),
            },
          ]}
          rows={rows}
          empty="No point transactions found."
        />
      </motion.div>

      {/* ================= INFO ================= */}

      <div className="info-strip">
        <Filter size={18} />

        <span>
          Point information shown here
          is retrieved directly from the
          Reward Hub API.
        </span>
      </div>
    </div>
  )
}

export default Points