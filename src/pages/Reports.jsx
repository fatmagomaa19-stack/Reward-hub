import { useEffect, useMemo, useState } from 'react'
import {
  Activity,
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  CalendarDays,
  FileBarChart,
  Filter,
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
import Table from '../components/Table'

function Reports({ user }) {
  const role = String(
    user?.role || ''
  ).toLowerCase()

  const isStudent = role === 'student'

  const [history, setHistory] = useState([])
  const [additionReasons, setAdditionReasons] =
    useState([])
  const [deductionReasons, setDeductionReasons] =
    useState([])

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const loadReports = async () => {
    setLoading(true)
    setError(null)

    try {
      if (isStudent) {
        if (!user?.accountId) {
          throw new Error(
            'Student account ID was not found.'
          )
        }

        const historyResponse =
          await api.studentHistory(
            user.accountId
          )

        setHistory(
          getArray(historyResponse)
        )
      } else {
        const [
          activityResponse,
          additionsResponse,
          deductionsResponse,
        ] = await Promise.all([
          api.recentActivity(),
          api.additionReasons(),
          api.deductionReasons(),
        ])

        setHistory(
          getArray(activityResponse)
        )

        setAdditionReasons(
          getArray(additionsResponse)
        )

        setDeductionReasons(
          getArray(deductionsResponse)
        )
      }
    } catch (err) {
      console.error(
        'REPORTS PAGE ERROR:',
        err
      )

      setError(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadReports()
  }, [user?.accountId, isStudent])

  const historyRows = useMemo(() => {
    return history.map(
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
            '—'
          )

        const isDeduction =
          type.includes('deduct') ||
          type.includes('subtract') ||
          type.includes('minus') ||
          amount < 0

        return {
          ...item,
          _index: index,
          _amount: Math.abs(amount),
          _reason: reason,
          _date: date,
          _student: studentName,
          _isDeduction: isDeduction,
        }
      }
    )
  }, [history])

  const additionRows = useMemo(() => {
    return additionReasons
      .map((item, index) => ({
        ...item,
        _index: index,
        _label: getValue(
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
        _value: getNumber(
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
        (item) => item._value >= 0
      )
  }, [additionReasons])

  const deductionRows = useMemo(() => {
    return deductionReasons
      .map((item, index) => ({
        ...item,
        _index: index,
        _label: getValue(
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
        _value: getNumber(
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
        (item) => item._value >= 0
      )
  }, [deductionReasons])

  const totalActivities =
    historyRows.length

  const totalAdded = historyRows
    .filter(
      (row) => !row._isDeduction
    )
    .reduce(
      (sum, row) =>
        sum + row._amount,
      0
    )

  const totalDeducted = historyRows
    .filter(
      (row) => row._isDeduction
    )
    .reduce(
      (sum, row) =>
        sum + row._amount,
      0
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

  const getMaxValue = (rows) => {
    if (!rows.length) {
      return 1
    }

    return Math.max(
      ...rows.map(
        (row) => row._value
      ),
      1
    )
  }

  if (loading) {
    return (
      <div className="page-state">
        <Loading text="Loading reports..." />
      </div>
    )
  }

  if (error) {
    return (
      <div className="page-state">
        <ErrorState
          error={error}
          onRetry={loadReports}
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
            REPORTS
          </span>

          <h1>
            Reports
          </h1>

          <p>
            {isStudent
              ? 'Review your points activity and reward history.'
              : 'Analyze reward activity and point distribution across the system.'}
          </p>
        </div>

        <div className="role-badge">
          <FileBarChart size={16} />
          {user?.role || 'User'}
        </div>
      </div>

      {/* ================= SUMMARY ================= */}

      <div className="stats-grid">
        <div className="report-summary-card">
          <div className="report-summary-icon">
            <Activity size={21} />
          </div>

          <div>
            <span>
              Total Activities
            </span>

            <strong>
              {formatNumber(
                totalActivities
              )}
            </strong>
          </div>
        </div>

        <div className="report-summary-card">
          <div className="report-summary-icon positive">
            <TrendingUp size={21} />
          </div>

          <div>
            <span>
              Points Added
            </span>

            <strong>
              {formatNumber(
                totalAdded
              )}
            </strong>
          </div>
        </div>

        <div className="report-summary-card">
          <div className="report-summary-icon negative">
            <TrendingDown size={21} />
          </div>

          <div>
            <span>
              Points Deducted
            </span>

            <strong>
              {formatNumber(
                totalDeducted
              )}
            </strong>
          </div>
        </div>

        <div className="report-summary-card">
          <div className="report-summary-icon">
            <BarChart3 size={21} />
          </div>

          <div>
            <span>
              Net Points
            </span>

            <strong>
              {formatNumber(
                totalAdded -
                  totalDeducted
              )}
            </strong>
          </div>
        </div>
      </div>

      {/* ================= ANALYTICS ================= */}

      {!isStudent && (
        <div className="dashboard-grid">
          {/* Additions */}

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
              duration: 0.3,
            }}
          >
            <div className="panel-header">
              <div>
                <span className="panel-kicker">
                  ANALYTICS
                </span>

                <h2>
                  Addition Reasons
                </h2>
              </div>

              <div className="panel-icon">
                <ArrowUpRight
                  size={19}
                />
              </div>
            </div>

            {additionRows.length > 0 ? (
              <div className="bar-chart">
                {additionRows.map(
                  (item) => {
                    const width =
                      (item._value /
                        getMaxValue(
                          additionRows
                        )) *
                      100

                    return (
                      <div
                        className="bar-row"
                        key={`addition-${item._index}`}
                      >
                        <div className="bar-label">
                          <span>
                            {item._label}
                          </span>

                          <strong>
                            {formatNumber(
                              item._value
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
                <BarChart3 size={28} />

                <span>
                  No addition data
                  available.
                </span>
              </div>
            )}
          </motion.div>

          {/* Deductions */}

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
              duration: 0.35,
            }}
          >
            <div className="panel-header">
              <div>
                <span className="panel-kicker">
                  ANALYTICS
                </span>

                <h2>
                  Deduction Reasons
                </h2>
              </div>

              <div className="panel-icon">
                <ArrowDownRight
                  size={19}
                />
              </div>
            </div>

            {deductionRows.length >
            0 ? (
              <div className="bar-chart">
                {deductionRows.map(
                  (item) => {
                    const width =
                      (item._value /
                        getMaxValue(
                          deductionRows
                        )) *
                      100

                    return (
                      <div
                        className="bar-row"
                        key={`deduction-${item._index}`}
                      >
                        <div className="bar-label">
                          <span>
                            {item._label}
                          </span>

                          <strong>
                            {formatNumber(
                              item._value
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
                <BarChart3 size={28} />

                <span>
                  No deduction data
                  available.
                </span>
              </div>
            )}
          </motion.div>
        </div>
      )}

      {/* ================= ACTIVITY TABLE ================= */}

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
              ACTIVITY REPORT
            </span>

            <h2>
              Points Activity
            </h2>
          </div>

          <div className="panel-header-action">
            <CalendarDays size={17} />
            Recent records
          </div>
        </div>

        <Table
          columns={[
            ...(!isStudent
              ? [
                  {
                    key: 'student',
                    label: 'Student',
                    render: (row) => (
                      <div className="table-title">
                        <div className="mini-avatar">
                          {String(
                            row._student
                          )
                            .charAt(0)
                            .toUpperCase()}
                        </div>

                        <div>
                          <strong>
                            {row._student}
                          </strong>
                        </div>
                      </div>
                    ),
                  },
                ]
              : []),

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
          rows={historyRows}
          empty="No report records found."
        />
      </motion.div>

      {/* ================= FOOTER INFO ================= */}

      <div className="info-strip">
        <Filter size={18} />

        <span>
          Reports are generated from
          the live Reward Hub API data.
        </span>
      </div>
    </div>
  )
}

export default Reports