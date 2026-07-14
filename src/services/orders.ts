import type { OrderStatus, Pedido } from "../types/order";
import type { EnderecoType, FormaPagamentoType, ItemPedidoForm } from "../types/pedido";

const API_URL = import.meta.env.VITE_API_URL;

const API_KEY = import.meta.env.VITE_API_KEY;

export type NovoPedidoPayload = {
  nomeCliente: string;
  telefone: string;
  cidade: string;
  endereco: EnderecoType | null;
  itens: ItemPedidoForm[];
  pagamento: FormaPagamentoType;
  troco: string;
  observacao: string;
};

export async function criarPedido(dados: NovoPedidoPayload): Promise<void> {
  const res = await fetch(`${API_URL}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": API_KEY,
    },
    body: JSON.stringify(dados),
  });
  if (!res.ok) throw new Error("Erro ao enviar pedido para o servidor");
}

export async function getOrders(all?: boolean): Promise<Pedido[]> {
  const res = await fetch(`${API_URL}/orders${all ? "?all=true" : ""}`, {
    headers: { "x-api-key": API_KEY },
  });

  if (!res.ok) {
    throw new Error("Erro ao buscar pedidos");
  }

  return res.json() as Promise<Pedido[]>;
}

export async function updateOrderStatus(id: number, status: OrderStatus): Promise<Pedido> {
  const res = await fetch(`${API_URL}/orders/${id}/status`, {
    method: "PATCH",

    headers: {
      "Content-Type": "application/json",
      "x-api-key": API_KEY,
    },

    body: JSON.stringify({ status }),
  });

  return res.json() as Promise<Pedido>;
}

export async function updatePayment(id: number, pago: boolean): Promise<Pedido> {
  const res = await fetch(`${API_URL}/orders/${id}/payment`, {
    method: "PATCH",

    headers: {
      "Content-Type": "application/json",
      "x-api-key": API_KEY,
    },

    body: JSON.stringify({ pago }),
  });

  return res.json() as Promise<Pedido>;
}
export async function updateOrder(id: number, data: Partial<Pedido>) {
  const res = await fetch(`${API_URL}/orders/${id}`, {
    method: "PUT",

    headers: {
      "Content-Type": "application/json",

      "x-api-key": API_KEY,
    },

    body: JSON.stringify(data),
  });

  return res.json();
}

export async function deleteOrder(id: number) {
  await fetch(`${API_URL}/orders/${id}`, {
    method: "DELETE",

    headers: {
      "x-api-key": API_KEY,
    },
  });
}
