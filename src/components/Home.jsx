"use client";

import { AnimatePresence } from "motion/react";
import { AppProvider, useApp } from "@/components/AppProvider";
import Loader from "@/components/Loader";
import Hero from "@/components/sections/Hero";
import Trust from "@/components/sections/Trust";
import Programs from "@/components/sections/Programs";
import Facilities from "@/components/sections/Facilities";
import Stats from "@/components/sections/Stats";
import Testimonials from "@/components/sections/Testimonials";
import Footer from "@/components/sections/Footer";
import ContactModal from "@/components/overlays/ContactModal";
import MenuOverlay from "@/components/overlays/MenuOverlay";

function HomeContent() {
  const { modalOpen, menuOpen } = useApp();

  return (
    <>
      <main className="px-3 py-3 sm:px-6 sm:py-6">
        <Hero />
        <Trust />
        <Programs />
        <Facilities />
        <Stats />
        <Testimonials />
        <Footer />
      </main>
      <AnimatePresence>
        {menuOpen && <MenuOverlay />}
      </AnimatePresence>
      <AnimatePresence>
        {modalOpen && <ContactModal />}
      </AnimatePresence>
    </>
  );
}

export default function Home() {
  return (
    <AppProvider>
      <Loader />
      <HomeContent />
    </AppProvider>
  );
}