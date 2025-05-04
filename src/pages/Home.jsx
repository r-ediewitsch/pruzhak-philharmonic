import { useEffect, useRef } from 'react'
import orchestraImage from '../assets/orchestra.jpeg'
import { useNavigate } from 'react-router-dom'

function Home() {
  const navigate = useNavigate()
  const introSectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fadeInUp')
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.1 }
    )

    if (introSectionRef.current) {
      observer.observe(introSectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <div className="min-h-screen bg-primary"> {/* Added pt-16 for navbar space */}
      {/* Hero Section */}
      <div className="relative h-[95vh] z-0">
        <img 
          src={orchestraImage}
          alt="Orchestra Performance"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-primary" />
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="text-center px-4">
            <h1 className="text-6xl md:text-7xl font-bold font-playfair text-secondary mb-6 opacity-0 animate-fadeInDown">
              Pruzhak Philharmonic
            </h1>
            <p className="text-xl md:text-2xl text-secondary/90 font-playfair max-w-3xl mx-auto opacity-0 animate-[fadeInUp_1s_ease-out_0.5s_forwards]">
              Celebrating a decade of musical excellence
            </p>
          </div>
        </div>
      </div>

      {/* Introduction Section */}
      <div className="relative z-20 bg-primary">
        <div className="max-w-4xl mx-auto px-4 py-20">
          <div ref={introSectionRef} className="text-center opacity-0">
            <h2 className="text-4xl font-bold font-playfair text-secondary mb-8">
              Welcome to Our World of Music
            </h2>
            <p className="text-lg md:text-xl text-secondary/80 font-playfair leading-relaxed mb-8">
              Founded in 1925, the Pruzhak Philharmonic Orchestra has been at the forefront 
              of classical music excellence for nearly a century. Our orchestra brings together 
              the finest musicians from around the world, delivering exceptional performances 
              that inspire and move audiences.
            </p>
            <p className="text-lg md:text-xl text-secondary/80 font-playfair leading-relaxed">
              Under the leadership of our esteemed Music Director, Maestro Riyan Ediewitsch, 
              we continue our dedication to presenting the greatest works of the classical 
              repertoire while championing new compositions that expand the boundaries of 
              orchestral music.
            </p>

            <button
              onClick={() => navigate('/concerts')}
              className="mt-12 px-8 py-3 bg-gradient-to-r from-secondary to-yellow-500 text-primary rounded-lg 
                hover:from-yellow-500 hover:to-secondary transition-all duration-300 transform 
                hover:scale-105 font-playfair text-lg"
            >
              See Our Concerts
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
