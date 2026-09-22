import { MassageService, TherapistProfile, Appointment, BlacklistedContact } from '../types';

export const INITIAL_SERVICES: MassageService[] = [
  {
    id: 'descontracturante',
    name: 'Masaje Descontracturante & Alivio Miofascial',
    tagline: 'Liberación de contracturas, cuello rígido y sobrecargas de espalda',
    description: 'Terapia focalizada de presión media-profunda diseñada para eliminar nudos y contracturas crónicas acumuladas por estrés postural, trabajo en computador o fatiga física.',
    durationMinutes: 60,
    price: 130000,
    category: 'descontracturante',
    benefits: [
      'Alivio inmediato en zona cervical, trapecios y lumbares',
      'Desactivación de puntos gatillo miofasciales',
      'Recuperación de la movilidad articular',
      'Liberación de tensiones por postura de oficina'
    ],
    contraindications: [
      'Procesos inflamatorios febriles agudos',
      'Fracturas recientes o heridas abiertas',
      'Trombosis venosa profunda'
    ],
    image: '/assets/images/service_deep_tissue_1790111067370.jpg',
    popular: true,
  },
  {
    id: 'relajante',
    name: 'Masaje Relajante & Neurosedante',
    tagline: 'Paz profunda, armonía sensorial y desconexión total del estrés',
    description: 'Maniobras rítmicas y envolventes con aceites esenciales botánicos que calman el sistema nervioso, reducen el cortisol y facilitan un descanso reparador y profundo.',
    durationMinutes: 60,
    price: 120000,
    category: 'relajante',
    benefits: [
      'Reducción drástica del estrés y la ansiedad',
      'Mejora sustancial en la calidad del sueño y descanso',
      'Estimulación suave de la circulación sanguínea',
      'Relajación muscular sin dolor ni maniobras invasivas'
    ],
    contraindications: [
      'Infecciones cutáneas activas en la zona a tratar',
      'Alergias severas a aromas específicos (usamos aceites neutros)'
    ],
    image: '/assets/images/wellness_oils_stones_1790111079282.jpg',
    popular: false,
  },
  {
    id: 'deportivo',
    name: 'Descarga Muscular Deportiva',
    tagline: 'Optimización del rendimiento, drenaje de toxinas y pre/post entreno',
    description: 'Terapia vigorosa orientada a deportistas y practicantes de fitness. Previene lesiones, acelera la eliminación de ácido láctico y flexibiliza fascias tensas.',
    durationMinutes: 75,
    price: 145000,
    category: 'deportivo',
    benefits: [
      'Aceleración de los tiempos de recuperación post-esfuerzo',
      'Prevención de contracturas y sobrecargas deportivas',
      'Elongación y flexibilidad de cadenas musculares',
      'Mejora de la oxigenación muscular profunda'
    ],
    contraindications: [
      'Desgarros musculares agudos (<48h)',
      'Bursitis o tendinitis en fase aguda con enrojecimiento local'
    ],
    image: '/assets/images/hero_massage_therapy_1790111040036.jpg',
    popular: false,
  },
  {
    id: 'drenaje',
    name: 'Drenaje Linfático Manual',
    tagline: 'Reducción de retención de líquidos, pesadez en piernas y desinflamación',
    description: 'Técnica clínica suave y especializada mediante suaves presiones en espiral que activan el sistema linfático, favoreciendo la eliminación de toxinas y líquidos retenidos.',
    durationMinutes: 60,
    price: 135000,
    category: 'drenaje',
    benefits: [
      'Alivio notable de pesadez y edemas en piernas y tobillos',
      'Estimulación de la microcirculación y retorno venoso',
      'Sensación inmediata de ligereza corporal',
      'Recomendado para cansancio tras largas jornadas de pie'
    ],
    contraindications: [
      'Infecciones agudas o erisipela',
      'Insuficiencia cardíaca congestiva descompensada'
    ],
    image: '/assets/images/wellness_oils_stones_1790111079282.jpg',
    popular: false,
  },
  {
    id: 'craneofacial',
    name: 'Terapia Cervico-Craneofacial & Kobido',
    tagline: 'Liberación de bruxismo, cefaleas tensionales y fatiga mental',
    description: 'Enfoque terapéutico sobre cuero cabelludo, cuello, hombros y musculatura facial y de la mandíbula. Ideal para aliviar jaquecas y tensión por apretar los dientes.',
    durationMinutes: 50,
    price: 110000,
    category: 'facial',
    benefits: [
      'Alivio directo del dolor en mandíbula por bruxismo',
      'Disminución de dolores de cabeza de origen tensional',
      'Despeje mental y relajación de la expresión facial',
      'Mejora de la oxigenación de tejidos craneales'
    ],
    contraindications: [
      'Aplicación de toxina botulínica en los últimos 15 días',
      'Heridas abiertas o cirugías craneales recientes'
    ],
    image: '/assets/images/home_portable_table_1790111090142.jpg',
    popular: false,
  },
];

