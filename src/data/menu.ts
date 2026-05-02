import type { CidadeType, ComboType } from "../types";

export const combosDisponiveis: ComboType[] = [
  {
    id: 1,
    nome: "COMBO PRIME 1 - 15 Mini esfihas + refri",
    preco: 21.99,
    unidades: 15,
    tipo: "prime",
    refri: "lata",
  },
  {
    id: 4,
    nome: "CLÁSSICO 20 - 20 Mini esfihas",
    preco: 25.5,
    unidades: 20,
    tipo: "classico",
  },
];

export const cidades: CidadeType[] = [
  { nome: "Cariús", frete: 3 },
  { nome: "Jucás", frete: 5 },
  { nome: "Retirada", frete: 0 },
];

export const saboresLista = [
  "Frango com mussarela",
  "Calabresa com mussarela",
  "Mussarela",
];

export const saboresRefri = {
  lata: ["Coca cola", "Fanta"],
  "1l": ["Guaraná 1L"],
};
