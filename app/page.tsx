"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Check,
} from "lucide-react";

const sectionFade = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.85 } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.16 } },
};

const mainExperiences = [
  {
    title: "Sea Escape",
    label: "Day Escape",
    description: "Um dia leve e exclusivo explorando o Rio pelo mar.",
    idealPeople: "2 a 8 pessoas",
    price: "A partir de R$ 3.490",
    highlights: [
      "Lancha privativa",
      "Roteiro panorâmico",
      "Paradas para mergulho",
      "Caixa de som",
      "Água + gelo",
    ],
    asset: "/assets/snorkel.jpg",
  },
  {
    title: "Golden Hour",
    label: "Sunset Experience",
    description: "O pôr do sol mais bonito do Rio visto do mar.",
    idealPeople: "2 a 6 pessoas",
    price: "A partir de R$ 3.990",
    highlights: [
      "Sunset route",
      "Parada estratégica",
      "Espumante",
      "Fotos mobile",
      "Experiência romântica",
    ],
    asset: "/assets/tijucas.jpg",
  },
  {
    title: "Club",
    label: "Group Experience",
    description: "Experiência ideal para grupos e comemorações.",
    idealPeople: "8 a 15 pessoas",
    price: "A partir de R$ 4.990",
    highlights: [
      "Lancha premium",
      "Caixa de som",
      "Cooler",
      "Roteiro personalizado",
      "Sunset stop",
    ],
    asset: "/assets/tijucas.jpg",
  },
  {
    title: "Horizon",
    label: "Couple Experience",
    description: "Uma experiência exclusiva criada para casais.",
    idealPeople: "2 pessoas",
    price: "A partir de R$ 4.590",
    highlights: [
      "Passeio privativo",
      "Espumante",
      "Sunset experience",
      "Decoração simples",
      "Fotos mobile",
    ],
    asset: "/assets/gigoia.jpg",
  },
];

const serviceExperiences = [
  {
    title: "Jet Ski Experience",
    description: "Acelere pelo mar com opções flexíveis para cada momento.",
    idealPeople: "1 ou 2 pessoas por jet",
    price: "A partir de R$ 150",
    options: [
      { label: "Quick Ride", detail: "10 min — R$150" },
      { label: "Explorer", detail: "15 min — R$250" },
      { label: "Adventure Ride", detail: "30 min — R$450" },
      { label: "Full Experience", detail: "1h — R$900" },
    ],
    inclusions: [
      "Instrutor",
      "Equipamentos",
      "Rotas panorâmicas",
      "Paradas estratégicas",
    ],
    asset: "/assets/jetski-tour.jpg",
  },
  {
    title: "Wake Experience",
    description: "1h de wake em clima premium, com apoio dedicado e prática assistida.",
    idealPeople: "1 a 4 pessoas",
    price: "1h — R$ 900",
    inclusions: ["Instrutor", "Equipamento", "Prática assistida"],
    asset: "/assets/gigoia.jpg",
  },
  {
    title: "Helicopter Experience",
    description: "Veja o Rio de um ângulo inesquecível.",
    idealPeople: "A partir de R$ 950 por pessoa",
    price: "A partir de R$ 950",
    inclusions: ["Vídeo cinematic", "Drone", "Pedido especial"],
    asset: "/assets/tijucas.jpg",
  },
];

const specialExperiences = [
  {
    title: "Birthday Experience",
    label: "Special Moments",
    description: "Celebre com amigos em uma lancha privativa e atmosfera leve.",
    idealPeople: "6 a 12 pessoas",
    price: "A partir de R$ 5.490",
    highlights: [
      "Lancha privativa",
      "Decoração simples",
      "Espumante",
      "Playlist personalizada",
    ],
    asset: "/assets/snorkel.jpg",
  },
  {
    title: "Proposal Experience",
    label: "Special Moments",
    description: "Um pedido memorável com sunset exclusivo e suporte dedicado.",
    idealPeople: "2 pessoas",
    price: "A partir de R$ 6.990",
    highlights: [
      "Sunset exclusivo",
      "Decoração premium",
      "Espumante",
      "Suporte personalizado",
    ],
    asset: "/assets/tijucas.jpg",
  },
  {
    title: "Honeymoon Experience",
    label: "Special Moments",
    description: "Um roteiro íntimo e privativo para momentos a dois.",
    idealPeople: "2 pessoas",
    price: "A partir de R$ 5.990",
    highlights: [
      "Passeio privativo",
      "Sunset",
      "Espumante",
      "Roteiro exclusivo",
    ],
    asset: "/assets/gigoia.jpg",
  },
];

