import type { Pedido, OrderStatus } from "../../types/order";

import { Container } from "./style";

type Props = {
  order: Pedido;

  onMove: (id: number, status: OrderStatus) => void;

  onTogglePayment: (id: number, pago: boolean) => void;

  onDetails: (order: Pedido) => void;
};

export function OrderCard({
  order,
  onMove,
  onTogglePayment,
  onDetails,
}: Props) {
  function nextStatus(): OrderStatus | null {
    if (order.status === "NOVO") {
      return "PRODUCAO";
    }

    if (order.status === "PRODUCAO") {
      return "ENTREGA";
    }

    if (order.status === "ENTREGA") {
      return "FINALIZADO";
    }

    return null;
  }

  return (
    <Container>
      <div className="topo">
        <strong>{order.nomeCliente}</strong>

        <span>{order.codigo}</span>
      </div>

      <div className="combo">{order.itens[0]?.combo.nome}</div>

      <div className="footer">
        <strong>R$ {order.total.toFixed(2)}</strong>

        <button
          className={order.pago ? "pago" : "nao-pago"}
          onClick={() => onTogglePayment(order.id, !order.pago)}
        >
          {order.pago ? "✅ Pago" : "❌ Não Pago"}
        </button>
      </div>

      <div className="acoes">
        <button className="detalhes" onClick={() => onDetails(order)}>
          Detalhes
        </button>

        {nextStatus() && (
          <button
            className="avancar"
            onClick={() => onMove(order.id, nextStatus()!)}
          >
            Avançar
          </button>
        )}
      </div>
    </Container>
  );
}
