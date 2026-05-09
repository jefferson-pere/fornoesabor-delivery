import type { Pedido } from "../../types/order";

import { Container } from "./style";

type Props = {
  order: Pedido;
};

export function Receipt({ order }: Props) {
  return (
    <Container className="receipt-print">
      <div className="receipt-content">
        <h1>FORNO & SABOR</h1>

        <div className="divider" />

        <div className="line">
          <strong>Pedido:</strong>

          <span>{order.codigo}</span>
        </div>

        <div className="line">
          <strong>Cliente:</strong>

          <span>{order.nomeCliente}</span>
        </div>

        <div className="line">
          <strong>Cidade:</strong>

          <span>{order.cidade}</span>
        </div>

        <div className="line">
          <strong>Pagamento:</strong>

          <span>{order.pagamento}</span>
        </div>

        <div className="line">
          <strong>Pago:</strong>

          <span>{order.pago ? "SIM" : "NÃO"}</span>
        </div>

        <div className="line">
          <strong>Hora:</strong>

          <span>{new Date(order.createdAt).toLocaleString("pt-BR")}</span>
        </div>

        <div className="divider" />

        {order.itens.map((item, index) => (
          <div key={index} className="item">
            <h2>{item.combo.nome}</h2>

            {Object.entries(item.sabores).map(([sabor, qtd]) => (
              <div key={sabor} className="flavor">
                <span>{sabor}</span>

                <span>{qtd}x</span>
              </div>
            ))}

            {/* {item.observacao && (
              <div className="obs">Obs: {item.observacao}</div>
            )} */}
          </div>
        ))}

        <div className="divider" />

        <div className="total">
          TOTAL:
          <span>R$ {order.total.toFixed(2)}</span>
        </div>

        <div className="footer">
          Deus é bom...
          <br />
          ...o tempo todo!
        </div>
      </div>
    </Container>
  );
}
