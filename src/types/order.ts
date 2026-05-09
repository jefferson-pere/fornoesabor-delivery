export type OrderStatus =
  | "NOVO"
  | "PRODUCAO"
  | "ENTREGA"
  | "FINALIZADO"
  | "CANCELADO";

export type ItemPedido = {
  combo: {
    nome: string;
    preco: number;
    unidades: number;
    refri: string;
  };

  sabores: Record<string, number>;

  refri?: string;

  maioneseQtd: number;
};

export type Pedido = {
  id: number;

  codigo: string;

  nomeCliente: string;

  cidade: string;

  itens: ItemPedido[];

  pagamento: string;

  troco?: string;

  observacao?: string;

  total: number;

  status: OrderStatus;

  pago: boolean;

  createdAt: string;
};
