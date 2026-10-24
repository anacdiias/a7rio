"use client";

import { useState } from "react";
import {
  ArrowRight,
  CalendarDays,
  Check,
  Clock3,
  MapPin,
  Menu,
  MessageCircle,
  Waves,
  X,
} from "lucide-react";

/*
  A7 RIO — CATÁLOGO VALIDADO EM 24/10/2026
  Valores informados pela A7 Rio. Confirme promoções, disponibilidade e
  condições diretamente com os parceiros antes de anunciar descontos.
  Comissões A DEFINIR. Nunca declarar reservas concluídas pelo site.
*/

const PARTNERS = {
  edu: {
    name: "Edu Passeios",
    phone: "5521986046456", // telefone publicado em edupasseios.com.br
    instagram: "https://www.instagram.com/edupasseios021/",
    ref: "A7RIO-EDU",
  },
  jet: {
    name: "Jet Ski no Rio",
    phone: "5521972040971", // número enviado pela A7 Rio (catálogo WhatsApp)
    instagram: "https://www.instagram.com/jetskinorio/",
    ref: "A7RIO-JET",
  },
} as const;

// lucide-react 1.x removeu ícones de marca; SVG inline equivalente.
function Instagram({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

type PartnerKey = keyof typeof PARTNERS;

type Experience = {
  id: string;
  name: string;
  short: string;
  price: string;
  period: string;
  partner: PartnerKey;
  image: string;
  imageAlt: string;
  details: string[];
  featured?: boolean;
};

const experiences: Experience[] = [
  {
    id: "tijucas-4h",
    name: "Ilhas Tijucas",
    short: "Quatro horas para ver o Rio por outro ângulo. Uma experiência de barco para conhecer as Ilhas Tijucas.",
    price: "R$ 150",
    period: "por pessoa · 4 horas",
    partner: "edu",
    image: "/assets/tijucas.jpg",
    imageAlt: "Paisagem das Ilhas Tijucas, Rio de Janeiro",
    details: ["Passeio de barco", "Duração de 4 horas", "Agendamento antecipado"],
    featured: true,
  },
  {
    id: "lancha-jet-4h",
    name: "Lancha + Jet Ski",
    short: "Um passeio de lancha com jet ski para aproveitar o mar em grupo.",
    price: "R$ 3.500",
    period: "valor total · até 7 pessoas · 4 horas",
    partner: "jet",
    image: "/assets/tijucas.jpg", // provisório: sem foto autorizada de lancha + jet ski
    imageAlt: "Vista aérea do mar e das ilhas do Rio de Janeiro com embarcações",
    details: ["Lancha e jet ski durante o passeio", "Cooler com gelo", "Água, mate e frutas a bordo"],
  },
];

const jetskiOptions = [
  { id: "jet-15min", time: "15 minutos", price: "R$ 300", info: "Canal da Barra, Quebra-Mar, Barra e Joatinga" },
  { id: "jet-30min", time: "30 minutos", price: "R$ 500", info: "Quebra-Mar, Joatinga, Barra e Ilhas Tijucas" },
  { id: "jet-60min", time: "1 hora", price: "R$ 900", info: "Canal da Barra, Quebra-Mar, Joatinga, Barra e Ilhas Tijucas" },
  { id: "jet-120min", time: "2 horas", price: "R$ 1.600", info: "Roteiro e disponibilidade mediante confirmação" },
  { id: "jet-180min", time: "3 horas", price: "R$ 2.000", info: "Roteiro e disponibilidade mediante confirmação" },
];

function bookingUrl(partnerKey: PartnerKey, experience: string, offerCode: string, withCampaign = false) {
  const partner = PARTNERS[partnerKey];
  const p = withCampaign && typeof window !== "undefined"
    ? new URLSearchParams(window.location.search)
    : new URLSearchParams();
  const clean = (value: string) => value.replace(/[^\p{L}\p{N}_\-]/gu, "").slice(0, 48);
  const origin = clean(p.get("utm_source") || "SITE");
  const campaign = clean(p.get("utm_campaign") || "ORGANICO");
  const message = [
    "Olá! Encontrei este passeio na A7 Rio e gostaria de consultar disponibilidade.",
    `Experiência: ${experience}`,
    `Indicação: ${partner.ref}`,
    `Código do passeio: ${offerCode}`,
    `Origem: ${origin}`,
    `Campanha: ${campaign}`,
    "Pode me informar as próximas datas disponíveis e as condições para reservar?",
  ].join("\n");
  return `https://wa.me/${partner.phone}?text=${encodeURIComponent(message)}`;
}

function BookingButton({
  partner,
  experience,
  offerCode,
  children = "Consultar datas",
  className = "",
}: {
  partner: PartnerKey;
  experience: string;
  offerCode: string;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <a
      href={bookingUrl(partner, experience, offerCode)}
      onClick={(event) => {
        // Acrescenta UTM do link do Instagram sem coletar dados pessoais.
        event.currentTarget.href = bookingUrl(partner, experience, offerCode, true);
      }}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Consultar disponibilidade de ${experience} com ${PARTNERS[partner].name}`}
      className={`inline-flex items-center justify-center gap-2 rounded-full bg-[#147BFF] px-5 py-3.5 text-center text-sm font-semibold text-white transition hover:bg-[#49A3FF] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${className}`}
    >
      <MessageCircle className="h-4 w-4" aria-hidden="true" />
      {children}
      <ArrowRight className="h-4 w-4" aria-hidden="true" />
    </a>
  );
}

function ExperienceCard({ item }: { item: Experience }) {
  return (
    <article className="overflow-hidden rounded-3xl border border-white/10 bg-[#0d1930] shadow-[0_20px_60px_rgba(0,0,0,.16)]">
      <div className="relative aspect-[16/10] overflow-hidden">
        <img className="h-full w-full object-cover" src={item.image} alt={item.imageAlt} loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#081120]/75 via-transparent to-transparent" />
        {item.featured && (
          <span className="absolute bottom-4 left-5 rounded-full border border-white/20 bg-[#081120]/85 px-4 py-1.5 text-xs font-semibold text-white">
            Ótimo para conhecer as ilhas
          </span>
        )}
      </div>
      <div className="space-y-5 p-6 md:p-8">
        <div className="space-y-2">
          <p className="text-xs font-medium uppercase tracking-widest text-[#82C7FF]">Parceiro: {PARTNERS[item.partner].name}</p>
          <h3 className="text-2xl font-semibold text-white">{item.name}</h3>
          <p className="text-sm leading-7 text-slate-300">{item.short}</p>
        </div>
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <span className="text-2xl font-bold text-white">{item.price}</span>
          <span className="text-sm text-slate-400">{item.period}</span>
        </div>
        <ul className="space-y-2">
          {item.details.map((detail) => (
            <li className="flex items-start gap-2 text-sm text-slate-300" key={detail}>
              <Check className="mt-1 h-4 w-4 shrink-0 text-[#82C7FF]" />{detail}
            </li>
          ))}
        </ul>
        <BookingButton partner={item.partner} experience={item.name} offerCode={item.id} className="w-full">
          Consultar datas com o parceiro
        </BookingButton>
      </div>
    </article>
  );
}

export default function Home() {
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <div className="min-h-screen scroll-smooth bg-[#081120] font-sans text-white antialiased">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#081120]/95 backdrop-blur-xl">
        <div className="mx-auto flex min-h-[76px] max-w-7xl items-center justify-between gap-4 px-5 md:px-10">
          <a href="#inicio" aria-label="A7 Rio, voltar ao início" className="flex items-center gap-2">
            <img src="/assets/logo-azul.png" alt="A7 Rio" className="h-14 w-auto max-w-[142px] object-contain mix-blend-screen" />
          </a>
          <nav className="hidden items-center gap-7 text-sm text-slate-200 md:flex" aria-label="Navegação principal">
            <a href="#experiencias" className="transition hover:text-[#82C7FF]">Experiências</a>
            <a href="#jetski" className="transition hover:text-[#82C7FF]">Jet Ski</a>
            <a href="#como-reservar" className="transition hover:text-[#82C7FF]">Como reservar</a>
            <a href="#parceiros" className="transition hover:text-[#82C7FF]">Parceiros</a>
          </nav>
          <a href="#experiencias" className="hidden rounded-full bg-[#147BFF] px-5 py-3 text-sm font-semibold transition hover:bg-[#49A3FF] md:inline-flex">Ver passeios</a>
          <button type="button" onClick={() => setMobileOpen(!mobileOpen)} className="rounded-lg p-2 text-white md:hidden" aria-label="Abrir ou fechar menu" aria-expanded={mobileOpen}>
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
        {mobileOpen && (
          <nav className="flex flex-col gap-4 border-t border-white/10 px-6 py-5 text-sm md:hidden" aria-label="Navegação móvel">
            {[ ["#experiencias", "Experiências"], ["#jetski", "Jet Ski"], ["#como-reservar", "Como reservar"], ["#parceiros", "Parceiros"] ].map(([href,label]) => (
              <a key={href} href={href} onClick={() => setMobileOpen(false)}>{label}</a>
            ))}
          </nav>
        )}
      </header>

      <main id="inicio">
        <section className="relative flex min-h-[76vh] items-center overflow-hidden">
          <div className="absolute inset-0">
            <video src="/assets/hero-video.mp4" poster="/assets/tijucas.jpg" autoPlay muted loop playsInline preload="metadata" className="h-full w-full object-cover" aria-hidden="true" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#050b17]/95 via-[#050b17]/75 to-[#050b17]/45" />
          </div>
          <div className="relative mx-auto w-full max-w-7xl px-6 py-20 md:px-10">
            <div className="max-w-3xl space-y-7">
              <p className="text-sm font-semibold uppercase tracking-[.24em] text-[#82C7FF]">A7 Rio · Experiências no RJ</p>
              <h1 className="text-4xl font-semibold leading-[1.12] tracking-tight sm:text-5xl lg:text-6xl">Mais do que visitar.<br/><span className="text-[#82C7FF]">Viva o Rio.</span></h1>
              <p className="max-w-xl text-base leading-8 text-slate-200 md:text-lg">O mar, as ilhas e a adrenalina que fazem parte de um outro lado da cidade. Descubra experiências de parceiros locais e escolha a sua próxima história.</p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <a href="#experiencias" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#147BFF] px-7 py-4 text-sm font-semibold transition hover:bg-[#49A3FF]">Explorar experiências <ArrowRight className="h-4 w-4"/></a>
                <a href="#jetski" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 px-7 py-4 text-sm font-semibold transition hover:bg-white/20">Quero andar de Jet Ski</a>
              </div>
              <div className="flex flex-wrap gap-5 pt-4 text-xs text-slate-300 md:text-sm">
                <span className="flex items-center gap-2"><Waves className="h-4 w-4"/> Experiências pelo mar</span>
                <span className="flex items-center gap-2"><MapPin className="h-4 w-4"/> Rio de Janeiro</span>
                <span className="flex items-center gap-2"><CalendarDays className="h-4 w-4"/> Consulte a disponibilidade</span>
              </div>
            </div>
          </div>
        </section>

        <section id="experiencias" className="mx-auto max-w-7xl scroll-mt-24 px-6 py-20 md:px-10">
          <div className="mb-10 max-w-2xl space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[.25em] text-[#82C7FF]">Escolha seu momento</p>
            <h2 className="text-3xl font-semibold md:text-4xl">Um Rio que dá vontade de viver.</h2>
            <p className="text-slate-300">Experiências com valores de referência informados pelos parceiros. Datas e condições são confirmadas diretamente com cada operador.</p>
          </div>
          <div className="grid gap-7 lg:grid-cols-2">
            {experiences.map((item) => <ExperienceCard item={item} key={item.id} />)}
          </div>
        </section>

        <section id="jetski" className="scroll-mt-24 border-y border-white/10 bg-[#0b1629] py-20">
          <div className="mx-auto max-w-7xl px-6 md:px-10">
            <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div className="max-w-2xl space-y-3">
                <p className="text-xs font-semibold uppercase tracking-[.25em] text-[#82C7FF]">Adrenalina no mar</p>
                <h2 className="text-3xl font-semibold md:text-4xl">Jet Ski no Rio</h2>
                <p className="text-sm leading-7 text-slate-300">Escolha a duração e consulte disponibilidade com o Jet Ski no Rio. Wakeboard opcional, sujeito à confirmação.</p>
              </div>
              <span className="w-fit rounded-full border border-white/15 px-4 py-2 text-xs text-slate-300">Parceiro: @jetskinorio</span>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {jetskiOptions.map((option) => (
                <article key={option.id} className="flex flex-col justify-between gap-5 rounded-2xl border border-white/10 bg-[#111f38] p-6">
                  <div className="space-y-3">
                    <p className="flex items-center gap-2 text-sm text-[#82C7FF]"><Clock3 className="h-4 w-4"/> {option.time}</p>
                    <h3 className="text-3xl font-semibold">{option.price}</h3>
                    <p className="min-h-10 text-sm text-slate-300">{option.info}</p>
                  </div>
                  <BookingButton partner="jet" experience={`Jet Ski - ${option.time}`} offerCode={option.id} className="w-full">Consultar este passeio</BookingButton>
                </article>
              ))}
            </div>
            <p className="mt-6 text-xs leading-6 text-slate-400">Roteiros dependem das condições de navegação, clima e regras de segurança. Promoções de 10% ou 20% não estão aplicadas até confirmação do parceiro.</p>
          </div>
        </section>

        <section id="como-reservar" className="mx-auto max-w-7xl scroll-mt-24 px-6 py-20 md:px-10">
          <div className="mb-9 max-w-2xl space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[.25em] text-[#82C7FF]">Simples e direto</p>
            <h2 className="text-3xl font-semibold md:text-4xl">Como funciona sua reserva?</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {[
              {number:"01",title:"Escolha a experiência", desc:"Veja as opções e selecione o passeio que combina com você."},
              {number:"02",title:"Converse com o parceiro",desc:"O WhatsApp abre com a indicação A7 Rio já identificada na mensagem."},
              {number:"03",title:"Confirme sua reserva",desc:"O operador verifica datas, condições, pagamento e detalhes de segurança."},
            ].map((step) => (
              <div key={step.number} className="rounded-2xl border border-white/10 bg-[#0d1930] p-6">
                <span className="text-sm font-semibold text-[#82C7FF]">{step.number}</span>
                <h3 className="mt-4 text-xl font-semibold">{step.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="parceiros" className="scroll-mt-24 bg-[#0b1629] py-16">
          <div className="mx-auto max-w-7xl px-6 md:px-10">
            <div className="mb-7 space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[.25em] text-[#82C7FF]">Quem realiza as experiências</p>
              <h2 className="text-3xl font-semibold">Nossos parceiros</h2>
              <p className="max-w-2xl text-sm leading-7 text-slate-300">A A7 Rio conecta você a experiências realizadas por operadores parceiros. Reservas e pagamentos são tratados diretamente com eles.</p>
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              {Object.entries(PARTNERS).map(([id, partner]) => (
                <a key={id} href={partner.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between rounded-2xl border border-white/10 bg-[#111f38] p-6 transition hover:border-[#82C7FF]/60">
                  <span className="flex items-center gap-3"><Instagram className="h-5 w-5 text-[#82C7FF]"/>{partner.name}</span><ArrowRight className="h-5 w-5"/>
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 bg-[#050816] px-6 py-9 md:px-10">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-5 md:flex-row md:items-center">
          <div className="space-y-2">
            <p className="font-semibold">A7 Rio</p>
            <p className="max-w-2xl text-xs leading-6 text-slate-400">Divulgação e indicação de experiências de operadores parceiros. Valores e disponibilidades sujeitos à confirmação. A realização do passeio e as condições de contratação são de responsabilidade do parceiro.</p>
          </div>
          <a href="https://www.instagram.com/a7riooficial/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-[#82C7FF] hover:text-white"><Instagram className="h-4 w-4"/> @a7riooficial</a>
        </div>
      </footer>
    </div>
  );
}
