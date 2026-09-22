import React from 'react';
import { useApp } from '../context/AppContext';
import { ShieldCheck, Calendar, Lock } from 'lucide-react';

export const Footer: React.FC = () => {
  const { therapist, setIsDashboardOpen, setIsPitchModalOpen } = useApp();

  return (
    <footer className="bg-stone-900 text-stone-400 text-xs py-14 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Col 1: Brand & Clinical Statement */}
          <div className="md:col-span-2">
            <span className="font-serif-display text-xl font-bold text-white block mb-2">
              Komorebi Masoterapia
            </span>
            <p className="text-stone-400 text-xs max-w-md leading-relaxed mb-4">
              Servicio profesional de masoterapia, fisioterapia preventiva y alivio muscular a domicilio. Cumplimiento riguroso de protocolos de higiene, bioseguridad y consentimiento informado.
            </p>
            <div className="flex items-center gap-2 text-emerald-400 text-[11px] font-medium">
              <ShieldCheck className="w-4 h-4" />
              <span>Servicio 100% terapéutico · {therapist.licenseNumber}</span>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h5 className="font-semibold text-white uppercase tracking-wider text-[11px] mb-3">
              Navegación
            </h5>
            <ul className="space-y-2">
              <li>
                <a href="#servicios" className="hover:text-white transition-colors">
                  Servicios & Tarifas
                </a>
              </li>
              <li>
                <a href="#seguridad" className="hover:text-white transition-colors text-emerald-400">
                  Protocolo de Seguridad
                </a>
              </li>
              <li>
                <a href="#como-funciona" className="hover:text-white transition-colors">
                  Cómo Funciona el Domicilio
                </a>
              </li>
              <li>
                <a href="#equipamiento" className="hover:text-white transition-colors">
                  Equipamiento Portátil
                </a>
              </li>
              <li>
                <a href="#terapeuta" className="hover:text-white transition-colors">
                  Sobre la Profesional
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Legal & Professional Access */}
          <div>
            <h5 className="font-semibold text-white uppercase tracking-wider text-[11px] mb-3">
              Gestión & Legal
            </h5>
            <div className="space-y-2.5">
              <button
                onClick={() => setIsDashboardOpen(true)}
                className="flex items-center gap-1.5 text-stone-300 hover:text-white transition-colors cursor-pointer text-xs"
              >
                <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                <span>Acceso a Mi Agenda (Privado)</span>
              </button>
              
              <button
                onClick={() => setIsPitchModalOpen(true)}
                className="flex items-center gap-1.5 text-stone-300 hover:text-white transition-colors cursor-pointer text-xs"
              >
                <Lock className="w-3.5 h-3.5 text-emerald-400" />
                <span>Propuesta y Argumentos de Venta</span>
              </button>
              
              <p className="text-[11px] text-stone-500 pt-2 leading-relaxed">
                Este servicio no ofrece ningún tipo de masaje erótico, sensual ni afines. Cero tolerancia a faltas de respeto.
              </p>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-stone-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-stone-500">
          <div>
            © {new Date().getFullYear()} Komorebi Masoterapia a Domicilio. Atención por {therapist.name}.
          </div>
          <div className="flex items-center gap-4">
            <span>Privacidad de Datos Sanitarios</span>
            <span>·</span>
            <span>Consentimiento Informado</span>
            <span>·</span>
            <span>Trazabilidad Domiciliaria</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
