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

  const subtotal = itens.reduce((acc, item) => acc + item.combo.preco, 0);

  const adicional = itens.reduce(
    (acc, item) => acc + item.maioneseQtd * 0.99,
    0,
  );

  const adicionalRefri = itens.reduce(
    (acc, item) =>
      acc +
      (item.refriExtra?.lata || 0) * 5 +
      (item.refriExtra?.["1l"] || 0) * 8,
    0,
  );

  const frete = cidade === "Cariús" ? 3 : cidade === "Jucás" ? 5 : 0;

  const total = subtotal + adicional + adicionalRefri + frete;

  return (
    <Container>
      <div className="content">
        {/* HERO */}
        <div className="hero">
          <img src="/banner.png" />
          <div className="hero-overlay">
            <div className="hero-title">Revisar Pedido</div>
          </div>
        </div>

        <div className="form">
          {/* CLIENTE */}
          <div className="card">
            <span className="label">Cliente</span>
            <strong>{nome}</strong>
            <span className="sub">{telefone}</span>
          </div>

          {/* ENTREGA */}
          <div className="card">
            <span className="label">Entrega</span>
            <strong>{cidade}</strong>

            {cidade !== "Retirada" && (
              <span className="sub">
                {endereco.rua}, {endereco.numero} - {endereco.referencia}
              </span>
            )}
          </div>

          {/* ITENS */}
          <div className="card">
            <span className="label">Pedido</span>

            {itens.map((item, index) => (
              <div key={index} className="item">
                <strong>{item.combo.nome}</strong>

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

                {/* REFRI EXTRA */}
                {(item.refriExtra?.lata || 0) > 0 && (
                  <div className="sub">🥤 {item.refriExtra?.lata}x lata</div>
                )}

                {(item.refriExtra?.["1l"] || 0) > 0 && (
                  <div className="sub">🥤 {item.refriExtra?.["1l"]}x 1L</div>
                )}

                {/* MAIONESE */}
                {item.maioneseQtd > 0 && (
                  <div className="sub">🧄 {item.maioneseQtd}x maionese</div>
                )}

                {/* OBS ITEM */}
                {item.observacaoItem && (
                  <div className="sub">📝 {item.observacaoItem}</div>
                )}
              </div>
            ))}
          </div>

          {/* PAGAMENTO */}
          <div className="card">
            <span className="label">Pagamento</span>
            <strong>{pagamento}</strong>

            {pagamento === "dinheiro" && troco && (
              <span className="sub">Troco para R$ {troco}</span>
            )}
          </div>

          {/* OBSERVAÇÃO */}
          {observacao && (
            <div className="card">
              <span className="label">Observação</span>
              <span className="sub">{observacao}</span>
            </div>
          )}

          {/* TOTAL */}
          <div className="total-card">
            <div className="row">
              <span>Subtotal</span>
              <strong>R$ {subtotal.toFixed(2)}</strong>
            </div>

            {adicional > 0 && (
              <div className="row extra">
                <span>Adicionais</span>
                <strong>+ R$ {adicional.toFixed(2)}</strong>
              </div>
            )}

            {adicionalRefri > 0 && (
              <div className="row extra">
                <span>Refrigerantes</span>
                <strong>+ R$ {adicionalRefri.toFixed(2)}</strong>
              </div>
            )}

            <div className="row">
              <span>Frete</span>
              <strong>
                {frete === 0 ? "Grátis" : `R$ ${frete.toFixed(2)}`}
              </strong>
            </div>

            <div className="divider" />

            <div className="row total">
              <span>Total</span>
              <strong>R$ {total.toFixed(2)}</strong>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className="footer">
          <button className="button cancel" onClick={() => navigate(-1)}>
            Voltar
          </button>

          <button
            className="button"
            onClick={() => {
              setStep(4);
              navigate("/confirmacao");
            }}
          >
            Finalizar Pedido
          </button>
        </div>
      </div>
    </Container>
  );
}
