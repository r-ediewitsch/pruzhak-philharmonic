import axios from 'axios'

const API_URL = 'https://pruzhak-backend.vercel.app/user'

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      email,
      password
    })
    return { success: true, ...response.data }
  } catch (error) {
    return { success: false, message: error.response?.data?.message || 'Login failed' }
  }
}

export const register = async (fullname, email, password) => {
  try {
    const response = await axios.post(`${API_URL}/register`, {
      fullname,
      email,
      password
    })
    return { success: true, ...response.data }
  } catch (error) {
    return { success: false, message: error.response?.data?.message || 'Registration failed' }
  }
}

export const addToPlan = async (userId, concertId) => {
  try {
    const response = await axios.post(`${API_URL}/addPlan/${userId}`, {
      concertId
    })
    return { success: true, ...response.data }
  } catch (error) {
    return { success: false, message: error.response?.data?.message || 'Failed to add to plans' }
  }
}

export const addPlan = async (userId, concertId) => {
  try {
    const response = await axios.post(`${API_URL}/addPlan/${userId}`, {
      concertId
    })
    return { success: true, data: response.data }
  } catch (error) {
    return { 
      success: false, 
      message: error.response?.data?.message || 'Failed to add to plans' 
    }
  }
}

export const getUserPlans = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/plans/${userId}`)
    return response.data
  } catch (error) {
    throw error.response?.data || error
  }
}

export const updateUsername = async (userId, fullname) => {
  try {
    const response = await axios.put(`${API_URL}/updateFullname/${userId}`, {
      fullname
    })
    if (response.data.success) {
      return { success: true, data: response.data.data }
    } else {
      throw new Error(response.data.message)
    }
  } catch (error) {
    return { 
      success: false, 
      message: error.response?.data?.message || 'Failed to update username' 
    }
  }
}

export const updatePassword = async (userId, oldPassword, newPassword) => {
  try {
    const response = await axios.put(`${API_URL}/updatePassword/${userId}`, {
      oldPassword,
      newPassword
    })
    if (response.data.success) {
      return { success: true }
    } else {
      throw new Error(response.data.message)
    }
  } catch (error) {
    return { 
      success: false, 
      message: error.response?.data?.message || 'Failed to update password' 
    }
  }
}

export const checkIfInPlans = async (userId, concertId) => {
  try {
    const response = await axios.get(`${API_URL}/plans/${userId}`)
    const plans = response.data.data
    return plans.some(concert => concert._id === concertId)
  } catch (error) {
    console.error('Error checking plans:', error)
    return false
  }
}
