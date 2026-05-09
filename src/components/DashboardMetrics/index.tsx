import type { Pedido } from "../../types/order";

import { Container } from "./style";

type Props = {
  orders: Pedido[];
};

export function DashboardMetrics({ orders }: Props) {
  const totalPedidos = orders.length;

  const totalFinalizados = orders.filter(
    (o) => o.status === "FINALIZADO",
  ).length;

  const totalPendentes = orders.filter((o) => o.status !== "FINALIZADO").length;

  // const totalPago = orders
  //   .filter((o) => o.pago)
  //   .reduce((acc, o) => acc + o.total, 0);

  const totalNaoPago = orders
    .filter((o) => !o.pago)
    .reduce((acc, o) => acc + o.total, 0);

  return (
    <Container>
      <div className="card">
        <span>Total Pedidos</span>

        <strong>{totalPedidos}</strong>
      </div>

      <div className="card">
        <span>Pendentes</span>

        <strong>{totalPendentes}</strong>
      </div>
      <div className="card">
        <span>Finalizados</span>

        <strong>{totalFinalizados}</strong>
      </div>

      {/* <div className="card success">
        <span>Total Pago</span>

        <strong>R$ {totalPago.toFixed(2)}</strong>
      </div> */}

      <div className="card danger">
        <span>Não Pago</span>

        <strong>R$ {totalNaoPago.toFixed(2)}</strong>
      </div>
    </Container>
  );
}
