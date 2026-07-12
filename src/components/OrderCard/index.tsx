import { useState, useEffect } from "react";
import type { Pedido, OrderStatus } from "../../types/order";
import { Container } from "./style";

type Props = {
  order: Pedido;
  onMove: (id: number, status: OrderStatus) => void;
  onTogglePayment: (id: number, pago: boolean) => void;
  onDetails: (order: Pedido) => void;
};

function getTimerColor(createdAt: string): string {
  const minutes = Math.floor((Date.now() - new Date(createdAt).getTime()) / 60000);
  if (minutes < 20) return "#16a34a";
  if (minutes < 30) return "#4ade80";
  if (minutes < 40) return "#eab308";
  return "#ef4444";
}

export function OrderCard({ order, onMove, onTogglePayment, onDetails }: Props) {
  const [borderColor, setBorderColor] = useState(() => getTimerColor(order.createdAt));

  useEffect(() => {
    const interval = setInterval(() => {
      setBorderColor(getTimerColor(order.createdAt));
    }, 60000);
    return () => clearInterval(interval);
  }, [order.createdAt]);
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

  const totalCombos = order.itens.reduce((acc, item) => acc + (item.combo?.preco ?? 0), 0);
  const totalRefri = order.itens.reduce((acc, item) => acc + (Array.isArray(item.refriExtra) ? item.refriExtra.reduce((a, r) => a + r.preco * r.qtd, 0) : 0), 0);
  const totalMaionese = order.itens.reduce((acc, item) => acc + (item.maioneseQtd ?? 0) * 0.99, 0);
  const frete = order.cidade === "Retirada" ? 0 : order.cidade === "Cariús" ? 3 : 5;
  const taxaCartao = order.pagamento === "cartao" ? 1 : 0;
  const orderTotal = totalCombos + totalRefri + totalMaionese + frete + taxaCartao;

  return (
    <Container $borderColor={borderColor} onClick={() => onDetails(order)}>
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
        <strong>R$ {orderTotal.toFixed(2)}</strong>
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
