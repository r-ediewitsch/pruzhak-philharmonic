import axios from 'axios'

const API_URL = 'https://pruzhak-backend.vercel.app/ticket'

export const createTicket = async (ticketData) => {
  try {
    const params = new URLSearchParams();
    params.append('concert', ticketData.concert);
    params.append('user', ticketData.user);
    params.append('seating', ticketData.seating);
    params.append('seat', ticketData.seat);

    const response = await axios.post(API_URL, params, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    return { success: true, data: response.data }
  } catch (error) {
    return { 
      success: false, 
      message: error.response?.data?.message || 'Failed to create ticket' 
    }
  }
}

export const getUserTickets = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/user/${userId}`)
    return response.data
  } catch (error) {
    throw error.response?.data || error
  }
}

export const checkSeatAvailability = async (concertId, seatNumber) => {
  try {
    const response = await axios.get(`${API_URL}/check-seat/${concertId}/${seatNumber}`)
    return response.data
  } catch (error) {
    throw error.response?.data || error
  }
}
