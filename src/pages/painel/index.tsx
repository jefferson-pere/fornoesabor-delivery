import {
  startTransition,
  useEffect,
  useRef,
  useState,
  useCallback,
} from "react";
import alertSound from "../../../sounds/alert.mp3";
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
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const closeMenu = useCallback((e: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
      setMenuOpen(false);
    }
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.addEventListener("mousedown", closeMenu);
    } else {
      document.removeEventListener("mousedown", closeMenu);
    }
    return () => document.removeEventListener("mousedown", closeMenu);
  }, [menuOpen, closeMenu]);
  const [hideFinished, setHideFinished] = useState(true);

  useEffect(() => {
    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission();
    }

    const audio = new Audio(alertSound);
    audio.preload = "auto";
    audioRef.current = audio;

    const desbloquear = () => {
      audio
        .play()
        .then(() => {
          audio.pause();
          audio.currentTime = 0;
        })
        .catch(() => {});
      document.removeEventListener("click", desbloquear);
    };
    document.addEventListener("click", desbloquear);
    return () => document.removeEventListener("click", desbloquear);
  }, []);

  function tocarSom() {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current
        .play()
        .catch((e) => console.error("Erro ao tocar som:", e));
    }
  }

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

    socket.on("novo-pedido", (pedido: Pedido) => {
      setOrders((prev) => [pedido, ...prev]);

      tocarSom();

      if ("Notification" in window && Notification.permission === "granted") {
        new Notification("Novo pedido! 🍕", {
          body: `Pedido Nº ${pedido.codigo} — ${pedido.nomeCliente}`,
          icon: "/favicon.ico",
        });
      }
    });

    socket.on("pedido-atualizado", (pedido: Pedido) => {
      setOrders((prev) => prev.map((o) => (o.id === pedido.id ? pedido : o)));
    });

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

    const reopenId = (location.state as { reopenOrder?: number })?.reopenOrder;

    if (!reopenId) return;

    const pedido = orders.find((o) => o.id === reopenId);

    if (!pedido) return;

    reopened.current = true;

    startTransition(() => {
      setSelectedOrder(pedido);
      window.history.replaceState({}, document.title);
    });
  }, [orders, location.state]);

  async function moveOrder(id: number, status: OrderStatus) {
    try {
      const updated = await updateOrderStatus(id, status);
      setOrders((prev) => prev.map((o) => (o.id === id ? updated : o)));
    } catch (err) {
      console.error("Erro status:", err);
    }
  }

  async function togglePayment(id: number, pago: boolean) {
    try {
      const updated = await updatePayment(id, pago);
      setOrders((prev) => prev.map((o) => (o.id === id ? updated : o)));
    } catch (err) {
      console.error("Erro pagamento:", err);
    }
  }

  return (
    <Container>
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

          <div className="more-menu-wrapper" ref={menuRef}>
            <button
              className="more-menu-btn"
              onClick={() => setMenuOpen((v) => !v)}
            >
              ☰ Menu {menuOpen ? "▲" : "▼"}
            </button>
            {menuOpen && (
              <div className="more-menu-dropdown">
                <button
                  onClick={() => {
                    navigate("/cozinha");
                    setMenuOpen(false);
                  }}
                >
                  Cozinha
                </button>
                <button
                  onClick={() => {
                    navigate("/historico");
                    setMenuOpen(false);
                  }}
                >
                  Histórico
                </button>
                <button
                  onClick={() => {
                    navigate("/estatisticas");
                    setMenuOpen(false);
                  }}
                >
                  Estatísticas
                </button>
                <button
                  onClick={() => {
                    navigate("/sorteio");
                    setMenuOpen(false);
                  }}
                >
                  Sorteio
                </button>
                <button
                  onClick={() => {
                    navigate("/painel/configuracoes");
                    setMenuOpen(false);
                  }}
                >
                  Configurações
                </button>
              </div>
            )}
          </div>
        </div>

        <button
          className="logout"
          onClick={() => {
            localStorage.removeItem("painel-auth");
            window.location.reload();
          }}
        >
          Sair
        </button>
      </div>

      <DashboardMetrics orders={orders} />

      <div className="grid">
        <KanbanColumn
          title="📦 Novos pedidos"
          orders={orders.filter((o) => o.status === "NOVO")}
          onMove={moveOrder}
          onTogglePayment={togglePayment}
          onDetails={setSelectedOrder}
        />

        <KanbanColumn
          title="👨‍🍳 Produção"
          orders={orders.filter((o) => o.status === "PRODUCAO")}
          onMove={moveOrder}
          onTogglePayment={togglePayment}
          onDetails={setSelectedOrder}
        />

        <KanbanColumn
          title="🛵 Entrega"
          orders={orders.filter((o) => o.status === "ENTREGA")}
          onMove={moveOrder}
          onTogglePayment={togglePayment}
          onDetails={setSelectedOrder}
        />

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

      <OrderModal
        order={selectedOrder}
        onClose={() => setSelectedOrder(null)}
      />
    </Container>
  );
}
