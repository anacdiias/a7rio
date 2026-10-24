"use client";

import { useMemo, useState } from "react";
import {
  ArrowRight,
  CalendarDays,
  Check,
  ChevronDown,
  Compass,
  Menu,
  MessageCircle,
  Play,
  Waves,
  X,
} from "lucide-react";

/*
 * A7 RIO • CATÁLOGO VISUAL V2
 * Produtos, durações e preços: dados informados pela responsável em 24/10/2026.
 * Sem descontos, depoimentos, lotação, segurança garantida ou disponibilidade inventados.
 * Imagens versionadas: somente paisagens reais, sem pessoas identificáveis (repositório público).
 * Fotos com pessoas só entram após autorização de imagem documentada (ver docs/MIDIAS_EM_REVISAO.md).
 */

const partners = {
  edu: {
    name: "Edu Passeios",
    instagram: "https://www.instagram.com/edupasseios021/",
    phone: "5521986046456",
    ref: "A7RIO-EDU",
  },
  jet: {
    name: "Jet Ski no Rio",
    instagram: "https://www.instagram.com/jetskinorio/",
    phone: "5521972040971",
    ref: "A7RIO-JET",
  },
} as const;

type PartnerKey = keyof typeof partners;

type Product = {
  id: string;
  name: string;
  eyebrow: string;
  promise: string;
  price: string;
  priceContext: string;
  duration: string;
  image: string;
  alt: string;
  partner: PartnerKey;
  benefits: string[];
  accent: string;
  label?: string;
};

const products: Product[] = [
  {
    id: "tijucas-4h",
    name: "Ilhas Tijucas",
    eyebrow: "PASSEIO DE BARCO",
    promise: "Descubra um outro lado do Rio, visto do mar.",
    price: "R$ 150",
    priceContext: "por pessoa",
    duration: "4 horas",
    image: "/assets/catalogo/ilhas-detalhe.jpg",
    alt: "Vista aérea de uma das Ilhas Tijucas, com barcos ao fundo",
    partner: "edu",
    benefits: ["Passeio de barco", "Experiência de 4 horas", "Datas sob consulta"],
    accent: "from-sky-500/20",
    label: "Para conhecer o Rio pelo mar",
  },
  {
    id: "jet-30min",
    name: "Jet Ski · 30 minutos",
    eyebrow: "AVENTURA NO MAR",
    promise: "Sinta a adrenalina e veja paisagens do Rio por outra perspectiva.",
    price: "R$ 500",
    priceContext: "por passeio",
    duration: "30 minutos",
    image: "/assets/catalogo/costa-arco.jpg",
    alt: "Costão de pedra do litoral do Rio de Janeiro, ao nível do mar",
    partner: "jet",
    benefits: ["Quebra-Mar e Barra", "Joatinga e Ilhas Tijucas no roteiro informado", "Disponibilidade sob consulta"],
    accent: "from-cyan-400/20",
    label: "Para quem quer adrenalina",
  },
  {
    id: "lancha-jet-4h",
    name: "Lancha + Jet Ski",
    eyebrow: "EXPERIÊNCIA EM GRUPO",
    promise: "Quatro horas de mar, lancha e jet ski para viver com sua turma.",
    price: "R$ 3.500",
    priceContext: "valor total para até 7 pessoas",
    duration: "4 horas",
    image: "/assets/catalogo/costa-mar.jpg",
    alt: "Mar azul e pedras do litoral do Rio de Janeiro",
    partner: "jet",
    benefits: ["Até 7 pessoas", "Cooler com gelo, água e mate", "Frutas e jet ski incluídos, conforme regras do operador"],
    accent: "from-blue-500/20",
    label: "Para viver com a galera",
  },
];

const jetDurations = [
  {id:"jet-15min", duration:"15 min", price:"R$ 300", route:"Canal da Barra, Quebra-Mar, Barra e Joatinga", image:"/assets/catalogo/costa-barra.jpg"},
  {id:"jet-30min", duration:"30 min", price:"R$ 500", route:"Quebra-Mar, Joatinga, Barra e Ilhas Tijucas", image:"/assets/catalogo/costa-falesia.jpg"},
  {id:"jet-60min", duration:"1 hora", price:"R$ 900", route:"Canal da Barra, Quebra-Mar, Joatinga, Barra e Ilhas Tijucas", image:"/assets/catalogo/agua-turquesa.jpg"},
  {id:"jet-120min", duration:"2 horas", price:"R$ 1.600", route:"Roteiro sob consulta ao parceiro", image:"/assets/catalogo/ilhas-falesia.jpg"},
  {id:"jet-180min", duration:"3 horas", price:"R$ 2.000", route:"Roteiro sob consulta ao parceiro", image:"/assets/hero-tijucas.jpg"},
];

