import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Calendar, MessageCircle, ArrowRight } from 'lucide-react';

export const FloatingCTA: React.FC = () => {
  const { openBookingModal, therapist } = useApp();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show when scrolled down past hero (> 350px)
      if (window.scrollY > 350) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  const cleanPhone = therapist.phoneWhatsApp.replace(/\D/g, '');

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 z-40 max-w-md animate-fade-in">
      <div className="bg-[#243A2E]/95 backdrop-blur-md text-white p-3 sm:px-4 sm:py-3 rounded-2xl shadow-xl border border-emerald-700/40 flex items-center justify-between gap-3">
        <div className="hidden sm:block">
          <span className="text-xs font-semibold text-white block">
            Masoterapia a Domicilio
          </span>
          <span className="text-[11px] text-[#C1D9CC]">
            Bogotá · Camilla y toallas incluidas
          </span>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <a
            href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent(
              `Hola ${therapist.name}, quisiera consultar disponibilidad para agendar una sesión a domicilio.`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 sm:px-3 sm:py-2 rounded-xl text-xs font-medium text-[#243A2E] bg-[#E7EFEA] hover:bg-white transition-colors flex items-center gap-1.5 shrink-0"
            title="WhatsApp"
          >
            <MessageCircle className="w-3.5 h-3.5 text-emerald-800" />
            <span className="hidden sm:inline">WhatsApp</span>
          </a>

          <button
            onClick={() => openBookingModal()}
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-600 transition-colors shadow-xs cursor-pointer shrink-0"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Agendar Cita en Casa</span>
            <ArrowRight className="w-3.5 h-3.5 ml-0.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
