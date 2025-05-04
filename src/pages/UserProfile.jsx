import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { Navigate } from 'react-router-dom'

function UserProfile() {
  const { user, updateUserProfile, updatePassword } = useAuth()
  const [formData, setFormData] = useState({
    username: user?.fullname || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  if (!user) return <Navigate to="/login" />

  const handleUsernameSubmit = async (e) => {
    e.preventDefault()
    setMessage('')
    setError('')
    
    if (formData.username.trim() === user.fullname) {
      setError('Please enter a different username')
      return
    }

    const result = await updateUserProfile(user._id, formData.username)
    if (result.success) {
      setMessage('Username updated successfully')
    } else {
      setError(result.message)
    }
  }

  const handlePasswordSubmit = async (e) => {
    e.preventDefault()
    setMessage('')
    setError('')

    if (formData.newPassword !== formData.confirmPassword) {
      setError('Passwords do not match')
      return
    }

    try {
      const result = await updatePassword(user._id, formData.currentPassword, formData.newPassword)
      if (result.success) {
        setMessage('Password updated successfully')
        setFormData(prev => ({
          ...prev,
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        }))
      } else {
        setError(result.message)
      }
    } catch (error) {
      setError('Failed to update password')
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-8 font-playfair text-secondary text-center">User Settings</h2>
      
      {message && <div className="bg-secondary/20 text-secondary p-4 rounded-lg mb-6">{message}</div>}
      {error && <div className="bg-red-900/20 text-red-500 p-4 rounded-lg mb-6">{error}</div>}

      <div className="space-y-8">
        {/* Username Section */}
        <div className="bg-dark p-6 rounded-lg">
          <h3 className="text-xl font-playfair text-secondary mb-4">Change Username</h3>
          <form onSubmit={handleUsernameSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                value={formData.username}
                onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))}
                className="w-full p-3 rounded-lg bg-primary border border-secondary/20 text-secondary focus:border-secondary focus:ring-1 focus:ring-secondary"
                placeholder="Enter new username"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-secondary text-primary rounded-lg hover:bg-opacity-90 transition font-playfair"
            >
              Update Username
            </button>
          </form>
        </div>

        {/* Password Section */}
        <div className="bg-dark p-6 rounded-lg">
          <h3 className="text-xl font-playfair text-secondary mb-4">Change Password</h3>
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <input
              type="password"
              value={formData.currentPassword}
              onChange={(e) => setFormData(prev => ({ ...prev, currentPassword: e.target.value }))}
              className="w-full p-3 rounded-lg bg-primary border border-secondary/20 text-secondary focus:border-secondary focus:ring-1 focus:ring-secondary"
              placeholder="Current password"
              required
            />
            <input
              type="password"
              value={formData.newPassword}
              onChange={(e) => setFormData(prev => ({ ...prev, newPassword: e.target.value }))}
              className="w-full p-3 rounded-lg bg-primary border border-secondary/20 text-secondary focus:border-secondary focus:ring-1 focus:ring-secondary"
              placeholder="New password"
              required
            />
            <input
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
              className="w-full p-3 rounded-lg bg-primary border border-secondary/20 text-secondary focus:border-secondary focus:ring-1 focus:ring-secondary"
              placeholder="Confirm new password"
              required
            />
            <button
              type="submit"
              className="w-full py-3 bg-secondary text-primary rounded-lg hover:bg-opacity-90 transition font-playfair"
            >
              Update Password
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default UserProfile
