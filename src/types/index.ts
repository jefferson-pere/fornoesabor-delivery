export type ComboType = {
  id: number;
  nome: string;
  preco: number;
  unidades: number;
  tipo: "prime" | "classico";
  refri?: "lata" | "1l";
};

export type CidadeType = {
  nome: string;
  frete: number;
};

export type PedidoType = {
  nomeCliente: string;
  telefone: string;
  cidade: string;
  endereco?: string;
  combo: ComboType;
  sabores: string[];
  refri?: string | null;
  total: number;
};
