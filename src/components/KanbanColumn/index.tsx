import type { Pedido, OrderStatus } from "../../types/order";
import { OrderCard } from "../OrderCard";
import { Container } from "./style";

type Props = {
  title: string;
  orders: Pedido[];
  collapsed?: boolean;
  onToggleCollapse?: () => void;
  onMove: (id: number, status: OrderStatus, entregador?: string) => void;
  onTogglePayment: (id: number, pago: boolean) => void;
  onDetails: (order: Pedido) => void;
  onDesignar?: (id: number, entregador: string) => void;
};

export function KanbanColumn({
  title,
  orders,
  collapsed,
  onToggleCollapse,
  onMove,
  onTogglePayment,
  onDetails,
  onDesignar,
}: Props) {
  return (
    <Container>
      <div className="header">
        <h2>{title}</h2>

        <div className="right">
          {onToggleCollapse && (
            <button onClick={onToggleCollapse}>
              {collapsed ? "Mostrar" : "Ocultar"}
            </button>
          )}
          <span>{orders.length}</span>
        </div>
      </div>

      {!collapsed && (
        <div className="cards">
          {orders.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              onMove={onMove}
              onTogglePayment={onTogglePayment}
              onDetails={onDetails}
              onDesignar={onDesignar}
            />
          ))}
        </div>
      )}
    </Container>
  );
}
