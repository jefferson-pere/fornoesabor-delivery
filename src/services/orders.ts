import { supabase } from "../lib/supabase";
import type { OrderStatus, Pedido } from "../types/order";
import type { EnderecoType, FormaPagamentoType, ItemPedidoForm } from "../types/pedido";

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

function calcularSubtotal(itens: { combo: { preco: number }; maioneseQtd: number; refriExtra?: { preco: number; qtd: number }[] }[]): number {
  let subtotal = 0;
  for (const item of itens) {
    subtotal += Number(item?.combo?.preco) || 0;
    subtotal += (Number(item?.maioneseQtd) || 0) * 0.99;
    subtotal += (item.refriExtra || []).reduce((acc, r) => acc + r.preco * r.qtd, 0);
  }
  return Number(subtotal.toFixed(2));
}

function calcularFreteTaxa(cidade: string, pagamento: string): number {
  const frete = cidade === "Cariús" ? 3 : cidade === "Jucás" ? 5 : 0;
  const taxa = pagamento === "cartao" ? 1 : 0;
  return frete + taxa;
}

function startOfBRTDay(): string {
  const now = new Date();
  const brt = new Date(now.getTime() - 3 * 60 * 60 * 1000);
  brt.setUTCHours(0, 0, 0, 0);
  return new Date(brt.getTime() + 3 * 60 * 60 * 1000).toISOString();
}

export async function criarPedido(dados: NovoPedidoPayload): Promise<void> {
  const subtotal = calcularSubtotal(dados.itens);
  const total = Number((subtotal + calcularFreteTaxa(dados.cidade, dados.pagamento)).toFixed(2));

  const { error } = await supabase.from("orders").insert({
    nomeCliente: dados.nomeCliente,
    telefone: dados.telefone || "",
    cidade: dados.cidade,
    endereco: dados.endereco ?? {},
    itens: dados.itens,
    pagamento: dados.pagamento,
    troco: dados.troco || "",
    observacao: dados.observacao || "",
    subtotal,
    total,
  });

  if (error) {
    if (error.message?.includes("CARDAPIO_DESATUALIZADO")) throw new Error("CARDAPIO_DESATUALIZADO");
    throw new Error(error.message);
  }
}

export async function getOrders(all?: boolean): Promise<Pedido[]> {
  let query = supabase
    .from("orders")
    .select("*")
    .eq("deleted", false)
    .order("id", { ascending: false })
    .limit(500);

  if (!all) {
    query = query.gte("createdAt", startOfBRTDay());
  }

  const { data, error } = await query;
  if (error) throw new Error(error.message);
  return (data ?? []) as Pedido[];
}

export async function updateOrderStatus(id: number, status: OrderStatus): Promise<Pedido> {
  const { data, error } = await supabase
    .from("orders")
    .update({ status })
    .eq("id", id)
    .select()
    .single();
  if (error) throw new Error(error.message);
  return data as Pedido;
}

export async function updatePayment(id: number, pago: boolean): Promise<Pedido> {
  const { data, error } = await supabase
    .from("orders")
    .update({ pago })
    .eq("id", id)
    .select()
    .single();
  if (error) throw new Error(error.message);
  return data as Pedido;
}

export async function updateOrder(id: number, data: Partial<Pedido>): Promise<Pedido> {
  const subtotal = calcularSubtotal((data.itens as any) || []);
  const total = Number((subtotal + calcularFreteTaxa(data.cidade || "", data.pagamento || "")).toFixed(2));

  const { data: updated, error } = await supabase
    .from("orders")
    .update({
      nomeCliente: data.nomeCliente,
      telefone: data.telefone || "",
      cidade: data.cidade,
      endereco: data.endereco ?? {},
      itens: data.itens,
      pagamento: data.pagamento,
      troco: data.troco || "",
      observacao: data.observacao || "",
      subtotal,
      total,
      status: data.status || "NOVO",
      pago: data.pago ?? false,
    })
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return updated as Pedido;
}

export async function deleteOrder(id: number): Promise<void> {
  const { error } = await supabase
    .from("orders")
    .update({ deleted: true })
    .eq("id", id);
  if (error) throw new Error(error.message);
}
