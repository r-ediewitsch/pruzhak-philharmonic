import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { Navigate } from 'react-router-dom'
import { getUserTickets } from '../actions/ticket.action'

function Tickets() {
  const [tickets, setTickets] = useState([])
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()

  useEffect(() => {
    if (user) {
      fetchTickets()
    }
  }, [user])

  const fetchTickets = async () => {
    try {
      const response = await getUserTickets(user._id)
      setTickets(response.data)
    } catch (error) {
      console.error('Error fetching tickets:', error)
    } finally {
      setLoading(false)
    }
  }

  if (!user) return <Navigate to="/login" />
  if (loading) return (
    <div className="flex items-center justify-center min-h-screen text-secondary font-playfair">
      Loading...
    </div>
  )

  return (
    <div>
      <h2 className="text-3xl font-bold mb-8 font-playfair text-secondary text-center">My Tickets</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tickets.map((ticket) => (
          <div 
            key={ticket._id} 
            className="bg-dark rounded-lg shadow-md overflow-hidden border border-secondary/20"
          >
            <img 
              src={ticket.concert.coverImage} 
              alt={ticket.concert.title} 
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-bold mb-4 font-playfair text-secondary">{ticket.concert.title}</h3>
              <p className="text-secondary/80 font-playfair mb-2">
                {new Date(ticket.concert.date).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
              <div className="flex justify-between items-center mt-4 pt-4 border-t border-secondary/20">
                <span className="text-secondary/80 font-playfair">Seat: {ticket.seat}</span>
                <span className="text-secondary/80 font-playfair capitalize">{ticket.seating}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      {tickets.length === 0 && (
        <p className="text-center text-secondary/80 font-playfair">
          You haven't booked any tickets yet.
        </p>
      )}
    </div>
  )
}

export default Tickets
