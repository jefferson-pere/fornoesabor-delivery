export type RefriType = "lata" | "1l" | "none";

export type ComboType = {
  id: number;
  nome: string;
  preco: number;
  unidades: number;
  tipo: "prime" | "classico";
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
    nome: "Combo PRIME 1 - 15 Mini esfihas com 1 refri lata",
    preco: 21.99,
    unidades: 15,
    tipo: "prime",
    refri: "lata",
    maioneseInclusa: false,
    nomeRef: "PRIME 1",
  },

  {
    id: 2,
    nome: "Combo PRIME 2 - 20 Mini esfihas com 1 refri lata",
    preco: 26.99,
    unidades: 20,
    tipo: "prime",
    refri: "lata",
    maioneseInclusa: false,
    nomeRef: "PRIME 2",
  },

  {
    id: 3,
    nome: "Combo PRIME 3 - 30 Mini esfihas com 1 refri 1L e Maionese caseira inclusa",
    preco: 39.99,
    unidades: 30,
    tipo: "prime",
    refri: "1l",
    maioneseInclusa: true,
    nomeRef: "PRIME 3",
  },

  {
    id: 4,
    nome: "CLÁSSICO 20 - 20 Mini esfihas",
    preco: 25.99,
    unidades: 20,
    tipo: "classico",
    refri: "none",
    maioneseInclusa: false,
    nomeRef: "CLÁSSICO 20",
  },

  {
    id: 5,
    nome: "CLÁSSICO 30 - 30 Mini esfihas",
    preco: 36.99,
    unidades: 30,
    tipo: "classico",
    refri: "none",
    maioneseInclusa: false,
    nomeRef: "CLÁSSICO 30",
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
