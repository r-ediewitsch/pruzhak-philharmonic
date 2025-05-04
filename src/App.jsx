import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Concerts from './pages/Concerts'
import Plans from './pages/Plans'
import Login from './pages/Login'
import Register from './pages/Register'
import OrchestraProfile from './pages/OrchestraProfile'
import ConcertDetails from './pages/ConcertDetails'
import UserProfile from './pages/UserProfile'
import TicketBooking from './pages/TicketBooking'
import Tickets from './pages/Tickets'
import { AuthProvider } from './context/AuthContext'

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-primary">
          <Navbar />
          <div className="container mx-auto px-4 py-8 pt-16">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/orchestra-profile" element={<OrchestraProfile />} />
              <Route path="/concerts" element={<Concerts />} />
              <Route path="/concerts/:id" element={<ConcertDetails />} />
              <Route path="/concerts/:id/book" element={<TicketBooking />} />
              <Route path="/plans" element={<Plans />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/user-profile" element={<UserProfile />} />
              <Route path="/tickets" element={<Tickets />} />
            </Routes>
          </div>
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App
