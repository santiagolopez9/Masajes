import React from 'react';
import { AppProvider } from './context/AppContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { SafetyProtocolSection } from './components/SafetyProtocolSection';
import { ServicesSection } from './components/ServicesSection';
import { EquipmentSection } from './components/EquipmentSection';
import { HowItWorksSection } from './components/HowItWorksSection';
import { AboutTherapistSection } from './components/AboutTherapistSection';
import { BookingModal } from './components/BookingModal';
import { TherapistDashboard } from './components/TherapistDashboard';
import { PitchModal } from './components/PitchModal';
import { FloatingCTA } from './components/FloatingCTA';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <AppProvider>
      <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-stone-800 font-sans selection:bg-emerald-100 selection:text-emerald-900">
        <Header />
        <main className="flex-grow">
          <Hero />
          <SafetyProtocolSection />
          <ServicesSection />
          <EquipmentSection />
          <HowItWorksSection />
          <AboutTherapistSection />
        </main>
        <Footer />

        {/* Global Modals & Overlays */}
        <BookingModal />
        <TherapistDashboard />
        <PitchModal />
        <FloatingCTA />
      </div>
    </AppProvider>
  );
}
