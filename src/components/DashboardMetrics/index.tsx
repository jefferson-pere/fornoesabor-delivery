import { useState } from "react";
import type { Pedido } from "../../types/order";
import { Container, Wrapper } from "./style";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";

type Props = {
  orders: Pedido[];
};

type OcultoState = {
  totalPedidos: boolean;
  pendentes: boolean;
  finalizados: boolean;
  totalPago: boolean;
  naoPago: boolean;
};

export function DashboardMetrics({ orders }: Props) {
  const [ocultoTodos, setOcultoTodos] = useState(false);
  const [oculto, setOculto] = useState<OcultoState>({
    totalPedidos: false,
    pendentes: false,
    finalizados: false,
    totalPago: false,
    naoPago: false,
  });

  const toggle = (key: keyof OcultoState) =>
    setOculto((prev) => ({ ...prev, [key]: !prev[key] }));

  const totalPedidos = orders.length;
  const totalFinalizados = orders.filter((o) => o.status === "FINALIZADO").length;
  const totalPendentes = orders.filter((o) => o.status !== "FINALIZADO").length;
  const totalPago = orders
    .filter((o) => o.pago)
    .reduce((acc, o) => acc + o.total, 0);
  const totalNaoPago = orders
    .filter((o) => !o.pago)
    .reduce((acc, o) => acc + o.total, 0);

  const EyeBtn = ({ campo }: { campo: keyof OcultoState }) => (
    <button
      className="card-toggle"
      onClick={() => toggle(campo)}
      title={oculto[campo] ? "Mostrar" : "Ocultar"}
    >
      {oculto[campo] ? <MdVisibilityOff /> : <MdVisibility />}
    </button>
  );

  return (
    <Wrapper>
      <button
        className="metrics-toggle"
        onClick={() => setOcultoTodos((v) => !v)}
        title={ocultoTodos ? "Mostrar métricas" : "Ocultar métricas"}
      >
        {ocultoTodos ? <MdVisibilityOff /> : <MdVisibility />}
      </button>

      {!ocultoTodos && (
        <Container>
          <div className="card">
            <div className="card-header">
              <span>Total Pedidos</span>
              <EyeBtn campo="totalPedidos" />
            </div>
            <strong>{oculto.totalPedidos ? "••••" : totalPedidos}</strong>
          </div>

          <div className="card">
            <div className="card-header">
              <span>Pendentes</span>
              <EyeBtn campo="pendentes" />
            </div>
            <strong>{oculto.pendentes ? "••••" : totalPendentes}</strong>
          </div>

          <div className="card">
            <div className="card-header">
              <span>Finalizados</span>
              <EyeBtn campo="finalizados" />
            </div>
            <strong>{oculto.finalizados ? "••••" : totalFinalizados}</strong>
          </div>

          <div className="card success">
            <div className="card-header">
              <span>Total Pago</span>
              <EyeBtn campo="totalPago" />
            </div>
            <strong>{oculto.totalPago ? "R$ ••••" : `R$ ${totalPago.toFixed(2)}`}</strong>
          </div>

          <div className="card danger">
            <div className="card-header">
              <span>Não Pago</span>
              <EyeBtn campo="naoPago" />
            </div>
            <strong>{oculto.naoPago ? "R$ ••••" : `R$ ${totalNaoPago.toFixed(2)}`}</strong>
          </div>
        </Container>
      )}
    </Wrapper>
  );
}
