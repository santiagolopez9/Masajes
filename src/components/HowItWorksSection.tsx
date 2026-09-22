import React from 'react';
import { Calendar, CheckCircle2, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const HowItWorksSection: React.FC = () => {
  const { openBookingModal } = useApp();

  return (
    <section id="como-funciona" className="py-16 sm:py-20 bg-[#FAF8F5]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-2xl mx-auto text-center space-y-3 mb-12">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#2D4A3A]">
            Sencillo y sin Complicaciones
          </span>
          <h2 className="font-serif-display text-3xl sm:text-4xl font-bold text-stone-900">
            ¿Cómo funciona la visita a tu hogar?
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
            Un proceso transparente, puntual y pensado para que tu única tarea sea desconectar.
          </p>
        </div>

        {/* 3 Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          
          {/* Step 1 */}
          <div className="p-6 rounded-2xl bg-white border border-stone-200/90 shadow-xs relative flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 font-serif-display font-bold text-base flex items-center justify-center mb-4">
                1
              </div>
              <h3 className="font-bold text-stone-900 text-sm mb-2">
                Elige tu Masaje & Fecha
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Selecciona la técnica que necesitas (Descontracturante, Relajante, Deportivo) y la franja horaria que mejor te convenga.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-stone-100 text-[11px] text-stone-400">
              Tarifas claras en COP sin sorpresas
            </div>
          </div>

          {/* Step 2 */}
          <div className="p-6 rounded-2xl bg-white border border-stone-200/90 shadow-xs relative flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 font-serif-display font-bold text-base flex items-center justify-center mb-4">
                2
              </div>
              <h3 className="font-bold text-stone-900 text-sm mb-2">
                Confirmación Inmediata
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Ingresas tu dirección y documento de identidad para trazabilidad y seguridad. Recibes un resumen claro directo en tu WhatsApp.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-stone-100 text-[11px] text-emerald-800 font-medium flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
              <span>Garantía de respeto y privacidad</span>
            </div>
          </div>

          {/* Step 3 */}
          <div className="p-6 rounded-2xl bg-white border border-stone-200/90 shadow-xs relative flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 font-serif-display font-bold text-base flex items-center justify-center mb-4">
                3
              </div>
              <h3 className="font-bold text-stone-900 text-sm mb-2">
                Alivio en tu Espacio
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Llego puntualmente con la camilla armada y lencería desechable. Disfrutas tu sesión y realizas el pago al finalizar (Transferencia, Nequi o Efectivo).
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-stone-100 text-[11px] text-stone-400">
              Pagas al terminar el masaje
            </div>
          </div>

        </div>

        {/* Central Call to Action */}
        <div className="mt-10 text-center">
          <button
            onClick={() => openBookingModal()}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-semibold text-white bg-[#264436] hover:bg-[#1C3328] shadow-sm hover:shadow-md transition-all cursor-pointer"
          >
            <Calendar className="w-4 h-4 text-emerald-300" />
            <span>Reservar Turno a Domicilio</span>
            <ArrowRight className="w-4 h-4 ml-1 text-emerald-300" />
          </button>
        </div>

      </div>
    </section>
  );
};
