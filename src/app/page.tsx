"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Envelope } from "@/components/features/Envelope";
import { Countdown } from "@/components/features/Countdown";
import { Timeline } from "@/components/features/Timeline";
import { Gallery } from "@/components/features/Gallery";
import { RSVPForm } from "@/components/features/RSVPForm";
import { Contact } from "@/components/features/Contact";
import { grainTexture } from "@/lib/textures";
import Image from "next/image";

const backgroundImages = [
  "/images/bg-1.png",
  "/images/bg-2.png",
  "/images/bg-3.png",
  "/images/bg-4.png",
];

function BackgroundSlideshow() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % backgroundImages.length);
    }, 2000); // Changed to 2s to allow 1s transition overlap to finish, creating a continuous flow. 1s interval with 1s transition might be too quick/messy. Let's try 2s interval with 1s fade.

    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      key={index}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="absolute inset-0 w-full h-full"
    >
      <Image
        src={backgroundImages[index]}
        alt="Wedding Background"
        fill
        className="object-cover"
        priority
      />
    </motion.div>
  );
}

export default function Home() {
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);

  return (
    <main className="flex min-h-screen flex-col overflow-x-hidden bg-background relative selection:bg-[#8a3324] selection:text-white">
      {/* Global Grain Overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-50 mix-blend-multiply" style={{ backgroundImage: grainTexture }} />

      <AnimatePresence>
        {!isEnvelopeOpen && (
          <Envelope onOpen={() => setIsEnvelopeOpen(true)} />
        )}
      </AnimatePresence>

      {isEnvelopeOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="flex-1 w-full"
        >
          {/* Hero Section */}
          <div className="flex min-h-screen flex-col items-center justify-center p-8 text-center relative overflow-hidden">

            {/* Decorative Background Elements */}
            <div className="absolute inset-0 w-full h-full -z-20 overflow-hidden">
              <AnimatePresence mode="popLayout">
                <BackgroundSlideshow />
              </AnimatePresence>
              {/* 90% Cream Overlay */}
              <div className="absolute inset-0 bg-[#fdf8f6]/90 z-10" />
            </div>

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#f5ebe0]/40 rounded-full blur-[100px] pointer-events-none -z-10 animate-pulse" />

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="flex flex-col items-center"
            >
              <p className="font-sans text-xs md:text-sm uppercase tracking-[0.4em] text-[#8a3324] mb-8 italic">
                Düğün & Nikah Töreni
              </p>
              <h1 className="font-script text-8xl md:text-[10rem] lg:text-[12rem] font-normal tracking-wide text-[#4a3b32] mb-6 leading-tight">
                Ceren <span className="font-script text-[#8a3324] text-7xl md:text-9xl lg:text-[11rem]">&</span><br className="md:hidden" /> Deniz
              </h1>

              <div className="flex flex-col items-center gap-2 mt-8 font-sans text-sm md:text-base uppercase tracking-[0.2em] text-[#4a3b32]/80">
                <span>15 Şubat 2026</span>
                <span className="h-px w-8 bg-[#8a3324]/30 my-2"></span>
                <span>Teymur Continental Hotel</span>
              </div>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5, y: [0, 10, 0] }}
              transition={{ delay: 1.5, duration: 2, repeat: Infinity }}
              className="absolute bottom-12 left-1/2 -translate-x-1/2"
            >
              <span className="block font-sans text-[10px] tracking-[0.3em] uppercase mb-2 text-[#4a3b32]">Kaydırın</span>
              <div className="h-12 w-px bg-gradient-to-b from-[#8a3324] to-transparent mx-auto" />
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
