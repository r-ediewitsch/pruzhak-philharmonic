import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { createTicket } from '../actions/ticket.action'
import { getConcertById } from '../actions/concert.action'
import { checkSeatAvailability } from '../actions/ticket.action'

function TicketBooking() {
  const [concert, setConcert] = useState(null)
  const [loading, setLoading] = useState(true)
  const [ticketType, setTicketType] = useState('regular')
  const [generatedSeat, setGeneratedSeat] = useState('')
  const { id } = useParams()
  const { user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    fetchConcert()
  }, [id])

  const fetchConcert = async () => {
    try {
      const response = await getConcertById(id)
      setConcert(response.data)
      setLoading(false)
    } catch (error) {
      console.error('Error:', error)
      setLoading(false)
    }
  }

  const generateSeatNumber = async (attempts = 0) => {
    // Limit recursion to prevent infinite loops
    if (attempts >= 10) {
      alert('No available seats found in this section. Please try another ticket type.')
      return null;
    }

    const prefix = {
      'gold': 'G',
      'silver': 'S',
      'regular': 'R',
      'student': 'T'
    }[ticketType]
    
    const number = Math.floor(Math.random() * 200) + 1
    const seatNumber = `${prefix}-${number.toString().padStart(3, '0')}`
    
    try {
      const response = await checkSeatAvailability(id, seatNumber)
      if (response.success && response.available) {
        setGeneratedSeat(seatNumber)
        return seatNumber
      }
      return generateSeatNumber(attempts + 1)
    } catch (error) {
      console.error('Error checking seat:', error)
      alert('Error checking seat availability')
      return null
    }
  }

  const handleBookTicket = async () => {
    if (!user) {
      navigate('/login')
      return
    }

    setGeneratedSeat('') // Clear previous seat
    const seat = await generateSeatNumber()
    if (!seat) {
      return // Early return if no seat was generated
    }

    try {
      const result = await createTicket({
        concert: id,
        user: user._id,
        seating: ticketType,
        seat: seat
      })

      if (result.success) {
        alert('Ticket booked successfully!')
        navigate('/plans')
      } else {
        alert(result.message)
      }
    } catch (error) {
      alert('Failed to book ticket')
    }
  }

  if (loading || !concert) return <div>Loading...</div>

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 font-playfair text-secondary text-center">Book Ticket</h2>
      
      <div className="flex flex-col md:flex-row gap-6 md:gap-8">
        {/* Seating Chart - Order first on mobile */}
        <div className="order-first md:order-2 w-full md:flex-1 bg-dark rounded-lg overflow-hidden mt-6 md:mt-0">
          <div className="aspect-w-4 aspect-h-3 relative">
            <div className="absolute inset-0 flex items-center justify-center text-secondary/50 text-lg font-playfair">
              Seating Chart Placeholder
            </div>
            <img 
              src="https://placehold.co/600x400/111111/D4AF37?text=Seating+Chart" 
              alt="Seating Chart"
              className="w-full h-full object-cover opacity-50"
            />
          </div>
        </div>

        {/* Booking Form - Order second on mobile */}
        <div className="order-2 md:order-1 w-full md:flex-1">
          <div className="bg-dark p-6 rounded-lg mb-6">
            <h3 className="text-xl font-playfair text-secondary mb-4">{concert.title}</h3>
            <p className="text-secondary/80 mb-4">
              {new Date(concert.date).toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          </div>

          <div className="bg-dark p-6 rounded-lg space-y-6">
            <div>
              <label className="block text-secondary mb-2">Select Ticket Type</label>
              <select
                value={ticketType}
                onChange={(e) => {
                  setTicketType(e.target.value)
                  setGeneratedSeat('')
                }}
                className="w-full p-3 rounded-lg bg-primary border border-secondary/20 text-secondary focus:border-secondary focus:ring-1 focus:ring-secondary font-playfair"
              >
                <option className="block px-4 py-2 text-secondary hover:text-white hover:bg-secondary/10 transition" value="student">Student (15% off)</option>
                <option className="block px-4 py-2 text-secondary hover:text-white hover:bg-secondary/10 transition" value="regular">Regular</option>
                <option className="block px-4 py-2 text-secondary hover:text-white hover:bg-secondary/10 transition" value="silver">Silver (Front Section)</option>
                <option className="block px-4 py-2 text-secondary hover:text-white hover:bg-secondary/10 transition" value="gold">Gold (VIP Section)</option>
              </select>
            </div>

            <button
              onClick={handleBookTicket}
              className="w-full py-3 bg-secondary text-primary rounded-lg hover:bg-opacity-90 transition font-playfair"
            >
              Book Ticket
            </button>

            {generatedSeat && (
              <div className="text-center text-secondary">
                Your seat number: <span className="font-bold">{generatedSeat}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TicketBooking
