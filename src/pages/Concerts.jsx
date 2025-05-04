import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { getAllConcerts } from '../actions/concert.action'
import { addToPlan, getUserPlans } from '../actions/user.action'

function Concerts() {
  const [concerts, setConcerts] = useState([])
  const [loading, setLoading] = useState(true)
  const [plannedConcerts, setPlannedConcerts] = useState(new Set())
  const { user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    fetchConcerts()
  }, [])

  useEffect(() => {
    if (user) {
      checkPlannedConcerts()
    }
  }, [user])

  const fetchConcerts = async () => {
    try {
      const response = await getAllConcerts()
      setConcerts(response.data)
    } catch (error) {
      console.error('Error fetching concerts:', error)
    } finally {
      setLoading(false)
    }
  }

  const checkPlannedConcerts = async () => {
    try {
      const plans = await getUserPlans(user._id)
      const planIds = new Set(plans.data.map(concert => concert._id))
      setPlannedConcerts(planIds)
    } catch (error) {
      console.error('Error fetching plans:', error)
    }
  }

  const handleAddToPlan = async (e, concertId) => {
    e.preventDefault()
    
    if (!user) {
      navigate('/login')
      return
    }

    try {
      const result = await addToPlan(user._id, concertId)
      if (result.success) {
        setPlannedConcerts(prev => new Set([...prev, concertId]))
        alert('Successfully added to your plans!')
      } else {
        alert(result.message)
      }
    } catch (error) {
      alert('Failed to add to plans')
    }
  }

  const formatComposers = (programme) => {
    const composers = programme.map(music => music.composer.split(' ').pop());
    if (composers.length === 0) return '';
    if (composers.length === 1) return `Works by ${composers[0]}`;
    if (composers.length === 2) return `Works by ${composers[0]} and ${composers[1]}`;
    
    const lastComposer = composers.pop();
    return `Works by ${composers.join(', ')}, and ${lastComposer}`;
  };

  if (loading) return <div>Loading...</div>

  return (
    <div>
      <h2 className="text-4xl font-bold mb-6 pt-8 font-playfair text-secondary">Upcoming Concerts</h2>
      <div className="space-y-6">
        {concerts.map((concert) => (
          <Link 
            to={`/concerts/${concert._id}`} 
            key={concert._id} 
            className="block bg-dark rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
          >
            <div className="flex flex-col md:flex-row">
              {/* Image Column - Moved to top */}
              <div className="w-full md:w-1/4 h-64 md:h-auto order-first md:order-last">
                <img 
                  src={concert.coverImage} 
                  alt={concert.title} 
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Date Column */}
              <div className="w-full md:w-1/4 p-6 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-secondary/20">
                <div className="flex md:flex-col items-center gap-4 md:gap-0 font-playfair">
                  <div className="order-2 text-3xl md:text-5xl font-bold text-secondary">
                    {new Date(concert.date).toLocaleDateString('en-US', {
                      day: 'numeric'
                    })}
                  </div>
                  <div className="order-3 text-2xl md:text-3xl text-secondary/80">
                    {new Date(concert.date).toLocaleDateString('en-US', {
                      month: 'short',
                      year: 'numeric'
                    })}
                  </div>
                  <div className="order-first text-2xl md:text-xl text-secondary/60 md:mt-2">
                    {new Date(concert.date).toLocaleDateString('en-US', {
                      weekday: 'long'
                    })}
                  </div>
                </div>
              </div>

              {/* Details Column */}
              <div className="w-full md:w-2/4 p-6">
                <h3 className="text-3xl md:text-5xl font-bold mb-2 font-playfair text-secondary">{concert.title}</h3>
                
                {/* Programme Section */}
                <div className="mb-4 mt-8">
                  <p className="text-secondary/80 font-playfair text-lg">
                    {formatComposers(concert.programme)}
                  </p>
                </div>

                {/* Artists Section */}
                <div className="mb-4">
                  <ul className="space-y-1">
                    {concert.artists.map((artist) => (
                      <li key={artist._id} className="text-secondary/80 font-playfair">
                        {artist.name}, {artist.role}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex space-x-4">
                  <button
                    onClick={(e) => handleAddToPlan(e, concert._id)}
                    className={`px-4 py-2 rounded font-playfair transition mt-4 ${
                      plannedConcerts.has(concert._id)
                        ? 'bg-dark text-secondary border border-secondary cursor-default'
                        : 'bg-secondary text-primary hover:bg-opacity-90'
                    }`}
                    disabled={plannedConcerts.has(concert._id)}
                  >
                    {plannedConcerts.has(concert._id) ? 'Added to Plans' : 'Add to Plans'}
                  </button>
                  
                  <button
                    onClick={(e) => {
                      e.preventDefault()
                      navigate(`/concerts/${concert._id}/book`)
                    }}
                    className="px-4 py-2 rounded font-playfair transition mt-4 bg-secondary/20 text-secondary hover:bg-secondary/30"
                  >
                    Buy Ticket
                  </button>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Concerts
