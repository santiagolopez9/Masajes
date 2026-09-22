import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Clock,
  CheckCircle2,
  DollarSign,
  User,
  ArrowRight,
  X,
  Lock,
  Phone
} from 'lucide-react';

export const PitchModal: React.FC = () => {
  const { isPitchModalOpen, setIsPitchModalOpen, therapist, updateTherapistProfile } = useApp();
  
  const [customName, setCustomName] = useState(therapist.name);
  const [customPhone, setCustomPhone] = useState(therapist.phoneWhatsApp);
  const [customCity, setCustomCity] = useState(therapist.city);
  const [appliedCustom, setAppliedCustom] = useState(false);

  if (!isPitchModalOpen) return null;

  const handleApplyCustomization = (e: React.FormEvent) => {
    e.preventDefault();
    updateTherapistProfile({
      name: customName,
      phoneWhatsApp: customPhone,
      city: customCity,
    });
    setAppliedCustom(true);
    setTimeout(() => setAppliedCustom(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-stone-900/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden my-6 flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="px-6 py-5 bg-gradient-to-r from-emerald-950 via-stone-900 to-stone-900 text-white flex items-center justify-between border-b border-stone-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-800 text-emerald-100 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-emerald-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold">
                  Propuesta Comercial y Blindaje de Seguridad
                </h3>
                <span className="text-[10px] bg-emerald-800/90 text-white px-2 py-0.5 rounded-full font-semibold uppercase tracking-wider">
                  Guía para Ofrecerla
                </span>
              </div>
              <p className="text-xs text-stone-300">
                Cómo esta web resuelve el problema de las propuestas inapropiadas y dignifica el servicio
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsPitchModalOpen(false)}
            className="p-1.5 text-stone-400 hover:text-white rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-8 flex-1">
          
          {/* Main Problem & Solution Hero */}
          <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-6 sm:p-7">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center shrink-0">
                <ShieldAlert className="w-6 h-6 text-amber-800" />
              </div>
              <div>
                <h4 className="text-base font-bold text-amber-950 mb-1">
                  El Problema Real: &quot;Muchos hombres me buscan con segundas intenciones&quot;
                </h4>
                <p className="text-xs sm:text-sm text-amber-900/90 leading-relaxed">
                  Cuando una masoterapeuta se promociona solo por WhatsApp o redes sociales sin una web corporativa, los hombres deshonestos asumen que no existen protocolos ni registros legales. Creen que pueden insinuarse o negociar &quot;servicios extra&quot; porque no hay barreras de entrada.
                </p>
                <div className="mt-3 text-xs font-semibold text-emerald-900 bg-white/80 border border-amber-300/80 rounded-lg p-3">
                  <strong>La Solución Definitiva:</strong> Esta web actúa como un <u>filtro psicológico y legal automático</u>. Quien busca algo fuera de lugar jamás aceptará entregar su DNI ni firmará un código de tolerancia cero. Los acosadores se van solos; los pacientes de alto valor reservan con confianza.
                </div>
              </div>
            </div>
          </div>

          {/* 4 Pillars of Value to Present to Her */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-stone-400 mb-4">
              Los 4 Argumentos Clave para Convencerla
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-stone-200">
                <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center mb-3">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h5 className="font-bold text-stone-900 text-sm mb-1">
                  1. Filtro Previo de Cédula (C.C.) & Domicilio
                </h5>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Para pedir un turno, el paciente debe colocar su documento de identidad y dirección exacta comprobable. Esto le da a ella total trazabilidad y tranquilidad al ingresar a un hogar.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-stone-200">
                <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center mb-3">
                  <DollarSign className="w-5 h-5" />
                </div>
                <h5 className="font-bold text-stone-900 text-sm mb-1">
                  2. Aumento de Tarifas (Cobrar en COP lo que Vale)
                </h5>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Una web con estética clínica de alto nivel elimina la imagen de &quot;masaje informal&quot; y le permite cobrar entre $120.000 y $160.000 COP por sesión con total justificación, atrayendo pacientes de alto perfil.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-stone-200">
                <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center mb-3">
                  <Clock className="w-5 h-5" />
                </div>
                <h5 className="font-bold text-stone-900 text-sm mb-1">
                  3. Ahorro de 10 Horas a la Semana
                </h5>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Ya no tiene que contestar una y otra vez: &quot;¿qué incluye?&quot;, &quot;¿cuánto cobras?&quot;, &quot;¿traes camilla?&quot;. La web lo explica todo y le envía el turno listo y masticado a su WhatsApp.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-stone-200">
                <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center mb-3">
                  <Lock className="w-5 h-5" />
                </div>
                <h5 className="font-bold text-stone-900 text-sm mb-1">
                  4. Lista Negra y Bloqueo con 1 Clic
                </h5>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Si alguna vez un número le escribe fuera de lugar, lo agrega en el panel en 2 segundos y el sistema le bloqueará cualquier intento de pedir turnos en el futuro.
                </p>
              </div>

            </div>
          </div>

          {/* Live Personalizer: Put her real name and phone to show her! */}
          <div className="p-6 rounded-2xl bg-stone-900 text-white">
            <div className="flex items-center gap-2 mb-2">
              <User className="w-4 h-4 text-emerald-400" />
              <h5 className="text-sm font-bold text-white">
                Personalizar la Demo con los Datos Reales de Ella
              </h5>
            </div>
            <p className="text-xs text-stone-300 mb-4">
              Coloca aquí el nombre y WhatsApp de la masoterapeuta para que cuando le envíes el enlace, vea la web ya funcionando a su nombre.
            </p>

            <form onSubmit={handleApplyCustomization} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] text-stone-400 mb-1">Su Nombre Completo</label>
                <input
                  type="text"
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs rounded-lg bg-stone-800 border border-stone-700 text-white focus:ring-1 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-[11px] text-stone-400 mb-1">Su WhatsApp con código</label>
                <input
                  type="text"
                  value={customPhone}
                  onChange={(e) => setCustomPhone(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs rounded-lg bg-stone-800 border border-stone-700 text-white focus:ring-1 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-[11px] text-stone-400 mb-1">Su Ciudad o Zonas</label>
                <input
                  type="text"
                  value={customCity}
                  onChange={(e) => setCustomCity(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs rounded-lg bg-stone-800 border border-stone-700 text-white focus:ring-1 focus:ring-emerald-500"
                />
              </div>

              <div className="sm:col-span-3 flex items-center justify-between pt-2">
                <span className="text-[11px] text-emerald-400">
                  {appliedCustom ? '¡Datos aplicados en toda la web!' : ''}
                </span>

                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-semibold text-stone-900 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors cursor-pointer"
                >
                  Aplicar sus Datos a la Web
                </button>
              </div>
            </form>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-stone-50 border-t border-stone-200 flex items-center justify-between shrink-0">
          <span className="text-xs text-stone-500">
            Puedes compartirle el enlace de esta aplicación directamente.
          </span>

          <button
            onClick={() => setIsPitchModalOpen(false)}
            className="px-5 py-2 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-xl transition-colors cursor-pointer"
          >
            Explorar la Web Completa
          </button>
        </div>

      </div>
    </div>
  );
};
