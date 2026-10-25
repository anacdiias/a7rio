// Fonte única de contato, produtos e imagens do site A7 Rio.
// Preços informados pela responsável em 24/10/2026. Sem descontos ou disponibilidade inventados.

export const WHATSAPP = "5521980803748";
export const INSTAGRAM_A7 = "https://www.instagram.com/a7riooficial/";

export function whatsappUrl(experience: string, price?: string) {
  const lines = [
    "Olá! Vim pelo site da A7 Rio e quero reservar:",
    `Experiência: ${experience}${price ? ` (${price})` : ""}`,
    "Origem: SITE",
    "Quais as próximas datas disponíveis?",
  ];
  return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(lines.join("\n"))}`;
}

export const GENERIC_EXPERIENCE = "Quero conhecer os passeios";

// Operadores: aparecem como crédito, nunca como destino do CTA.
export const operators = {
  edu: { name: "Edu Passeios", instagram: "https://www.instagram.com/edupasseios021/" },
  jet: { name: "Jet Ski no Rio", instagram: "https://www.instagram.com/jetskinorio/" },
} as const;

export type Img = { src: string; fallback: string; pos?: string };

// `src` são fotos reais do acervo (public/assets/real, fora do git até haver autorização de imagem).
// `fallback` é paisagem já versionada, usada se a foto real não existir (ex.: preview publicado).
export const img = {
  tijucas: { src: "/assets/tijucas.jpg", fallback: "/assets/hero-tijucas.jpg" },
  jetCapa: { src: "/assets/real/jet-ski-capa.jpg", fallback: "/assets/catalogo/costa-arco.jpg", pos: "50% 55%" },
  lancha: { src: "/assets/real/lancha-jet-capa.jpg", fallback: "/assets/catalogo/costa-mar.jpg", pos: "50% 70%" },
  jet15: { src: "/assets/real/jet-ski-120.jpg", fallback: "/assets/catalogo/costa-barra.jpg", pos: "50% 60%" },
  jet30: { src: "/assets/real/galeria-jet.jpg", fallback: "/assets/catalogo/costa-falesia.jpg", pos: "50% 70%" },
  jet60: { src: "/assets/real/jet-ski-60.jpg", fallback: "/assets/catalogo/agua-turquesa.jpg", pos: "50% 60%" },
  jet120: { src: "/assets/real/jet-ski-capa.jpg", fallback: "/assets/catalogo/ilhas-falesia.jpg", pos: "50% 55%" },
  jet180: { src: "/assets/real/galeria-mar.jpg", fallback: "/assets/hero-tijucas.jpg" },
} satisfies Record<string, Img>;

export type Product = {
  id: string;
  name: string;
  tag: string;
  promise: string;
  price: string;
  priceNote: string;
  duration: string;
  image: Img;
  operator: keyof typeof operators;
  perks: string[];
  featured?: boolean;
};

export const products: Product[] = [
  {
    id: "tijucas",
    name: "Ilhas Tijucas",
    tag: "Passeio de barco",
    promise: "Descubra um outro lado do Rio, visto do mar.",
    price: "R$ 150",
    priceNote: "por pessoa",
    duration: "4 horas",
    image: img.tijucas,
    operator: "edu",
    perks: ["Passeio de barco", "4 horas de experiência", "Datas sob consulta"],
  },
  {
    id: "lancha-jet",
    name: "Lancha + Jet Ski",
    tag: "Experiência em grupo",
    promise: "Quatro horas de mar, lancha e jet ski para viver com a sua turma.",
    price: "R$ 3.500",
    priceNote: "total para até 7 pessoas",
    duration: "4 horas",
    image: img.lancha,
    operator: "jet",
    perks: ["Até 7 pessoas", "Cooler com gelo, água e mate", "Frutas e jet ski, conforme regras do operador"],
    featured: true,
  },
  {
    id: "jet-30",
    name: "Jet Ski · 30 minutos",
    tag: "Adrenalina no mar",
    promise: "Sinta a velocidade e veja o Rio por outra perspectiva.",
    price: "R$ 500",
    priceNote: "por passeio",
    duration: "30 minutos",
    image: img.jetCapa,
    operator: "jet",
    perks: ["Quebra-Mar e Barra", "Joatinga e Ilhas Tijucas", "Disponibilidade sob consulta"],
  },
];

export const jetDurations = [
  { id: "jet-15", duration: "15 min", price: "R$ 300", route: "Canal da Barra, Quebra-Mar, Barra e Joatinga", image: img.jet15 },
  { id: "jet-30", duration: "30 min", price: "R$ 500", route: "Quebra-Mar, Joatinga, Barra e Ilhas Tijucas", image: img.jet30 },
  { id: "jet-60", duration: "1 hora", price: "R$ 900", route: "Canal da Barra, Quebra-Mar, Joatinga, Barra e Ilhas Tijucas", image: img.jet60 },
  { id: "jet-120", duration: "2 horas", price: "R$ 1.600", route: "Roteiro combinado no WhatsApp", image: img.jet120 },
  { id: "jet-180", duration: "3 horas", price: "R$ 2.000", route: "Roteiro combinado no WhatsApp", image: img.jet180 },
];

export const gallery: { name: string; image: Img; tag: string }[] = [
  { name: "Lancha e jet ski no mesmo rolê", image: img.lancha, tag: "LANCHA + JET" },
  { name: "Costões do Rio a mil por hora", image: img.jet60, tag: "JET SKI" },
  { name: "Mar azul, galera e diversão", image: img.jet180, tag: "EM GRUPO" },
  { name: "Aventura entre as pedras", image: img.jetCapa, tag: "ADRENALINA" },
  { name: "Ilhas Tijucas", image: img.tijucas, tag: "ILHAS" },
];
