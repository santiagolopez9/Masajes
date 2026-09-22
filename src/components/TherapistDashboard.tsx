import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Appointment } from '../types';
import { formatCOP } from '../utils/formatters';
import {
  Calendar,
  Clock,
  MapPin,
  ShieldCheck,
  CheckCircle,
  XCircle,
  AlertOctagon,
  MessageCircle,
  ExternalLink,
  DollarSign,
  Plus,
  Trash2,
  Lock,
  User,
  Settings,
  X,
  Phone,
  Check,
  Ban
} from 'lucide-react';

export const TherapistDashboard: React.FC = () => {
  const {
    isDashboardOpen,
    setIsDashboardOpen,
    therapist,
    appointments,
    services,
    blacklist,
    blockedDates,
    updateAppointmentStatus,
    deleteAppointment,
    updateTherapistProfile,
    updateServicePrice,
    addToBlacklist,
    removeFromBlacklist,
    toggleBlockDate,
    resetToDefaults,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'agenda' | 'servicios' | 'seguridad' | 'perfil'>('agenda');
  const [statusFilter, setStatusFilter] = useState<'todas' | 'pendiente' | 'confirmada' | 'completada' | 'cancelada'>('todas');
  
  // Blacklist modal form state
  const [showAddBlacklistModal, setShowAddBlacklistModal] = useState(false);
  const [blPhone, setBlPhone] = useState('');
  const [blName, setBlName] = useState('');
  const [blReason, setBlReason] = useState('Mensajes inapropiados / insinuaciones no profesionales');
  const [apptToBlock, setApptToBlock] = useState<Appointment | null>(null);

  // Profile edit state
  const [profileName, setProfileName] = useState(therapist.name);
  const [profileTitle, setProfileTitle] = useState(therapist.title);
  const [profilePhone, setProfilePhone] = useState(therapist.phoneWhatsApp);
  const [profileLicense, setProfileLicense] = useState(therapist.licenseNumber);
  const [profileCity, setProfileCity] = useState(therapist.city);
  const [profileSavedNotice, setProfileSavedNotice] = useState(false);

  if (!isDashboardOpen) return null;

  // Filter appointments
  const filteredAppointments = appointments.filter(a => {
    if (statusFilter === 'todas') return true;
    return a.status === statusFilter;
  });

  // Calculate metrics
  const totalRevenue = appointments
    .filter(a => a.status === 'confirmada' || a.status === 'completada')
    .reduce((sum, a) => sum + a.servicePrice, 0);

  const pendingCount = appointments.filter(a => a.status === 'pendiente').length;
  const confirmedCount = appointments.filter(a => a.status === 'confirmada').length;

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateTherapistProfile({
      name: profileName,
      title: profileTitle,
      phoneWhatsApp: profilePhone,
      licenseNumber: profileLicense,
      city: profileCity,
    });
    setProfileSavedNotice(true);
    setTimeout(() => setProfileSavedNotice(false), 3000);
  };

  const handleAddBlacklist = (e: React.FormEvent) => {
    e.preventDefault();
    if (!blPhone.trim()) return;
    addToBlacklist(blPhone.trim(), blName.trim(), blReason.trim());
    setBlPhone('');
    setBlName('');
    setShowAddBlacklistModal(false);
  };

  const executeBlock = (appt: Appointment) => {
    addToBlacklist(
      appt.clientPhone,
      appt.clientName,
      'Cancelada y bloqueada desde el panel por sospecha de conducta no profesional'
    );
    updateAppointmentStatus(appt.id, 'cancelada');
    setApptToBlock(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-stone-900/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden my-4 flex flex-col max-h-[92vh]">
        
        {/* Dashboard Top Header */}
        <div className="px-6 py-4 bg-stone-900 text-white flex items-center justify-between border-b border-stone-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-800 flex items-center justify-center text-white">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-sm sm:text-base">
                  Panel de Gestión Profesional
                </h3>
                <span className="text-[11px] bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded border border-emerald-700/60 font-mono">
                  {therapist.name}
                </span>
              </div>
              <p className="text-xs text-stone-400">
                Agenda de visitas a domicilio, seguridad y control de tarifas
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsDashboardOpen(false)}
              className="p-1.5 text-stone-400 hover:text-white hover:bg-stone-800 rounded-lg transition-colors cursor-pointer"
              title="Volver a la web pública"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Quick Metrics Bar */}
        <div className="px-6 py-3 bg-[#FAF8F5] border-b border-stone-200 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs shrink-0">
          <div>
            <span className="text-stone-500 block text-[11px]">Citas Pendientes de Confirmar</span>
            <span className="text-base font-bold text-amber-700 tabular-nums">
              {pendingCount}
            </span>
          </div>
          <div>
            <span className="text-stone-500 block text-[11px]">Citas Confirmadas</span>
            <span className="text-base font-bold text-emerald-700 tabular-nums">
              {confirmedCount}
            </span>
          </div>
          <div>
            <span className="text-stone-500 block text-[11px]">Ingresos Proyectados</span>
            <span className="text-base font-bold text-stone-900 tabular-nums">
              {formatCOP(totalRevenue)}
            </span>
          </div>
          <div>
            <span className="text-stone-500 block text-[11px]">Contactos en Filtro/Bloqueo</span>
            <span className="text-base font-bold text-red-700 tabular-nums">
              {blacklist.length} bloqueados
            </span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="px-6 pt-3 bg-white border-b border-stone-200 flex items-center justify-between gap-4 overflow-x-auto shrink-0">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('agenda')}
              className={`px-3.5 py-2 text-xs font-semibold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'agenda'
                  ? 'border-emerald-800 text-emerald-900 font-bold'
                  : 'border-transparent text-stone-500 hover:text-stone-900'
              }`}
            >
              Agenda de Turnos ({appointments.length})
            </button>
            <button
              onClick={() => setActiveTab('servicios')}
              className={`px-3.5 py-2 text-xs font-semibold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'servicios'
                  ? 'border-emerald-800 text-emerald-900 font-bold'
                  : 'border-transparent text-stone-500 hover:text-stone-900'
              }`}
            >
              Tarifas & Servicios
            </button>
            <button
              onClick={() => setActiveTab('seguridad')}
              className={`px-3.5 py-2 text-xs font-semibold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'seguridad'
                  ? 'border-emerald-800 text-emerald-900 font-bold'
                  : 'border-transparent text-stone-500 hover:text-stone-900'
              }`}
            >
              Filtro de Seguridad / Blacklist ({blacklist.length})
            </button>
            <button
              onClick={() => setActiveTab('perfil')}
              className={`px-3.5 py-2 text-xs font-semibold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'perfil'
                  ? 'border-emerald-800 text-emerald-900 font-bold'
                  : 'border-transparent text-stone-500 hover:text-stone-900'
              }`}
            >
              Datos de la Terapeuta
            </button>
          </div>

          <button
            onClick={resetToDefaults}
            className="text-[11px] text-stone-400 hover:text-stone-700 underline py-2 whitespace-nowrap cursor-pointer"
            title="Restablece datos iniciales de prueba"
          >
            Restaurar datos demo
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1">
          
          {/* TAB 1: AGENDA */}
          {activeTab === 'agenda' && (
            <div className="space-y-6">
              
              {/* Filter controls */}
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap gap-1.5 p-1 bg-stone-100 rounded-lg">
                  {(['todas', 'pendiente', 'confirmada', 'completada', 'cancelada'] as const).map(status => (
                    <button
                      key={status}
                      onClick={() => setStatusFilter(status)}
                      className={`px-3 py-1 text-xs font-medium rounded-md transition-all cursor-pointer capitalize ${
                        statusFilter === status
                          ? 'bg-white text-stone-900 shadow-xs font-semibold'
                          : 'text-stone-600 hover:text-stone-900'
                      }`}
                    >
                      {status === 'todas' ? 'Todas' : status}
                    </button>
                  ))}
                </div>

                <span className="text-xs text-stone-500">
                  Mostrando {filteredAppointments.length} citas
                </span>
              </div>

              {/* Appointments List */}
              {filteredAppointments.length === 0 ? (
                <div className="text-center py-12 bg-stone-50 rounded-xl border border-stone-200">
                  <Calendar className="w-10 h-10 text-stone-300 mx-auto mb-2" />
                  <p className="text-xs text-stone-500">No hay citas en este estado.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredAppointments.map(appt => {
                    const cleanPhone = appt.clientPhone.replace(/\D/g, '');
                    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                      `${appt.address}, ${appt.neighborhood}, ${appt.city}`
                    )}`;
                    
                    const waConfirmMsg = encodeURIComponent(
                      `Hola ${appt.clientName}, soy ${therapist.name}. Confirmo tu sesión de ${appt.serviceName} a domicilio para el ${appt.date} a las ${appt.timeSlot} hs en ${appt.address}. Ya tengo preparado el traslado de la camilla ergonómica. ¡Hasta entonces!`
                    );

                    return (
                      <div
                        key={appt.id}
                        className="bg-white border border-stone-200/90 rounded-xl p-5 shadow-xs hover:border-stone-300 transition-all flex flex-col justify-between"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                          
                          {/* Col 1: Date & Status (3 cols) */}
                          <div className="md:col-span-3 border-b md:border-b-0 md:border-r border-stone-100 pb-3 md:pb-0 md:pr-4">
                            <div className="flex items-center justify-between md:block mb-2">
                              <span className="text-xs font-mono text-stone-400">#{appt.id}</span>
                              <span className={`inline-block px-2 py-0.5 rounded text-[11px] font-semibold uppercase tracking-wider ${
                                appt.status === 'confirmada' ? 'bg-emerald-100 text-emerald-800' :
                                appt.status === 'pendiente' ? 'bg-amber-100 text-amber-800' :
                                appt.status === 'completada' ? 'bg-stone-100 text-stone-700' :
                                'bg-red-100 text-red-800'
                              }`}>
                                {appt.status}
                              </span>
                            </div>

                            <div className="text-sm font-bold text-stone-900 flex items-center gap-1.5">
                              <Calendar className="w-4 h-4 text-emerald-800" />
                              <span>{appt.date}</span>
                            </div>
                            <div className="text-xs font-semibold text-emerald-900 mt-0.5 flex items-center gap-1.5">
                              <Clock className="w-4 h-4 text-emerald-700" />
                              <span>{appt.timeSlot} hs ({appt.durationMinutes} min)</span>
                            </div>

                            <div className="text-sm font-bold text-stone-900 mt-3 tabular-nums">
                              {formatCOP(appt.servicePrice)}
                            </div>
                          </div>

                          {/* Col 2: Client & Home Location (5 cols) */}
                          <div className="md:col-span-5 space-y-2">
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-semibold text-stone-900 text-sm">
                                  {appt.clientName}
                                </span>
                                <span className="text-[10px] bg-stone-100 text-stone-600 px-1.5 py-0.5 rounded border border-stone-200" title="Verificado con C.C.">
                                  C.C.: {appt.clientDni}
                                </span>
                              </div>
                              <div className="text-xs text-stone-600 flex items-center gap-2 mt-0.5">
                                <Phone className="w-3.5 h-3.5 text-stone-400" />
                                <span>{appt.clientPhone}</span>
                              </div>
                            </div>

                            <div className="text-xs text-stone-700">
                              <div className="font-medium text-emerald-900">{appt.serviceName}</div>
                              <div className="flex items-start gap-1.5 mt-1 text-stone-600">
                                <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0 mt-0.5" />
                                <div>
                                  <span>{appt.address} {appt.apartmentInfo}</span>
                                  <span className="block text-[11px] text-stone-400">
                                    Zona: {appt.neighborhood}
                                    {appt.hasElevator ? ' · Ascensor Sí' : ' · Sin ascensor (escaleras)'}
                                    {appt.hasPets ? ' · Mascotas en casa' : ''}
                                  </span>
                                </div>
                              </div>
                            </div>

                            {appt.notes && (
                              <div className="text-[11px] bg-stone-50 border border-stone-200/60 rounded p-2 text-stone-600 italic">
                                &quot;{appt.notes}&quot;
                              </div>
                            )}
                          </div>

                          {/* Col 3: Actions & Safety Protection (4 cols) */}
                          <div className="md:col-span-4 flex flex-col justify-between border-t md:border-t-0 md:border-l border-stone-100 pt-3 md:pt-0 md:pl-4">
                            <div className="space-y-1.5">
                              {/* Open Google Maps */}
                              <a
                                href={mapsUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs text-stone-700 hover:text-stone-900 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors"
                              >
                                <MapPin className="w-3.5 h-3.5 text-red-600" />
                                <span>Ver mapa / Cómo llegar</span>
                                <ExternalLink className="w-3 h-3 text-stone-400" />
                              </a>

                              {/* WhatsApp Contact */}
                              <a
                                href={`https://wa.me/${cleanPhone}?text=${waConfirmMsg}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg transition-colors"
                              >
                                <MessageCircle className="w-3.5 h-3.5" />
                                <span>WhatsApp con Paciente</span>
                              </a>
                            </div>

                            {/* Status Change Buttons */}
                            <div className="pt-2 flex flex-wrap items-center gap-1.5">
                              {appt.status === 'pendiente' && (
                                <button
                                  onClick={() => updateAppointmentStatus(appt.id, 'confirmada')}
                                  className="flex-1 py-1 px-2 text-[11px] font-semibold bg-emerald-100 text-emerald-800 hover:bg-emerald-200 rounded transition-colors cursor-pointer"
                                >
                                  Confirmar
                                </button>
                              )}

                              {appt.status === 'confirmada' && (
                                <button
                                  onClick={() => updateAppointmentStatus(appt.id, 'completada')}
                                  className="flex-1 py-1 px-2 text-[11px] font-semibold bg-stone-100 text-stone-800 hover:bg-stone-200 rounded transition-colors cursor-pointer"
                                >
                                  Completada
                                </button>
                              )}

                              {appt.status !== 'cancelada' && (
                                <button
                                  onClick={() => updateAppointmentStatus(appt.id, 'cancelada')}
                                  className="py-1 px-2 text-[11px] text-stone-500 hover:text-red-700 rounded transition-colors cursor-pointer"
                                  title="Cancelar cita"
                                >
                                  Cancelar
                                </button>
                              )}

                              {/* BLOCK INAPPROPRIATE USER BUTTON */}
                              <button
                                onClick={() => setApptToBlock(appt)}
                                className="p-1 text-stone-400 hover:text-red-600 transition-colors cursor-pointer"
                                title="Bloquear a esta persona por conducta inapropiada"
                              >
                                <Ban className="w-4 h-4 text-red-500" />
                              </button>

                              <button
                                onClick={() => deleteAppointment(appt.id)}
                                className="p-1 text-stone-400 hover:text-stone-700 transition-colors cursor-pointer"
                                title="Eliminar registro"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>

                          </div>

                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

            </div>
          )}

          {/* TAB 2: SERVICIOS Y TARIFAS */}
          {activeTab === 'servicios' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-semibold text-stone-900">
                    Modificar Precios y Tarifas a Domicilio
                  </h4>
                  <p className="text-xs text-stone-500">
                    Los cambios se reflejan inmediatamente en la web pública para tus clientes.
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {services.map(service => (
                  <div
                    key={service.id}
                    className="p-4 rounded-xl border border-stone-200 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div>
                      <h5 className="text-xs sm:text-sm font-bold text-stone-900">
                        {service.name}
                      </h5>
                      <p className="text-xs text-stone-500">
                        {service.durationMinutes} minutos · {service.tagline}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-xs text-stone-500">Tarifa actual:</span>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-stone-800">
                          {formatCOP(service.price)} COP
                        </span>
                        <input
                          type="number"
                          step={5000}
                          value={service.price}
                          onChange={(e) => updateServicePrice(service.id, Number(e.target.value))}
                          className="w-24 px-2 py-1 text-xs font-bold border border-stone-300 rounded-md focus:ring-1 focus:ring-emerald-700"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: FILTRO DE SEGURIDAD / BLACKLIST */}
          {activeTab === 'seguridad' && (
            <div className="space-y-6">
              
              <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-xs text-red-950 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-start gap-3">
                  <AlertOctagon className="w-5 h-5 text-red-700 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-bold text-red-900 text-sm">
                      Filtro Activo de Seguridad y Protección
                    </h5>
                    <p className="text-red-800/90 mt-0.5">
                      Cualquier número registrado en esta lista negra <strong>no podrá solicitar turnos a domicilio</strong> a través de la web.
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setShowAddBlacklistModal(true)}
                  className="px-3.5 py-2 text-xs font-semibold text-white bg-red-700 hover:bg-red-800 rounded-lg transition-colors cursor-pointer shrink-0"
                >
                  + Agregar Número a Bloquear
                </button>
              </div>

              {/* Blacklist Items */}
              {blacklist.length === 0 ? (
                <div className="text-center py-8 bg-stone-50 rounded-xl border border-stone-200 text-xs text-stone-500">
                  No hay números en la lista negra. Tu sistema está listo para protegerte.
                </div>
              ) : (
                <div className="space-y-3">
                  {blacklist.map(contact => (
                    <div
                      key={contact.id}
                      className="p-4 rounded-xl border border-red-200/80 bg-white flex items-center justify-between gap-4"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-stone-900 text-xs sm:text-sm font-mono">
                            {contact.phone}
                          </span>
                          {contact.name && (
                            <span className="text-xs text-stone-600">
                              ({contact.name})
                            </span>
                          )}
                          <span className="text-[10px] text-stone-400">
                            Bloqueado el {contact.dateAdded}
                          </span>
                        </div>
                        <p className="text-xs text-red-800 mt-1">
                          Motivo: {contact.reason}
                        </p>
                      </div>

                      <button
                        onClick={() => removeFromBlacklist(contact.id)}
                        className="text-xs text-stone-400 hover:text-red-700 p-1.5 transition-colors cursor-pointer"
                        title="Desbloquear número"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Add Blacklist Modal */}
              {showAddBlacklistModal && (
                <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/50">
                  <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl border border-stone-200">
                    <h4 className="text-sm font-bold text-stone-900 mb-1">
                      Bloquear Contacto Inapropiado
                    </h4>
                    <p className="text-xs text-stone-500 mb-4">
                      Ingresa el teléfono o WhatsApp de la persona que haya enviado mensajes irrespetuosos para restringir su acceso.
                    </p>

                    <form onSubmit={handleAddBlacklist} className="space-y-3">
                      <div>
                        <label className="block text-xs font-medium text-stone-700 mb-1">
                          Teléfono o WhatsApp *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Ej. +54 9 11 1234 5678"
                          value={blPhone}
                          onChange={(e) => setBlPhone(e.target.value)}
                          className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg focus:ring-1 focus:ring-red-600"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-stone-700 mb-1">
                          Nombre o Identificación (Opcional)
                        </label>
                        <input
                          type="text"
                          placeholder="Ej. Usuario de WhatsApp"
                          value={blName}
                          onChange={(e) => setBlName(e.target.value)}
                          className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg focus:ring-1 focus:ring-red-600"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-stone-700 mb-1">
                          Motivo del Bloqueo
                        </label>
                        <input
                          type="text"
                          value={blReason}
                          onChange={(e) => setBlReason(e.target.value)}
                          className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg focus:ring-1 focus:ring-red-600"
                        />
                      </div>

                      <div className="pt-3 flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => setShowAddBlacklistModal(false)}
                          className="px-3.5 py-1.5 text-xs text-stone-600 hover:bg-stone-100 rounded-lg"
                        >
                          Cancelar
                        </button>
                        <button
                          type="submit"
                          className="px-4 py-1.5 text-xs font-semibold text-white bg-red-700 hover:bg-red-800 rounded-lg"
                        >
                          Confirmar Bloqueo
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}

            </div>
          )}

          {/* TAB 4: PERFIL Y DATOS */}
          {activeTab === 'perfil' && (
            <div className="max-w-2xl space-y-6">
              <div>
                <h4 className="text-sm font-semibold text-stone-900">
                  Datos de la Profesional y Contacto
                </h4>
                <p className="text-xs text-stone-500">
                  Personaliza tu nombre, matrícula oficial y tu número de WhatsApp receptor de reservas.
                </p>
              </div>

              {profileSavedNotice && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-700" />
                  <span>¡Datos del perfil actualizados correctamente en toda la web!</span>
                </div>
              )}

              <form onSubmit={handleSaveProfile} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Nombre Completo / Profesional
                  </label>
                  <input
                    type="text"
                    value={profileName}
                    onChange={(e) => setProfileName(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg focus:ring-1 focus:ring-emerald-700"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Título o Especialidad
                  </label>
                  <input
                    type="text"
                    value={profileTitle}
                    onChange={(e) => setProfileTitle(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg focus:ring-1 focus:ring-emerald-700"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-stone-700 mb-1">
                      Matrícula o Registro Oficial
                    </label>
                    <input
                      type="text"
                      value={profileLicense}
                      onChange={(e) => setProfileLicense(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg focus:ring-1 focus:ring-emerald-700"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-stone-700 mb-1">
                      WhatsApp para recibir Citas
                    </label>
                    <input
                      type="text"
                      value={profilePhone}
                      onChange={(e) => setProfilePhone(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg focus:ring-1 focus:ring-emerald-700"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Ciudad / Zona Central
                  </label>
                  <input
                    type="text"
                    value={profileCity}
                    onChange={(e) => setProfileCity(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg focus:ring-1 focus:ring-emerald-700"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="px-5 py-2.5 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg transition-colors cursor-pointer"
                  >
                    Guardar Cambios en la Web
                  </button>
                </div>
              </form>
            </div>
          )}

        </div>

        {/* Confirmation Modal for Blocking Contact */}
        {apptToBlock && (
          <div className="fixed inset-0 z-70 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl border border-red-200">
              <div className="w-12 h-12 rounded-full bg-red-100 text-red-700 flex items-center justify-center mb-3">
                <Ban className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-bold text-stone-900 mb-1">
                ¿Bloquear a {apptToBlock.clientName}?
              </h4>
              <p className="text-xs text-stone-600 mb-4 leading-relaxed">
                Esta acción cancelará inmediatamente el turno y registrará el número <strong>{apptToBlock.clientPhone}</strong> en la lista negra para impedirle agendar futuras citas.
              </p>
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setApptToBlock(null)}
                  className="px-3.5 py-1.5 text-xs text-stone-600 hover:bg-stone-100 rounded-lg cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  onClick={() => executeBlock(apptToBlock)}
                  className="px-4 py-1.5 text-xs font-semibold text-white bg-red-700 hover:bg-red-800 rounded-lg cursor-pointer"
                >
                  Sí, Bloquear Contacto
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