const personalizeOptions = [
  "Sea Escape",
  "Golden Hour",
  "Club",
  "Horizon",
  "Jet Ski",
  "Wake",
  "Helicopter",
];

const extrasOptions = [
  "Drone cinematic",
  "Fotógrafo",
  "Espumante premium",
  "Transfer",
  "Tábua gourmet",
  "Decoração",
  "DJ",
  "Flores",
  "Vídeo reels",
  "Playlist personalizada",
];

const vibeOptions = ["Relax", "Sunset", "Adventure", "Romantic", "Celebration", "Creator"];

const touristCards = [
  { title: "English Support", description: "Atendimento em inglês e fluência local." },
  { title: "Easy Booking", description: "Reserva ágil para seu roteiro no Rio." },
  { title: "Personalized Experiences", description: "Experiências pensadas para seu grupo." },
  { title: "Safe Experience", description: "Operação com foco em segurança e conforto." },
];

const differentials = [
  { title: "Atendimento humanizado", description: "Fale com a gente sempre que precisar." },
  { title: "Roteiros personalizados", description: "Cada experiência é criada do seu jeito." },
  { title: "Pagamento seguro", description: "Processo simples e confiável." },
  { title: "Suporte completo", description: "Antes, durante e depois da experiência." },
];

function StepBadge({ number, label }: { number: number; label: string }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-slate-950/70 px-4 py-4 text-sm text-slate-300">
      <span className="block font-semibold text-white">Passo {number}</span>
      <span>{label}</span>
    </div>
  );
}

function ExperienceCard({ title, label, description, price, highlights, asset, idealPeople }: { title: string; label: string; description: string; price: string; highlights: string[]; asset: string; idealPeople?: string }) {
  return (
    <motion.article
      whileHover={{ y: -8 }}
      transition={{ duration: 0.4 }}
      className="group overflow-hidden rounded-4xl border border-white/10 bg-slate-950/80 shadow-[0_40px_80px_rgba(0,17,51,0.22)] transition hover:-translate-y-1"
    >
      <div className="relative aspect-4/3 overflow-hidden">
        <img src={asset} alt={title} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent" />
      </div>
      <div className="space-y-4 p-6 text-slate-100">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-[#82C7FF]">{label}</p>
            <h3 className="mt-3 text-2xl font-semibold text-white">{title}</h3>
          </div>
          <span className="text-sm font-semibold text-[#82C7FF]">{price}</span>
        </div>
        {idealPeople ? (
          <p className="text-sm text-slate-400">
            Ideal para: <span className="text-white">{idealPeople}</span>
          </p>
        ) : null}
        <p className="text-sm leading-7 text-slate-300">{description}</p>
        <ul className="space-y-2 text-sm text-slate-300">
          {highlights.map((item) => (
            <li key={item} className="flex items-center gap-2">
              <Check className="h-4 w-4 text-[#82C7FF]" />
              {item}
            </li>
          ))}
        </ul>
        <a href="#monte" className="inline-flex items-center gap-2 text-sm font-semibold text-[#82C7FF] transition hover:text-[#A2D4FF]">
          Reservar agora
          <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </motion.article>
  );
}

function ServiceCard({
  title,
  description,
  price,
  idealPeople,
  options,
  inclusions,
  asset,
}: {
  title: string;
  description: string;
  price: string;
  idealPeople: string;
  options?: { label: string; detail: string }[];
  inclusions: string[];
  asset: string;
}) {
  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ duration: 0.35 }}
      className="overflow-hidden rounded-4xl border border-white/10 bg-slate-950/80 shadow-[0_30px_60px_rgba(0,17,51,0.18)]"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <img src={asset} alt={title} className="h-full w-full object-cover transition duration-700 hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent" />
      </div>
      <div className="space-y-4 p-8 text-slate-100">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-[#82C7FF]">Serviço adicional</p>
            <h3 className="mt-3 text-2xl font-semibold text-white">{title}</h3>
          </div>
          <span className="text-sm font-semibold text-[#82C7FF]">{price}</span>
        </div>
        <p className="text-sm leading-7 text-slate-300">{description}</p>
        <p className="text-sm text-slate-400">
          Ideal para: <span className="text-white">{idealPeople}</span>
        </p>
        {options ? (
          <div className="rounded-3xl border border-white/10 bg-[#0b1327] p-4">
            <p className="text-sm uppercase tracking-[0.3em] text-[#82C7FF]">Opções</p>
            <div className="mt-3 space-y-2 text-sm text-slate-300">
              {options.map((item) => (
                <div key={item.label} className="flex items-center justify-between gap-4">
                  <span>{item.label}</span>
                  <span className="font-semibold text-white">{item.detail}</span>
                </div>
              ))}
            </div>
          </div>
        ) : null}
        <div className="space-y-3 text-sm text-slate-300">
          <p className="uppercase tracking-[0.3em] text-[#82C7FF]">Incluso</p>
          <ul className="space-y-2">
            {inclusions.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <Check className="h-4 w-4 text-[#82C7FF]" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.article>
  );
}

