import axios from 'axios'

const API_URL = 'https://pruzhak-backend.vercel.app/api/concert'

export const getAllConcerts = async () => {
  try {
    const response = await axios.get(API_URL)
    return response.data
  } catch (error) {
    throw error.response?.data || error
  }
}

export const getConcertById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`)
    return response.data
  } catch (error) {
    throw error.response?.data || error
  }
}

export const checkIfPlanned = async (userId, concertId) => {
  try {
    const response = await axios.get(`http://localhost:5000/user/checkPlan/${userId}/${concertId}`)
    return { success: true, inPlans: response.data.inPlans }
  } catch (error) {
    return { success: false, error: error.message }
  }
}
