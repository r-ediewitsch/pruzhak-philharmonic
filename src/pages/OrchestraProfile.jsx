import { orchestraProfile } from '../data/orchestraProfile'

function OrchestraProfile() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* History Section - Fade in and slide up */}
      <div className="bg-dark rounded-xl overflow-hidden mb-12 opacity-0 translate-y-8 animate-[fadeIn_1s_ease-out_forwards]">
        <div className="md:flex">
          <div className="md:w-1/2 p-8">
            <h2 className="text-3xl font-bold font-playfair text-secondary mb-4">
              {orchestraProfile.history.title}
            </h2>
            <p className="text-secondary/80 font-playfair leading-relaxed">
              {orchestraProfile.history.content}
            </p>
          </div>
          <div className="md:w-1/2 h-64 md:h-auto">
            <img src={orchestraProfile.history.image} alt="Orchestra History" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>

      {/* Stats Section - Stagger fade in */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
        {orchestraProfile.stats.items.map((stat, index) => (
          <div 
            key={index} 
            className="bg-dark rounded-xl p-6 text-center opacity-0 animate-[fadeIn_0.5s_ease-out_forwards]"
            style={{ animationDelay: `${index * 0.2}s` }}
          >
            <div className="text-4xl font-bold font-playfair text-secondary mb-2">{stat.number}</div>
            <div className="text-secondary/80 font-playfair">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Current Season - Fade in and slide from right */}
      <div className="bg-dark rounded-xl p-8 mb-12 opacity-0 translate-x-8 animate-[fadeInRight_1s_ease-out_forwards]">
        <h2 className="text-3xl font-bold font-playfair text-secondary mb-4">{orchestraProfile.currentSeason.title}</h2>
        <p className="text-secondary/80 font-playfair mb-6">{orchestraProfile.currentSeason.description}</p>
        <div className="grid md:grid-cols-2 gap-4">
          {orchestraProfile.currentSeason.highlights.map((highlight, index) => (
            <div key={index} className="flex items-center space-x-3">
              <span className="text-secondary">•</span>
              <span className="text-secondary/80 font-playfair">{highlight}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Leadership Section - Stagger fade in and scale */}
      <h2 className="text-3xl font-bold font-playfair text-secondary mb-8">{orchestraProfile.leadership.title}</h2>
      <div className="grid md:grid-cols-3 gap-8 mb-12">
        {orchestraProfile.leadership.members.map((member, index) => (
          <div 
            key={member.name} 
            className="bg-dark rounded-xl overflow-hidden opacity-0 scale-95 animate-[fadeInScale_0.7s_ease-out_forwards] hover:transform hover:scale-105 transition-transform duration-300"
            style={{ animationDelay: `${index * 0.3}s` }}
          >
            <img src={member.image} alt={member.name} className="w-full h-64 object-cover" />
            <div className="p-6">
              <h3 className="text-xl font-bold font-playfair text-secondary">{member.name}</h3>
              <p className="text-secondary/60 font-playfair">{member.role}</p>
              <p className="text-secondary/80 font-playfair mt-2">{member.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Venue Section - Fade in and slide up */}
      <div className="bg-dark rounded-xl overflow-hidden opacity-0 translate-y-8 animate-[fadeIn_1s_ease-out_forwards]">
        <div className="md:flex">
          <div className="md:w-1/2 p-8">
            <h2 className="text-3xl font-bold font-playfair text-secondary mb-4">{orchestraProfile.venue.title}</h2>
            <h3 className="text-xl font-playfair text-secondary mb-2">{orchestraProfile.venue.name}</h3>
            <p className="text-secondary/80 font-playfair mb-6">{orchestraProfile.venue.description}</p>
            <div className="space-y-2">
              {orchestraProfile.venue.features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <span className="text-secondary">•</span>
                  <span className="text-secondary/80 font-playfair">{feature}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="md:w-1/2 h-64 md:h-auto">
            <img src={orchestraProfile.venue.image} alt="Concert Hall" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrchestraProfile
