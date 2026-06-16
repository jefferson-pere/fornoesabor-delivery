import type { Pedido, OrderStatus } from "../../types/order";
import { Container } from "./style";

type Props = {
  order: Pedido;
  onMove: (id: number, status: OrderStatus) => void;
  onTogglePayment: (id: number, pago: boolean) => void;
  onDetails: (order: Pedido) => void;
};

export function OrderCard({ order, onMove, onTogglePayment, onDetails }: Props) {
  function nextStatus(): OrderStatus | null {
    if (order.status === "NOVO") return "PRODUCAO";
    if (order.status === "PRODUCAO") return "ENTREGA";
    if (order.status === "ENTREGA") return "FINALIZADO";
    return null;
  }

  function prevStatus(): OrderStatus | null {
    if (order.status === "PRODUCAO") return "NOVO";
    if (order.status === "ENTREGA") return "PRODUCAO";
    if (order.status === "FINALIZADO") return "ENTREGA";
    return null;
  }

  return (
    <Container onClick={() => onDetails(order)}>
      <div className="topo">
        <strong>{order.nomeCliente}</strong>
        <span className="hora">
          {new Date(order.createdAt).toLocaleTimeString("pt-BR", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
        <span className="codigo">{order.codigo}</span>
      </div>

      <div className="infoendpag">
        <div className="cidade">📍 {order.cidade}</div>
        <div className="pagamento">💳 {order.pagamento}</div>
      </div>

      <div className="footer">
        <strong>R$ {order.total.toFixed(2)}</strong>
        <button
          className={order.pago ? "pago" : "nao-pago"}
          onClick={(e) => { e.stopPropagation(); onTogglePayment(order.id, !order.pago); }}
        >
          {order.pago ? "✅ Pago" : "❌ Não Pago"}
        </button>
      </div>

      <div className="acoes">
        {prevStatus() && (
          <button
            className="detalhes"
            onClick={(e) => {
              e.stopPropagation();
              if (confirm("Tem certeza que quer voltar?")) onMove(order.id, prevStatus()!);
            }}
          >
            Voltar
          </button>
        )}

        {nextStatus() && (
          <button
            className="avancar"
            onClick={(e) => { e.stopPropagation(); onMove(order.id, nextStatus()!); }}
          >
            Avançar
          </button>
        )}
      </div>
    </Container>
  );
}
