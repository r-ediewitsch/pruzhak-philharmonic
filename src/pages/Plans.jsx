import { useState, useEffect } from 'react'
import { Navigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { getUserPlans } from '../actions/user.action'

function Plans() {
  const [plans, setPlans] = useState([])
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()

  useEffect(() => {
    if (user) {
      fetchPlans()
    }
  }, [user])

  const fetchPlans = async () => {
    try {
      const response = await getUserPlans(user._id)
      setPlans(response.data)
    } catch (error) {
      console.error('Error fetching plans:', error)
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
      <h2 className="text-3xl font-bold mb-8 font-playfair text-secondary text-center">My Concert Plans</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {plans.map((concert) => (
          <Link 
            to={`/concerts/${concert._id}`}
            key={concert._id} 
            className="bg-dark rounded-lg shadow-md overflow-hidden border border-secondary/20 hover:shadow-xl transition-shadow"
          >
            <img 
              src={concert.coverImage} 
              alt={concert.title} 
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-bold mb-4 font-playfair text-secondary">{concert.title}</h3>
              <p className="text-secondary/80 font-playfair">
                {new Date(concert.date).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>
          </Link>
        ))}
      </div>
      {plans.length === 0 && (
        <p className="text-center text-secondary/80 font-playfair">
          You haven't added any concerts to your plans yet.
        </p>
      )}
    </div>
  )
}

export default Plans
