import React, { createContext, useContext, useState, useEffect } from 'react';
import { MassageService, TherapistProfile, Appointment, BlacklistedContact } from '../types';
import { INITIAL_SERVICES, INITIAL_THERAPIST, INITIAL_APPOINTMENTS, INITIAL_BLACKLIST } from '../data/mockData';

interface AppContextType {
  services: MassageService[];
  therapist: TherapistProfile;
  appointments: Appointment[];
  blacklist: BlacklistedContact[];
  blockedDates: string[];
  selectedServiceId: string | null;
  isBookingOpen: boolean;
  isBookingModalOpen: boolean;
  isDashboardOpen: boolean;
  isPitchModalOpen: boolean;
  
  // Actions
  openBookingModal: (serviceIdOrService?: string | MassageService) => void;
  closeBookingModal: () => void;
  setIsDashboardOpen: (open: boolean) => void;
  setIsPitchModalOpen: (open: boolean) => void;
  addAppointment: (appointment: Appointment) => void;
  createAppointment: (appointmentData: Omit<Appointment, 'id' | 'createdAt' | 'status'>) => { success: boolean; appointment?: Appointment; error?: string };
  updateAppointmentStatus: (id: string, status: Appointment['status']) => void;
  deleteAppointment: (id: string) => void;
  updateTherapistProfile: (updated: Partial<TherapistProfile>) => void;
  updateServicePrice: (serviceId: string, newPrice: number) => void;
  addToBlacklist: (phone: string, name?: string, reason?: string) => void;
  removeFromBlacklist: (id: string) => void;
  isBlacklisted: (phone: string) => boolean;
  toggleBlockDate: (date: string) => void;
  resetToDefaults: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Services with COP prices check
  const [services, setServices] = useState<MassageService[]>(() => {
    try {
      const saved = localStorage.getItem('km_services_cop_v3');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed[0]?.price > 1000) {
          return parsed;
        }
      }
    } catch {
      // fallback
    }
    return INITIAL_SERVICES;
  });

  // Therapist profile in Colombia
  const [therapist, setTherapist] = useState<TherapistProfile>(() => {
    try {
      const saved = localStorage.getItem('km_therapist_cop_v3');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return INITIAL_THERAPIST;
  });

  // Appointments
  const [appointments, setAppointments] = useState<Appointment[]>(() => {
    try {
      const saved = localStorage.getItem('km_appointments_cop_v3');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return INITIAL_APPOINTMENTS;
  });

  // Safety Blacklist
  const [blacklist, setBlacklist] = useState<BlacklistedContact[]>(() => {
    try {
      const saved = localStorage.getItem('km_blacklist_cop_v3');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return INITIAL_BLACKLIST;
  });

  const [blockedDates, setBlockedDates] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('km_blocked_dates_cop_v3');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return ['2026-09-27'];
  });

  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const [isPitchModalOpen, setIsPitchModalOpen] = useState(false);

  // Sync to localStorage with versioned COP keys
  useEffect(() => {
    localStorage.setItem('km_services_cop_v3', JSON.stringify(services));
  }, [services]);

  useEffect(() => {
    localStorage.setItem('km_therapist_cop_v3', JSON.stringify(therapist));
  }, [therapist]);

  useEffect(() => {
    localStorage.setItem('km_appointments_cop_v3', JSON.stringify(appointments));
  }, [appointments]);

  useEffect(() => {
    localStorage.setItem('km_blacklist_cop_v3', JSON.stringify(blacklist));
  }, [blacklist]);

  useEffect(() => {
    localStorage.setItem('km_blocked_dates_cop_v3', JSON.stringify(blockedDates));
  }, [blockedDates]);

  const openBookingModal = (item?: string | MassageService) => {
    if (typeof item === 'string') {
      setSelectedServiceId(item);
    } else if (item && typeof item === 'object') {
      setSelectedServiceId(item.id);
    } else {
      setSelectedServiceId(services[0]?.id || null);
    }
    setIsBookingModalOpen(true);
  };

  const closeBookingModal = () => {
    setIsBookingModalOpen(false);
  };

  const isBlacklisted = (phone: string): boolean => {
    const cleanNumber = phone.replace(/\D/g, '');
    if (!cleanNumber) return false;
    return blacklist.some(b => {
      const bClean = b.phone.replace(/\D/g, '');
      return bClean.length > 5 && (bClean.includes(cleanNumber) || cleanNumber.includes(bClean));
    });
  };

  const addAppointment = (appointment: Appointment) => {
    setAppointments(prev => [appointment, ...prev]);
  };

  const createAppointment = (data: Omit<Appointment, 'id' | 'createdAt' | 'status'>) => {
    if (isBlacklisted(data.clientPhone)) {
      return {
        success: false,
        error: 'El número de teléfono está inhabilitado para agendar citas por el protocolo de seguridad.'
      };
    }

    const newAppt: Appointment = {
      ...data,
      id: `CIT-${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: new Date().toISOString(),
      status: 'pendiente',
    };

    setAppointments(prev => [newAppt, ...prev]);
    return { success: true, appointment: newAppt };
  };

  const updateAppointmentStatus = (id: string, status: Appointment['status']) => {
    setAppointments(prev =>
      prev.map(a => (a.id === id ? { ...a, status } : a))
    );
  };

  const deleteAppointment = (id: string) => {
    setAppointments(prev => prev.filter(a => a.id !== id));
  };

  const updateTherapistProfile = (updated: Partial<TherapistProfile>) => {
    setTherapist(prev => ({ ...prev, ...updated }));
  };

  const updateServicePrice = (serviceId: string, newPrice: number) => {
    setServices(prev =>
      prev.map(s => (s.id === serviceId ? { ...s, price: newPrice } : s))
    );
  };

  const addToBlacklist = (phone: string, name?: string, reason?: string) => {
    const newEntry: BlacklistedContact = {
      id: `bl-${Date.now()}`,
      phone,
      name: name || 'Contacto restringido',
      reason: reason || 'Conducta no profesional reportada',
      dateAdded: new Date().toISOString().split('T')[0],
    };
    setBlacklist(prev => [newEntry, ...prev]);
  };

  const removeFromBlacklist = (id: string) => {
    setBlacklist(prev => prev.filter(b => b.id !== id));
  };

  const toggleBlockDate = (date: string) => {
    setBlockedDates(prev =>
      prev.includes(date) ? prev.filter(d => d !== date) : [...prev, date]
    );
  };

  const resetToDefaults = () => {
    localStorage.removeItem('km_services_cop_v3');
    localStorage.removeItem('km_therapist_cop_v3');
    localStorage.removeItem('km_appointments_cop_v3');
    localStorage.removeItem('km_blacklist_cop_v3');
    localStorage.removeItem('km_blocked_dates_cop_v3');
    setServices(INITIAL_SERVICES);
    setTherapist(INITIAL_THERAPIST);
    setAppointments(INITIAL_APPOINTMENTS);
    setBlacklist(INITIAL_BLACKLIST);
    setBlockedDates(['2026-09-27']);
  };

  return (
    <AppContext.Provider
      value={{
        services,
        therapist,
        appointments,
        blacklist,
        blockedDates,
        selectedServiceId,
        isBookingOpen: isBookingModalOpen,
        isBookingModalOpen,
        isDashboardOpen,
        isPitchModalOpen,
        openBookingModal,
        closeBookingModal,
        setIsDashboardOpen,
        setIsPitchModalOpen,
        addAppointment,
        createAppointment,
        updateAppointmentStatus,
        deleteAppointment,
        updateTherapistProfile,
        updateServicePrice,
        addToBlacklist,
        removeFromBlacklist,
        isBlacklisted,
        toggleBlockDate,
        resetToDefaults,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
