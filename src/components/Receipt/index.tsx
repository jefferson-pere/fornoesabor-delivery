import type { Pedido } from "../../types/order";
import { Container } from "./style";

type Props = {
  order: Pedido;
};

export function Receipt({ order }: Props) {
  const totalCombos = order.itens.reduce(
    (acc, item) => acc + item.combo.preco,
    0,
  );

  const totalRefri = order.itens.reduce(
    (acc, item) => acc + (Array.isArray(item.refriExtra) ? item.refriExtra.reduce((a, r) => a + r.preco * r.qtd, 0) : 0),
    0,
  );

  const totalMaionese = order.itens.reduce(
    (acc, item) => acc + item.maioneseQtd * 0.99,
    0,
  );

  const frete =
    order.cidade === "Retirada" ? 0 : order.cidade === "Cariús" ? 3 : 5;

  return (
    <Container className="receipt-print">
      <div className="receipt-content">
        <h1>FORNO & SABOR</h1>

        <div className="pedido">
          Pedido Nº: {order.codigo}
          <br />
          {new Date(order.createdAt).toLocaleString("pt-BR")}
        </div>

        <div className="divider" />

        <div className="lineEnd">
          <span>Cliente:</span>
          <span>{order.nomeCliente}</span>
        </div>

        <div className="lineEnd">
          <span>Telefone:</span>
          <span>{order.telefone}</span>
        </div>
        <div className="lineEnd">
          <span>Cidade:</span>
          <span>{order.cidade}</span>
        </div>

        {order.endereco && order.cidade !== "Retirada" && (
          <>
            <div className="lineEnd">
              <span>End:</span>
              <span>
                {order.endereco.rua}, Nº: {order.endereco.numero}
              </span>
            </div>

            {order.endereco.referencia && (
              <div className="lineEnd">
                <span>Ref:</span>
                <span>{order.endereco.referencia}</span>
              </div>
            )}
          </>
        )}

        <div className="divider" />

        {order.itens.map((item, index) => (
          <div key={index} className="itemCupom">
            <div className="line">
              <div className="container-combo">
                <strong>** Combo {index + 1} **</strong>
                <strong>{item.combo.nome}</strong>
              </div>
            </div>

            {item.refri && <div className="obs">** Refri: {item.refri}</div>}

            {item.refriExtra?.map((r) => (
              <div key={`${r.nome}-${r.tipo}`} className="obs">** Refri: {r.qtd}× {r.nome} ({r.tipo})</div>
            ))}

            {item.maioneseQtd > 0 && (
              <div className="obs">
                ** Maionese caseira ({item.maioneseQtd}x)
              </div>
            )}

            <div style={{ marginTop: 4 }}>
              <strong>Sabores:</strong>
            </div>

            {Object.entries(item.sabores).filter(([, qtd]) => qtd > 0).map(([sabor, qtd]) => (
              <div key={sabor} className="flavor">
                <span>{sabor}</span>
                <span>{qtd}x</span>
              </div>
            ))}

            {item.observacaoItem && (
              <div className="obs">
                <strong>Obs:</strong>
                <br />
                {item.observacaoItem}
              </div>
            )}

            <div className="combo-divider" />
          </div>
        ))}

        <div className="line">
          <strong>Combo {order.itens.length}</strong>
          <strong>R$ {totalCombos.toFixed(2)}</strong>
        </div>

        {totalRefri > 0 && (
          <div className="line">
            <strong>Refri extra</strong>
            <strong>R$ {totalRefri.toFixed(2)}</strong>
          </div>
        )}

        {totalMaionese > 0 && (
          <div className="line">
            <strong>Maionese</strong>
            <strong>R$ {totalMaionese.toFixed(2)}</strong>
          </div>
        )}

        <div className="line">
          <strong>Frete</strong>
          <strong>{frete === 0 ? "GRÁTIS" : `R$ ${frete.toFixed(2)}`}</strong>
        </div>

        {order.pagamento === "cartao" && (
          <div className="line">
            <strong>Taxa cartão</strong>
            <strong>R$ 1,00</strong>
          </div>
        )}

        <div className="line">
          <strong>Pagamento</strong>
          <strong>{order.pagamento.toUpperCase()}</strong>
        </div>

        <div className="line">
          <strong>Status</strong>
          <strong>{order.pago ? "PAGO" : "NÃO PAGO"}</strong>
        </div>

        {order.troco &&
          order.pagamento === "dinheiro" &&
          (() => {
            const valorInformado = Number(
              order.troco
                .replace("R$", "")
                .replace(/\./g, "")
                .replace(",", ".")
                .trim(),
            );
            const troco = valorInformado - order.total;
            return (
              <>
                <div className="line">
                  <strong>Valor informado</strong>
                  <strong>R$ {valorInformado.toFixed(2)}</strong>
                </div>
                <div className="divider" />
                <div className="line totall">
                  <strong>Troco</strong>
                  <strong>R$ {troco.toFixed(2)}</strong>
                </div>
              </>
            );
          })()}

        {order.observacao && (
          <>
            <div className="divider" />

            <div className="obs">
              <strong>Obs:</strong>
              <br />
              {order.observacao}
            </div>
          </>
        )}

        <div className="divider" />

        <div className="total">
          <span>TOTAL</span>
          <span>R$ {order.total.toFixed(2)}</span>
        </div>

        <div className="footer">
          Deus é bom...
          <br />
          <span>...o tempo todo!</span>
        </div>
      </div>
    </Container>
  );
}
