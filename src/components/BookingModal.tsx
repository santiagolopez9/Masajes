import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ArrowLeft,
  MessageCircle,
  Home,
  Check
} from 'lucide-react';
import { formatCOP } from '../utils/formatters';

export const BookingModal: React.FC = () => {
  const {
    isBookingOpen,
    closeBookingModal,
    services,
    selectedServiceId,
    therapist,
    addAppointment,
    isBlacklisted,
  } = useApp();

  // Booking step: 1: Service -> 2: Date/Time -> 3: Location -> 4: Client & Ethics -> 5: Success
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Form state
  const [serviceId, setServiceId] = useState<string>(selectedServiceId || services[0]?.id || '');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [apartmentInfo, setApartmentInfo] = useState<string>('');
  const [neighborhood, setNeighborhood] = useState<string>('Chicó');
  const [hasElevator, setHasElevator] = useState<boolean>(true);
  const [hasPets, setHasPets] = useState<boolean>(false);
  const [clientName, setClientName] = useState<string>('');
  const [clientDni, setClientDni] = useState<string>('');
  const [clientPhone, setClientPhone] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [agreedToEthicsCode, setAgreedToEthicsCode] = useState<boolean>(false);

  // Validation / Blacklist states
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [confirmedBookingId, setConfirmedBookingId] = useState<string | null>(null);

  if (!isBookingOpen) return null;

  // Next 10 available days generator
  const getAvailableDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 1; i <= 10; i++) {
      const nextDate = new Date(today);
      nextDate.setDate(today.getDate() + i);
      // Skip Sundays if not working
      const dayName = nextDate.toLocaleDateString('es-CO', { weekday: 'short' });
      const formattedDate = nextDate.toISOString().split('T')[0];
      const displayDate = nextDate.toLocaleDateString('es-CO', {
        weekday: 'short',
        day: 'numeric',
        month: 'short'
      });
      dates.push({ date: formattedDate, display: displayDate });
    }
    return dates;
  };

  const availableSlots = [
    '09:00', '10:30', '12:00', '14:30', '16:00', '17:30', '19:00'
  ];

  const currentService = services.find(s => s.id === (serviceId || selectedServiceId)) || services[0];

  const handleNextFromStep1 = () => {
    setCurrentStep(2);
  };

  const handleNextFromStep2 = () => {
    if (!selectedDate || !selectedTimeSlot) {
      setErrorMessage('Por favor selecciona una fecha y horario para tu cita.');
      return;
    }
    setErrorMessage(null);
    setCurrentStep(3);
  };

  const handleNextFromStep3 = () => {
    if (!address.trim() || !neighborhood.trim()) {
      setErrorMessage('Por favor ingresa la dirección de tu domicilio y el barrio en Bogotá.');
      return;
    }
    setErrorMessage(null);
    setCurrentStep(4);
  };

  const handleSubmitBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!clientName.trim() || !clientDni.trim() || !clientPhone.trim()) {
      setErrorMessage('Por favor completa tu nombre, documento de identidad (C.C.) y WhatsApp.');
      return;
    }

    if (!agreedToEthicsCode) {
      setErrorMessage('Es indispensable aceptar el protocolo de servicio terapéutico y respeto mutuo para continuar.');
      return;
    }

    // Safety check: Blacklist verification
    if (isBlacklisted(clientPhone)) {
      setErrorMessage(
        'Este número de contacto se encuentra inhabilitado por políticas internas de seguridad.'
      );
      return;
    }

    // Create reservation
    const bookingId = `CIT-${Math.floor(1000 + Math.random() * 9000)}`;
    addAppointment({
      id: bookingId,
      clientName: clientName.trim(),
      clientDni: clientDni.trim(),
      clientPhone: clientPhone.trim(),
      serviceId: currentService.id,
      serviceName: currentService.name,
      servicePrice: currentService.price,
      durationMinutes: currentService.durationMinutes,
      date: selectedDate,
      timeSlot: selectedTimeSlot,
      address: address.trim(),
      apartmentInfo: apartmentInfo.trim(),
      neighborhood: neighborhood.trim(),
      city: therapist.city,
      hasElevator,
      hasPets,
      notes: notes.trim(),
      status: 'pendiente',
      agreedEthicsCode: true,
      agreedToEthicsCode: true,
      createdAt: new Date().toISOString(),
    });

    setConfirmedBookingId(bookingId);
    setCurrentStep(5);
  };

  const cleanPhone = therapist.phoneWhatsApp.replace(/\D/g, '');

  const whatsappMessage = encodeURIComponent(
    `Hola ${therapist.name}, acabo de agendar una sesión en tu web:\n\n` +
    `• Código: ${confirmedBookingId}\n` +
    `• Paciente: ${clientName} (C.C. ${clientDni})\n` +
    `• Servicio: ${currentService.name} (${currentService.durationMinutes} min)\n` +
    `• Tarifa: ${formatCOP(currentService.price)} COP (Pago al finalizar)\n` +
    `• Fecha y Hora: ${selectedDate} a las ${selectedTimeSlot} hs\n` +
    `• Dirección: ${address} ${apartmentInfo ? `(${apartmentInfo})` : ''} - Barrio ${neighborhood}\n` +
    `• Ascensor: ${hasElevator ? 'Sí' : 'No'}\n\n` +
    `He aceptado el código de ética y protocolo 100% terapéutico. Quedo atento/a a tu confirmación.`
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-900/70 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden my-4 flex flex-col max-h-[92vh]">
        
        {/* Modal Top Header */}
        <div className="px-6 py-4 bg-[#264436] text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-800/80 flex items-center justify-center text-white">
              <CalendarIcon className="w-4 h-4 text-emerald-200" />
            </div>
            <div>
              <h3 className="font-serif-display text-base font-bold text-white">
                Agendar Masaje a Domicilio
              </h3>
              <p className="text-[11px] text-[#C1D9CC]">
                {therapist.city} · Camilla ergonómica y lencería incluidas
              </p>
            </div>
          </div>

          <button
            onClick={closeBookingModal}
            className="p-1.5 text-stone-300 hover:text-white rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Indicator (Calm & Minimal) */}
        {currentStep < 5 && (
          <div className="px-6 pt-3 pb-2 bg-[#FBF9F5] border-b border-stone-200/80 flex items-center justify-between text-[11px] font-medium text-stone-500 shrink-0">
            <span className={currentStep >= 1 ? 'text-[#264436] font-bold' : ''}>
              1. Tratamiento
            </span>
            <span>›</span>
            <span className={currentStep >= 2 ? 'text-[#264436] font-bold' : ''}>
              2. Horario
            </span>
            <span>›</span>
            <span className={currentStep >= 3 ? 'text-[#264436] font-bold' : ''}>
              3. Domicilio
            </span>
            <span>›</span>
            <span className={currentStep >= 4 ? 'text-[#264436] font-bold' : ''}>
              4. C.C. & Respeto
            </span>
          </div>
        )}

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1 text-xs sm:text-sm">
          
          {errorMessage && (
            <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* STEP 1: Select Service */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <div>
                <h4 className="font-bold text-stone-900 text-sm mb-1">
                  Selecciona tu tipo de masaje
                </h4>
                <p className="text-xs text-stone-500">
                  Todas las sesiones incluyen aromaterapia y lencería desechable.
                </p>
              </div>

              <div className="space-y-2.5">
                {services.map(s => (
                  <label
                    key={s.id}
                    onClick={() => setServiceId(s.id)}
                    className={`p-4 rounded-2xl border transition-all flex items-center justify-between cursor-pointer ${
                      serviceId === s.id
                        ? 'border-[#264436] bg-emerald-50/40 shadow-xs'
                        : 'border-stone-200 hover:border-stone-300 bg-white'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <input
                        type="radio"
                        name="service"
                        checked={serviceId === s.id}
                        onChange={() => setServiceId(s.id)}
                        className="mt-1 text-[#264436] focus:ring-[#264436]"
                      />
                      <div>
                        <span className="font-bold text-stone-900 text-xs sm:text-sm block">
                          {s.name}
                        </span>
                        <span className="text-xs text-stone-500 block mt-0.5">
                          {s.tagline}
                        </span>
                        <span className="text-[11px] text-[#264436] font-medium mt-1 inline-block">
                          {s.durationMinutes} minutos · Camilla y toallas incluidas
                        </span>
                      </div>
                    </div>

                    <div className="text-right shrink-0 pl-3">
                      <span className="font-serif-display text-base font-bold text-stone-900 block">
                        {formatCOP(s.price)}
                      </span>
                      <span className="text-[10px] text-stone-400">COP</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2: Choose Date & Time */}
          {currentStep === 2 && (
            <div className="space-y-5">
              <div>
                <h4 className="font-bold text-stone-900 text-sm mb-1">
                  Fecha y horario para la visita
                </h4>
                <p className="text-xs text-stone-500">
                  Servicio a domicilio en {therapist.city}. Lunes a Sábado de 08:30 a 19:30.
                </p>
              </div>

              {/* Day selection */}
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-2">
                  1. Selecciona el día
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  {getAvailableDates().map(item => (
                    <button
                      type="button"
                      key={item.date}
                      onClick={() => setSelectedDate(item.date)}
                      className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                        selectedDate === item.date
                          ? 'border-[#264436] bg-[#264436] text-white font-bold'
                          : 'border-stone-200 bg-white text-stone-700 hover:border-stone-300'
                      }`}
                    >
                      <span className="text-xs capitalize block leading-tight">
                        {item.display}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Time slot selection */}
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-2">
                  2. Selecciona la hora de inicio aproximada
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                  {availableSlots.map(slot => (
                    <button
                      type="button"
                      key={slot}
                      onClick={() => setSelectedTimeSlot(slot)}
                      className={`p-2.5 rounded-xl border text-xs font-medium transition-all cursor-pointer ${
                        selectedTimeSlot === slot
                          ? 'border-[#264436] bg-[#264436] text-white font-bold'
                          : 'border-stone-200 bg-white text-stone-700 hover:border-stone-300'
                      }`}
                    >
                      {slot} hs
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Location in Bogotá */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <div>
                <h4 className="font-bold text-stone-900 text-sm mb-1">
                  Ubicación del Domicilio en {therapist.city}
                </h4>
                <p className="text-xs text-stone-500">
                  Para coordinar el traslado de la camilla ergonómica.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Dirección exacta *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. Cra 7 # 78-45"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 focus:ring-1 focus:ring-[#264436]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Apto / Interior / Casa
                  </label>
                  <input
                    type="text"
                    placeholder="Ej. Apto 502, Torre 1"
                    value={apartmentInfo}
                    onChange={(e) => setApartmentInfo(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 focus:ring-1 focus:ring-[#264436]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Barrio / Sector *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. Chicó, Rosales, Usaquén"
                    value={neighborhood}
                    onChange={(e) => setNeighborhood(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 focus:ring-1 focus:ring-[#264436]"
                  />
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200/80 space-y-2">
                <span className="text-[11px] font-semibold text-stone-700 block">
                  Logística para subir la camilla:
                </span>
                
                <div className="flex items-center justify-between text-xs text-stone-600">
                  <span>¿El edificio cuenta con ascensor?</span>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setHasElevator(true)}
                      className={`px-3 py-1 rounded-lg text-xs font-medium cursor-pointer ${
                        hasElevator ? 'bg-[#264436] text-white' : 'bg-stone-200 text-stone-700'
                      }`}
                    >
                      Sí
                    </button>
                    <button
                      type="button"
                      onClick={() => setHasElevator(false)}
                      className={`px-3 py-1 rounded-lg text-xs font-medium cursor-pointer ${
                        !hasElevator ? 'bg-[#264436] text-white' : 'bg-stone-200 text-stone-700'
                      }`}
                    >
                      No (Escaleras)
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-stone-600 pt-1">
                  <span>¿Tienes mascotas en el hogar?</span>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setHasPets(true)}
                      className={`px-3 py-1 rounded-lg text-xs font-medium cursor-pointer ${
                        hasPets ? 'bg-[#264436] text-white' : 'bg-stone-200 text-stone-700'
                      }`}
                    >
                      Sí
                    </button>
                    <button
                      type="button"
                      onClick={() => setHasPets(false)}
                      className={`px-3 py-1 rounded-lg text-xs font-medium cursor-pointer ${
                        !hasPets ? 'bg-[#264436] text-white' : 'bg-stone-200 text-stone-700'
                      }`}
                    >
                      No
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: Client Identification & Mandatory Ethics Consent */}
          {currentStep === 4 && (
            <form onSubmit={handleSubmitBooking} className="space-y-4">
              <div>
                <h4 className="font-bold text-stone-900 text-sm mb-1">
                  Datos de Contacto y Seguridad
                </h4>
                <p className="text-xs text-stone-500">
                  Requisito obligatorio de trazabilidad para visitas domiciliarias en Bogotá.
                </p>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Nombre Completo *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. Andrea Gutiérrez"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 focus:ring-1 focus:ring-[#264436]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-stone-700 mb-1">
                      Cédula de Ciudadanía (C.C.) *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ej. 1.020.849.201"
                      value={clientDni}
                      onChange={(e) => setClientDni(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 focus:ring-1 focus:ring-[#264436]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-stone-700 mb-1">
                      Teléfono WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="Ej. +57 310 123 4567"
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 focus:ring-1 focus:ring-[#264436]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Molestias musculares o notas médicas (Opcional)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Ej. Dolor cervical por postura frente al computador..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 focus:ring-1 focus:ring-[#264436]"
                  />
                </div>
              </div>

              {/* MANDATORY ETHICAL / SAFETY CLAUSE */}
              <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-[#264436]">
                  <ShieldCheck className="w-4 h-4 text-emerald-800 shrink-0" />
                  <span>Compromiso de Servicio Terapéutico y Respeto Mutuo</span>
                </div>

                <p className="text-[11px] text-stone-600 leading-relaxed">
                  Este es un servicio de salud y bienestar corporal impartido por una profesional certificada. Se aplica el protocolo de draping (cubrimiento) permanente y rige el principio de <strong>tolerancia cero</strong> frente a propuestas o conductas no profesionales.
                </p>

                <label className="flex items-start gap-2.5 pt-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agreedToEthicsCode}
                    onChange={(e) => setAgreedToEthicsCode(e.target.checked)}
                    className="mt-0.5 rounded text-[#264436] focus:ring-[#264436]"
                  />
                  <span className="text-xs font-semibold text-stone-900">
                    Acepto y confirmo que busco una sesión exclusivamente terapéutica y de salud.
                  </span>
                </label>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={!agreedToEthicsCode}
                  className={`w-full py-3.5 rounded-xl text-xs font-semibold text-white transition-all cursor-pointer ${
                    agreedToEthicsCode
                      ? 'bg-[#264436] hover:bg-[#1C3328] shadow-md'
                      : 'bg-stone-300 cursor-not-allowed'
                  }`}
                >
                  Confirmar Solicitud de Cita a Domicilio
                </button>
              </div>
            </form>
          )}

          {/* STEP 5: SUCCESS & VOUCHER */}
          {currentStep === 5 && (
            <div className="py-4 text-center space-y-5">
              <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-[#264436] flex items-center justify-center mx-auto shadow-xs">
                <CheckCircle2 className="w-10 h-10 text-emerald-800" />
              </div>

              <div className="space-y-1">
                <span className="text-xs font-mono text-stone-400">
                  Código de Reserva: #{confirmedBookingId}
                </span>
                <h4 className="font-serif-display text-xl font-bold text-stone-900">
                  ¡Tu solicitud ha sido registrada!
                </h4>
                <p className="text-xs text-stone-600 max-w-md mx-auto">
                  Hemos generado tu turno a domicilio. Para finalizar la coordinación y el traslado de la camilla, haz clic abajo para enviar los datos por WhatsApp a {therapist.name}.
                </p>
              </div>

              {/* Summary Card with COP Price */}
              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 text-left max-w-md mx-auto text-xs space-y-2">
                <div className="flex justify-between border-b border-stone-200/60 pb-2">
                  <span className="text-stone-500">Tratamiento:</span>
                  <span className="font-bold text-stone-900">{currentService.name}</span>
                </div>
                <div className="flex justify-between border-b border-stone-200/60 pb-2">
                  <span className="text-stone-500">Fecha y Hora:</span>
                  <span className="font-bold text-stone-900">{selectedDate} · {selectedTimeSlot} hs</span>
                </div>
                <div className="flex justify-between border-b border-stone-200/60 pb-2">
                  <span className="text-stone-500">Dirección:</span>
                  <span className="font-medium text-stone-900">{address}, {neighborhood}</span>
                </div>
                <div className="flex justify-between pt-1">
                  <span className="text-stone-700 font-semibold">Valor de la Sesión:</span>
                  <span className="font-serif-display text-base font-bold text-[#264436]">
                    {formatCOP(currentService.price)} COP
                  </span>
                </div>
                <span className="text-[10px] text-stone-400 block text-right">
                  (Pagas al terminar la sesión en efectivo, transferencia o Nequi)
                </span>
              </div>

              {/* Direct WhatsApp Confirmation Button */}
              <div className="pt-2 max-w-md mx-auto space-y-2">
                <a
                  href={`https://wa.me/${cleanPhone}?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 shadow-md transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Enviar Confirmación por WhatsApp</span>
                </a>

                <button
                  onClick={closeBookingModal}
                  className="w-full py-2 text-xs text-stone-500 hover:text-stone-800 transition-colors cursor-pointer"
                >
                  Cerrar y volver a la web
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Modal Navigation Footer */}
        {currentStep < 5 && (
          <div className="px-6 py-3.5 bg-stone-50 border-t border-stone-200 flex items-center justify-between shrink-0">
            {currentStep > 1 ? (
              <button
                onClick={() => setCurrentStep(currentStep - 1)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-stone-600 hover:bg-stone-200 transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Atrás</span>
              </button>
            ) : (
              <div></div>
            )}

            {currentStep === 1 && (
              <button
                onClick={handleNextFromStep1}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-[#264436] hover:bg-[#1C3328] transition-colors cursor-pointer"
              >
                <span>Siguiente: Horario</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}

            {currentStep === 2 && (
              <button
                onClick={handleNextFromStep2}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-[#264436] hover:bg-[#1C3328] transition-colors cursor-pointer"
              >
                <span>Siguiente: Domicilio</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}

            {currentStep === 3 && (
              <button
                onClick={handleNextFromStep3}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-[#264436] hover:bg-[#1C3328] transition-colors cursor-pointer"
              >
                <span>Siguiente: Datos & Respeto</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