const gallery = [
  {name:"O mar das Ilhas Tijucas", image:"/assets/hero-tijucas.jpg", tag:"ILHAS"},
  {name:"O azul do mar do Rio", image:"/assets/catalogo/costa-mar.jpg", tag:"RIO PELO MAR"},
  {name:"Costões e vegetação", image:"/assets/catalogo/costa-falesia.jpg", tag:"LITORAL"},
];

function WhatsAppIcon({className="h-4 w-4"}:{className?:string}) {
  return <MessageCircle className={className} aria-hidden="true" />;
}
function InstagramMark({className="h-5 w-5"}:{className?:string}) {
  return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>;
}

function bookingUrl(partner:PartnerKey, name:string, code:string, fromTracking:boolean) {
  const p = typeof window!=="undefined" && fromTracking ? new URLSearchParams(window.location.search) : new URLSearchParams();
  const clean = (s:string) => s.replace(/[^\p{L}\p{N}_-]/gu,"").slice(0,48);
  const source = clean(p.get("utm_source") || "SITE");
  const campaign = clean(p.get("utm_campaign") || "ORGANICO");
  const content = clean(p.get("utm_content") || "CATALOGO");
  const message = [
    "Olá! Vi essa experiência na A7 Rio e gostaria de consultar disponibilidade.",
    `Experiência: ${name}`,
    `Indicação: ${partners[partner].ref}`,
    `Código: ${code}`,
    `Origem: ${source}`,
    `Campanha: ${campaign}`,
    `Conteúdo: ${content}`,
    "Quais as próximas datas e condições para reservar?",
  ].join("\n");
  return `https://wa.me/${partners[partner].phone}?text=${encodeURIComponent(message)}`;
}

function BookingLink({partner,name,code,children,subtle=false,className=""}:{partner:PartnerKey,name:string,code:string,children:React.ReactNode,subtle?:boolean,className?:string}) {
  return <a href={bookingUrl(partner,name,code,false)} onClick={e=>{e.currentTarget.href=bookingUrl(partner,name,code,true)}} target="_blank" rel="noopener noreferrer" aria-label={`Consultar ${name} no WhatsApp de ${partners[partner].name}`}
    className={`${subtle?"border border-white/20 bg-white/10 text-white hover:bg-white/20":"bg-[#1879f5] text-white shadow-[0_12px_36px_rgba(24,121,245,.18)] hover:bg-[#388fff]"} inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-5 py-3 text-center text-sm font-bold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${className}`}>
    <WhatsAppIcon />{children}<ArrowRight className="h-4 w-4" aria-hidden="true"/>
  </a>;
}

