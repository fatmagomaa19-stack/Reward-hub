import {
  useEffect,
  useState,
} from 'react'

import {
  BarChart3,
  GraduationCap,
  Star,
  Trophy,
  Users,
} from 'lucide-react'

import {
  api,
  getArray,
  getNumber,
  getValue,
} from '../api/api'

import Loading from '../components/Loading'
import ErrorState from '../components/ErrorState'
import StatCard from '../components/StatCard'
import Table from '../components/Table'


export default function TeacherDashboard({
  user,
}) {

  const [
    overview,
    setOverview,
  ] = useState(null)

  const [
    error,
    setError,
  ] = useState(null)


  async function loadDashboard() {
    try {

      setError(null)

      const response =
        await api.teacherOverview()

      setOverview(response)

    } catch (err) {

      console.error(
        'TEACHER DASHBOARD ERROR:',
        err
      )

      setError(err)

    }
  }


  useEffect(() => {
    loadDashboard()
  }, [])


  if (error) {
    return (
      <ErrorState
        error={error}
        onRetry={loadDashboard}
      />
    )
  }


  if (!overview) {
    return (
      <Loading
        text="Loading teacher dashboard..."
      />
    )
  }


  const data =
    overview?.data ??
    overview?.result ??
    overview


  const classes =
    getArray(data)


  const totalStudents =
    getNumber(
      data,
      [
        'totalStudents',
        'studentsCount',
        'studentCount',
      ],
      classes.reduce(
        (total, item) =>
          total +
          getNumber(
            item,
            [
              'studentCount',
              'studentsCount',
              'totalStudents',
            ],
            0
          ),
        0
      )
    )


  const totalClasses =
    getNumber(
      data,
      [
        'totalClasses',
        'classesCount',
        'classCount',
      ],
      classes.length
    )


  const totalPoints =
    getNumber(
      data,
      [
        'totalPoints',
        'points',
        'classPoints',
      ],
      0
    )


  const averagePoints =
    getNumber(
      data,
      [
        'averagePoints',
        'avgPoints',
        'average',
      ],
      0
    )


  return (
    <div className="dashboard-page">

      {/* HEADER */}

      <div className="page-heading">

        <div>

          <span className="eyebrow">
            TEACHER DASHBOARD
          </span>

          <h1>
            Welcome back,{' '}
            {user?.name
              ?.split(' ')
              .slice(0, 2)
              .join(' ')}
          </h1>

          <p>
            Monitor your classes and
            students from one place.
          </p>

        </div>


        <div className="role-badge">

          <GraduationCap size={15} />

          Teacher

        </div>

      </div>


      {/* STAT CARDS */}

      <div className="stats-grid">

        <StatCard
          icon={<Users />}
          label="Students"
          value={totalStudents}
          helper="Students in your overview"
        />

        <StatCard
          icon={<GraduationCap />}
          label="Classes"
          value={totalClasses}
          helper="Classes available"
          accent="purple"
        />

        <StatCard
          icon={<Star />}
          label="Total Points"
          value={totalPoints}
          helper="Points in overview"
          accent="green"
        />

        <StatCard
          icon={<BarChart3 />}
          label="Average Points"
          value={averagePoints}
          helper="Class performance"
          accent="orange"
        />

      </div>


      {/* CLASS TABLE */}

      <section className="panel">

        <div className="panel-heading">

          <div>

            <span className="eyebrow">
              CLASS OVERVIEW
            </span>

            <h2>
              Your Classes
            </h2>

          </div>


          <div className="panel-icon">
            <Trophy size={20} />
          </div>

        </div>


        <Table

          rows={classes}

          columns={[

            {
              key: 'class',
              label: 'Class',

              render: row =>
                getValue(
                  row,
                  [
                    'className',
                    'class',
                    'name',
                  ]
                ),
            },

            {
              key: 'students',
              label: 'Students',

              render: row =>
                getValue(
                  row,
                  [
                    'studentCount',
                    'studentsCount',
                    'totalStudents',
                  ]
                ),
            },

            {
              key: 'points',
              label: 'Points',

              render: row =>
                getValue(
                  row,
                  [
                    'totalPoints',
                    'points',
                    'classPoints',
                  ]
                ),
            },

            {
              key: 'average',
              label: 'Average',

              render: row =>
                getValue(
                  row,
                  [
                    'averagePoints',
                    'avgPoints',
                    'average',
                  ]
                ),
            },

            {
              key: 'grade',
              label: 'Grade',

              render: row =>
                getValue(
                  row,
                  [
                    'gradeName',
                    'grade',
                  ]
                ),
            },

          ]}

          empty="No class overview data was returned by the API."

        />

      </section>

    </div>
  )
}