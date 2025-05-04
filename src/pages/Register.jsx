import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Register() {
  const [fullname, setFullname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const { register } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const result = await register(fullname, email, password)
    if (result.success) {
      navigate('/login')
    } else {
      alert(result.message)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-primary to-dark">
      <div className="bg-dark p-6 sm:p-8 rounded-xl shadow-lg w-full max-w-xs sm:max-w-md mx-4 sm:mx-0 border border-secondary/20">
        <div className="mb-6 sm:mb-8 text-center">
          <h1 className="text-3xl font-bold font-playfair bg-gradient-to-r from-secondary to-yellow-500 bg-clip-text text-transparent">
            Create Account
          </h1>
          <p className="text-secondary/80 font-playfair mt-2">Sign up to get started</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          <div>
            <label className="block text-sm font-medium text-secondary mb-2" htmlFor="fullname">
              Full Name
            </label>
            <input
              id="fullname"
              type="text"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              className="w-full px-3 py-2 sm:px-4 sm:py-3 rounded-lg border border-secondary/20 bg-primary focus:border-secondary focus:ring-1 focus:ring-secondary outline-none transition-all text-secondary"
              placeholder="Enter your full name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-secondary mb-2" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 sm:px-4 sm:py-3 rounded-lg border border-secondary/20 bg-primary focus:border-secondary focus:ring-1 focus:ring-secondary outline-none transition-all text-secondary"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-secondary mb-2" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 sm:px-4 sm:py-3 rounded-lg border border-secondary/20 bg-primary focus:border-secondary focus:ring-1 focus:ring-secondary outline-none transition-all text-secondary"
              placeholder="Create a password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 bg-gradient-to-r from-secondary to-yellow-500 text-primary rounded-lg hover:from-yellow-500 hover:to-secondary transition-all duration-300 transform hover:scale-[1.02] font-semibold"
          >
            Sign up
          </button>
        </form>

        <div className="mt-6 text-center">
          <span className="text-sm text-secondary/80">
            Already have an account?{' '}
            <Link to="/login" className="text-secondary hover:text-yellow-500 ml-1">
              Login here
            </Link>
          </span>
        </div>
      </div>
    </div>
  )
}

export default Register
