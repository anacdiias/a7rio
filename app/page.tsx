"use client";

import { useState } from "react";
import { Check, ChevronDown, Menu, Waves, X } from "lucide-react";
import { GENERIC_EXPERIENCE, INSTAGRAM_A7, gallery, jetDurations, operators, products } from "./lib/site";
import { Cta, Photo } from "./lib/ui";

const FAQs = [
  { q: "Como funciona a reserva?", a: "Você escolhe a experiência e fala com a gente no WhatsApp. Informamos datas, condições e como confirmar. A experiência é realizada por operadores parceiros." },
  { q: "Os valores são por pessoa?", a: "Ilhas Tijucas custa R$ 150 por pessoa. Lancha + Jet Ski custa R$ 3.500 para o grupo de até 7 pessoas. Os valores de Jet Ski são por passeio, conforme a duração." },
  { q: "O que está incluído?", a: "Veja os itens de cada card. Equipamentos, restrições, lotação por jet ski e extras são confirmados na conversa, antes do pagamento." },
  { q: "Posso escolher a data?", a: "Pode consultar a data que quiser. A confirmação depende da agenda dos operadores e das condições de mar e clima." },
];

const NAV = [
  ["#experiencias", "Experiências"],
  ["#jetski", "Jet Ski"],
  ["#galeria", "Galeria"],
  ["#duvidas", "Dúvidas"],
];

