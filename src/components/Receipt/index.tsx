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

        {order.telefone && (
          <div className="line">
            <strong>Telefone:</strong>

            <span>{order.telefone}</span>
          </div>
        )}

        <div className="line">
          <strong>Cidade:</strong>

          <span>{order.cidade}</span>
        </div>

        {order.endereco && order.cidade !== "Retirada" && (
          <>
            <div className="line">
              <strong>Rua:</strong>

              <span>{order.endereco.rua}</span>
            </div>

            <div className="line">
              <strong>Número:</strong>

              <span>{order.endereco.numero}</span>
            </div>

            {order.endereco.referencia && (
              <div className="line">
                <strong>Referência:</strong>

                <span>{order.endereco.referencia}</span>
              </div>
            )}
          </>
        )}

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

        {order.observacao && (
          <>
            <div className="divider" />

            <div className="obs">
              <strong>Observação:</strong>

              <span>{order.observacao}</span>
            </div>
          </>
        )}

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

            {item.refri && (
              <div className="line">
                <strong>Refri:</strong>

                <span>{item.refri}</span>
              </div>
            )}

            {item.refriExtra && (
              <div className="line">
                <strong>Refri extra:</strong>

                <span>
                  {item.refriExtra.nome} ({item.refriExtra.tipo})
                </span>
              </div>
            )}

            {item.maioneseQtd > 0 && (
              <div className="line">
                <strong>Maionese:</strong>

                <span>{item.maioneseQtd}x</span>
              </div>
            )}

            {item.observacaoItem && (
              <div className="obs">
                <strong>Obs item:</strong>

                <span>{item.observacaoItem}</span>
              </div>
            )}

            <div className="combo-divider" />
          </div>
        ))}

        <div className="line">
          <strong>Preço do Combo:</strong>
          <span>
            {order.itens
              .reduce((acc, item) => acc + item.combo.preco, 0)
              .toFixed(2)}
          </span>
        </div>

        {order.itens.some((item) => item.refriExtra) && (
          <div className="line">
            <strong>Preço do Refri:</strong>
            <span>
              {order.itens
                .reduce((acc, item) => acc + (item.refriExtra?.preco || 0), 0)
                .toFixed(2)}
            </span>
          </div>
        )}

        {order.itens.some((item) => item.maioneseQtd) && (
          <div className="line">
            <strong>Preço da Maionese:</strong>
            <span>
              {order.itens
                .reduce((acc, item) => acc + item.maioneseQtd * 0.99, 0)
                .toFixed(2)}
            </span>
          </div>
        )}

        <div className="line">
          <strong>Frete:</strong>
          <span>
            {order.cidade === "Retirada"
              ? "Grátis"
              : order.cidade === "Cariús"
                ? "R$ 3,00"
                : "R$ 5,00"}
          </span>
        </div>
        {order.troco && (
          <div className="line">
            <strong>Troco:</strong>

            <span>{order.troco}</span>
          </div>
        )}

        {order.pagamento === "cartao" && (
          <div className="line">
            <strong>Taxa cartão:</strong>

            <span>R$ 1,00</span>
          </div>
        )}
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
