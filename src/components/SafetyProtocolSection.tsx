import React from 'react';
import { ShieldCheck, UserCheck, EyeOff, Scale, Check } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const SafetyProtocolSection: React.FC = () => {
  const { therapist } = useApp();

  return (
    <section id="seguridad" className="py-16 bg-[#F5F2EB]/60 border-b border-stone-200/70">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with serene authority */}
        <div className="max-w-2xl mx-auto text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100/70 text-[#243A2E] text-xs font-semibold">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-800" />
            <span>Ética Profesional & Seguridad Mutua</span>
          </div>
          <h2 className="font-serif-display text-2xl sm:text-3xl font-bold text-stone-900">
            Un espacio de salud, tranquilidad y respeto absoluto
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
            Para garantizar una experiencia segura, armónica y transparente tanto para el paciente como para la profesional en cada visita domiciliaria.
          </p>
        </div>

        {/* 4 Tranquil & Firm Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          
          <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-xs hover:border-emerald-300/80 transition-all flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center mb-4">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-stone-900 text-sm mb-2">
                Enfoque 100% Clínico y Salud
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Servicio estricto de masoterapia biomecánica, relajación y fisioterapia. No se realizan masajes eróticos, tántricos ni afines bajo ninguna circunstancia.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-stone-100 text-[11px] text-emerald-900 font-medium flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-emerald-700" />
              <span>Salud y recuperación física</span>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-xs hover:border-emerald-300/80 transition-all flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center mb-4">
                <UserCheck className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-stone-900 text-sm mb-2">
                Identificación Preventiva (C.C.)
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Toda cita a domicilio requiere el nombre completo, número de cédula y dirección verificable. La trazabilidad nos protege a ambos.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-stone-100 text-[11px] text-emerald-900 font-medium flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-emerald-700" />
              <span>Cero anonimato domiciliario</span>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-xs hover:border-emerald-300/80 transition-all flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center mb-4">
                <EyeOff className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-stone-900 text-sm mb-2">
                Protocolo de Draping (Pudor)
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                El cuerpo permanece respetuosamente cubierto con sábanas y toallas estériles durante toda la sesión; solo se descubre el músculo a tratar.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-stone-100 text-[11px] text-emerald-900 font-medium flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-emerald-700" />
              <span>Comodidad y discreción total</span>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-xs hover:border-emerald-300/80 transition-all flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-red-50 text-red-800 flex items-center justify-center mb-4">
                <Scale className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-stone-900 text-sm mb-2">
                Tolerancia Cero Inapelable
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Cualquier insinuación o falta de respeto causará la suspensión inmediata del servicio, el retiro del domicilio y el bloqueo definitivo del contacto.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-stone-100 text-[11px] text-red-900 font-medium flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-red-700" />
              <span>Protección legal inquebrantable</span>
            </div>
          </div>

        </div>

        {/* Peaceful reassurance footnote */}
        <div className="mt-8 text-center">
          <p className="text-xs text-stone-500">
            Agradecemos a todos nuestros pacientes que valoran la salud, el profesionalismo y el descanso genuino.
          </p>
        </div>

      </div>
    </section>
  );
};
