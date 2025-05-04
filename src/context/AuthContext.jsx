import { createContext, useState, useContext, useEffect } from 'react'
import { login as loginAction, register as registerAction, updateUsername as updateUsernameAction, updatePassword as updatePasswordAction } from '../actions/user.action'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setLoading(false)
  }, [])

  const login = async (email, password) => {
    const result = await loginAction(email, password)
    if (result.success) {
      setUser(result.data)
      localStorage.setItem('user', JSON.stringify(result.data))
    }
    return result
  }

  const register = async (fullname, email, password) => {
    return await registerAction(fullname, email, password)
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  const updateUserProfile = async (userId, newUsername) => {
    const result = await updateUsernameAction(userId, newUsername)
    if (result.success) {
      const updatedUser = { ...user, fullname: newUsername }
      setUser(updatedUser)
      localStorage.setItem('user', JSON.stringify(updatedUser))
    }
    return result
  }

  const updatePassword = async (userId, oldPassword, newPassword) => {
    return await updatePasswordAction(userId, oldPassword, newPassword)
  }

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      register, 
      logout, 
      loading,
      updateUserProfile,
      updatePassword 
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
