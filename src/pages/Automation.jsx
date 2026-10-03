import { useEffect, useState } from 'react'
import {
  Check,
  Edit3,
  Minus,
  Plus,
  RefreshCw,
  Settings2,
  SlidersHorizontal,
  Sparkles,
} from 'lucide-react'
import { motion } from 'framer-motion'

import {
  api,
  getArray,
  getNumber,
  getValue,
} from '../api/api'

import Loading from '../components/Loading'
import ErrorState from '../components/ErrorState'

function Automation() {
  const [rules, setRules] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [editingId, setEditingId] = useState(null)
  const [editingPoints, setEditingPoints] = useState('')
  const [savingId, setSavingId] = useState(null)

  const loadRules = async () => {
    setLoading(true)
    setError(null)

    try {
      const response =
        await api.pointRules()

      setRules(
        getArray(response)
      )
    } catch (err) {
      console.error(
        'AUTOMATION ERROR:',
        err
      )

      setError(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadRules()
  }, [])

  const startEditing = (rule) => {
    const id =
      rule?.id ??
      rule?.Id ??
      rule?.ruleId

    const points = getNumber(
      rule,
      [
        'points',
        'pointValue',
        'value',
        'amount',
      ],
      0
    )

    setEditingId(id)
    setEditingPoints(
      String(points)
    )
  }

  const cancelEditing = () => {
    setEditingId(null)
    setEditingPoints('')
  }

  const changePoints = (amount) => {
    setEditingPoints(
      (previous) => {
        const current =
          Number(previous) || 0

        return String(
          Math.max(
            0,
            current + amount
          )
        )
      }
    )
  }

  const saveRule = async (rule) => {
    const id =
      rule?.id ??
      rule?.Id ??
      rule?.ruleId

    if (!id) {
      return
    }

    const points =
      Number(editingPoints)

    if (
      !Number.isFinite(points) ||
      points < 0
    ) {
      return
    }

    setSavingId(id)

    try {
      /*
        Keep the original rule fields and
        replace only the points value.
      */
      const body = {
        ...rule,
        points,
      }

      await api.updatePointRule(
        id,
        body
      )

      /*
        Update the local screen immediately.
      */
      setRules(
        (previous) =>
          previous.map(
            (item) => {
              const itemId =
                item?.id ??
                item?.Id ??
                item?.ruleId

              if (
                String(itemId) !==
                String(id)
              ) {
                return item
              }

              return {
                ...item,
                points,
              }
            }
          )
      )

      cancelEditing()
    } catch (err) {
      console.error(
        'UPDATE POINT RULE ERROR:',
        err
      )

      setError(err)
    } finally {
      setSavingId(null)
    }
  }

  if (loading) {
    return (
      <div className="page-state">
        <Loading text="Loading point rules..." />
      </div>
    )
  }

  if (error) {
    return (
      <div className="page-state">
        <ErrorState
          error={error}
          onRetry={loadRules}
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
            Automation
          </h1>

          <p>
            Configure the points awarded
            for different student activities.
          </p>
        </div>

        <button
          type="button"
          className="btn btn-light"
          onClick={loadRules}
        >
          <RefreshCw size={17} />
          Refresh
        </button>
      </div>

      {/* ================= INFO ================= */}

      <motion.div
        className="automation-banner"
        initial={{
          opacity: 0,
          y: 10,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
      >
        <div className="automation-banner-icon">
          <Sparkles size={22} />
        </div>

        <div>
          <strong>
            Smart Point Rules
          </strong>

          <p>
            These rules control how many
            points are assigned for each
            configured activity.
          </p>
        </div>
      </motion.div>

      {/* ================= RULES ================= */}

      <div className="automation-grid">
        {rules.length > 0 ? (
          rules.map(
            (rule, index) => {
              const id =
                rule?.id ??
                rule?.Id ??
                rule?.ruleId ??
                index

              const name =
                getValue(
                  rule,
                  [
                    'name',
                    'ruleName',
                    'title',
                    'reason',
                    'reasonName',
                    'activity',
                    'description',
                  ],
                  `Point Rule ${index + 1}`
                )

              const description =
                getValue(
                  rule,
                  [
                    'description',
                    'details',
                    'reason',
                    'activityDescription',
                  ],
                  'Configured point activity'
                )

              const points =
                getNumber(
                  rule,
                  [
                    'points',
                    'pointValue',
                    'value',
                    'amount',
                  ],
                  0
                )

              const isEditing =
                String(
                  editingId
                ) === String(id)

              const isSaving =
                String(
                  savingId
                ) === String(id)

              return (
                <motion.div
                  className="rule-card"
                  key={id}
                  initial={{
                    opacity: 0,
                    y: 12,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.25,
                    delay:
                      index * 0.04,
                  }}
                >
                  <div className="rule-card-top">
                    <div className="rule-icon">
                      <Settings2
                        size={20}
                      />
                    </div>

                    <span className="rule-number">
                      Rule {index + 1}
                    </span>
                  </div>

                  <div className="rule-content">
                    <h3>
                      {name}
                    </h3>

                    <p>
                      {description}
                    </p>
                  </div>

                  <div className="rule-points">
                    <span>
                      Points
                    </span>

                    {isEditing ? (
                      <div className="points-editor">
                        <button
                          type="button"
                          className="points-adjust-btn"
                          onClick={() =>
                            changePoints(
                              -1
                            )
                          }
                          disabled={
                            isSaving
                          }
                        >
                          <Minus
                            size={15}
                          />
                        </button>

                        <input
                          type="number"
                          min="0"
                          value={
                            editingPoints
                          }
                          onChange={(e) =>
                            setEditingPoints(
                              e.target
                                .value
                            )
                          }
                          disabled={
                            isSaving
                          }
                        />

                        <button
                          type="button"
                          className="points-adjust-btn"
                          onClick={() =>
                            changePoints(
                              1
                            )
                          }
                          disabled={
                            isSaving
                          }
                        >
                          <Plus
                            size={15}
                          />
                        </button>
                      </div>
                    ) : (
                      <strong>
                        {points}
                      </strong>
                    )}
                  </div>

                  <div className="rule-actions">
                    {isEditing ? (
                      <>
                        <button
                          type="button"
                          className="btn btn-light btn-small"
                          onClick={
                            cancelEditing
                          }
                          disabled={
                            isSaving
                          }
                        >
                          Cancel
                        </button>

                        <button
                          type="button"
                          className="btn btn-primary btn-small"
                          onClick={() =>
                            saveRule(
                              rule
                            )
                          }
                          disabled={
                            isSaving
                          }
                        >
                          {isSaving ? (
                            <>
                              <span className="button-spinner" />
                              Saving...
                            </>
                          ) : (
                            <>
                              <Check
                                size={16}
                              />
                              Save
                            </>
                          )}
                        </button>
                      </>
                    ) : (
                      <button
                        type="button"
                        className="btn btn-light btn-small"
                        onClick={() =>
                          startEditing(
                            rule
                          )
                        }
                      >
                        <Edit3
                          size={16}
                        />
                        Edit Points
                      </button>
                    )}
                  </div>
                </motion.div>
              )
            }
          )
        ) : (
          <div className="panel empty-panel">
            <SlidersHorizontal
              size={30}
            />

            <h3>
              No point rules found
            </h3>

            <p>
              The API did not return any
              configured point rules.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Automation