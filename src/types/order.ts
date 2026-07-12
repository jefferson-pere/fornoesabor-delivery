export type OrderStatus =
  | "NOVO"
  | "PRODUCAO"
  | "ENTREGA"
  | "FINALIZADO"
  | "CANCELADO";

export type Endereco = {
  rua: string;

  numero: string;

  referencia?: string;
};

export type RefriExtra = {
  nome: string;

  tipo: "lata" | "1l";

  preco: number;

  qtd: number;
};

export type ItemPedido = {
  combo: {
    nome: string;

    preco: number;

    unidades: number;

    refri: string;
  };

  sabores: Record<string, number>;

  refri?: string;

  refriExtra?: RefriExtra[];

  maioneseQtd: number;

  observacaoItem?: string;
};

export type Pedido = {
  id: number;

  codigo: string;

  nomeCliente: string;

  telefone?: string;

  cidade: string;

  endereco?: Endereco;

  itens: ItemPedido[];

  pagamento: string;

  troco?: string;

  observacao?: string;

  total: number;

  status: OrderStatus;

  pago: boolean;

  createdAt: string;
};
