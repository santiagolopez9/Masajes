import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Calendar, ShieldCheck, Menu, X, Sparkles, MessageCircle, Clock } from 'lucide-react';

export const Header: React.FC = () => {
  const { openBookingModal, setIsDashboardOpen, setIsPitchModalOpen, therapist } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const cleanPhone = therapist.phoneWhatsApp.replace(/\D/g, '');

  return (
    <>
      {/* Serene Top Bar */}
      <div className="bg-[#243A2E] text-[#E7EFEA] text-[11px] sm:text-xs py-2 px-4 transition-colors">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 shrink-0"></span>
            <span className="font-medium text-[#D8E6DE]">
              Atención a domicilio en {therapist.city}
            </span>
            <span className="hidden sm:inline text-stone-400">·</span>
            <span className="hidden sm:inline text-[#B5CEC1]">
              Camilla ergonómica, lencería estéril y aromaterapia incluidas
            </span>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setIsPitchModalOpen(true)}
              className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-900/60 hover:bg-emerald-900 text-emerald-200 border border-emerald-700/50 text-[11px] transition-colors cursor-pointer"
            >
              <Sparkles className="w-3 h-3 text-emerald-300" />
              <span>Propuesta para la Terapeuta</span>
            </button>
            <button
              onClick={() => setIsDashboardOpen(true)}
              className="text-[#D8E6DE] hover:text-white transition-colors cursor-pointer flex items-center gap-1"
            >
              <span className="text-[11px] font-medium">Mi Agenda</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <header className="sticky top-0 z-40 bg-[#FBF9F5]/95 backdrop-blur-md border-b border-stone-200/80 transition-all">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-18">
            
            {/* Brand */}
            <a href="#" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-[#2D4A3A] text-white flex items-center justify-center font-serif-display text-lg font-bold shadow-xs transition-transform group-hover:scale-105">
                K
              </div>
              <div className="flex flex-col">
                <span className="font-serif-display text-lg sm:text-xl font-bold tracking-tight text-stone-900 leading-tight">
                  Komorebi
                </span>
                <span className="text-[11px] text-[#426150] font-semibold tracking-wide uppercase">
                  Masoterapia a Domicilio
                </span>
              </div>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-7 text-xs font-medium text-stone-600">
              <a href="#servicios" className="hover:text-[#2D4A3A] transition-colors">
                Servicios & Precios
              </a>
              <a href="#equipamiento" className="hover:text-[#2D4A3A] transition-colors">
                Tu Espacio en Casa
              </a>
              <a href="#seguridad" className="hover:text-[#2D4A3A] transition-colors flex items-center gap-1 text-[#2D4A3A] font-semibold">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                <span>Protocolo de Respeto</span>
              </a>
              <a href="#terapeuta" className="hover:text-[#2D4A3A] transition-colors">
                Sobre Mí
              </a>
            </nav>

            {/* Action CTA buttons */}
            <div className="hidden sm:flex items-center gap-3">
              <a
                href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent(
                  `Hola ${therapist.name}, me gustaría consultar disponibilidad para una sesión de masoterapia a domicilio.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium text-[#2D4A3A] bg-emerald-50 hover:bg-emerald-100/80 border border-emerald-200/80 transition-colors"
                title="Escribir por WhatsApp"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-700" />
                <span>WhatsApp</span>
              </a>

              <button
                onClick={() => openBookingModal()}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-white bg-[#2D4A3A] hover:bg-[#233B2E] shadow-sm hover:shadow-md transition-all transform hover:-translate-y-0.5 cursor-pointer"
              >
                <Calendar className="w-3.5 h-3.5 text-emerald-300" />
                <span>Agendar Cita en Casa</span>
              </button>
            </div>

            {/* Mobile hamburger button */}
            <div className="flex sm:hidden items-center gap-2">
              <button
                onClick={() => openBookingModal()}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-[#2D4A3A]"
              >
                Agendar
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-stone-600 hover:text-stone-900 hover:bg-stone-100"
                aria-label="Abrir menú"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="sm:hidden border-t border-stone-200 bg-[#FBF9F5] px-4 py-4 space-y-3">
            <a
              href="#servicios"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-xs font-medium text-stone-700 py-1"
            >
              Servicios & Precios (COP)
            </a>
            <a
              href="#equipamiento"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-xs font-medium text-stone-700 py-1"
            >
              Tu Espacio en Casa
            </a>
            <a
              href="#seguridad"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-xs font-medium text-[#2D4A3A] font-semibold py-1"
            >
              Protocolo de Respeto y Seguridad
            </a>
            <a
              href="#terapeuta"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-xs font-medium text-stone-700 py-1"
            >
              Sobre la Profesional
            </a>

            <div className="pt-2 border-t border-stone-200 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openBookingModal();
                }}
                className="w-full py-2.5 rounded-xl text-xs font-semibold text-white bg-[#2D4A3A] text-center"
              >
                Agendar Cita a Domicilio
              </button>
              <a
                href={`https://wa.me/${cleanPhone}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2 rounded-xl text-xs font-medium text-[#2D4A3A] bg-emerald-50 border border-emerald-200 text-center flex items-center justify-center gap-1.5"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-700" />
                <span>Contactar por WhatsApp</span>
              </a>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsPitchModalOpen(true);
                }}
                className="w-full py-2 text-xs text-stone-500 text-center"
              >
                ✨ Ver Propuesta Comercial
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
