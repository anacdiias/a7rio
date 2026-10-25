"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, MessageCircle } from "lucide-react";
import { type Img, whatsappUrl } from "./site";

// Tenta a foto real; se não existir, cai para a paisagem versionada.
export function Photo({ image, alt, className = "" }: { image: Img; alt: string; className?: string }) {
  const [src, setSrc] = useState(image.src);
  const ref = useRef<HTMLImageElement>(null);
  // Se a foto falhou antes da hidratação, o onError já passou: confere ao montar.
  useEffect(() => {
    const el = ref.current;
    if (el?.complete && el.naturalWidth === 0) setSrc(image.fallback);
  }, [image.fallback]);
  return (
    <div className={`relative overflow-hidden bg-[#0a2438] ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={ref}
        src={src}
        alt={alt}
        loading="lazy"
        style={{ objectPosition: image.pos }}
        className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
        onError={() => src !== image.fallback && setSrc(image.fallback)}
      />
    </div>
  );
}

export function Cta({
  experience,
  price,
  children,
  variant = "primary",
  className = "",
}: {
  experience: string;
  price?: string;
  children: React.ReactNode;
  variant?: "primary" | "ghost" | "white";
  className?: string;
}) {
  const styles = {
    primary: "bg-[#25d366] text-[#04210f] shadow-[0_12px_36px_rgba(37,211,102,.28)] hover:bg-[#3ee27b]",
    white: "bg-white text-[#0a2035] hover:bg-[#d6f0ff]",
    ghost: "border border-white/30 bg-white/10 text-white backdrop-blur hover:bg-white/20",
  }[variant];
  return (
    <a
      href={whatsappUrl(experience, price)}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 py-3 text-center text-sm font-extrabold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${styles} ${className}`}
    >
      <MessageCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
      {children}
      <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
    </a>
  );
}
