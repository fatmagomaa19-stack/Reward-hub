import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  FileText, 
  Eye as ViewIcon, 
  Send, 
  ChevronDown,
  LayoutDashboard,
  Star,
  Settings,
  LogOut
} from 'lucide-react'
 import { useState } from 'react'
 import logo from './assets/logo.png.jpeg'
import './App.css'

function App() {

  const [showPassword, setShowPassword] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [demoRole, setDemoRole] = useState("Student")
if (isLoggedIn) {
  return (
    <Home
      setIsLoggedIn={setIsLoggedIn}
      demoRole={demoRole}
      setDemoRole={setDemoRole}
    />
  )
}
  return (
    <div className="login-page">

      <div className="login-container">

        {/* Logo */}
        <div className="logo-section">

        <img
  src={logo}
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
       <form
  onSubmit={(e) => {
    e.preventDefault()
    setIsLoggedIn(true)
  }}
>

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
function Home({ setIsLoggedIn, demoRole, setDemoRole }) {
 const [activePage, setActivePage] = useState('Dashboard')

const userName =
  demoRole === "Teacher"
    ? "Ahmed Mohamed"
    : "Fatma Gomaa Abd ElZaher"

const userRole = demoRole
  return (
    <div className="home-page">

      {/* Sidebar */}
      <aside className="sidebar">

        {/* Logo */}
        <div className="home-logo">

         <img
  src={logo}
  alt="Elsewedy Logo"
/>

          <div className="home-logo-text">
            <h2>Elsewedy</h2>
            <p>Reward System</p>
          </div>

        </div>
                {/* Sidebar Menu */}
        <nav className="home-menu">

        <button
  className={`home-menu-item ${
    activePage === 'Dashboard' ? 'active' : ''
  }`}
  onClick={() => setActivePage('Dashboard')}
>
  <LayoutDashboard size={19} />
  Dashboard
</button>

<button
  className={`home-menu-item ${
    activePage === 'Points' ? 'active' : ''
  }`}
  onClick={() => setActivePage('Points')}
>
  <Star size={19} />
  Points
</button>

<button
  className={`home-menu-item ${
    activePage === 'Reports' ? 'active' : ''
  }`}
  onClick={() => setActivePage('Reports')}
>
  <FileText size={19} />
  Reports
</button>

<button
  className={`home-menu-item ${
    activePage === 'Automation' ? 'active' : ''
  }`}
  onClick={() => setActivePage('Automation')}
>
  <Settings size={19} />
  Automation
</button>
        </nav>
  {/* Logout */}
  <div className="logout-section">
  <button
    className="logout-button"
    onClick={() => setIsLoggedIn(false)}
  >
    <LogOut size={19} />
    Log out
  </button>
</div>
      </aside>

   {/* Main Page */}
<main className="home-main">

  {activePage === 'Dashboard' && (
    <>
    {userRole === "Student" && (
      <>
      <div className="home-header">
        <div className="welcome-text">
          <h1>Hi, {userName}</h1>
        </div>

       <div className="role-box">
  <select
    value={demoRole}
    onChange={(e) => {
      setDemoRole(e.target.value)
      setActivePage('Dashboard')
    }}
  >
    <option value="Student">Student</option>
    <option value="Teacher">Teacher</option>
    <option value="Management">Management</option>
    <option value="Admin">Admin</option>
  </select>
</div>
      </div>

      <div className="dashboard-content">

        <div className="dashboard-cards">

  <div className="dashboard-card">
    <h3>Total Points</h3>
    <div className="card-value">150</div>
    <p>Current points balance</p>
  </div>

  <div className="dashboard-card">
    <h3>Points Added</h3>
    <div className="card-value">+180</div>
    <p>Total points added</p>
  </div>

  <div className="dashboard-card">
    <h3>Points Deducted</h3>
    <div className="card-value">-30</div>
    <p>Total points deducted</p>
  </div>

</div>
        <div className="dashboard-lower">

          <div className="dashboard-left">

           <div className="dashboard-section information-section">

  <div className="section-header">
    <h3>My Information</h3>
    <span className="section-icon">👤</span>
  </div>

  <div className="information-list">

    <div className="information-item">
      <span>Full Name</span>
      <strong>{userName}</strong>
    </div>

    <div className="information-item">
      <span>Role</span>
      <strong>{userRole}</strong>
    </div>

    <div className="information-item">
      <span>Specialization</span>
      <strong>Computer Programming</strong>
    </div>

    <div className="information-item">
      <span>Student ID</span>
      <strong>ST-001</strong>
    </div>

  </div>

</div>
</div>

          <div className="dashboard-section rank-section">

            <div className="rank-icon">
              🏆
            </div>

            <h3>Your Rank</h3>

            <div className="rank-number">
              #12
            </div>

            <p>Among 120 students</p>

            <div className="rank-divider"></div>

            <div className="rank-change">
              ↑ 3 positions
            </div>

            <span className="rank-week">
              from last week
            </span>

          </div>

        </div>

      </div>
      </>
       )}
       {userRole === "Teacher" && (
  <>
    <div className="home-header">
      <div className="welcome-text">
        <h1>Hi, {userName}</h1>
      </div>

     <div className="role-box">
  <select
    value={demoRole}
    onChange={(e) => {
      setDemoRole(e.target.value)
      setActivePage('Dashboard')
    }}
  >
    <option value="Student">Student</option>
    <option value="Teacher">Teacher</option>
    <option value="Management">Management</option>
    <option value="Admin">Admin</option>
  </select>
</div>
    </div>

    <div className="teacher-dashboard">

      {/* Filters */}
      <div className="teacher-filters">

        <div className="filter-group">
          <label>Select Grade</label>

          <select>
            <option>All Grades</option>
            <option>Junior</option>
            <option>Wheeler</option>
            <option>Senior</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Select Class</label>

          <select>
            <option>All Classes</option>
            <option>J1</option>
            <option>J2</option>
            <option>J3</option>
            <option>J4</option>
            <option>W1</option>
            <option>W2</option>
            <option>W3</option>
            <option>W4</option>
            <option>S1</option>
            <option>S2</option>
            <option>S3</option>
            <option>S4</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Select Student</label>

          <select>
            <option>All Students</option>
            <option>Ahmed Ali</option>
            <option>Sara Mohamed</option>
            <option>Omar Hassan</option>
            <option>Mariam Ahmed</option>
          </select>
        </div>

        <button className="reset-filters-button">
          Reset All
        </button>

      </div>


      {/* Class Overview */}
      <div className="teacher-overview">

        <div className="overview-title">

          <div>
            <h2>Class Overview</h2>

            <p>
              Review the selected class and its students
            </p>
          </div>

          <span className="selected-class">
            J1
          </span>

        </div>


        {/* Summary Cards */}
        <div className="teacher-summary">

          <div className="teacher-summary-card">
            <span>Total Students</span>
            <strong>25</strong>
          </div>

          <div className="teacher-summary-card">
            <span>Total Points</span>
            <strong>3,250</strong>
          </div>

          <div className="teacher-summary-card">
            <span>Average Points</span>
            <strong>130</strong>
          </div>

          <div className="teacher-summary-card">
            <span>Complaints</span>
            <strong>3</strong>
          </div>

        </div>


        {/* Students Table */}
        <div className="teacher-students">

          <div className="teacher-students-header">
            <h3>Students</h3>
          </div>

          <div className="students-table">

            <div className="student-row student-table-header">
              <span>Student</span>
              <span>Class</span>
              <span>Total Points</span>
              <span>Added</span>
              <span>Deducted</span>
              <span>Status</span>
            </div>

            <div className="student-row">

              <span>Ahmed Ali</span>

              <span>J1</span>

              <strong className="student-points">
                150
              </strong>

              <span className="student-added">
                +180
              </span>

              <span className="student-deducted">
                -30
              </span>

              <span>
                <span className="student-status good">
                  Good
                </span>
              </span>

            </div>

            <div className="student-row">

              <span>Sara Mohamed</span>

              <span>J1</span>

              <strong className="student-points">
                145
              </strong>

              <span className="student-added">
                +160
              </span>

              <span className="student-deducted">
                -15
              </span>

              <span>
                <span className="student-status good">
                  Good
                </span>
              </span>

            </div>

            <div className="student-row">

              <span>Omar Hassan</span>

              <span>J1</span>

              <strong className="student-points">
                95
              </strong>

              <span className="student-added">
                +120
              </span>

              <span className="student-deducted">
                -25
              </span>

              <span>
                <span className="student-status attention">
                  Needs Attention
                </span>
              </span>

            </div>

            <div className="student-row">

              <span>Mariam Ahmed</span>

              <span>J1</span>

              <strong className="student-points">
                135
              </strong>

              <span className="student-added">
                +150
              </span>

              <span className="student-deducted">
                -15
              </span>

              <span>
                <span className="student-status good">
                  Good
                </span>
              </span>

            </div>

          </div>

        </div>

      </div>

    </div>
  </>
)}
  {userRole === "Management" && (
  <>
    <div className="home-header">
      <div className="welcome-text">
        <h1>Hi, {userName}</h1>
      </div>

     <div className="role-box">
  <select
    value={demoRole}
    onChange={(e) => {
      setDemoRole(e.target.value)
      setActivePage('Dashboard')
    }}
  >
    <option value="Student">Student</option>
    <option value="Teacher">Teacher</option>
    <option value="Management">Management</option>
    <option value="Admin">Admin</option>
  </select>
</div>
    </div>

    <div className="management-dashboard">

      {/* Page Header */}
      <div className="management-header">
        <h2>School Overview</h2>
        <p>Overview of the school's reward system</p>
      </div>

      {/* Summary Cards */}
      <div className="management-summary">

        <div className="management-card">
          <span>Total Students</span>
          <strong>120</strong>
          <p>Students in the reward system</p>
        </div>

        <div className="management-card">
          <span>Total Points</span>
          <strong>15,240</strong>
          <p>Total points across the school</p>
        </div>

        <div className="management-card">
          <span>Average Points</span>
          <strong>127</strong>
          <p>Average points per student</p>
        </div>

        <div className="management-card">
          <span>Total Complaints</span>
          <strong>12</strong>
          <p>Complaints submitted</p>
        </div>

      </div>

      {/* School Performance */}
      <div className="management-section">

        <div className="management-section-header">
          <h3>School Performance</h3>
          <p>Points overview by grade</p>
        </div>

        <div className="management-table">

          <div className="management-row management-table-header">
            <span>Grade</span>
            <span>Students</span>
            <span>Total Points</span>
            <span>Average Points</span>
          </div>

          <div className="management-row">
            <span>Junior</span>
            <span>40</span>
            <strong>4,850</strong>
            <span>121</span>
          </div>

          <div className="management-row">
            <span>Wheeler</span>
            <span>40</span>
            <strong>5,120</strong>
            <span>128</span>
          </div>

          <div className="management-row">
            <span>Senior</span>
            <span>40</span>
            <strong>5,270</strong>
            <span>132</span>
          </div>

        </div>

      </div>

    </div>
  </>
)}
{/* Admin Dashboard */}
{userRole === "Admin" && (
  <>
    <div className="home-header">

      <div className="welcome-text">
        <h1>Hi, {userName}</h1>
      </div>

      <div className="role-box">
        <select
          value={demoRole}
          onChange={(e) => {
            setDemoRole(e.target.value)
            setActivePage('Dashboard')
          }}
        >
          <option value="Student">Student</option>
          <option value="Teacher">Teacher</option>
          <option value="Management">Management</option>
          <option value="Admin">Admin</option>
        </select>
      </div>

    </div>


    <div className="admin-dashboard">

      {/* Filters */}
      <div className="admin-filters">

        <div className="filter-group">
          <select>
            <option>Select Grade</option>
            <option>Junior</option>
            <option>Wheeler</option>
            <option>Senior</option>
          </select>
        </div>

        <div className="filter-group">
          <select>
            <option>Select Class</option>
            <option>J1</option>
            <option>J2</option>
            <option>J3</option>
            <option>J4</option>
            <option>W1</option>
            <option>W2</option>
            <option>W3</option>
            <option>W4</option>
            <option>S1</option>
            <option>S2</option>
            <option>S3</option>
            <option>S4</option>
          </select>
        </div>

        <div className="filter-group">
          <select>
            <option>Select Student</option>
            <option>Ali Mohamed</option>
            <option>Ahmed Eid</option>
            <option>Ahmed Ali</option>
            <option>Adel Ehab</option>
          </select>
        </div>

        <button className="admin-reset-button">
          Reset All
        </button>

      </div>


      {/* Top Cards */}
      <div className="admin-top-cards">

        <div className="admin-card">
          <span>Highest score student</span>

          <strong>Ali Mohamed</strong>

          <p>
            total points : 50&nbsp;&nbsp; Class:J1
          </p>
        </div>


        <div className="admin-card">
          <span>The Worst Student</span>

          <strong>Ahmed Ali</strong>

          <p>
            total points : 2&nbsp;&nbsp; Class: W3
          </p>
        </div>


        <div className="admin-card">
          <span>Total Points added today</span>

          <strong>49</strong>

          <p>
            Most points for : W2
          </p>
        </div>

      </div>


      {/* Dashboard Lower Section */}
      <div className="admin-dashboard-lower">

        {/* Left Side */}
        <div className="admin-charts">

          {/* Reasons for Discount */}
          <div className="admin-chart-card">

            <h3>Reasons for the discount</h3>

            <div className="admin-bars">

              <div className="admin-bar-row">
                <span>Being late for class</span>
                <div className="admin-bar">
                  <div style={{ width: "80%" }}></div>
                </div>
              </div>

              <div className="admin-bar-row">
                <span>Eating during class</span>
                <div className="admin-bar">
                  <div style={{ width: "55%" }}></div>
                </div>
              </div>

              <div className="admin-bar-row">
                <span>Talk with friends</span>
                <div className="admin-bar">
                  <div style={{ width: "95%" }}></div>
                </div>
              </div>

              <div className="admin-bar-row">
                <span>Assignment was late</span>
                <div className="admin-bar">
                  <div style={{ width: "35%" }}></div>
                </div>
              </div>

            </div>

          </div>


          {/* Reasons for Adding */}
          <div className="admin-chart-card">

            <h3>Reasons for adding</h3>

            <div className="admin-bars">

              <div className="admin-bar-row">
                <span>Helping colleagues</span>
                <div className="admin-bar">
                  <div style={{ width: "55%" }}></div>
                </div>
              </div>

              <div className="admin-bar-row">
                <span>Good behavior</span>
                <div className="admin-bar">
                  <div style={{ width: "90%" }}></div>
                </div>
              </div>

              <div className="admin-bar-row">
                <span>Class participation</span>
                <div className="admin-bar">
                  <div style={{ width: "70%" }}></div>
                </div>
              </div>

              <div className="admin-bar-row">
                <span>Helping teacher</span>
                <div className="admin-bar">
                  <div style={{ width: "45%" }}></div>
                </div>
              </div>

            </div>

          </div>

        </div>


        {/* Top Students */}
        <div className="admin-top-students">

          <h3>Top Students</h3>

          <div className="top-student">
            <span className="student-number">1</span>
            <span>Ali Mohamed</span>
          </div>

          <div className="top-student">
            <span className="student-number">2</span>
            <span>Ahmed Eid</span>
          </div>

          <div className="top-student">
            <span className="student-number">3</span>
            <span>Ahmed Ali</span>
          </div>

          <div className="top-student">
            <span className="student-number">4</span>
            <span>Adel Ehab</span>
          </div>

          <div className="top-student">
            <span className="student-number">5</span>
            <span>Mohamed Ateto</span>
          </div>

          <div className="top-student">
            <span className="student-number">6</span>
            <span>Youssef Mohamed</span>
          </div>

          <div className="top-student">
            <span className="student-number">7</span>
            <span>Yassin Ahmed</span>
          </div>

        </div>

      </div>

    </div>
  </>
)}
    </>
  )}

{activePage === 'Points' && (
  <>
   {userRole === "Student" && ( 
    <>
    <div className="home-header">
      <div className="welcome-text">
        <h1>Hi, {userName}</h1>
      </div>

      <div className="role-box">
        <strong>{userRole}</strong>
      </div>
    </div>

    <div className="points-page">

      {/* Points Summary */}
      <div className="points-summary">

        <div className="points-summary-card">
          <span>Total Points</span>
          <strong>150</strong>
        </div>

        <div className="points-summary-card">
          <span>Points Added</span>
          <strong>+180</strong>
        </div>

        <div className="points-summary-card">
          <span>Points Deducted</span>
          <strong>-30</strong>
        </div>

      </div>

      {/* Points History */}
      <div className="points-history">

        <div className="points-history-header">
          <h3>Points History</h3>
        </div>

        <div className="points-table">

          {/* Header */}
          <div className="points-table-row points-table-header">
            <span>Activity</span>
            <span>Type</span>
            <span>Points</span>
            <span>Reason</span>
            <span>Added By</span>
            <span>Date</span>
          </div>

          {/* Row 1 */}
          <div className="points-table-row">

            <span>School Attendance</span>

            <span>
              <span className="points-badge added">
                Added
              </span>
            </span>

            <strong className="points-added">
              +10
            </strong>

            <span>Good attendance</span>

            <span>Mr. Ahmed</span>

            <span>Sep 9, 2026</span>

          </div>

          {/* Row 2 */}
          <div className="points-table-row">

            <span>Good Behavior</span>

            <span>
              <span className="points-badge added">
                Added
              </span>
            </span>

            <strong className="points-added">
              +15
            </strong>

            <span>Excellent behavior</span>

            <span>Ms. Sara</span>

            <span>Sep 8, 2026</span>

          </div>

          {/* Row 3 */}
          <div className="points-table-row">

            <span>Class Participation</span>

            <span>
              <span className="points-badge added">
                Added
              </span>
            </span>

            <strong className="points-added">
              +20
            </strong>

            <span>Active participation</span>

            <span>Mr. Mohamed</span>

            <span>Sep 7, 2026</span>

          </div>

          {/* Row 4 */}
          <div className="points-table-row">

            <span>Late to Class</span>

            <span>
              <span className="points-badge deducted">
                Deducted
              </span>
            </span>

            <strong className="points-deducted">
              -10
            </strong>

            <span>Late arrival</span>

            <span>Mr. Ahmed</span>

            <span>Sep 6, 2026</span>

          </div>

        </div>

      </div>

    </div>
     </>
)}
{userRole === "Teacher" && (
  <>
    <div className="home-header">
      <div className="welcome-text">
        <h1>Hi, {userName}</h1>
      </div>

      <div className="role-box">
        <strong>{userRole}</strong>
      </div>
    </div>

    <div className="teacher-points-page">

      <div className="teacher-points-header">
        <h2>Manage Student Points</h2>
        <p>Add or deduct points from students</p>
      </div>

      {/* Student Selection */}
      <div className="teacher-points-filters">

        <div className="filter-group">
          <label>Select Grade</label>
          <select>
            <option>Junior</option>
            <option>Wheeler</option>
            <option>Senior</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Select Class</label>
          <select>
            <option>J1</option>
            <option>J2</option>
            <option>J3</option>
            <option>J4</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Select Student</label>
          <select>
            <option>Ahmed Ali</option>
            <option>Sara Mohamed</option>
            <option>Omar Hassan</option>
            <option>Mariam Ahmed</option>
          </select>
        </div>

      </div>

      {/* Update Points */}
      <div className="points-action-card">

        <h3>Update Points</h3>

        <div className="points-action-form">

          <div className="filter-group">
            <label>Action</label>
            <select>
              <option>Add Points</option>
              <option>Deduct Points</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Points</label>
            <input
              type="number"
              placeholder="Enter points"
            />
          </div>

          <div className="filter-group reason-group">
            <label>Reason</label>
            <input
              type="text"
              placeholder="Enter reason"
            />
          </div>

          <button className="update-points-button">
            Update Points
          </button>

        </div>

      </div>

      {/* Current Points */}
      <div className="current-points-card">
        <span>Current Points</span>

        <strong>150</strong>

        <p>Ahmed Ali • J1</p>
      </div>

      {/* Recent Activities */}
      <div className="recent-activities">

        <div className="recent-activities-header">
          <h3>Recent Point Activities</h3>
        </div>

        <div className="activity-row activity-header">
          <span>Student</span>
          <span>Action</span>
          <span>Points</span>
          <span>Reason</span>
          <span>Date</span>
        </div>

        <div className="activity-row">
          <span>Ahmed Ali</span>
          <span className="activity-add">Added</span>
          <strong className="student-added">+20</strong>
          <span>Good behavior</span>
          <span>Sep 9, 2026</span>
        </div>

        <div className="activity-row">
          <span>Omar Hassan</span>
          <span className="activity-deduct">Deducted</span>
          <strong className="student-deducted">-10</strong>
          <span>Late to class</span>
          <span>Sep 8, 2026</span>
        </div>

      </div>

    </div>
  </>
)}
{userRole === "Management" && (
  <>
    <div className="home-header">
      <div className="welcome-text">
        <h1>Hi, {userName}</h1>
      </div>

      <div className="role-box">
        <strong>{userRole}</strong>
      </div>
    </div>

    <div className="management-points-page">

      {/* Page Header */}
      <div className="management-points-header">
        <h2>Points Overview</h2>
        <p>Review and filter points across the school</p>
      </div>

      {/* Filters */}
      <div className="management-points-filters">

        <div className="filter-group">
          <label>Select Grade</label>

          <select>
            <option>All Grades</option>
            <option>Junior</option>
            <option>Wheeler</option>
            <option>Senior</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Select Class</label>

          <select>
            <option>All Classes</option>
            <option>J1</option>
            <option>J2</option>
            <option>J3</option>
            <option>J4</option>
            <option>W1</option>
            <option>W2</option>
            <option>W3</option>
            <option>W4</option>
            <option>S1</option>
            <option>S2</option>
            <option>S3</option>
            <option>S4</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Select Student</label>

          <select>
            <option>All Students</option>
            <option>Ahmed Ali</option>
            <option>Sara Mohamed</option>
            <option>Omar Hassan</option>
            <option>Mariam Ahmed</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Point Type</label>

          <select>
            <option>All</option>
            <option>Added</option>
            <option>Deducted</option>
          </select>
        </div>

        <button className="management-points-filter-button">
          Apply Filters
        </button>

      </div>

      {/* Summary */}
      <div className="management-points-summary">

        <div className="management-points-card">
          <span>Total Points</span>
          <strong>15,240</strong>
        </div>

        <div className="management-points-card">
          <span>Points Added</span>
          <strong>17,850</strong>
        </div>

        <div className="management-points-card">
          <span>Points Deducted</span>
          <strong>-2,610</strong>
        </div>

      </div>

      {/* Points History */}
      <div className="management-points-table-card">

        <div className="management-points-table-header">
          <h3>Points History</h3>
          <p>Recent point activities across the school</p>
        </div>

        <div className="management-points-table">

          <div className="management-points-row management-points-table-head">
            <span>Student</span>
            <span>Class</span>
            <span>Type</span>
            <span>Points</span>
            <span>Reason</span>
            <span>Added By</span>
            <span>Date</span>
          </div>

          <div className="management-points-row">
            <span>Ahmed Ali</span>
            <span>J1</span>

            <span className="management-point-type added">
              Added
            </span>

            <strong className="management-point-value added">
              +20
            </strong>

            <span>Good Behavior</span>
            <span>Mr. Ahmed</span>
            <span>Sep 9, 2026</span>
          </div>

          <div className="management-points-row">
            <span>Sara Mohamed</span>
            <span>J2</span>

            <span className="management-point-type added">
              Added
            </span>

            <strong className="management-point-value added">
              +15
            </strong>

            <span>Class Participation</span>
            <span>Ms. Sara</span>
            <span>Sep 8, 2026</span>
          </div>

          <div className="management-points-row">
            <span>Omar Hassan</span>
            <span>W2</span>

            <span className="management-point-type deducted">
              Deducted
            </span>

            <strong className="management-point-value deducted">
              -10
            </strong>

            <span>Late</span>
            <span>Mr. Ahmed</span>
            <span>Sep 8, 2026</span>
          </div>

          <div className="management-points-row">
            <span>Mariam Ahmed</span>
            <span>S1</span>

            <span className="management-point-type added">
              Added
            </span>

            <strong className="management-point-value added">
              +25
            </strong>

            <span>Excellent Behavior</span>
            <span>Ms. Sara</span>
            <span>Sep 7, 2026</span>
          </div>

        </div>

      </div>

    </div>
  </>
)}
 {userRole === "Admin" && (
  <div className="admin-points-page">

    {/* Page Header */}
    <div className="admin-points-header">
      <div>
        <h1>Points Management</h1>
        <p>Review and manage school points</p>
      </div>
    </div>

    {/* Filters */}
    <div className="admin-points-filters">

      <div className="admin-filter-group">
        <label>Grade</label>
        <select>
          <option>All Grades</option>
          <option>Grade 1</option>
          <option>Grade 2</option>
          <option>Grade 3</option>
        </select>
      </div>

      <div className="admin-filter-group">
        <label>Class</label>
        <select>
          <option>All Classes</option>
          <option>Class A</option>
          <option>Class B</option>
          <option>Class C</option>
        </select>
      </div>

      <div className="admin-filter-group">
        <label>Point Type</label>
        <select>
          <option>All Types</option>
          <option>Attendance</option>
          <option>Behavior</option>
          <option>Interaction</option>
        </select>
      </div>

      <div className="admin-filter-group">
        <label>Period</label>
        <select>
          <option>This Week</option>
          <option>Today</option>
          <option>This Month</option>
        </select>
      </div>

      <button className="admin-reset-points-button">
        Reset
      </button>

    </div>

    {/* Summary Cards */}
    <div className="admin-points-summary">

      <div className="admin-points-card">
        <span>Total Points Added</span>
        <strong>12,500</strong>
        <p>Across the school</p>
      </div>

      <div className="admin-points-card">
        <span>Total Points Deducted</span>
        <strong>-2,300</strong>
        <p>Across the school</p>
      </div>

      <div className="admin-points-card">
        <span>Net Points</span>
        <strong>10,200</strong>
        <p>Current balance</p>
      </div>

      <div className="admin-points-card">
        <span>Students Affected</span>
        <strong>185</strong>
        <p>Active students</p>
      </div>

    </div>

    {/* Point Rules */}
    <div className="admin-point-rules">

      <div className="admin-section-header">
        <div>
          <h2>Point Rules & Automation</h2>
          <p>Manage automatic points assigned to students</p>
        </div>
      </div>

      <div className="admin-rules-list">

        <div className="admin-rule-row">
          <div>
            <strong>Daily Attendance</strong>
            <span>Points for attending the school day</span>
          </div>

          <strong className="admin-positive-points">+100</strong>

          <button className="admin-edit-rule-button">
            Edit
          </button>
        </div>

        <div className="admin-rule-row">
          <div>
            <strong>Full Week Attendance</strong>
            <span>Bonus for attending all school days</span>
          </div>

          <strong className="admin-positive-points">+500</strong>

          <button className="admin-edit-rule-button">
            Edit
          </button>
        </div>

        <div className="admin-rule-row">
          <div>
            <strong>Correct Answer</strong>
            <span>Points for correct class answers</span>
          </div>

          <strong className="admin-positive-points">+100</strong>

          <button className="admin-edit-rule-button">
            Edit
          </button>
        </div>

        <div className="admin-rule-row">
          <div>
            <strong>Wrong Answer</strong>
            <span>Points deducted for wrong answers</span>
          </div>

          <strong className="admin-negative-points">-50</strong>

          <button className="admin-edit-rule-button">
            Edit
          </button>
        </div>

        <div className="admin-rule-row">
          <div>
            <strong>Positive Behavior</strong>
            <span>Reward for positive behavior</span>
          </div>

          <strong className="admin-positive-points">+50</strong>

          <button className="admin-edit-rule-button">
            Edit
          </button>
        </div>

        <div className="admin-rule-row">
          <div>
            <strong>Teacher Interaction</strong>
            <span>Points for active participation</span>
          </div>

          <strong className="admin-positive-points">+25</strong>

          <button className="admin-edit-rule-button">
            Edit
          </button>
        </div>

      </div>

    </div>

    {/* Recent Activity */}
    <div className="admin-recent-points">

      <div className="admin-section-header">
        <div>
          <h2>Recent Points Activity</h2>
          <p>Latest points added or deducted</p>
        </div>
      </div>

      <div className="admin-points-table">

        <div className="admin-points-table-row admin-points-table-header">
          <span>Student</span>
          <span>Class</span>
          <span>Type</span>
          <span>Points</span>
          <span>Date</span>
        </div>

        <div className="admin-points-table-row">
          <span>Ahmed Ali</span>
          <span>3A</span>
          <span>Attendance</span>
          <strong className="admin-positive-points">+100</strong>
          <span>Today</span>
        </div>

        <div className="admin-points-table-row">
          <span>Mariam Ahmed</span>
          <span>3B</span>
          <span>Behavior</span>
          <strong className="admin-positive-points">+50</strong>
          <span>Today</span>
        </div>

        <div className="admin-points-table-row">
          <span>Omar Khaled</span>
          <span>3A</span>
          <span>Wrong Answer</span>
          <strong className="admin-negative-points">-50</strong>
          <span>Today</span>
        </div>

        <div className="admin-points-table-row">
          <span>Sara Mohamed</span>
          <span>3C</span>
          <span>Interaction</span>
          <strong className="admin-positive-points">+25</strong>
          <span>Yesterday</span>
        </div>

      </div>

    </div>

  </div>
)}
  </>
)}

{activePage === 'Reports' && (
  <>
   {userRole === "Student" && (
      <>
    <div className="home-header">
      <div className="welcome-text">
        <h1>Hi, {userName}</h1>
      </div>

      <div className="role-box">
        <strong>{userRole}</strong>
      </div>
    </div>

    <div className="reports-page">

      {/* Submit Complaint */}
      <div className="report-card">

        <div className="report-card-header">
          <h3>Submit a Complaint</h3>
          <p>Submit a complaint or appeal regarding your points</p>
        </div>

        <form className="complaint-form">

          <div className="form-group">
            <label>Complaint Title</label>

            <input
              type="text"
              placeholder="Enter complaint title"
            />
          </div>

          <div className="form-group">
            <label>Complaint Details</label>

            <textarea
              placeholder="Describe your complaint..."
              rows="5"
            ></textarea>
          </div>

          <button
            type="button"
            className="submit-complaint-button"
          >
            Submit Complaint
          </button>

        </form>

      </div>


      {/* Previous Complaints */}
      <div className="report-card">

        <div className="report-card-header">
          <h3>My Complaints</h3>
          <p>View your previous complaints and responses</p>
        </div>

        <div className="complaints-table">

          <div className="complaint-row complaint-header">
            <span>Title</span>
            <span>Date</span>
            <span>Status</span>
            <span>Response</span>
          </div>

          <div className="complaint-row">
            <span>Points Deduction</span>
            <span>Sep 6, 2026</span>

            <span>
              <span className="complaint-status pending">
                Pending
              </span>
            </span>

            <span>Waiting for review</span>
          </div>

          <div className="complaint-row">
            <span>Incorrect Points</span>
            <span>Sep 2, 2026</span>

            <span>
              <span className="complaint-status resolved">
                Resolved
              </span>
            </span>

            <span>Points were corrected</span>
          </div>

        </div>

      </div>

    </div>
      </>
)}
 {/* Teacher Reports */}
    {userRole === "Teacher" && (
      <>
        <div className="home-header">

          <div className="welcome-text">
            <h1>Hi, {userName}</h1>
          </div>

          <div className="role-box">
            <strong>{userRole}</strong>
          </div>

        </div>

        <div className="teacher-reports-page">

          <div className="teacher-reports-header">
            <h2>Student Complaints</h2>
            <p>Review complaints and respond to students</p>
          </div>

          <div className="teacher-reports-card">

            <div className="teacher-reports-card-header">
              <h3>Complaints</h3>

              <select>
                <option>All Status</option>
                <option>Pending</option>
                <option>Resolved</option>
              </select>
            </div>

            <div className="teacher-complaints-table">

              <div className="teacher-complaint-row teacher-complaint-header">
                <span>Student</span>
                <span>Class</span>
                <span>Complaint</span>
                <span>Date</span>
                <span>Status</span>
                <span>Action</span>
              </div>

              <div className="teacher-complaint-row">

                <span>Ahmed Ali</span>

                <span>J1</span>

                <span>Points Deduction</span>

                <span>Sep 6, 2026</span>

                <span>
                  <span className="teacher-complaint-status pending">
                    Pending
                  </span>
                </span>

                <button className="view-complaint-button">
                  Review
                </button>

              </div>

              <div className="teacher-complaint-row">

                <span>Sara Mohamed</span>

                <span>J1</span>

                <span>Incorrect Points</span>

                <span>Sep 5, 2026</span>

                <span>
                  <span className="teacher-complaint-status resolved">
                    Resolved
                  </span>
                </span>

                <button className="view-complaint-button">
                  View
                </button>

              </div>

              <div className="teacher-complaint-row">

                <span>Omar Hassan</span>

                <span>J1</span>

                <span>Points Deduction</span>

                <span>Sep 4, 2026</span>

                <span>
                  <span className="teacher-complaint-status pending">
                    Pending
                  </span>
                </span>

                <button className="view-complaint-button">
                  Review
                </button>

              </div>

            </div>

          </div>

          {/* Response */}
          <div className="teacher-response-card">

            <div className="teacher-response-header">
              <h3>Respond to Complaint</h3>
              <p>Ahmed Ali • Points Deduction</p>
            </div>

            <div className="teacher-response-body">

              <label>Response</label>

              <textarea
                placeholder="Write your response to the student..."
                rows="5"
              ></textarea>

              <div className="response-buttons">

                <button className="send-response-button">
                  Send Response
                </button>

                <button className="resolve-button">
                  Mark as Resolved
                </button>

              </div>

            </div>

          </div>

        </div>
      </>
    )}
{/* Management Reports */}
{userRole === "Management" && (
  <>
    <div className="home-header">

      <div className="welcome-text">
        <h1>Hi, {userName}</h1>
      </div>

      <div className="role-box">
        <select
          value={demoRole}
          onChange={(e) => {
            setDemoRole(e.target.value)
            setActivePage('Dashboard')
          }}
        >
          <option value="Student">Student</option>
          <option value="Teacher">Teacher</option>
          <option value="Management">Management</option>
          <option value="Admin">Admin</option>
        </select>
      </div>

    </div>


    <div className="management-reports-page">

      <div className="management-reports-header">
        <h2>School Reports</h2>
        <p>Review complaints and reports across the school</p>
      </div>


      {/* Filters */}
      <div className="management-report-filters">

        <div className="filter-group">
          <label>Select Grade</label>

          <select>
            <option>All Grades</option>
            <option>Junior</option>
            <option>Wheeler</option>
            <option>Senior</option>
          </select>
        </div>


        <div className="filter-group">
          <label>Select Class</label>

          <select>
            <option>All Classes</option>
            <option>J1</option>
            <option>J2</option>
            <option>J3</option>
            <option>J4</option>
            <option>W1</option>
            <option>W2</option>
            <option>W3</option>
            <option>W4</option>
            <option>S1</option>
            <option>S2</option>
            <option>S3</option>
            <option>S4</option>
          </select>
        </div>


        <div className="filter-group">
          <label>Report Type</label>

          <select>
            <option>Complaints Report</option>
            <option>Points Report</option>
          </select>
        </div>


        <div className="filter-group">
          <label>Date</label>

          <select>
            <option>All Dates</option>
            <option>Today</option>
            <option>This Week</option>
            <option>This Month</option>
          </select>
        </div>


        <button className="apply-report-filter-button">
          Apply Filters
        </button>

      </div>


      {/* Summary */}
      <div className="management-report-summary">

        <div className="management-report-card">
          <span>Total Complaints</span>
          <strong>12</strong>
        </div>

        <div className="management-report-card">
          <span>Pending</span>
          <strong>4</strong>
        </div>

        <div className="management-report-card">
          <span>Resolved</span>
          <strong>8</strong>
        </div>

      </div>


      {/* Complaints Table */}
      <div className="management-complaints-section">

        <div className="management-complaints-header">
          <h3>Complaints & Responses</h3>
          <p>Review complaints submitted by students</p>
        </div>


        <div className="management-complaints-table">

          <div className="management-complaint-row management-complaint-header">
            <span>Student</span>
            <span>Class</span>
            <span>Complaint</span>
            <span>Date</span>
            <span>Status</span>
            <span>Response</span>
          </div>


          <div className="management-complaint-row">

            <span>Ahmed Ali</span>

            <span>J1</span>

            <span>Points Deduction</span>

            <span>Sep 6, 2026</span>

            <span>
              <span className="management-complaint-status pending">
                Pending
              </span>
            </span>

            <span>Waiting for review</span>

          </div>


          <div className="management-complaint-row">

            <span>Sara Mohamed</span>

            <span>J1</span>

            <span>Incorrect Points</span>

            <span>Sep 5, 2026</span>

            <span>
              <span className="management-complaint-status resolved">
                Resolved
              </span>
            </span>

            <span>Points were corrected</span>

          </div>


          <div className="management-complaint-row">

            <span>Omar Hassan</span>

            <span>J2</span>

            <span>Points Deduction</span>

            <span>Sep 4, 2026</span>

            <span>
              <span className="management-complaint-status pending">
                Pending
              </span>
            </span>

            <span>Waiting for review</span>

          </div>

        </div>

      </div>

    </div>
  </>
)}
{/* ================= ADMIN REPORTS ================= */}

{ userRole === "Admin" && (
  <div className="admin-reports-page">

    {/* Filters */}
    <div className="admin-report-filters">

      <select>
        <option>Select Grade</option>
        <option>Grade 1</option>
        <option>Grade 2</option>
        <option>Grade 3</option>
      </select>

      <select>
        <option>Select Class</option>
        <option>Class A</option>
        <option>Class B</option>
        <option>Class C</option>
      </select>

      <select>
        <option>Select Student</option>
        <option>Ahmed Ali</option>
        <option>Mariam Ahmed</option>
        <option>Omar Khaled</option>
      </select>

      <button className="admin-reset-button">
        Reset All
      </button>

    </div>


    {/* Report Card */}
    <div className="admin-report-card">

      <div className="admin-report-card-title">
        <h2>Points Were Deducted by Mistake</h2>
      </div>

      <div className="admin-report-info">
        By Ali Mohamed&nbsp;&nbsp;&nbsp; Class: W2&nbsp;&nbsp;&nbsp; 12:17 PM
      </div>

      <p className="admin-report-description">
        I believe points were deducted from my account by mistake.
        I followed the school rules and did not commit any violation
        that would justify the deduction. Kindly review my point history
        and verify the reason for this deduction.
      </p>

      <p className="admin-report-description">
        If an error has occurred, I respectfully request that my points
        be restored. Thank you.
      </p>


      <div className="admin-report-actions">

        <button className="admin-reply-button">
          Reply
          <Send size={13} />
        </button>

        <button className="admin-show-more">
          Show More
          <ChevronDown size={13} />
        </button>

      </div>

    </div>

  </div>
)}
  </>
)}


{/* ================= ADMIN AUTOMATION ================= */}

{activePage === "Automation" && userRole === "Admin" && (
  <div className="admin-automation-page">

    {/* Attendance Points */}
    <div className="automation-card">

      <h2>Attendance points</h2>

      <div className="automation-grid">

        <div className="automation-field">
          <label>Late Points</label>
          <input type="number" />
        </div>

        <div className="automation-field">
          <label>Present Points</label>
          <input type="number" />
        </div>

        <div className="automation-field">
          <label>Perfect Attendance</label>
          <input type="number" />
        </div>

        <div className="automation-field">
          <label>Absent Points</label>
          <input type="number" />
        </div>

      </div>

      <div className="automation-single-field">
        <label>Excused Absence</label>
        <input type="number" />
      </div>

    </div>


    {/* Capstone Points */}
    <div className="automation-card">

      <h2>Capstone points</h2>

      <div className="automation-grid">

        <div className="automation-field">
          <label>Task Submitted</label>
          <input type="number" />
        </div>

        <div className="automation-field">
          <label>Task Missing</label>
          <input type="number" />
        </div>

      </div>

    </div>

  </div>
)}


</main>
    </div>
  )
}
export default App