const eyebrow = "text-xs font-bold tracking-[.25em] text-[#7bc9ff]";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-[#07111f] font-sans text-white antialiased">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#071321]/95 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-[1280px] items-center justify-between gap-4 px-5 md:px-8">
          <a href="#inicio" aria-label="A7 Rio, início">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/logo-azul.png" alt="A7 Rio" className="h-14 w-auto max-w-[142px] object-contain mix-blend-screen" />
          </a>
          <nav className="hidden items-center gap-7 text-sm font-medium text-slate-200 lg:flex">
            {NAV.map(([href, t]) => <a key={href} className="hover:text-white" href={href}>{t}</a>)}
          </nav>
          <Cta experience={GENERIC_EXPERIENCE} className="hidden !min-h-11 !px-5 sm:inline-flex">Falar no WhatsApp</Cta>
          <button className="rounded-lg p-3 lg:hidden" onClick={() => setMenuOpen(!menuOpen)} aria-label="Abrir menu" aria-expanded={menuOpen}>{menuOpen ? <X /> : <Menu />}</button>
        </div>
        {menuOpen && (
          <nav className="flex flex-col gap-4 border-t border-white/10 bg-[#071321] px-6 py-5 text-sm lg:hidden">
            {NAV.map(([href, t]) => <a key={href} href={href} onClick={() => setMenuOpen(false)}>{t}</a>)}
          </nav>
        )}
      </header>

      <main id="inicio" className="pb-16 md:pb-0">
        {/* HERO */}
        <section className="relative isolate flex min-h-[680px] items-center overflow-hidden md:min-h-[760px]">
          <div className="absolute inset-0 -z-10">
            <video src="/assets/hero-video-opt.mp4" poster="/assets/hero-tijucas.jpg" autoPlay muted loop playsInline preload="auto" aria-hidden="true" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#03101a]/95 via-[#03101a]/70 to-[#03101a]/20" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#07111f] via-transparent to-transparent" />
          </div>
          <div className="mx-auto w-full max-w-[1280px] px-5 py-20 md:px-8">
            <div className="max-w-[680px] space-y-8">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-xs font-semibold tracking-[.18em] text-[#b9e4ff] backdrop-blur">RIO DE JANEIRO · PELO MAR</span>
              <h1 className="text-[clamp(44px,6.4vw,84px)] font-extrabold leading-[1.02] tracking-[-.05em]">
                O Rio que você conhece.<br /><span className="text-[#7dcdff]">E o que falta viver.</span>
              </h1>
              <p className="max-w-lg text-base leading-8 text-[#dfebf5] md:text-lg">Jet ski, lancha e ilhas. Escolha sua experiência e reserve direto pelo WhatsApp.</p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Cta experience={GENERIC_EXPERIENCE} className="!min-h-14 !px-7 !text-base">Reservar no WhatsApp</Cta>
                <a href="#experiencias" className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 text-sm font-semibold backdrop-blur hover:bg-white/20">Ver passeios e valores</a>
              </div>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-2">
                <div><p className="text-[11px] text-[#9fc3dd]">A partir de</p><p className="text-4xl font-extrabold leading-none tracking-tight">R$ 150<span className="ml-2 text-sm font-semibold text-[#b9e4ff]">/ pessoa</span></p></div>
                <div className="h-10 w-px bg-white/20" />
                <p className="text-xs leading-5 text-[#dce9f4]">Jet ski a partir de <strong className="text-base text-white">R$ 300</strong><br />Lancha + Jet Ski <strong className="text-base text-white">R$ 3.500</strong></p>
              </div>
            </div>
          </div>
        </section>

        {/* EXPERIÊNCIAS */}
        <section id="experiencias" className="mx-auto max-w-[1280px] scroll-mt-24 px-5 pb-24 pt-8 md:px-8 md:pt-12">
          <div className="mb-10 max-w-2xl space-y-3">
            <p className={eyebrow}>ESCOLHA SEU PRÓXIMO MOMENTO</p>
            <h2 className="text-3xl font-extrabold tracking-tight md:text-5xl">Qual Rio você quer viver?</h2>
            <p className="text-sm leading-7 text-[#b0c4d8] md:text-base">Dias de explorar, de acelerar e de celebrar. Toque no botão e a conversa já abre com a experiência escolhida.</p>
          </div>
          <div className="grid gap-5 lg:grid-cols-3">
            {products.map((p) => (
              <article key={p.id} className={`group relative flex flex-col overflow-hidden rounded-[28px] border bg-[#0d1b30] shadow-[0_25px_60px_rgba(0,0,0,.25)] ${p.featured ? "border-[#7dcdff]/60 lg:-mt-4 lg:mb-4" : "border-white/10"}`}>
                <div className="relative">
                  <Photo image={p.image} alt={`${p.name}: ${p.promise}`} className="aspect-[5/4] w-full" />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#081523]/80 via-transparent to-transparent" />
                  <span className="absolute left-4 top-4 rounded-full border border-white/20 bg-[#071523]/80 px-3 py-1.5 text-[11px] font-bold backdrop-blur">{p.duration}</span>
                  {p.featured && <span className="absolute right-4 top-4 rounded-full bg-[#ffd54a] px-3 py-1.5 text-[11px] font-extrabold text-[#2b2000]">PARA O GRUPO TODO</span>}
                  <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3">
                    <div><p className="text-[10px] font-bold tracking-[.2em] text-[#9fdcff]">{p.tag.toUpperCase()}</p><h3 className="text-2xl font-extrabold leading-tight">{p.name}</h3></div>
                    <div className="shrink-0 rounded-2xl bg-white px-4 py-2 text-right text-[#0a2035]"><p className="text-2xl font-extrabold leading-none">{p.price}</p><p className="mt-1 max-w-[110px] text-[10px] font-semibold leading-tight">{p.priceNote}</p></div>
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="text-sm leading-6 text-[#c3d4e4]">{p.promise}</p>
                  <ul className="my-5 flex-1 space-y-2.5">
                    {p.perks.map((b) => <li key={b} className="flex gap-2 text-xs leading-5 text-[#d5e2f0]"><Check className="mt-0.5 h-4 w-4 shrink-0 text-[#82d5ff]" />{b}</li>)}
                  </ul>
                  <Cta experience={p.name} price={`${p.price} ${p.priceNote}`} className="w-full">Quero essa experiência</Cta>
                  <p className="mt-3 text-center text-[11px] text-[#91a9bf]">Operado por {operators[p.operator].name}</p>
                </div>
              </article>
            ))}
          </div>
          <p className="mt-6 text-center text-xs leading-6 text-[#8da4ba]">Datas, rotas e condições sujeitas à confirmação no momento da reserva.</p>
        </section>

        {/* JET SKI */}
        <section id="jetski" className="scroll-mt-24 border-y border-white/10 bg-[#0b1b2e] py-24">
          <div className="mx-auto max-w-[1280px] px-5 md:px-8">
            <div className="mb-10 max-w-2xl space-y-4">
              <p className={eyebrow}>ADRENALINA NO MAR</p>
              <h2 className="text-3xl font-extrabold tracking-tight md:text-5xl">Quanto tempo de aventura combina com você?</h2>
              <p className="text-sm leading-7 text-[#b8c9d9]">Escolha a duração do seu jet ski, veja o valor e consulte a próxima data.</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
              {jetDurations.map((j) => (
                <article key={j.id} className="group flex flex-col overflow-hidden rounded-[24px] border border-white/10 bg-[#10233a]">
                  <div className="relative">
                    <Photo image={j.image} alt={`Jet ski no Rio de Janeiro, opção de ${j.duration}`} className="aspect-[4/3] w-full" />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#10233a] via-transparent to-transparent" />
                    <span className="absolute left-3 top-3 rounded-full bg-[#061527]/85 px-3 py-1.5 text-xs font-bold">{j.duration}</span>
                  </div>
                  <div className="flex flex-1 flex-col gap-3 px-4 pb-5 pt-2">
                    <p className="text-4xl font-extrabold leading-none tracking-tight">{j.price}</p>
                    <p className="flex-1 text-xs leading-5 text-[#b6c6d7]">{j.route}</p>
                    <Cta experience={`Jet Ski - ${j.duration}`} price={j.price} className="mt-1 w-full !px-3 !text-xs">Consultar datas</Cta>
                  </div>
                </article>
              ))}
            </div>
            <p className="mt-6 text-xs leading-6 text-[#8fa7bd]">Roteiros, tempo efetivo de operação, participantes e restrições são confirmados na conversa. Wakeboard é opcional e sob confirmação.</p>
          </div>
        </section>

        {/* GALERIA */}
        <section id="galeria" className="mx-auto max-w-[1280px] scroll-mt-24 px-5 py-24 md:px-8">
          <div className="mb-9 max-w-2xl space-y-4">
            <p className={eyebrow}>GALERIA</p>
            <h2 className="text-3xl font-extrabold tracking-tight md:text-5xl">Tem coisas que a gente precisa viver, não só ver.</h2>
          </div>
          <div className="grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-4">
            {gallery.map((g, i) => (
              <figure key={g.name} className={`group relative overflow-hidden rounded-[22px] ${i === 0 ? "col-span-2 row-span-2" : ""}`}>
                <Photo image={g.image} alt={g.name} className={`w-full ${i === 0 ? "aspect-square h-full" : "aspect-[4/5]"}`} />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                <figcaption className="absolute bottom-4 left-4 right-4"><span className="block text-[10px] font-bold tracking-[.2em] text-[#83d2ff]">{g.tag}</span><strong className="text-sm md:text-base">{g.name}</strong></figcaption>
              </figure>
            ))}
          </div>
          <div className="mt-10 flex justify-center"><Cta experience={GENERIC_EXPERIENCE}>Quero viver isso, falar no WhatsApp</Cta></div>
        </section>

        {/* CTA FINAL */}
        <section className="bg-gradient-to-br from-[#0e4a7a] to-[#0a2540] py-20">
          <div className="mx-auto max-w-[900px] space-y-6 px-5 text-center md:px-8">
            <h2 className="text-3xl font-extrabold tracking-tight md:text-5xl">A próxima lembrança boa começa numa mensagem.</h2>
            <p className="text-sm leading-7 text-[#cfe3f3] md:text-base">Conte quantas pessoas vão e qual experiência te chamou. A gente responde com as datas.</p>
            <Cta experience={GENERIC_EXPERIENCE} variant="white" className="!min-h-14 !px-8 !text-base">Chamar no WhatsApp</Cta>
          </div>
        </section>

        {/* FAQ */}
        <section id="duvidas" className="mx-auto grid max-w-[1280px] scroll-mt-24 gap-10 px-5 py-24 md:px-8 lg:grid-cols-[.75fr_1.25fr]">
          <div className="space-y-4"><p className={eyebrow}>ANTES DE IR</p><h2 className="text-3xl font-extrabold md:text-4xl">Dúvidas antes de reservar?</h2></div>
          <div className="space-y-3">
            {FAQs.map((f, i) => (
              <div key={f.q} className="overflow-hidden rounded-2xl border border-white/10 bg-[#0d2035]">
                <button type="button" className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left text-sm font-bold" onClick={() => setFaqOpen(faqOpen === i ? null : i)} aria-expanded={faqOpen === i}>
                  <span>{f.q}</span><ChevronDown className={`h-5 w-5 shrink-0 transition ${faqOpen === i ? "rotate-180" : ""}`} />
                </button>
                {faqOpen === i && <p className="px-5 pb-5 text-sm leading-7 text-[#bed0df]">{f.a}</p>}
              </div>
            ))}
          </div>
        </section>

        {/* OPERADORES */}
        <section className="border-t border-white/10 bg-[#0b1b2d] py-12">
          <div className="mx-auto flex max-w-[1280px] flex-col gap-4 px-5 md:flex-row md:items-center md:justify-between md:px-8">
            <p className="max-w-md text-xs leading-6 text-[#b4c7d8]"><Waves className="mr-2 inline h-4 w-4 text-[#7bc9ff]" />As experiências são realizadas por operadores parceiros: <strong className="text-white">{operators.edu.name}</strong> e <strong className="text-white">{operators.jet.name}</strong>. O atendimento e a reserva começam com a A7 Rio.</p>
            <div className="flex flex-wrap gap-4 text-xs font-semibold text-[#7dcaff]">
              <a href={operators.edu.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-white">Instagram {operators.edu.name}</a>
              <a href={operators.jet.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-white">Instagram {operators.jet.name}</a>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 bg-[#06101b] px-5 pb-24 pt-9 text-[#aebfd0] md:pb-9">
        <div className="mx-auto flex max-w-[1280px] flex-col justify-between gap-5 md:flex-row md:items-start">
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/logo-azul.png" alt="A7 Rio" className="h-11 w-auto max-w-32 object-contain mix-blend-screen" />
            <p className="mt-2 max-w-xl text-xs leading-6">Preços e disponibilidade sujeitos à confirmação. Termos de contratação tratados com o operador de cada experiência.</p>
          </div>
          <div className="flex gap-5 text-sm font-bold text-[#7dcaff]"><a href="/links">Links</a><a href={INSTAGRAM_A7} target="_blank" rel="noopener noreferrer">@a7riooficial</a></div>
        </div>
      </footer>

      <div className="fixed inset-x-0 bottom-0 z-40 md:hidden">
        <Cta experience={GENERIC_EXPERIENCE} className="!min-h-14 w-full !rounded-none">Reservar no WhatsApp</Cta>
      </div>
    </div>
  );
}
