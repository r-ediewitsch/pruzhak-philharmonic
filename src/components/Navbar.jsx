import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Menu } from '@headlessui/react'
import { useState } from 'react'

function Navbar() {
  const { user, logout } = useAuth()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="bg-primary shadow-lg fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-xl font-bold font-playfair text-secondary">
            Pruzhak Philharmonic
          </Link>
          
          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-secondary hover:text-white"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
          
          {/* Desktop Menu */}
          <div className={`${isMenuOpen ? 'flex' : 'hidden'} md:flex absolute md:relative top-16 md:top-0 left-0 right-0 md:items-center bg-primary md:bg-transparent p-4 md:p-0 space-y-4 md:space-y-0 flex-col md:flex-row md:space-x-6 font-playfair`}>
            <Link to="/" className="text-secondary hover:text-white transition">
              Home
            </Link>
            <Link to="/orchestra-profile" className="text-secondary hover:text-white transition">
              Profile
            </Link>
            <Link to="/concerts" className="text-secondary hover:text-white transition">
              Concerts
            </Link>
            
            {user ? (
              <Menu as="div" className="relative">
                <Menu.Button className="text-secondary hover:text-white transition">
                  {user.fullname}
                </Menu.Button>
                <Menu.Items className="absolute right-0 md:right-0 left-4 md:right-auto mt-2 w-48 py-2 bg-dark border border-secondary/20 rounded-md shadow-lg z-50">
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        to="/plans"
                        className={`${
                          active ? 'bg-secondary/10' : ''
                        } block px-4 py-2 text-secondary hover:text-white transition`}
                      >
                        My Plans
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        to="/tickets"
                        className={`${
                          active ? 'bg-secondary/10' : ''
                        } block px-4 py-2 text-secondary hover:text-white transition`}
                      >
                        My Tickets
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        to="/user-profile"
                        className={`${
                          active ? 'bg-secondary/10' : ''
                        } block px-4 py-2 text-secondary hover:text-white transition`}
                      >
                        Profile Settings
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={logout}
                        className={`${
                          active ? 'bg-secondary/10' : ''
                        } block w-full text-left px-4 py-2 text-secondary hover:text-white transition`}
                      >
                        Logout
                      </button>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Menu>
            ) : (
              <Link
                to="/login"
                className="bg-secondary text-primary px-4 py-2 rounded-md hover:bg-opacity-90 transition"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
