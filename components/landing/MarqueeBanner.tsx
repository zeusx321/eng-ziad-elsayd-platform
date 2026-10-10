"use client";

import { phrases } from "@/constants";

interface MarqueeBannerProps {
  className?: string;
}

export default function MarqueeBanner({ className = "" }: MarqueeBannerProps) {
  return (
    <div
      dir="ltr"
      className={`relative z-20 w-full overflow-hidden bg-primary py-2.5 sm:py-3.5 select-none shadow-[0_4px_25px_rgba(46,206,149,0.3)] group cursor-default ${className}`}
      aria-label="الأقسام التعليمية"
    >
      <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused] whitespace-nowrap">
        {/* Track 1 */}
        <div className="flex items-center gap-6 sm:gap-10 text-white font-bold text-base sm:text-lg md:text-xl shrink-0 px-3 sm:px-5">
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={`track1-${i}`} className="inline-flex items-center gap-4 sm:gap-6">
              {phrases.map((phrase, pIdx) => (
                <span key={`track1-${i}-${pIdx}`} className="inline-flex items-center gap-6 sm:gap-10">
                  <span className="text-white/70 text-sm sm:text-base">•</span>
                  <span className="tracking-wide">{phrase}</span>
                </span>
              ))}
            </span>
          ))}
        </div>

        {/* Track 2 (Duplicate for seamless infinite 50% translation loop) */}
        <div
          className="flex items-center gap-6 sm:gap-10 text-white font-bold text-base sm:text-lg md:text-xl shrink-0 px-3 sm:px-5"
          aria-hidden="true"
        >
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={`track2-${i}`} className="inline-flex items-center gap-6 sm:gap-10">
              {phrases.map((phrase, pIdx) => (
                <span key={`track2-${i}-${pIdx}`} className="inline-flex items-center gap-6 sm:gap-10">
                  <span className="text-white/70 text-sm sm:text-base">•</span>
                  <span className="tracking-wide">{phrase}</span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
