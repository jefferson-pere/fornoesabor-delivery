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
    id: 1,
    nome: "CLÁSSICO 15 - 15 Mini esfihas",
    preco: 24.9,
    unidades: 15,
    tipo: "classico",
    refri: "none",
    maioneseInclusa: false,
    nomeRef: "CLÁSSICO 15 UNIDADES",
  },

  {
    id: 2,
    nome: "CLÁSSICO 20 - 20 Mini esfihas",
    preco: 29.9,
    unidades: 20,
    tipo: "classico",
    refri: "none",
    maioneseInclusa: false,
    nomeRef: "CLÁSSICO 20 UNIDADES",
  },

  {
    id: 3,
    nome: "CLÁSSICO 30 - 30 Mini esfihas com Maionese caseira inclusa",
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
  "Frango com mussarela",
  "Calabresa com mussarela",
  "Frango com catupiry",
  "Calabresa com catupiry",
  "Frango com bacon",
  "Bacon com mussarela",
  "Mussarela",
  "Mista",
  "Chocolate com granulado",
  "Carne moída",
];

export const saboresRefri: Record<"lata" | "1l", string[]> = {
  lata: ["Coca cola", "Coca cola Zero", "Fanta laranja", "Cajuína"],
  "1l": ["Guaraná", "Pepsi", "Sukita laranja"],
};
