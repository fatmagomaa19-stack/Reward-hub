
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || '/api-proxy'
async function request(endpoint, options = {}) {
  const token = localStorage.getItem('jwtToken')

  const headers = {
    Accept: 'application/json',
    ...(options.body && {
      'Content-Type': 'application/json',
    }),
    ...(token && {
      Authorization: `Bearer ${token}`,
    }),
    ...options.headers,
  }

  let response

  try {
    response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    })
  } catch (error) {
    console.error('API CONNECTION ERROR:', error)
    throw new Error(
      'Cannot connect to Reward Hub API.'
    )
  }

  const text = await response.text()

  let data = null

  try {
    data = text ? JSON.parse(text) : null
  } catch {
    data = text
  }

  console.log(
    `API ${options.method || 'GET'} ${endpoint}:`,
    response.status,
    data
  )

  if (response.status === 401) {
    const error = new Error('Invalid email or password.')
    error.status = 401
    error.data = data
    throw error
  }

  if (!response.ok) {
    const message =
      data?.message ||
      data?.error ||
      data?.title ||
      (typeof data === 'string' ? data : null) ||
      `Request failed: ${response.status}`

    const error = new Error(message)
    error.status = response.status
    error.data = data

    throw error
  }

  return data
}

export const api = {
  login: (email, password, businessEntityId = 1) =>
    request(`/api/Auth/login/${businessEntityId}`, {
      method: 'POST',
      body: JSON.stringify({
        email,
        password,
      }),
    }),

  profile: () =>
    request('/api/Account/profile'),

  updateProfile: (body) =>
    request('/api/Account/profile', {
      method: 'PUT',
      body: JSON.stringify(body),
    }),

  changePassword: (body) =>
    request('/api/Account/change-password', {
      method: 'POST',
      body: JSON.stringify(body),
    }),

  verifyIdentity: (body) =>
    request('/api/Account/verify-identity', {
      method: 'POST',
      body: JSON.stringify(body),
    }),

  resetPassword: (body) =>
    request('/api/Account/reset-password', {
      method: 'POST',
      body: JSON.stringify(body),
    }),

  businessEntities: () =>
    request('/api/BusinessEntity/public'),

  myEntities: () =>
    request('/api/BusinessEntity/my-entities'),

  getBusinessEntities: () =>
    request('/api/BusinessEntity'),

  getBusinessEntity: (id) =>
    request(`/api/BusinessEntity/${id}`),

  students: ({
    gradeId = '',
    classId = '',
    search = '',
    page = 1,
    pageSize = 20,
  } = {}) => {
    const params = new URLSearchParams()

    if (gradeId !== '') params.set('gradeId', gradeId)
    if (classId !== '') params.set('classId', classId)
    if (search) params.set('search', search)

    params.set('page', page)
    params.set('pageSize', pageSize)

    return request(`/api/Students?${params.toString()}`)
  },

  student: (id) =>
    request(`/api/Students/${id}`),

  studentPoints: (id) =>
    request(`/api/Students/${id}/points`),

  studentHistory: (id) =>
    request(`/api/Students/${id}/points/history`),

  studentRank: (id) =>
    request(`/api/Students/${id}/rank`),

  teacherOverview: () =>
    request('/api/Teachers/class-overview'),

  adminDashboard: () =>
    request('/api/Admin/dashboard'),

  adminPointsSummary: () =>
    request('/api/Admin/points/summary'),

  topStudents: () =>
    request('/api/Admin/top-students'),

  pointRules: () =>
    request('/api/Admin/points/rules'),

  updatePointRule: (id, body) =>
    request(`/api/Admin/points/rules/${id}`, {
      method: 'PUT',
      body: JSON.stringify(body),
    }),

  recentActivity: () =>
    request('/api/Admin/points/recent-activity'),

  additionReasons: () =>
    request('/api/Admin/charts/addition-reasons'),

  deductionReasons: () =>
    request('/api/Admin/charts/deduction-reasons'),

  rewardsMe: () =>
    request('/api/Rewards/me'),

  rewardsStudents: () =>
    request('/api/Rewards/students'),

  rewards: () =>
    request('/api/Rewards'),

  createReward: (body) =>
    request('/api/Rewards', {
      method: 'POST',
      body: JSON.stringify(body),
    }),

  rewardSettings: () =>
    request('/api/Rewards/settings'),

  updateRewardSetting: (id, body) =>
    request(`/api/Rewards/settings/${id}`, {
      method: 'PUT',
      body: JSON.stringify(body),
    }),

  rewardStats: () =>
    request('/api/Rewards/stats'),

  roles: () =>
    request('/api/Role'),

  role: (id) =>
    request(`/api/Role/${id}`),

  accountRole: (businessEntityId) =>
    request(`/api/Role/account/${businessEntityId}`),

  grades: () =>
    request('/api/ReferenceData/grades'),

  classes: () =>
    request('/api/ReferenceData/classes'),
}

export function unwrap(data) {
  if (!data) return null

  if (Array.isArray(data)) {
    return data
  }

  if (data.data !== undefined) {
    return unwrap(data.data)
  }

  if (data.result !== undefined) {
    return unwrap(data.result)
  }

  return data
}

export function getArray(data) {
  const value = unwrap(data)

  if (Array.isArray(value)) {
    return value
  }

  if (!value || typeof value !== 'object') {
    return []
  }

  const possibleKeys = [
    'items',
    'results',
    'students',
    'records',
    'history',
    'activities',
    'rules',
    'rewards',
    'classes',
    'data',
  ]

  for (const key of possibleKeys) {
    if (Array.isArray(value[key])) {
      return value[key]
    }
  }

  return []
}

export function getValue(
  object,
  keys,
  fallback = '—'
) {
  if (!object) return fallback

  for (const key of keys) {
    if (
      object[key] !== undefined &&
      object[key] !== null
    ) {
      return object[key]
    }
  }

  return fallback
}

export function getNumber(
  object,
  keys,
  fallback = 0
) {
  const value = getValue(
    object,
    keys,
    fallback
  )

  const number = Number(value)

  return Number.isFinite(number)
    ? number
    : fallback
}

