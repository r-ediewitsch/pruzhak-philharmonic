import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { createTicket } from '../actions/ticket.action'
import { getConcertById } from '../actions/concert.action'
import { addPlan } from '../actions/user.action'

function ConcertDetails() {
  const [concert, setConcert] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isInPlans, setIsInPlans] = useState(false)
  const ticketType = useState('regular')
  const seatNumber = useState('')
  const { id } = useParams()
  const { user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    fetchConcertDetails()
  }, [id])

  useEffect(() => {
    if (user && concert) {
      checkIfPlanned()
    }
  }, [user, concert])

  const fetchConcertDetails = async () => {
    try {
      const response = await getConcertById(id)
      setConcert(response.data)
    } catch (error) {
      console.error('Error fetching concert:', error)
    } finally {
      setLoading(false)
    }
  }

  const checkIfPlanned = async () => {
    try {
      const result = await checkIfPlanned(user._id, concert._id)
      setIsInPlans(result.inPlans)
    } catch (error) {
      console.error('Error checking plans:', error)
    }
  }

  const handleAddToPlan = async () => {
    if (!user) {
      navigate('/login')
      return
    }

    try {
      const result = await addPlan(user._id, id)
      if (result.success) {
        setIsInPlans(true)
        alert('Successfully added to your plans!')
      } else {
        alert(result.message)
      }
    } catch (error) {
      alert('Failed to add to plans')
    }
  }

  const handleBuyTicket = async () => {
    if (!user) {
      navigate('/login')
      return
    }

    try {
      const ticketData = {
        concert: concert._id,  // Use concert._id instead of id
        user: user._id,
        seating: ticketType,
        seat: seatNumber || 'AUTO'
      }
      
      const result = await createTicket(ticketData)
      if (result.success) {
        alert('Ticket booked successfully!')
      } else {
        alert(result.message)
      }
    } catch (error) {
      alert('Failed to book ticket')
    }
  }

  if (loading) return <div>Loading...</div>
  if (!concert) return <div>Concert not found</div>

  return (
    <div className="container mx-auto px-4">
      <div className="bg-dark rounded-xl overflow-hidden">
        {/* Hero Section */}
        <div className="relative h-64 md:h-96">
          <img 
            src={concert.coverImage} 
            alt={concert.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark to-transparent" />
          <div className="absolute bottom-0 left-0 p-4 md:p-8">
            <h1 className="text-4xl md:text-6xl font-bold font-playfair text-secondary mb-4">
              {concert.title}
            </h1>
            <div className="flex items-center space-x-4 text-secondary/80 font-playfair">
              <span className="text-xl md:text-2xl">
                {new Date(concert.date).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-4 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Programme */}
            <div>
              <h2 className="text-3xl font-bold font-playfair text-secondary mb-6">Programme</h2>
              <div className="space-y-4">
                {concert.programme.map((music) => (
                  <div key={music._id} className="border-l-2 border-secondary/20 pl-4">
                    <h3 className="text-xl font-playfair text-secondary">{music.title}</h3>
                    <p className="text-secondary/80 font-playfair">{music.composer}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Artists */}
            <div>
              <h2 className="text-3xl font-bold font-playfair text-secondary mb-6">Featured Artists</h2>
              <div className="space-y-4">
                {concert.artists.map((artist) => (
                  <div key={artist._id} className="border-l-2 border-secondary/20 pl-4">
                    <h3 className="text-xl font-playfair text-secondary">{artist.name}</h3>
                    <p className="text-secondary/80 font-playfair">{artist.role}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="mt-12">
            <h2 className="text-3xl font-bold font-playfair text-secondary mb-6">About the Concert</h2>
            <p className="text-secondary/80 font-playfair text-lg leading-relaxed">
              {concert.description}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4">
            <button
              onClick={handleAddToPlan}
              className={`mt-8 px-8 py-3 rounded-lg font-playfair text-lg transition ${
                isInPlans
                  ? 'bg-dark text-secondary border border-secondary cursor-default'
                  : 'bg-secondary text-primary hover:bg-opacity-90'
              }`}
              disabled={isInPlans}
            >
              {isInPlans ? 'Added to Plans' : 'Add to My Plans'}
            </button>

            <button
              onClick={() => navigate(`/concerts/${concert._id}/book`)}
              className="mt-8 px-8 py-3 rounded-lg font-playfair text-lg transition bg-secondary/20 text-secondary hover:bg-secondary/30"
            >
              Buy Ticket
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ConcertDetails
