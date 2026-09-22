import React from 'react';
import { Sparkles, Check, Home, Shield, Feather, Music } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const EquipmentSection: React.FC = () => {
  const { openBookingModal } = useApp();

  return (
    <section id="equipamiento" className="py-16 sm:py-20 bg-[#F5F2EB]/50 border-t border-b border-stone-200/70">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Visual Showcase (5 cols) */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="relative rounded-2xl overflow-hidden shadow-lg border border-stone-200 bg-white aspect-[4/3] sm:aspect-[16/11]">
              <img
                src="/assets/images/home_portable_table_1790111090142.jpg"
                alt="Camilla profesional portátil para masajes a domicilio"
                className="w-full h-full object-cover object-center"
              />
              
              <div className="absolute top-3 left-3 bg-[#264436] text-white text-[10px] font-semibold tracking-wider px-3 py-1 rounded-full uppercase shadow-xs">
                Equipamiento Clínico Portátil
              </div>

              <div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur-md p-3 rounded-xl border border-stone-200/80 text-xs text-stone-700 shadow-xs">
                <span className="font-semibold text-stone-900 block">
                  Solo necesitas un espacio de 2 x 1.5 metros
                </span>
                <span className="text-[11px] text-stone-500">
                  En tu sala, estudio o habitación. La instalación toma solo 5 minutos.
                </span>
              </div>
            </div>
          </div>

          {/* Description & Elements (7 cols) */}
          <div className="lg:col-span-7 order-1 lg:order-2 space-y-6">
            
            <div className="space-y-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#2D4A3A]">
                Comodidad Absoluta en Casa
              </span>
              <h2 className="font-serif-display text-2xl sm:text-3xl lg:text-4xl font-bold text-stone-900 leading-tight">
                Llevamos el confort de un spa clínico a tu puerta
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                No tienes que lidiar con el tráfico ni el estrés de desplazarte tras el masaje. Yo me encargo de trasladar todo el material estéril necesario para que solo te preocupes por descansar.
              </p>
            </div>

            {/* 4 Tranquil Feature Points */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              
              <div className="p-4 rounded-xl bg-white border border-stone-200 shadow-xs">
                <div className="flex items-center gap-2 mb-1.5">
                  <Feather className="w-4 h-4 text-emerald-800" />
                  <h3 className="font-bold text-stone-900 text-xs">Camilla Ergonómica</h3>
                </div>
                <p className="text-[11px] text-stone-600 leading-relaxed">
                  Estructura ultra-ligera de aluminio con acolchado viscoelástico y soporte facial anatómico que no comprime la vista.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white border border-stone-200 shadow-xs">
                <div className="flex items-center gap-2 mb-1.5">
                  <Shield className="w-4 h-4 text-emerald-800" />
                  <h3 className="font-bold text-stone-900 text-xs">Lencería 100% Descartable</h3>
                </div>
                <p className="text-[11px] text-stone-600 leading-relaxed">
                  Sábanas clínicas y protectores descartables nuevos que se abren frente a ti en cada sesión para máxima higiene.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white border border-stone-200 shadow-xs">
                <div className="flex items-center gap-2 mb-1.5">
                  <Sparkles className="w-4 h-4 text-emerald-800" />
                  <h3 className="font-bold text-stone-900 text-xs">Aceites Botánicos Puros</h3>
                </div>
                <p className="text-[11px] text-stone-600 leading-relaxed">
                  Bases orgánicas de almendras y semillas de uva con aceites esenciales naturales o versión hipoalergénica sin aroma.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white border border-stone-200 shadow-xs">
                <div className="flex items-center gap-2 mb-1.5">
                  <Music className="w-4 h-4 text-emerald-800" />
                  <h3 className="font-bold text-stone-900 text-xs">Música & Clima Cálido</h3>
                </div>
                <p className="text-[11px] text-stone-600 leading-relaxed">
                  Altavoz acústico portátil con melodías relajantes y cobija térmica para mantener la temperatura muscular ideal.
                </p>
              </div>

            </div>

            {/* Quick CTA inside section */}
            <div className="pt-2">
              <button
                onClick={() => openBookingModal()}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-[#264436] hover:bg-[#1C3328] transition-colors cursor-pointer"
              >
                <span>Solicitar Masaje a Domicilio</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
