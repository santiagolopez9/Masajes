export interface MassageService {
  id: string;
  name: string;
  tagline: string;
  category: 'terapeutico' | 'relajante' | 'deportivo' | 'especializado' | 'descontracturante' | 'drenaje' | 'facial';
  durationMinutes: number;
  price: number;
  currency?: string;
  description: string;
  benefits: string[];
  contraindications: string[];
  image: string;
  popular?: boolean;
}

export interface Appointment {
  id: string;
  clientName: string;
  clientPhone: string;
  clientEmail?: string;
  clientDni: string; // Cédula de Ciudadanía
  address: string;
  apartmentInfo?: string;
  neighborhood: string;
  city: string;
  date: string; // YYYY-MM-DD
  timeSlot: string; // e.g. "10:00"
  serviceId: string;
  serviceName: string;
  servicePrice: number;
  durationMinutes: number;
  status: 'pendiente' | 'confirmada' | 'completada' | 'cancelada';
  hasElevator: boolean;
  hasPets: boolean;
  notes?: string;
  agreedEthicsCode: boolean;
  agreedToEthicsCode?: boolean;
  createdAt: string;
}

export interface TherapistProfile {
  name: string;
  title: string;
  licenseNumber: string; // Matrícula o registro profesional
  yearsExperience?: number;
  phoneWhatsApp: string;
  email?: string;
  city: string;
  coverageAreas?: string[];
  neighborhoods?: string[];
  workingDays: string[];
  workingHours: { start: string; end: string };
  aboutText: string;
  avatarUrl: string;
}

export interface BlockedDate {
  date: string;
  reason?: string;
}

export interface BlacklistedContact {
  id: string;
  phone: string;
  name?: string;
  reason: string;
  dateAdded: string;
}
