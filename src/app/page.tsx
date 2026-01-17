"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Envelope } from "@/components/features/Envelope";
import { Countdown } from "@/components/features/Countdown";
import { Timeline } from "@/components/features/Timeline";
import { Gallery } from "@/components/features/Gallery";
import { RSVPForm } from "@/components/features/RSVPForm";
import { Contact } from "@/components/features/Contact";

export default function Home() {
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);

  return (
    <main className="flex min-h-screen flex-col overflow-x-hidden bg-background">
      <AnimatePresence>
        {!isEnvelopeOpen && (
          <Envelope onOpen={() => setIsEnvelopeOpen(true)} />
        )}
      </AnimatePresence>

      {isEnvelopeOpen && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="flex-1 w-full"
        >
          {/* Hero Section */}
          <div className="flex min-h-screen flex-col items-center justify-center p-8 text-center relative overflow-hidden">

            {/* Decorative Background Elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#f5ebe0]/30 rounded-full blur-3xl pointer-events-none -z-10" />

            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-medium tracking-tight text-foreground mb-4">
              Ceren &<br className="md:hidden" /> Deniz Can
            </h1>
            <p className="font-sans text-lg uppercase tracking-[0.2em] text-foreground/70 mb-8 mt-4">
              15 Şubat 2026
            </p>
            <p className="font-serif text-xl italic text-foreground/80">
              TEYMUR CONTINENTAL HOTEL
            </p>

            <div className="mt-16 h-px w-24 bg-foreground/20" />

            {/* Scroll Indicator */}
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-50"
            >
              <div className="h-12 w-px bg-foreground/30" />
            </motion.div>
          </div>

          <Countdown />
          <Timeline />
          <Gallery />
          <RSVPForm />
          <Contact />

          <footer className="py-8 text-center text-sm text-foreground/40 font-sans">
            <p>&copy; 2026 Ceren & Deniz Can</p>
          </footer>
        </motion.div>
      )}
    </main>
  );
}
