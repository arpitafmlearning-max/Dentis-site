import React from 'react';
import { Hero } from '../home/Hero';
import { TrustStrip } from '../home/TrustStrip';
import { PhilosophySection } from '../home/PhilosophySection';
import { SignatureTreatments } from '../home/SignatureTreatments';
import { DoctorFeature } from '../home/DoctorFeature';
import { WhyPearlCare } from '../home/WhyPearlCare';
import { PatientStories } from '../home/PatientStories';
import { SmileGallerySection } from '../home/SmileGallerySection';
import { FAQSection } from '../home/FAQSection';
import { ConversionBanner } from '../home/ConversionBanner';

export const HomeView: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <TrustStrip />
      <PhilosophySection />
      <SignatureTreatments />
      <DoctorFeature />
      <WhyPearlCare />
      <PatientStories />
      <SmileGallerySection />
      <FAQSection />
      <ConversionBanner />
    </div>
  );
};
