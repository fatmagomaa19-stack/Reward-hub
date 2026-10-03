import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts'

import {
  Award,
  Users,
  Gift,
  Clock,
  TrendingUp,
} from 'lucide-react'


const pointsData = [
  { month: 'Jan', points: 1200 },
  { month: 'Feb', points: 1800 },
  { month: 'Mar', points: 1500 },
  { month: 'Apr', points: 2300 },
  { month: 'May', points: 2800 },
  { month: 'Jun', points: 3200 },
]


const reasonData = [
  { reason: 'Performance', points: 4200 },
  { reason: 'Attendance', points: 2800 },
  { reason: 'Teamwork', points: 2100 },
  { reason: 'Achievement', points: 3500 },
]


const topStudents = [
  { name: 'Ahmed Mohamed', points: 2450 },
  { name: 'Sara Ali', points: 2180 },
  { name: 'Omar Hassan', points: 1950 },
  { name: 'Mariam Adel', points: 1820 },
  { name: 'Youssef Ahmed', points: 1650 },
]


function StatCard({ icon, title, value, change }) {
  return (
    <div className="admin-stat-card">

      <div className="admin-stat-icon">
        {icon}
      </div>

      <div className="admin-stat-info">
        <p>{title}</p>

        <h2>{value}</h2>

        <span>
          <TrendingUp size={14} />
          {change}
        </span>
      </div>

    </div>
  )
}


function AdminDashboard() {

  return (

    <div className="admin-dashboard">

      {/* Header */}

      <div className="admin-dashboard-header">

        <div>
          <h1>Admin Dashboard</h1>

          <p>
            Overview of the Elsewedy Reward Hub
          </p>
        </div>

      </div>


      {/* Statistics Cards */}

      <div className="admin-stats-grid">

        <StatCard
          icon={<Award size={24} />}
          title="Total Points"
          value="24,580"
          change="+12.5%"
        />

        <StatCard
          icon={<Users size={24} />}
          title="Students"
          value="1,248"
          change="+8.2%"
        />

        <StatCard
          icon={<Gift size={24} />}
          title="Rewards"
          value="156"
          change="+15.4%"
        />

        <StatCard
          icon={<Clock size={24} />}
          title="Pending Requests"
          value="24"
          change="+4.8%"
        />

      </div>


      {/* Points Analysis */}

      <div className="admin-chart-card">

        <div className="admin-card-header">

          <div>

            <h3>Points Analysis</h3>

            <p>
              Points earned over the last six months
            </p>

          </div>

        </div>


        <div className="admin-chart">

          <ResponsiveContainer
            width="100%"
            height="100%"
          >

            <AreaChart data={pointsData}>

              <defs>

                <linearGradient
                  id="pointsGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >

                  <stop
                    offset="5%"
                    stopColor="#ef4444"
                    stopOpacity={0.3}
                  />

                  <stop
                    offset="95%"
                    stopColor="#ef4444"
                    stopOpacity={0}
                  />

                </linearGradient>

              </defs>


              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#334155"
              />


              <XAxis
                dataKey="month"
                stroke="#94a3b8"
              />


              <YAxis
                stroke="#94a3b8"
              />


              <Tooltip />


              <Area
                type="monotone"
                dataKey="points"
                stroke="#ef4444"
                strokeWidth={3}
                fill="url(#pointsGradient)"
              />

            </AreaChart>

          </ResponsiveContainer>

        </div>

      </div>


      {/* Bottom Section */}

      <div className="admin-bottom-grid">


        {/* Points By Reason */}

        <div className="admin-chart-card">

          <div className="admin-card-header">

            <div>

              <h3>Points by Reason</h3>

              <p>
                Distribution of awarded points
              </p>

            </div>

          </div>


          <div className="admin-chart">

            <ResponsiveContainer
              width="100%"
              height="100%"
            >

              <BarChart data={reasonData}>

                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#334155"
                />


                <XAxis
                  dataKey="reason"
                  stroke="#94a3b8"
                />


                <YAxis
                  stroke="#94a3b8"
                />


                <Tooltip />


                <Bar
                  dataKey="points"
                  fill="#ef4444"
                  radius={[6, 6, 0, 0]}
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </div>


        {/* Top Students */}

        <div className="admin-chart-card">

          <div className="admin-card-header">

            <div>

              <h3>Top Students</h3>

              <p>
                Students with the highest points
              </p>

            </div>

          </div>


          <div className="top-students-list">

            {topStudents.map((student, index) => (

              <div
                className="top-student"
                key={student.name}
              >

                <div className="student-rank">
                  {index + 1}
                </div>


                <div className="student-info">

                  <strong>
                    {student.name}
                  </strong>

                  <span>
                    {student.points} points
                  </span>

                </div>

              </div>

            ))}

          </div>

        </div>

      </div>

    </div>

  )
}


export default AdminDashboard