function Photo({src,alt,className=""}:{src:string,alt:string,className?:string}) {
  const [broken,setBroken]=useState(false);
  return <div className={`relative overflow-hidden bg-[linear-gradient(145deg,#1b607f,#09283b_50%,#071321)] ${className}`}>
    {!broken&& <img src={src} alt={alt} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" onError={()=>setBroken(true)}/>}
    {broken && <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-4 text-center text-white/50"><Waves className="h-10 w-10"/><span className="text-xs">Imagem real em seleção</span></div>}
  </div>;
}

function ProductCard({product}:{product:Product}){
  return <article className="group flex h-full flex-col overflow-hidden rounded-[28px] border border-white/10 bg-[#0d1b30] shadow-[0_25px_60px_rgba(0,0,0,.18)]">
    <div className="relative">
      <Photo src={product.image} alt={product.alt} className="aspect-[5/4] w-full"/>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#081523]/55 via-transparent to-transparent"/>
      <div className="absolute left-4 top-4 rounded-full border border-white/20 bg-[#071523]/80 px-3 py-1.5 text-[11px] font-bold tracking-wide text-white backdrop-blur">{product.duration}</div>
      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-2"><span className="rounded-full bg-white px-3 py-1.5 text-[11px] font-bold text-[#0b2440]">{product.label}</span></div>
    </div>
    <div className="flex flex-1 flex-col p-6 md:p-7">
      <div className="mb-4 space-y-2">
        <p className="text-[10px] font-bold tracking-[.22em] text-[#74c6fc]">{product.eyebrow}</p>
        <h3 className="text-[26px] font-bold leading-tight tracking-tight text-white">{product.name}</h3>
        <p className="min-h-[58px] text-sm leading-6 text-[#b6c9dc]">{product.promise}</p>
      </div>
      <div className="my-2 flex items-baseline gap-3 border-y border-white/10 py-5">
        <div><p className="mb-1 text-xs text-[#9db4cb]">Investimento na experiência</p><p className="text-[35px] font-extrabold leading-none tracking-tight text-white">{product.price}</p><p className="mt-2 text-xs text-[#bdcfe0]">{product.priceContext}</p></div>
      </div>
      <ul className="my-5 flex-1 space-y-2.5">{product.benefits.map(b=><li key={b} className="flex gap-2 text-xs leading-5 text-[#d5e2f0]"><Check className="mt-0.5 h-4 w-4 shrink-0 text-[#82d5ff]"/>{b}</li>)}</ul>
      <BookingLink partner={product.partner} name={product.name} code={product.id} className="w-full">Quero viver essa experiência</BookingLink>
      <p className="mt-3 text-center text-[11px] text-[#91a9bf]">Reserva e confirmação com {partners[product.partner].name}</p>
    </div>
  </article>;
}

const FAQs=[
  {q:"Como funciona a reserva?", a:"Você escolhe sua experiência, abre o WhatsApp do operador parceiro e consulta as datas. O parceiro confirma disponibilidade, regras e pagamento."},
  {q:"Os valores são por pessoa?", a:"Ilhas Tijucas custa R$ 150 por pessoa. Lancha + Jet Ski custa R$ 3.500 pelo grupo de até 7 pessoas. Os preços de Jet Ski são por passeio, de acordo com a duração informada."},
  {q:"Como sei o que está incluído?", a:"Confira os itens de cada card. Equipamentos, condições de operação, restrições, lotação por jet ski e serviços adicionais devem ser confirmados diretamente com o parceiro antes do pagamento."},
  {q:"Posso escolher a data do passeio?", a:"Você pode consultar a data desejada, mas a confirmação depende da agenda do parceiro e das condições climáticas e de navegação."},
];

export default function Home(){
  const [menuOpen,setMenuOpen]=useState(false);
  const [faqOpen,setFaqOpen]=useState<number|null>(null);
  const [filter,setFilter]=useState<"todos"|"leve"|"adrenalina"|"grupo">("todos");
  const visibleProducts=useMemo(()=>products.filter(x=>filter==="todos"||x.id===(filter==="leve"?"tijucas-4h":filter==="adrenalina"?"jet-30min":"lancha-jet-4h")),[filter]);
  return <div className="min-h-screen bg-[#07111f] font-sans text-white antialiased">
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#071321]/95 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-[1280px] items-center justify-between gap-4 px-5 md:px-8">
        <a href="#inicio" aria-label="A7 Rio, início"><img src="/assets/logo-azul.png" alt="A7 Rio" className="h-14 w-auto max-w-[142px] object-contain mix-blend-screen"/></a>
        <nav className="hidden items-center gap-7 text-sm font-medium text-slate-200 lg:flex"><a className="hover:text-white" href="#experiencias">Experiências</a><a className="hover:text-white" href="#jetski">Jet Ski</a><a className="hover:text-white" href="#galeria">Galeria</a><a className="hover:text-white" href="#duvidas">Dúvidas</a></nav>
        <a href="#experiencias" className="hidden rounded-full bg-[#1879f5] px-5 py-3 text-sm font-bold hover:bg-[#358cff] sm:inline-flex">Escolher experiência <ArrowRight className="ml-2 h-4 w-4"/></a>
        <button className="rounded-lg p-3 lg:hidden" onClick={()=>setMenuOpen(!menuOpen)} aria-label="Abrir menu" aria-expanded={menuOpen}>{menuOpen?<X/>:<Menu/>}</button>
      </div>
      {menuOpen&&<nav className="flex flex-col gap-4 border-t border-white/10 bg-[#071321] px-6 py-5 text-sm lg:hidden">{[["#experiencias","Experiências"],["#jetski","Jet Ski"],["#galeria","Galeria"],["#duvidas","Dúvidas"]].map(([href,title])=><a key={href} href={href} onClick={()=>setMenuOpen(false)}>{title}</a>)}</nav>}
    </header>

    <main id="inicio" className="pb-14 md:pb-0">
      <section className="relative isolate flex min-h-[650px] items-center overflow-hidden md:min-h-[730px]">
        <div className="absolute inset-0 -z-10"><img src="/assets/hero-tijucas.jpg" alt="" aria-hidden="true" fetchPriority="high" className="hero-kenburns h-full w-full object-cover"/><div className="absolute inset-0 bg-gradient-to-r from-[#03101a]/95 via-[#03101a]/75 to-[#03101a]/30"/><div className="absolute inset-0 bg-gradient-to-t from-[#07111f] via-transparent to-transparent"/></div>
        <div className="mx-auto w-full max-w-[1280px] px-5 py-24 md:px-8">
          <div className="max-w-[650px] space-y-8">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-xs font-semibold tracking-[.18em] text-[#b9e4ff] backdrop-blur">RIO DE JANEIRO · PELO MAR</span>
            <div className="space-y-5"><h1 className="text-[clamp(44px,6.4vw,84px)] font-extrabold leading-[1.02] tracking-[-.05em]">O Rio que você conhece.<br/><span className="text-[#7dcdff]">E o que falta viver.</span></h1><p className="max-w-lg text-base leading-8 text-[#dfebf5] md:text-lg">Ilhas, passeios de barco, jet ski e momentos que saem da tela e viram histórias pra contar.</p></div>
            <div className="flex flex-col gap-3 sm:flex-row"><a href="#experiencias" className="inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-[#1879f5] px-7 text-base font-bold shadow-lg hover:bg-[#388fff]">Descobrir passeios e valores <ArrowRight className="h-5 w-5"/></a><a href="#galeria" className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 text-sm font-semibold backdrop-blur hover:bg-white/20"><Play className="h-4 w-4"/> Ver experiências</a></div>
            <div className="flex flex-wrap gap-5 pt-2 text-xs font-medium text-[#e2edf6]"><span className="flex items-center gap-2"><Waves className="h-4 w-4 text-[#82d5ff]"/> Rio pelo mar</span><span className="flex items-center gap-2"><CalendarDays className="h-4 w-4 text-[#82d5ff]"/> Datas sob consulta</span><span className="flex items-center gap-2"><MessageCircle className="h-4 w-4 text-[#82d5ff]"/> Reserva com parceiros</span></div>
          </div>
        </div>
      </section>

      <section className="relative z-10 mx-auto max-w-[1280px] px-5 pb-24 pt-8 md:px-8 md:pt-12">
        <div className="mb-9 flex flex-col justify-between gap-5 md:flex-row md:items-end"><div className="max-w-2xl space-y-3"><p className="text-xs font-bold tracking-[.25em] text-[#7bc9ff]">ESCOLHA SEU PRÓXIMO MOMENTO</p><h2 className="text-3xl font-extrabold tracking-tight md:text-5xl">Qual Rio você quer viver?</h2><p className="text-sm leading-7 text-[#b0c4d8] md:text-base">Tem dias de explorar, dias de acelerar e dias de celebrar. Descubra o seu.</p></div><a href="#jetski" className="inline-flex items-center gap-2 text-sm font-semibold text-[#82d5ff] hover:text-white">Ver todos os tempos de Jet Ski <ArrowRight className="h-4 w-4"/></a></div>
        <div className="mb-7 flex flex-wrap gap-2" role="group" aria-label="Filtrar experiências">
          {[{k:"todos",t:"Todas as experiências"},{k:"leve",t:"Explorar as ilhas"},{k:"adrenalina",t:"Viver a adrenalina"},{k:"grupo",t:"Curtição em grupo"}].map(x=><button key={x.k} type="button" onClick={()=>setFilter(x.k as typeof filter)} className={`rounded-full px-4 py-2.5 text-xs font-semibold transition ${filter===x.k?"bg-white text-[#10203a]":"border border-white/20 text-[#c9d9e7] hover:bg-white/10"}`}>{x.t}</button>)}
        </div>
        <div id="experiencias" className={`grid scroll-mt-24 gap-5 ${filter==="todos"?"lg:grid-cols-3":"max-w-[530px]"}`}>{visibleProducts.map((p)=><ProductCard product={p} key={p.id}/>)}</div>
        <p className="mt-5 text-center text-xs leading-6 text-[#8da4ba]">Valores informados pelos operadores. Datas, rotas e condições estão sujeitas à confirmação no momento da reserva.</p>
      </section>

      <section id="jetski" className="scroll-mt-24 border-y border-white/10 bg-[#0b1b2e] py-24">
        <div className="mx-auto max-w-[1280px] px-5 md:px-8">
          <div className="mb-10 max-w-2xl space-y-4"><p className="text-xs font-bold tracking-[.25em] text-[#7bc9ff]">ADRENALINA NO MAR</p><h2 className="text-3xl font-extrabold tracking-tight md:text-5xl">Quanto tempo de aventura combina com você?</h2><p className="text-sm leading-7 text-[#b8c9d9]">Escolha a duração do seu jet ski. Confira a experiência, veja o valor e consulte a próxima data disponível com o operador.</p></div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {jetDurations.map((jet)=><article className="group flex flex-col overflow-hidden rounded-[24px] border border-white/10 bg-[#10233a]" key={jet.id}>
              <div className="relative"><Photo src={jet.image} alt={`Paisagem do litoral do Rio para ilustrar a opção de jet ski de ${jet.duration}`} className="aspect-[4/3] w-full"/><div className="absolute left-3 top-3 rounded-full bg-[#061527]/85 px-3 py-1.5 text-xs font-bold">{jet.duration}</div></div>
              <div className="flex flex-1 flex-col gap-3 px-4 pb-5 pt-5"><div><p className="mb-1 text-xs text-[#a8bbcc]">Valor do passeio</p><h3 className="text-3xl font-extrabold tracking-tight">{jet.price}</h3></div><p className="flex-1 text-xs leading-5 text-[#b6c6d7]">{jet.route}</p><BookingLink partner="jet" name={`Jet Ski - ${jet.duration}`} code={jet.id} className="mt-2 w-full !px-2 !text-xs">Consultar datas</BookingLink></div>
            </article>)}
          </div>
          <p className="mt-6 text-xs leading-6 text-[#8fa7bd]">Roteiros, tempo efetivo de operação, participantes, restrições e disponibilidade devem ser confirmados com Jet Ski no Rio. Wakeboard é opcional e depende de confirmação. Descontos não incluídos.</p>
        </div>
      </section>

      <section id="galeria" className="mx-auto max-w-[1280px] scroll-mt-24 px-5 py-24 md:px-8">
        <div className="mb-9 max-w-2xl space-y-4"><p className="text-xs font-bold tracking-[.25em] text-[#7bc9ff]">UM POUCO DO QUE TE ESPERA</p><h2 className="text-3xl font-extrabold tracking-tight md:text-5xl">Tem coisas que a gente precisa viver, não só ver.</h2><p className="text-sm leading-7 text-[#b8c9d9]">Imagens das experiências e paisagens dos nossos parceiros. Escolha o seu próximo momento.</p></div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{gallery.map((g,i)=><figure key={g.name} className={`group relative overflow-hidden rounded-[25px] ${i===0?"lg:col-span-2":""}`}><Photo src={g.image} alt={g.name} className="aspect-[4/5] w-full lg:aspect-[3/4]"/><div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"/><figcaption className="absolute bottom-5 left-5 right-5"><span className="mb-1 block text-[10px] font-bold tracking-[.2em] text-[#83d2ff]">{g.tag}</span><strong className="text-lg">{g.name}</strong></figcaption></figure>)}</div>
      </section>

      <section className="bg-[#0c2035] py-20">
        <div className="mx-auto grid max-w-[1280px] gap-10 px-5 md:px-8 lg:grid-cols-[1.05fr_.95fr] lg:items-center">
          <div className="space-y-5"><p className="text-xs font-bold tracking-[.25em] text-[#7bc9ff]">NÃO É SÓ UM PASSEIO</p><h2 className="max-w-xl text-3xl font-extrabold tracking-tight md:text-5xl">A próxima lembrança boa pode começar aqui.</h2><p className="max-w-xl text-sm leading-7 text-[#bacbda]">Escolha como você quer aproveitar o Rio. A A7 Rio te apresenta as opções e encaminha sua consulta diretamente para quem realiza a experiência.</p><a href="#experiencias" className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-extrabold text-[#0a2035] transition hover:bg-[#d6f0ff]">Encontrar minha experiência <ArrowRight className="h-4 w-4"/></a></div>
          <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
            {[{i:<Compass className="h-5 w-5"/>,h:"Escolha a experiência",t:"Compare durações, valores e o que está incluído."},{i:<MessageCircle className="h-5 w-5"/>,h:"Converse com o operador",t:"Cada botão abre o WhatsApp do parceiro com identificação A7 Rio."},{i:<Check className="h-5 w-5"/>,h:"Confirme os detalhes",t:"Datas, pagamento e orientações são informados pelo parceiro."}].map(x=><div key={x.h} className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-5"><span className="rounded-xl bg-[#1879f5]/20 p-3 text-[#7dcaff]">{x.i}</span><div><h3 className="font-bold">{x.h}</h3><p className="mt-1 text-xs leading-6 text-[#b6c9da]">{x.t}</p></div></div>)}
          </div>
        </div>
      </section>

      <section id="duvidas" className="mx-auto grid max-w-[1280px] scroll-mt-24 gap-10 px-5 py-24 md:px-8 lg:grid-cols-[.75fr_1.25fr]">
        <div className="space-y-4"><p className="text-xs font-bold tracking-[.25em] text-[#7bc9ff]">ANTES DE IR</p><h2 className="text-3xl font-extrabold md:text-4xl">Dúvidas antes de reservar?</h2><p className="text-sm leading-7 text-[#b4c7d7]">As informações essenciais para escolher com mais clareza.</p></div>
        <div className="space-y-3">{FAQs.map((faq,i)=><div key={faq.q} className="overflow-hidden rounded-2xl border border-white/10 bg-[#0d2035]"><button type="button" className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left text-sm font-bold" onClick={()=>setFaqOpen(faqOpen===i?null:i)} aria-expanded={faqOpen===i}><span>{faq.q}</span><ChevronDown className={`h-5 w-5 shrink-0 transition ${faqOpen===i?"rotate-180":""}`}/></button>{faqOpen===i&&<p className="px-5 pb-5 text-sm leading-7 text-[#bed0df]">{faq.a}</p>}</div>)}</div>
      </section>

      <section className="border-t border-white/10 bg-[#0b1b2d] py-14"><div className="mx-auto max-w-[1280px] px-5 md:px-8"><div className="mb-5 flex flex-wrap items-end justify-between gap-4"><div><p className="text-xs font-bold tracking-[.25em] text-[#7bc9ff]">QUEM REALIZA</p><h2 className="mt-2 text-2xl font-extrabold">Operadores parceiros</h2></div><p className="max-w-md text-xs leading-6 text-[#b4c7d8]">Divulgamos experiências de operadores independentes. Reservas e pagamentos são confirmados diretamente com eles.</p></div><div className="grid gap-4 md:grid-cols-2">{Object.entries(partners).map(([id,p])=><a key={id} href={p.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-5 py-5 text-sm font-semibold hover:bg-white/10"><span className="flex items-center gap-3"><InstagramMark />{p.name}</span><ArrowRight className="h-4 w-4"/></a>)}</div></div></section>
    </main>

    <footer className="border-t border-white/10 bg-[#06101b] px-5 pb-20 pt-9 text-[#aebfd0] md:pb-9"><div className="mx-auto flex max-w-[1280px] flex-col justify-between gap-5 md:flex-row md:items-start"><div><img src="/assets/logo-azul.png" alt="A7 Rio" className="h-11 w-auto max-w-32 object-contain mix-blend-screen"/><p className="mt-2 max-w-xl text-xs leading-6">A A7 Rio divulga e indica experiências de parceiros locais. Preços e disponibilidades sujeitos à confirmação, assim como os termos de contratação, que são tratados pelo operador.</p></div><a href="https://www.instagram.com/a7riooficial/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-bold text-[#7dcaff]"><InstagramMark/> @a7riooficial</a></div></footer>
    <a href="#experiencias" className="fixed bottom-0 left-0 right-0 z-40 flex min-h-14 items-center justify-center gap-2 border-t border-white/10 bg-[#1879f5] px-4 text-sm font-bold text-white shadow-2xl md:hidden">Ver passeios e valores <ArrowRight className="h-4 w-4"/></a>
  </div>;
}
