import { useState, useEffect, useRef } from "react";
import type { Pedido, OrderStatus } from "../../types/order";
import { Container } from "./style";

const TROCA_SENHA = import.meta.env.VITE_TROCA_ENTREGADOR_SENHA as string;

type Props = {
  order: Pedido;
  onMove: (id: number, status: OrderStatus, entregador?: string) => void;
  onTogglePayment: (id: number, pago: boolean) => void;
  onDetails: (order: Pedido) => void;
  onDesignar?: (id: number, entregador: string) => void;
};

function getTimerColor(createdAt: string): string {
  const minutes = Math.floor((Date.now() - new Date(createdAt).getTime()) / 60000);
  if (minutes < 20) return "#16a34a";
  if (minutes < 30) return "#4ade80";
  if (minutes < 40) return "#eab308";
  return "#ef4444";
}

export function OrderCard({ order, onMove, onTogglePayment, onDetails, onDesignar }: Props) {
  const [borderColor, setBorderColor] = useState(() => getTimerColor(order.createdAt));
  const [trocando, setTrocando] = useState(false);
  const [senhaTroca, setSenhaTroca] = useState("");
  const [erroSenha, setErroSenha] = useState(false);
  const inputSenhaRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setBorderColor(getTimerColor(order.createdAt));
    }, 60000);
    return () => clearInterval(interval);
  }, [order.createdAt]);

  useEffect(() => {
    if (trocando) inputSenhaRef.current?.focus();
  }, [trocando]);

  function confirmarTroca(e: React.FormEvent) {
    e.preventDefault();
    if (senhaTroca === TROCA_SENHA) {
      const novo = order.entregadorDesignado === "Entregador 1" ? "Entregador 2" : "Entregador 1";
      onDesignar!(order.id, novo);
      setTrocando(false);
      setSenhaTroca("");
      setErroSenha(false);
    } else {
      setErroSenha(true);
      setSenhaTroca("");
    }
  }
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
  const totalMaionese = order.itens.reduce((acc, item) => acc + ((item.maioneseQtd ?? 0) + (item.maioneseBaconQtd ?? 0)) * 0.99, 0);
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
        <div className="cidade-pag">
          <span className="cidade">📍 {order.cidade}</span>
          <span className="pagamento-text">💳 {order.pagamento}</span>
        </div>
      </div>

      <div className="designar-pago" onClick={(e) => e.stopPropagation()}>
        {order.status === "ENTREGA" && onDesignar ? (
          <div className="designar-inline">
            {order.entregadorDesignado ? (
              trocando ? (
                <form className="form-troca" onSubmit={confirmarTroca}>
                  <input
                    ref={inputSenhaRef}
                    type="password"
                    placeholder="Senha"
                    value={senhaTroca}
                    onChange={(e) => { setSenhaTroca(e.target.value); setErroSenha(false); }}
                    className={erroSenha ? "erro" : ""}
                  />
                  <button type="submit">✓</button>
                  <button type="button" onClick={() => { setTrocando(false); setSenhaTroca(""); setErroSenha(false); }}>✕</button>
                </form>
              ) : (
                <div className="designado">
                  <span>{order.entregadorDesignado}</span>
                  <button className="trocar" onClick={() => setTrocando(true)}>trocar</button>
                </div>
              )
            ) : (
              <div className="sem-designacao">
                <span>⚠️</span>
                <button onClick={() => onDesignar(order.id, "Entregador 1")}>E1</button>
                <button onClick={() => onDesignar(order.id, "Entregador 2")}>E2</button>
              </div>
            )}
          </div>
        ) : order.entregador ? (
          <div className="entregador">{order.entregador}</div>
        ) : null}
        <button
          className={order.pago ? "pago" : "nao-pago"}
          onClick={(e) => { e.stopPropagation(); onTogglePayment(order.id, !order.pago); }}
        >
          {order.pago ? "✅ Pago" : "❌ Não Pago"}
        </button>
      </div>

      <div className="acoes" onClick={(e) => e.stopPropagation()}>
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

        <strong className="total">R$ {orderTotal.toFixed(2)}</strong>

        {nextStatus() && (
          <button
            className="avancar"
            disabled={order.status === "ENTREGA" && onDesignar && !order.entregadorDesignado}
            title={order.status === "ENTREGA" && !order.entregadorDesignado ? "Selecione um entregador antes de finalizar" : undefined}
            onClick={(e) => {
              e.stopPropagation();
              if (order.status === "ENTREGA") {
                onMove(order.id, "FINALIZADO", order.entregadorDesignado);
              } else {
                onMove(order.id, nextStatus()!);
              }
            }}
          >
            Avançar
          </button>
        )}
      </div>
    </Container>
  );
}
