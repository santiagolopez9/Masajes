import React from 'react';
import { useApp } from '../context/AppContext';
import { Award, ShieldCheck, MapPin, CheckCircle, Calendar, MessageCircle } from 'lucide-react';

export const AboutTherapistSection: React.FC = () => {
  const { therapist, openBookingModal } = useApp();
  const cleanPhone = therapist.phoneWhatsApp.replace(/\D/g, '');

  return (
    <section id="terapeuta" className="py-16 sm:py-20 bg-[#F5F2EB]/50 border-t border-stone-200/70">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Therapist Photo (5 cols) */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-sm lg:max-w-none">
              <div className="rounded-2xl overflow-hidden shadow-lg border border-stone-200 bg-white aspect-[3/4]">
                <img
                  src={therapist.avatarUrl}
                  alt={`Retrato profesional de ${therapist.name}`}
                  className="w-full h-full object-cover object-top"
                />
              </div>

              {/* Credential Badge overlay */}
              <div className="absolute -bottom-4 left-4 right-4 bg-white rounded-xl p-3.5 shadow-md border border-stone-200 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-emerald-100/80 text-[#264436] flex items-center justify-center shrink-0">
                  <Award className="w-5 h-5 text-emerald-800" />
                </div>
                <div>
                  <span className="text-xs font-bold text-stone-900 block leading-tight">
                    {therapist.name}
                  </span>
                  <span className="text-[11px] text-emerald-800 font-medium block">
                    {therapist.licenseNumber}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Bio & Credentials (7 cols) */}
          <div className="lg:col-span-7 space-y-6 pt-4 lg:pt-0">
            
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#2D4A3A] uppercase tracking-wider">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                <span>Perfil Profesional</span>
              </div>
              <h2 className="font-serif-display text-2xl sm:text-3xl lg:text-4xl font-bold text-stone-900 leading-tight">
                Salud, biomecánica y trato respetuoso
              </h2>
              <p className="text-xs font-semibold text-[#2D4A3A]">
                {therapist.title}
              </p>
            </div>

            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              {therapist.aboutText}
            </p>

            {/* Coverage Zones in Colombia */}
            <div className="p-4 rounded-xl bg-white border border-stone-200/90 shadow-xs space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-stone-900">
                <MapPin className="w-4 h-4 text-red-600 shrink-0" />
                <span>Zonas de cobertura habitual en {therapist.city}:</span>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed pl-6">
                {(therapist.neighborhoods || therapist.coverageAreas || ['Chicó', 'Rosales', 'Usaquén', 'Santa Bárbara', 'Salitre']).join(' · ')} (y sectores aledaños previa confirmación).
              </p>
            </div>

            {/* Call to Actions */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => openBookingModal()}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-semibold text-white bg-[#264436] hover:bg-[#1C3328] shadow-sm hover:shadow-md transition-all cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-emerald-300" />
                <span>Agendar Cita con {therapist.name.split(' ')[1] || 'Laura'}</span>
              </button>

              <a
                href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent(
                  `Hola ${therapist.name}, quisiera hacerte una consulta antes de agendar un masaje a domicilio.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-3 rounded-xl text-xs font-medium text-[#264436] bg-white hover:bg-stone-50 border border-stone-200 transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-emerald-700" />
                <span>Hablar por WhatsApp</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