function FooterLink({ label }: { label: string }) {
  return (
    <a href={`#${label.toLowerCase()}`} className="transition hover:text-[#147BFF] text-sm text-[#6B7280]">
      {label}
    </a>
  );
}

function PersonalizeForm() {
  const [selectedExperience, setSelectedExperience] = useState(personalizeOptions[0]);
  const [people, setPeople] = useState(4);
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);
  const [selectedVibe, setSelectedVibe] = useState(vibeOptions[0]);
  const [date, setDate] = useState("");

  const whatsappMessage = useMemo(() => {
    const extrasText = selectedExtras.length ? selectedExtras.join(", ") : "Nenhum extra selecionado";
    return `Olá! Gostaria de montar uma experiência personalizada com a A7Rio.%0A%0AExperiência: ${selectedExperience}%0APessoas: ${people}%0AExtras: ${extrasText}%0AVibe: ${selectedVibe}%0AData: ${date || "Ainda não definida"}`;
  }, [date, people, selectedExperience, selectedExtras, selectedVibe]);

  const whatsappUrl = `https://wa.me/5521999999999?text=${whatsappMessage}`;

  return (
    <div className="space-y-6 rounded-4xl border border-white/10 bg-slate-950/80 p-6 shadow-[0_30px_70px_rgba(0,17,51,0.18)] backdrop-blur-xl md:p-10">
      <div className="space-y-3">
        <p className="text-sm uppercase tracking-[0.35em] text-[#82C7FF]">Step 1 — Escolha a experiência</p>
        <div className="grid gap-3 sm:grid-cols-2">
          {personalizeOptions.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setSelectedExperience(option)}
              className={`rounded-3xl border px-4 py-3 text-left text-sm transition ${
                selectedExperience === option
                  ? "border-[#147BFF] bg-[#82C7FF]/20 text-white"
                  : "border-white/10 bg-slate-950/80 text-slate-200"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <p className="text-sm uppercase tracking-[0.35em] text-[#82C7FF]">Step 2 — Quantas pessoas?</p>
        <input
          type="number"
          min={1}
          value={people}
          onChange={(event) => setPeople(Number(event.target.value))}
          className="w-full rounded-3xl border border-white/10 bg-slate-950/80 px-5 py-4 text-sm text-slate-100 outline-none transition focus:border-[#147BFF]"
        />
      </div>

      <div className="space-y-3">
        <p className="text-sm uppercase tracking-[0.35em] text-[#82C7FF]">Step 3 — Extras</p>
        <div className="grid gap-3 sm:grid-cols-2">
          {extrasOptions.map((extra) => {
            const selected = selectedExtras.includes(extra);
            return (
              <button
                key={extra}
                type="button"
                onClick={() => {
                  setSelectedExtras((current) =>
                    current.includes(extra) ? current.filter((item) => item !== extra) : [...current, extra],
                  );
                }}
                className={`rounded-3xl border px-4 py-4 text-left text-sm transition ${
                  selected ? "border-[#147BFF] bg-[#82C7FF]/20 text-white" : "border-white/10 bg-slate-950/80 text-slate-200"
                }`}
              >
                {extra}
              </button>
            );
          })}
        </div>
      </div>

      <div className="space-y-3">
        <p className="text-sm uppercase tracking-[0.35em] text-[#82C7FF]">Step 4 — Qual vibe?</p>
        <div className="flex flex-wrap gap-3">
          {vibeOptions.map((vibe) => (
            <button
              key={vibe}
              type="button"
              onClick={() => setSelectedVibe(vibe)}
              className={`rounded-full border px-5 py-3 text-sm transition ${
                selectedVibe === vibe
                  ? "border-[#147BFF] bg-[#82C7FF]/20 text-white"
                  : "border-white/10 bg-slate-950/80 text-slate-200"
              }`}
            >
              {vibe}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <p className="text-sm uppercase tracking-[0.35em] text-[#82C7FF]">Step 5 — Data desejada</p>
        <input
          type="date"
          value={date}
          onChange={(event) => setDate(event.target.value)}
          className="w-full rounded-3xl border border-white/10 bg-slate-950/80 px-5 py-4 text-sm text-slate-100 outline-none transition focus:border-[#147BFF]"
        />
      </div>

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noreferrer"
        className="inline-flex w-full items-center justify-center rounded-full bg-[#147BFF] px-6 py-4 text-sm font-semibold text-white transition hover:bg-[#49A3FF]"
      >
        Montar minha experiência
      </a>
    </div>
  );
}

export default function Home() {
  return (
    <div className="scroll-smooth bg-[#081120] font-sans text-[#F8FAFC] antialiased">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#081120]/95 backdrop-blur-xl text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-10">
          <div className="flex items-center gap-3 rounded-full bg-[#081120] px-2 py-1">
            <img src="/assets/logo-azul.png" alt="A7Rio" className="h-20 w-auto mix-blend-screen" />
          </div>
          <nav className="hidden items-center gap-8 text-sm font-medium text-slate-200/80 md:flex">
            <a href="#experiencias" className="transition hover:text-[#82C7FF]">Experiências</a>
            <a href="#servicos" className="transition hover:text-[#82C7FF]">Serviços</a>
            <a href="#special" className="transition hover:text-[#82C7FF]">Special Moments</a>
            <a href="#extras" className="transition hover:text-[#82C7FF]">Extras</a>
            <a href="#monte" className="transition hover:text-[#82C7FF]">Monte</a>
          </nav>
          <a
            href="https://wa.me/5521999999999?text=Olá!%20Gostaria%20de%20montar%20uma%20experiência%20personalizada%20com%20a%20A7Rio."
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-full bg-[#147BFF] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#49A3FF]"
          >
            WhatsApp
          </a>
        </div>
      </header>

      <main className="relative overflow-hidden pt-24">
        <section className="relative min-h-[85vh] overflow-hidden">
          <div className="absolute inset-0">
            <video
              className="h-full w-full object-cover brightness-75 contrast-110 saturate-110"
              src="/assets/hero-video.mp4"
              poster="/assets/tijucas.jpg"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
            />
            <div className="absolute inset-0 bg-[#050816]/85" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(20,123,255,0.18),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(57,120,255,0.18),_transparent_30%)]" />
          </div>
          <div className="relative mx-auto flex min-h-[85vh] max-w-7xl flex-col justify-center px-6 py-20 md:px-10">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9 }}
              className="mx-auto flex w-full max-w-3xl flex-col items-start gap-8 rounded-4xl border border-white/10 bg-slate-950/70 px-6 py-10 shadow-[0_40px_120px_rgba(0,0,0,0.25)] backdrop-blur-xl sm:px-10"
            >
              <div className="space-y-5 text-slate-100">
                <p className="text-sm uppercase tracking-[0.4em] text-[#82C7FF]">A7Rio</p>
                <h1 className="text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-5xl">
                  Viva o Rio e colecione momentos exclusivos.
                </h1>
                <p className="max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
                  Momentos exclusivos no mar, para quem busca uma experiência memorável.
                </p>
              </div>
              <div className="flex flex-col gap-4 sm:flex-row">
                <a
                  href="#experiencias"
                  className="inline-flex items-center justify-center rounded-full bg-[#147BFF] px-8 py-4 text-sm font-semibold text-white transition hover:bg-[#49A3FF]"
                >
                  Ver experiências
                </a>
                <a
                  href="#monte"
                  className="inline-flex items-center justify-center rounded-full border border-[#147BFF] bg-slate-950/80 px-8 py-4 text-sm font-semibold text-white transition hover:border-[#49A3FF] hover:text-[#A2D4FF]"
                >
                  Montar meu roteiro
                </a>
              </div>
              <div className="grid grid-cols-2 gap-3 border-t border-white/10 pt-6 text-sm text-slate-300 sm:grid-cols-4">
                {['Lifestyle premium', 'Cinematic service', 'Experiências exclusivas', 'Reserva fácil'].map((item) => (
                  <span key={item} className="inline-flex items-center gap-2 font-medium text-slate-200/80">
                    <Check className="h-4 w-4 text-[#82C7FF]" />
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        <section id="experiencias" className="mx-auto max-w-7xl px-6 py-20 md:px-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={stagger}
            className="space-y-8"
          >
            <motion.div variants={sectionFade} className="space-y-4 text-center">
              <p className="text-sm uppercase tracking-[0.4em] text-[#147BFF]">Experiências principais</p>
              <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                Sensações no mar do Rio.
              </h2>
              <p className="mx-auto max-w-2xl text-base leading-8 text-slate-300">
                Quatro experiências pensadas para viver o Rio como um momento exclusivo.
              </p>
            </motion.div>
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
              {mainExperiences.map((experience) => (
                <ExperienceCard key={experience.title} {...experience} />
              ))}
            </div>
          </motion.div>
        </section>

        <section id="servicos" className="bg-[#081120] py-20">
          <div className="mx-auto max-w-7xl px-6 md:px-10">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={sectionFade}
              className="space-y-4 text-center"
            >
              <p className="text-sm uppercase tracking-[0.4em] text-[#147BFF]">Serviços adicionais</p>
              <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                Experiências específicas sem ruído.
              </h2>
              <p className="mx-auto max-w-2xl text-base leading-8 text-slate-300">
                Opções premium para quem busca velocidade, adrenalina ou vistas diferentes.
              </p>
            </motion.div>
            <div className="mt-10 grid gap-6 lg:grid-cols-3">
              {serviceExperiences.map((service) => (
                <ServiceCard key={service.title} {...service} />
              ))}
            </div>
          </div>
        </section>

        <section id="special" className="mx-auto max-w-7xl px-6 py-20 md:px-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={sectionFade}
            className="space-y-4 text-center"
          >
            <p className="text-sm uppercase tracking-[0.4em] text-[#147BFF]">Special Moments</p>
            <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Experiências criadas para momentos únicos.
            </h2>
            <p className="mx-auto max-w-2xl text-base leading-8 text-slate-300">
              Celebrações, pedidos e roteiros íntimos para viver o Rio de forma especial.
            </p>
          </motion.div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {specialExperiences.map((experience) => (
              <ExperienceCard key={experience.title} {...experience} />
            ))}
          </div>
        </section>

        <section id="extras" className="bg-[#081120] py-20">
          <div className="mx-auto max-w-7xl px-6 md:px-10">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={sectionFade}
              className="space-y-4 text-center"
            >
              <p className="text-sm uppercase tracking-[0.4em] text-[#147BFF]">Add-ons</p>
              <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                Personalize qualquer experiência.
              </h2>
              <p className="mx-auto max-w-2xl text-base leading-8 text-slate-300">
                Extras selecionados para deixar a sua viagem no mar ainda mais memorável.
              </p>
            </motion.div>
            <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {extrasOptions.map((extra) => (
                <div key={extra} className="rounded-3xl border border-white/10 bg-slate-950/80 px-5 py-4 text-sm text-slate-200 shadow-[0_20px_40px_rgba(0,17,51,0.15)]">
                  {extra}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="monte" className="mx-auto max-w-7xl px-6 py-20 md:px-10">
          <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={sectionFade}
              className="space-y-6"
            >
              <p className="text-sm uppercase tracking-[0.35em] text-[#147BFF]">Monte seu roteiro</p>
              <h2 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">Do seu jeito.</h2>
              <p className="max-w-xl text-base leading-8 text-slate-300">
                Adicione extras e transforme sua experiência em algo ainda mais especial.
              </p>
              <div className="grid gap-3">
                <StepBadge number={1} label="Escolha a experiência" />
                <StepBadge number={2} label="Quantas pessoas" />
                <StepBadge number={3} label="Extras" />
                <StepBadge number={4} label="Qual vibe" />
                <StepBadge number={5} label="Data desejada" />
                <StepBadge number={6} label="Montar minha experiência" />
              </div>
            </motion.div>
            <PersonalizeForm />
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-20 md:px-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={sectionFade}
            className="space-y-8 text-center"
          >
            <p className="text-sm uppercase tracking-[0.35em] text-[#82C7FF]">Turistas internacionais</p>
            <h2 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">Experiências com suporte discreto e fluente.</h2>
            <p className="mx-auto max-w-2xl text-base leading-8 text-slate-300">
              Um serviço pensado para visitantes que querem aproveitar o Rio com conforto, reserva ágil e apoio em inglês.
            </p>
          </motion.div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {touristCards.map((card) => (
              <motion.div key={card.title} variants={sectionFade} className="rounded-4xl border border-white/10 bg-slate-950/80 p-8 shadow-[0_20px_50px_rgba(0,17,51,0.16)]">
                <h3 className="text-xl font-semibold text-white">{card.title}</h3>
                <p className="mt-4 text-sm leading-7 text-slate-300">{card.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-20 md:px-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={sectionFade}
            className="space-y-8 text-center"
          >
            <p className="text-sm uppercase tracking-[0.35em] text-[#82C7FF]">Diferenciais</p>
            <h2 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">O que faz a A7Rio ser diferente.</h2>
          </motion.div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {differentials.map((item) => (
              <motion.div key={item.title} variants={sectionFade} className="rounded-4xl border border-white/10 bg-slate-950/80 p-8 text-left shadow-[0_30px_70px_rgba(0,17,51,0.18)]">
                <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                <p className="mt-4 text-sm leading-7 text-slate-300">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="bg-[#081120] py-20">
          <div className="mx-auto flex max-w-7xl flex-col gap-10 px-6 md:px-10 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-6">
              <p className="text-sm uppercase tracking-[0.35em] text-[#82C7FF]">Pronto para viver o Rio?</p>
              <h2 className="max-w-2xl text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                Bora viver o Rio de um jeito diferente?
              </h2>
              <p className="max-w-xl text-base leading-8 text-slate-300">
                Fale com a gente no WhatsApp e monte sua experiência personalizada no mar.
              </p>
            </div>
            <a
              href="https://wa.me/5521999999999?text=Olá!%20Gostaria%20de%20montar%20uma%20experiência%20personalizada%20com%20a%20A7Rio."
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-[#147BFF] px-8 py-4 text-sm font-semibold text-white shadow-[0_20px_50px_rgba(20,123,255,0.22)] transition hover:bg-[#49A3FF]"
            >
              Falar no WhatsApp
            </a>
          </div>
        </section>

        <footer className="border-t border-white/10 bg-[#050816] py-12">
          <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 md:px-10 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-3">
              <img src="/assets/logo-azul.png" alt="A7Rio" className="h-10 w-auto mix-blend-screen" />
              <div>
                <p className="font-semibold text-white">A7Rio</p>
                <p className="text-sm text-slate-400">Experiências exclusivas no mar do Rio.</p>
              </div>
            </div>
            <div className="grid gap-2 text-sm text-slate-400 sm:grid-cols-2 lg:grid-cols-5">
              {['Experiências', 'Pacotes', 'Personalize', 'Sobre', 'Contato'].map((item) => (
                <FooterLink key={item} label={item} />
              ))}
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
