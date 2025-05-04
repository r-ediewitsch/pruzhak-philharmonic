import concertHall from '../assets/NOSPR-3.jpg'
import musicDirector from '../assets/riyan.jpg'
import principalGuestConductor from '../assets/stanislav-kochanovsky_UV8AkDn.jpg'
import ourProfile from '../assets/orchestras.jpg'
import composerInResidence from '../assets/bryan.png'

export const orchestraProfile = {
  history: {
    title: 'About Us',
    content: 'The Pruzhak Philharmonic Orchestra ranks among the finest concert orchestras in Yogyakarta. Founded in 2015, it has developed an exceptional reputation for its innovative programming, commitment to contemporary works and promotion of young talent. The orchestra is renowned for its characteristic tonal culture that has been shaped and refined by its collaboration with leading conductors throughout its history.',
    image: ourProfile
  },
  stats: {
    items: [
      { number: '95', label: 'Musicians' },
      { number: '40', label: 'Concerts per Season' },
      { number: '20+', label: 'International Tours' },
      { number: '25+', label: 'Recordings' }
    ]
  },
  currentSeason: {
    title: '2025/26 Season',
    description: 'Our current season features a rich blend of classical masterworks and contemporary premieres. Special focus is placed on works by Mahler, Bruckner, and living composers, continuing our tradition of musical excellence and innovation.',
    highlights: [
      'Complete Mahler Symphony Cycle',
      'World Premieres by Contemporary Composers',
      'A new Music Discovery Series',
      'Collaborations with local artists and ensembles',
    ]
  },
  leadership: {
    title: 'Artistic Leadership',
    members: [
      {
        name: 'Riyan Ediewitsch',
        role: 'Music Director',
        description: 'Leading the orchestra since 2018, bringing fresh perspectives to both traditional and contemporary repertoire',
        image: musicDirector
      },
      {
        name: 'Stanislav Kochanovsky',
        role: 'Principal Guest Conductor',
        description: 'Bringing his unique interpretations of Russian repertoire',
        image: principalGuestConductor
      },
      {
        name: 'Bryan Farras',
        role: 'Composer-in-Residence',
        description: 'A rising star in the contemporary music scene, known for his innovative compositions',
        image: composerInResidence
      }
    ]
  },
  venue: {
    title: 'Our Home',
    name: 'Pruzhak Concert Hall',
    description: 'Opened in 2015, our concert hall is renowned for its outstanding acoustics and innovative architecture. The main hall seats 1,100 visitors and features a magnificent organ built by Jan Archezus.',
    features: [
      'Chemfirus Great Hall',
      "Franz Eka Chamber Music Hall",
      'Historic Archezus organ',
      'Digital recording studio'
    ],
    image: concertHall
  }
};
