import type { Metadata } from "next";
import { ArrowRight, Compass, MessageCircle } from "lucide-react";
import { GENERIC_EXPERIENCE, INSTAGRAM_A7, img, operators, whatsappUrl } from "../lib/site";
import { Photo } from "../lib/ui";

export const metadata: Metadata = {
  title: "A7 Rio | Links",
  description: "Passeios, valores e WhatsApp da A7 Rio.",
};

const links = [
  { label: "Ver passeios e valores", href: "/#experiencias", icon: <Compass className="h-5 w-5" />, internal: true },
  { label: "Falar no WhatsApp", href: whatsappUrl(GENERIC_EXPERIENCE), icon: <MessageCircle className="h-5 w-5" />, primary: true },
  { label: "Conheça a A7 Rio", href: "/", icon: <ArrowRight className="h-5 w-5" />, internal: true },
  { label: "Edu Passeios", href: operators.edu.instagram, icon: <ArrowRight className="h-5 w-5" /> },
  { label: "Jet Ski no Rio", href: operators.jet.instagram, icon: <ArrowRight className="h-5 w-5" /> },
];

export default function Links() {
  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-[#07111f] px-5 py-12 text-white">
      <div className="absolute inset-0 -z-10 opacity-40">
        <Photo image={img.tijucas} alt="" className="h-full w-full" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#07111f]/40 to-[#07111f]" />
      </div>
      <div className="mx-auto flex max-w-[440px] flex-col items-center gap-8 text-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/assets/logo-azul.png" alt="A7 Rio" className="h-20 w-auto object-contain mix-blend-screen" />
        <p className="text-sm leading-6 text-[#cfe3f3]">O Rio pelo mar: jet ski, lancha e ilhas.</p>
        <ul className="flex w-full flex-col gap-3">
          {links.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                {...(l.internal ? {} : { target: "_blank", rel: "noopener noreferrer" })}
                className={`flex min-h-14 items-center gap-3 rounded-full px-6 text-sm font-extrabold transition ${l.primary ? "bg-[#25d366] text-[#04210f] hover:bg-[#3ee27b]" : "border border-white/25 bg-white/10 backdrop-blur hover:bg-white/20"}`}
              >
                {l.icon}
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <a href={INSTAGRAM_A7} target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-[#7dcaff]">@a7riooficial</a>
      </div>
    </main>
  );
}
