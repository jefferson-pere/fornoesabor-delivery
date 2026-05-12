import { startTransition, useEffect, useRef, useState } from "react";

import {
  getOrders,
  updateOrderStatus,
  updatePayment,
} from "../../services/orders";

import { socket } from "../../services/socket";

import type { Pedido, OrderStatus } from "../../types/order";

import { KanbanColumn } from "../../components/KanbanColumn";

import { DashboardMetrics } from "../../components/DashboardMetrics";

import { StoreStatus } from "../../components/StoreStatus";

import { OrderModal } from "../../components/OrderModal";

import { Container } from "./style";
import { useLocation, useNavigate } from "react-router-dom";

export function Painel() {
  const navigate = useNavigate();
  const location = useLocation();
  const [orders, setOrders] = useState<Pedido[]>([]);

  const [selectedOrder, setSelectedOrder] = useState<Pedido | null>(null);
  const reopened = useRef(false);

  const [hideFinished, setHideFinished] = useState(true);
  const [authorized, setAuthorized] = useState(() => {
    const saved = localStorage.getItem("painel-auth");

    if (!saved) {
      return false;
    }

    const parsed = JSON.parse(saved);

    const now = Date.now();

    // 12 horas
    const TWELVE_HOURS = 1000 * 60 * 60 * 12;

    if (now - parsed.time > TWELVE_HOURS) {
      localStorage.removeItem("painel-auth");

      return false;
    }

    return true;
  });
  // 🔥 carregar pedidos
  useEffect(() => {
    async function init() {
      try {
        const data = await getOrders();

        setOrders(data);
      } catch (err) {
        console.error("Erro pedidos:", err);
      }
    }

    init();

    // 🔥 novo pedido
    socket.on("novo-pedido", (pedido: Pedido) => {
      setOrders((prev) => [pedido, ...prev]);
    });

    // 🔥 atualização realtime
    socket.on("pedido-atualizado", (pedido: Pedido) => {
      setOrders((prev) => prev.map((o) => (o.id === pedido.id ? pedido : o)));
    });

    // 🔥 remoção realtime
    socket.on("pedido-removido", (id: number) => {
      setOrders((prev) => prev.filter((o) => o.id !== id));
    });

    return () => {
      socket.off("novo-pedido");

      socket.off("pedido-atualizado");

      socket.off("pedido-removido");
    };
  }, []);
  useEffect(() => {
    if (reopened.current) return;

    const reopenId = (
      location.state as {
        reopenOrder?: number;
      }
    )?.reopenOrder;

    if (!reopenId) return;

    const pedido = orders.find((o) => o.id === reopenId);

    if (!pedido) return;

    reopened.current = true;

    startTransition(() => {
      setSelectedOrder(pedido);

      window.history.replaceState({}, document.title);
    });
  }, [orders, location.state]);

  // 🔥 mover status
  async function moveOrder(id: number, status: OrderStatus) {
    try {
      const updated = await updateOrderStatus(id, status);

      setOrders((prev) => prev.map((o) => (o.id === id ? updated : o)));
    } catch (err) {
      console.error("Erro status:", err);
    }
  }

  // 🔥 pagamento
  async function togglePayment(id: number, pago: boolean) {
    try {
      const updated = await updatePayment(id, pago);

      setOrders((prev) => prev.map((o) => (o.id === id ? updated : o)));
    } catch (err) {
      console.error("Erro pagamento:", err);
    }
  }

  // 🔒 proteção painel
  if (!authorized) {
    return (
      <Container>
        <div className="login">
          <h2>🔒 Painel Protegido</h2>

          <button
            onClick={() => {
              const password = prompt("Digite a senha do painel");

              if (password === import.meta.env.VITE_ADMIN_PASSWORD) {
                localStorage.setItem(
                  "painel-auth",
                  JSON.stringify({
                    time: Date.now(),
                  }),
                );

                setAuthorized(true);

                return;
              }

              alert("Senha inválida");
            }}
          >
            Entrar
          </button>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      {/* TOPO */}
      <div className="topo">
        <div>
          <h1>🍕 Forno e sabor</h1>

          <p>Painel de controle</p>
        </div>
        <div className="top-actions">
          <StoreStatus />

          <button
            className="new-order"
            onClick={() => navigate("/painel/criarpedido")}
          >
            + Novo pedido
          </button>
        </div>

        <button
          className="logout"
          onClick={() => {
            localStorage.removeItem("painel-auth");

            setAuthorized(false);
          }}
        >
          Sair
        </button>
      </div>

      {/* MÉTRICAS */}
      <DashboardMetrics orders={orders} />

      {/* KANBAN */}
      <div className="grid">
        {/* NOVOS */}
        <KanbanColumn
          title="📦 Novos pedidos"
          orders={orders.filter((o) => o.status === "NOVO")}
          onMove={moveOrder}
          onTogglePayment={togglePayment}
          onDetails={setSelectedOrder}
        />

        {/* PRODUÇÃO */}
        <KanbanColumn
          title="👨‍🍳 Produção"
          orders={orders.filter((o) => o.status === "PRODUCAO")}
          onMove={moveOrder}
          onTogglePayment={togglePayment}
          onDetails={setSelectedOrder}
        />

        {/* ENTREGA */}
        <KanbanColumn
          title="🛵 Entrega"
          orders={orders.filter((o) => o.status === "ENTREGA")}
          onMove={moveOrder}
          onTogglePayment={togglePayment}
          onDetails={setSelectedOrder}
        />

        {/* FINALIZADOS */}
        <KanbanColumn
          title="✅ Finalizados"
          orders={orders.filter((o) => o.status === "FINALIZADO")}
          collapsed={hideFinished}
          onToggleCollapse={() => setHideFinished(!hideFinished)}
          onMove={moveOrder}
          onTogglePayment={togglePayment}
          onDetails={setSelectedOrder}
        />
      </div>

      {/* MODAL */}
      <OrderModal
        order={selectedOrder}
        onClose={() => setSelectedOrder(null)}
      />
    </Container>
  );
}
