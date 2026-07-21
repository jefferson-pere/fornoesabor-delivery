export type RefriType = "lata" | "1l" | "none";

export type ComboType = {
  id: number;
  nome: string;
  preco: number;
  unidades: number;
  tipo: "classico";
  refri: RefriType;
  maioneseInclusa: boolean;
  nomeRef: string;
};

export type CidadeType = {
  nome: string;
  frete: number;
};

export const combosDisponiveis: ComboType[] = [
  {
    id: 20,
    nome: "CLÁSSICO 15 - 15 Mini Esfihas",
    preco: 24.9,
    unidades: 15,
    tipo: "classico",
    refri: "none",
    maioneseInclusa: false,
    nomeRef: "CLÁSSICO 15 UNIDADES",
  },

  {
    id: 21,
    nome: "CLÁSSICO 20 - 20 Mini Esfihas",
    preco: 29.9,
    unidades: 20,
    tipo: "classico",
    refri: "none",
    maioneseInclusa: false,
    nomeRef: "CLÁSSICO 20 UNIDADES",
  },

  {
    id: 22,
    nome: "CLÁSSICO 30 - 30 Mini Esfihas com Maionese caseira inclusa",
    preco: 41.9,
    unidades: 30,
    tipo: "classico",
    refri: "none",
    maioneseInclusa: true,
    nomeRef: "CLÁSSICO 30 UNIDADES",
  },
];

export const cidades: CidadeType[] = [
  {
    nome: "Cariús",
    frete: 3,
  },

  {
    nome: "Jucás",
    frete: 5,
  },

  {
    nome: "Retirada",
    frete: 0,
  },
];

export const saboresLista: string[] = [
  "Frango com catupiry",
  "Frango com mussarela",
  "Frango com bacon",
  "Calabresa com catupiry",
  "Calabresa com mussarela",
  "Carne moída",
  "Misto (presunto e mussarela)",
  "Mussarela",
  "Bacon com mussarela",
  "Chocolate",
];

export const saboresRefri: Record<"lata" | "1l", string[]> = {
  lata: ["Coca cola", "Coca cola Zero", "Fanta laranja", "Cajuína"],
  "1l": ["Guaraná", "Pepsi", "Sukita laranja", "Cajuína"],
};

const precoRefri1lEspecial: Record<string, number> = {
  Cajuína: 9,
};

export function getPrecoRefri(nome: string, tipo: "lata" | "1l"): number {
  if (tipo === "lata") return 5;
  return precoRefri1lEspecial[nome] ?? 8;
}
