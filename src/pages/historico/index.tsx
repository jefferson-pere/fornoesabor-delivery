import { useEffect, useMemo, useState } from "react";

import { getOrders } from "../../services/orders";

import type { Pedido } from "../../types/order";

import { OrderModal } from "../../components/OrderModal";

import { Container } from "./style";

function getDataBrasilia(isoStr: string): string {
  if (!isoStr) return "";
  const utc = new Date(isoStr);
  const brasilia = new Date(utc.getTime() - 3 * 60 * 60 * 1000);
  const y = brasilia.getUTCFullYear();
  const m = String(brasilia.getUTCMonth() + 1).padStart(2, "0");
  const d = String(brasilia.getUTCDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function Historico() {
  const [orders, setOrders] = useState<Pedido[]>([]);

  const [selectedOrder, setSelectedOrder] = useState<Pedido | null>(null);

  const [search, setSearch] = useState("");

  const [date, setDate] = useState(() => {
    const now = new Date();

    const year = now.getFullYear();

    const month = String(now.getMonth() + 1).padStart(2, "0");

    const day = String(now.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  });

  // 🔥 carregar histórico
  useEffect(() => {
    async function load() {
      try {
        const data = await getOrders(true);

        setOrders(data);
      } catch (err) {
        console.error(err);
      }
    }

    load();
  }, []);

  // 🔥 filtro
  const filtered = useMemo(() => {
    return orders
      .filter((order) => {
        const created = getDataBrasilia(order.createdAt);

        const matchDate = !date || created === date;

        const matchSearch =
          order.nomeCliente.toLowerCase().includes(search.toLowerCase()) ||
          order.codigo.toLowerCase().includes(search.toLowerCase());

        return matchDate && matchSearch;
      })
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
  }, [orders, date, search]);

  // 🔥 estatísticas
  // const stats = useMemo(() => {
  //   const total = filtered.reduce((acc, order) => acc + order.total, 0);

  //   const pagos = filtered.filter((o) => o.pago).length;

  //   const pendentes = filtered.filter((o) => !o.pago).length;

  //   return {
  //     total,

  //     pedidos: filtered.length,

  //     pagos,

  //     pendentes,
  //   };
  // }, [filtered]);

  return (
    <Container>
      {/* TOPO */}
      <div className="topo">
        <div>
          <h1>📋 Histórico</h1>

          <p>Todos os pedidos já realizados</p>
        </div>
      </div>

      {/* FILTROS */}
      <div className="filters">
        <input
          placeholder="Buscar cliente ou pedido"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>

      {/* MÉTRICAS */}
      {/* <div className="stats">
        <div className="card">
          <span>Pedidos</span>

          <strong>{stats.pedidos}</strong>
        </div>

        <div className="card">
          <span>Total</span>

          <strong>R$ {stats.total.toFixed(2)}</strong>
        </div>

        <div className="card">
          <span>Pagos</span>

          <strong>{stats.pagos}</strong>
        </div>

        <div className="card">
          <span>Pendentes</span>

          <strong>{stats.pendentes}</strong>
        </div>
      </div> */}

      {/* LISTA */}
      <div className="list">
        {filtered.length === 0 ? (
          <div className="empty">Nenhum pedido encontrado</div>
        ) : (
          filtered.map((order) => (
            <div key={order.id} className="order">
              <div className="header">
                <div>
                  <strong>{order.codigo}</strong>

                  <span>{order.nomeCliente}</span>
                </div>

                <div className={order.pago ? "paid" : "pending"}>
                  {order.pago ? "✅ Pago" : "❌ Pendente"}
                </div>
              </div>

              <div className="info">
                <span>💳 {order.pagamento}</span>

                <span>💰 R$ {order.total.toFixed(2)}</span>
              </div>

              <div className="time">
                🕒 {new Date(order.createdAt).toLocaleString("pt-BR")}
              </div>

              <button onClick={() => setSelectedOrder(order)}>
                Ver detalhes
              </button>
            </div>
          ))
        )}
      </div>

      {/* MODAL */}
      <OrderModal
        order={selectedOrder}
        onClose={() => setSelectedOrder(null)}
      />
    </Container>
  );
}
