"use client";

import { useEffect, useState } from "react";

interface TimeLeft {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

export function Countdown() {
    const targetDate = new Date("2026-02-15T19:00:00").getTime();
    const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        const calculateTimeLeft = () => {
            const now = new Date().getTime();
            const difference = targetDate - now;

            if (difference > 0) {
                setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                    minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
                    seconds: Math.floor((difference % (1000 * 60)) / 1000),
                });
            }
        };

        calculateTimeLeft();
        const timer = setInterval(calculateTimeLeft, 1000);

        return () => clearInterval(timer);
    }, [targetDate]);

    return (
        <section className="py-20 px-6 text-center bg-[#f5ebe0]/30">
            <h2 className="mb-12 font-serif text-3xl md:text-4xl text-[#4a3b32]">Büyük Güne Kalan</h2>

            <div className="flex flex-wrap justify-center gap-6 md:gap-12">
                <TimeUnit value={timeLeft.days} label="Gün" />
                <TimeUnit value={timeLeft.hours} label="Saat" />
                <TimeUnit value={timeLeft.minutes} label="Dakika" />
                <TimeUnit value={timeLeft.seconds} label="Saniye" />
            </div>
        </section>
    );
}

function TimeUnit({ value, label }: { value: number; label: string }) {
    return (
        <div className="flex flex-col items-center">
            <div className="flex h-20 w-20 md:h-24 md:w-24 items-center justify-center rounded-lg bg-white shadow-lg border border-[#e6dace]">
                <span className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium text-[#8a3324]">
                    {value.toString().padStart(2, "0")}
                </span>
            </div>
            <span className="mt-4 font-sans text-sm tracking-widest uppercase text-[#4a3b32]/80">{label}</span>
        </div>
    );
}
