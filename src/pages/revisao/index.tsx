import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container } from "./style";
import { usePedido } from "../../hook/usePedido";

export function Revisao() {
  const {
    step,
    setStep,
    nome,
    telefone,
    cidade,
    endereco,
    itens,
    pagamento,
    troco,
    observacao,
  } = usePedido();

  const navigate = useNavigate();

  useEffect(() => {
    if (step < 3) navigate("/");
  }, [step, navigate]);

  const total = itens.reduce(
    (acc, item) => acc + item.combo.preco + item.maioneseQtd * 0.99,
    0,
  );

  return (
    <Container>
      <div className="content">
        <div className="header">🧾 Revisão do Pedido</div>

        {/* CLIENTE */}
        <div className="section">
          <div className="title">Cliente</div>
          <div>{nome}</div>
          <div className="sub">{telefone}</div>
        </div>

        {/* ENDEREÇO */}
        <div className="section">
          <div className="title">Entrega</div>
          <div>{cidade}</div>

          {cidade !== "Retirada" && (
            <div className="sub">
              {endereco.rua}, {endereco.numero} - {endereco.referencia}
            </div>
          )}
        </div>

        {/* ITENS */}
        <div className="section">
          <div className="title">Pedido</div>

          {itens.map((item, index) => (
            <div key={index} className="item">
              <div className="item-title">{item.combo.nome}</div>

              {/* SABORES */}
              {Object.entries(item.sabores).map(([s, q]) =>
                q > 0 ? (
                  <div key={s} className="sub">
                    {q}x {s}
                  </div>
                ) : null,
              )}

              {/* REFRI */}
              {item.refri && <div className="sub">🥤 {item.refri}</div>}

              {/* MAIONESE */}
              {item.maioneseQtd > 0 && (
                <div className="sub">Maionese: {item.maioneseQtd}x</div>
              )}
            </div>
          ))}
        </div>

        {/* PAGAMENTO */}
        <div className="section">
          <div className="title">Pagamento</div>
          <div>{pagamento}</div>

          {pagamento === "dinheiro" && troco && (
            <div className="sub">Troco para R$ {troco}</div>
          )}
        </div>

        {/* OBSERVAÇÃO */}
        {observacao && (
          <div className="section">
            <div className="title">Observação</div>
            <div className="sub">{observacao}</div>
          </div>
        )}

        {/* TOTAL */}
        <div className="section">
          <div className="total">Total: R$ {total.toFixed(2)}</div>
        </div>
      </div>

      {/* BOTÃO FIXO */}
      <div className="footer">
        <button
          className="button"
          onClick={() => {
            setStep(4);
            navigate("/pagamento");
          }}
        >
          Confirmar Pedido
        </button>
      </div>
    </Container>
  );
}
