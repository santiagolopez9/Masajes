import React from 'react';
import { useApp } from '../context/AppContext';
import { Calendar, ShieldCheck, Sparkles, Check, ArrowRight, Home, HeartHandshake } from 'lucide-react';

export const Hero: React.FC = () => {
  const { openBookingModal, therapist } = useApp();

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#FAF8F5] via-[#F6F3EC] to-[#FAF8F5] pt-12 pb-16 lg:pt-16 lg:pb-24 border-b border-stone-200/60">
      
      {/* Subtle organic background glow */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-emerald-100/40 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 rounded-full bg-amber-100/30 blur-3xl pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Text & CTAs (7 cols) */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Tranquil trust badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50/90 border border-emerald-200/80 text-xs text-[#264436] font-medium shadow-xs">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              <span>{therapist.title} · {therapist.city}</span>
            </div>

            {/* Main Serene Headline */}
            <h1 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-stone-900 leading-[1.18]">
              El alivio que tu cuerpo necesita, en la calma de tu hogar.
            </h1>

            {/* Tranquil, reassuring description */}
            <p className="text-sm sm:text-base text-stone-600 leading-relaxed max-w-xl">
              Masoterapia profesional, descontracturante y relajante a domicilio. Traslado camilla ergonómica, lencería estéril desechable y aceites botánicos para transformar tu sala o habitación en un santuario de salud.
            </p>

            {/* Primary & Secondary Call to Action Area */}
            <div className="pt-2 space-y-4">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                
                {/* Main High-Converting CTA */}
                <button
                  onClick={() => openBookingModal()}
                  className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl text-sm font-semibold text-white bg-[#264436] hover:bg-[#1E362A] shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 cursor-pointer"
                >
                  <Calendar className="w-4 h-4 text-emerald-300" />
                  <span>Agendar Cita a Domicilio</span>
                  <ArrowRight className="w-4 h-4 ml-1 text-emerald-300" />
                </button>

                {/* Secondary Discovery Link */}
                <a
                  href="#servicios"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl text-sm font-medium text-stone-700 hover:text-stone-900 bg-white/80 hover:bg-white border border-stone-300/80 shadow-xs transition-all text-center"
                >
                  <span>Ver Servicios & Precios (COP)</span>
                </a>
              </div>

              {/* Reassurance Checklist */}
              <div className="pt-2 flex flex-wrap items-center gap-y-2 gap-x-5 text-xs text-stone-500">
                <span className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Sin pagos adelantados</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Camilla portátil y toallas incluidas</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Servicio 100% de salud y bienestar</span>
                </span>
              </div>
            </div>

            {/* Direct Zero-Pill Quick Stats */}
            <div className="pt-4 border-t border-stone-200/70 flex flex-wrap items-center gap-6 text-xs text-stone-600">
              <div>
                <span className="font-bold text-stone-900 text-sm block">Tarifas desde $110.000 COP</span>
                <span className="text-stone-400 text-[11px]">Sesiones completas de 50 a 75 min</span>
              </div>
              <div className="w-px h-8 bg-stone-200 hidden sm:block"></div>
              <div>
                <span className="font-bold text-stone-900 text-sm block">Cobertura en Bogotá</span>
                <span className="text-stone-400 text-[11px]">Chicó, Rosales, Usaquén, Salitre y más</span>
              </div>
            </div>

          </div>

          {/* Calming Visual Showcase (5 cols) */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              <div className="relative rounded-2xl overflow-hidden shadow-xl border border-stone-200/90 bg-stone-100 aspect-[4/3] sm:aspect-[16/11]">
                <img
                  src="/assets/images/hero_massage_therapy_1790111040036.jpg"
                  alt="Instalación profesional y serena de masoterapia a domicilio con camilla ergonómica"
                  className="w-full h-full object-cover object-center transform hover:scale-102 transition-transform duration-700"
                />
                
                {/* Gentle corner badge */}
                <div className="absolute bottom-3 left-3 right-3 bg-stone-900/85 backdrop-blur-md text-white px-3.5 py-2.5 rounded-xl text-xs border border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Home className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span className="text-[11px] font-medium text-stone-200">
                      Todo el equipamiento va incluido
                    </span>
                  </div>
                  <span className="text-[10px] text-emerald-300 font-mono">
                    Higiene Certificada
                  </span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