export const INITIAL_THERAPIST: TherapistProfile = {
  name: 'Lic. Laura Martínez',
  title: 'Fisioterapeuta & Terapeuta Manual Certificada',
  licenseNumber: 'Registro Profesional Salud No. 48.912',
  phoneWhatsApp: '+57 312 458 9201',
  email: 'contacto@lauramartinez-masoterapia.com',
  city: 'Bogotá',
  coverageAreas: ['Chicó', 'Rosales', 'Usaquén', 'Chapinero Alto', 'Santa Bárbara', 'Salitre', 'Cedritos'],
  neighborhoods: ['Chicó', 'Rosales', 'Usaquén', 'Chapinero Alto', 'Santa Bárbara', 'Salitre', 'Cedritos'],
  workingDays: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
  workingHours: { start: '08:30', end: '19:30' },
  aboutText: 'Me dedico a la masoterapia con un enfoque estrictamente clínico, preventivo y biomecánico. Tras 8 años de práctica en centros de rehabilitación y consultorios deportivos, decidí llevar la experiencia completa de un gabinete terapéutico directamente a la comodidad y tranquilidad de tu hogar. Traslado camilla ergonómica ultra-ligera, lencería estéril desechable, aceites botánicos hipoalergénicos y protocolos rigurosos de respeto, bioseguridad y pudor del paciente.',
  avatarUrl: '/assets/images/therapist_portrait_1790111055112.jpg',
};

export const INITIAL_APPOINTMENTS: Appointment[] = [
  {
    id: 'CIT-7841',
    clientName: 'Dra. Andrea Gutiérrez',
    clientDni: '1.020.849.201',
    clientPhone: '+57 310 882 1450',
    serviceId: 'descontracturante',
    serviceName: 'Masaje Descontracturante & Alivio Miofascial',
    servicePrice: 130000,
    durationMinutes: 60,
    date: '2026-09-24',
    timeSlot: '10:00',
    address: 'Cra. 7 # 78-45',
    apartmentInfo: 'Apto 502, Torre 1',
    neighborhood: 'Rosales',
    city: 'Bogotá',
    hasElevator: true,
    hasPets: false,
    notes: 'Dolor recurrente en el omóplato derecho por trabajo en oficina.',
    status: 'confirmada',
    agreedEthicsCode: true,
    agreedToEthicsCode: true,
    createdAt: '2026-09-22T10:15:00Z',
  },
  {
    id: 'CIT-7842',
    clientName: 'Ing. Carlos Medina',
    clientDni: '79.482.910',
    clientPhone: '+57 315 440 9811',
    serviceId: 'deportivo',
    serviceName: 'Descarga Muscular Deportiva',
    servicePrice: 145000,
    durationMinutes: 75,
    date: '2026-09-25',
    timeSlot: '16:00',
    address: 'Calle 116 # 14-22',
    apartmentInfo: 'Apto 301',
    neighborhood: 'Santa Bárbara',
    city: 'Bogotá',
    hasElevator: true,
    hasPets: true,
    notes: 'Entrenamiento de media maratón. Sobrecarga en gemelos e isquiotibiales.',
    status: 'pendiente',
    agreedEthicsCode: true,
    agreedToEthicsCode: true,
    createdAt: '2026-09-22T11:40:00Z',
  },
];

export const INITIAL_BLACKLIST: BlacklistedContact[] = [
  {
    id: 'bl-1',
    phone: '+57 300 000 0000',
    name: 'Usuario bloqueado',
    reason: 'Mensajes inapropiados con insinuaciones ajenas a la salud.',
    dateAdded: '2026-09-15',
  }
];
