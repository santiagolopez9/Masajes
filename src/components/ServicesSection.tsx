import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Clock, Check, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { formatCOP } from '../utils/formatters';

export const ServicesSection: React.FC = () => {
  const { services, openBookingModal } = useApp();
  const [activeCategory, setActiveCategory] = useState<string>('todos');

  const categories = [
    { id: 'todos', label: 'Todos los Masajes' },
    { id: 'descontracturante', label: 'Descontracturantes' },
    { id: 'relajante', label: 'Relajantes & Anti-Estrés' },
    { id: 'deportivo', label: 'Deportivos' },
    { id: 'drenaje', label: 'Drenaje Linfático' },
    { id: 'facial', label: 'Craneofacial' },
  ];

  const filteredServices = activeCategory === 'todos'
    ? services
    : services.filter(s => s.category === activeCategory);

  return (
    <section id="servicios" className="py-16 sm:py-20 bg-[#FAF8F5]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center space-y-3 mb-10">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#2D4A3A]">
            Carta de Tratamientos a Domicilio
          </span>
          <h2 className="font-serif-display text-3xl sm:text-4xl font-bold text-stone-900">
            Masajes terapéuticos para cada necesidad
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
            Tarifas transparentes en pesos colombianos (COP). Cada sesión incluye el traslado de la camilla ergonómica, lencería sanitaria descartable y aceites botánicos esenciales.
          </p>
        </div>

        {/* Category Filters (Clean & Tranquil) */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-[#264436] text-white shadow-xs font-semibold'
                  : 'bg-white text-stone-600 hover:text-stone-900 border border-stone-200/80 hover:border-stone-300'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredServices.map(service => (
            <div
              key={service.id}
              className="bg-white rounded-2xl border border-stone-200/90 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
            >
              {/* Image & Popular Badge */}
              <div className="relative aspect-[16/10] overflow-hidden bg-stone-100">
                <img
                  src={service.image}
                  alt={service.name}
                  className="w-full h-full object-cover object-center group-hover:scale-104 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/60 via-transparent to-transparent" />
                
                {service.popular && (
                  <div className="absolute top-3 left-3 bg-[#264436] text-white text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-xs flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-emerald-300" />
                    <span>Más Solicitado</span>
                  </div>
                )}

                {/* Duration & Price zero-pill overlay */}
                <div className="absolute bottom-3 left-3 right-3 text-white flex items-end justify-between">
                  <span className="text-xs font-medium text-stone-200 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-emerald-300" />
                    <span>{service.durationMinutes} minutos</span>
                  </span>
                  <div className="text-right">
                    <span className="text-lg font-bold font-serif-display text-white tracking-tight">
                      {formatCOP(service.price)}
                    </span>
                    <span className="block text-[10px] text-stone-300">COP · Todo incluido</span>
                  </div>
                </div>
              </div>

              {/* Service Info Content */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="font-serif-display text-lg font-bold text-stone-900 group-hover:text-[#264436] transition-colors leading-snug">
                    {service.name}
                  </h3>
                  <p className="text-xs text-[#3B5B49] font-medium mt-1">
                    {service.tagline}
                  </p>
                  <p className="text-xs text-stone-600 leading-relaxed mt-2.5">
                    {service.description}
                  </p>

                  {/* Benefits */}
                  <div className="pt-3 space-y-1.5 border-t border-stone-100 mt-4">
                    <span className="text-[11px] font-semibold text-stone-700 uppercase tracking-wider block">
                      Beneficios clave:
                    </span>
                    {service.benefits.slice(0, 3).map((benefit, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-stone-600">
                        <Check className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Direct High-Converting CTA Button */}
                <div className="pt-3 border-t border-stone-100">
                  <button
                    onClick={() => openBookingModal(service.id)}
                    className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-semibold text-white bg-[#264436] hover:bg-[#1C3328] transition-colors cursor-pointer group-hover:shadow-sm"
                  >
                    <span>Agendar este Masaje</span>
                    <ArrowRight className="w-3.5 h-3.5 text-emerald-300" />
                  </button>
                  <p className="text-[11px] text-center text-stone-400 mt-2">
                    Sin adelantos · Pago en el domicilio
                  </p>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Reassuring footer banner */}
        <div className="mt-12 p-6 rounded-2xl bg-white border border-stone-200/90 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-left">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5 text-emerald-700" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-stone-900">
                ¿No estás seguro de cuál técnica necesitas?
              </h4>
              <p className="text-xs text-stone-500">
                Al inicio de la sesión, evaluamos tus molestias musculares o nivel de fatiga para personalizar la presión.
              </p>
            </div>
          </div>

          <button
            onClick={() => openBookingModal()}
            className="px-5 py-2.5 rounded-xl text-xs font-semibold text-[#264436] bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-colors shrink-0 cursor-pointer"
          >
            Reservar Consulta Personalizada
          </button>
        </div>

      </div>
    </section>
  );
};
