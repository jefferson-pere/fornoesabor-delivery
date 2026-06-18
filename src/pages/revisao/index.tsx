import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container } from "./style";
import { usePedido } from "../../hook/usePedido";
import { StepProgress } from "../../components/StepProgress";

const formatarPagamento = (p: string) => {
  if (p === "pix") return "PIX";
  if (p === "cartao") return "Cartão";
  if (p === "dinheiro") return "Dinheiro";
  return p;
};
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
    semTroco,
    observacao,
  } = usePedido();
  const navigate = useNavigate();
  const [loadingConfirm, setLoadingConfirm] = useState(false);

  useEffect(() => {
    if (step < 3) navigate("/");
  }, [step, navigate]);
  const subtotal = itens.reduce((acc, item) => acc + item.combo.preco, 0);
  const adicional = itens.reduce(
    (acc, item) => acc + item.maioneseQtd * 0.99,
    0,
  );
  const adicionalRefri = itens.reduce(
    (acc, item) => acc + (item.refriExtra?.preco || 0),
    0,
  );
  const frete = cidade === "Cariús" ? 3 : cidade === "Jucás" ? 5 : 0;
  const taxaCartao = pagamento === "cartao" ? 1 : 0;
  const total = subtotal + adicional + adicionalRefri + frete + taxaCartao;
  return (
    <Container>
      <div className="content">
        <div className="desktop-side">
          <img src="/banner.png" alt="" onError={(e) => (e.currentTarget.style.display = "none")} />
          <div className="side-overlay">
            <div className="side-badge">🔥 Pedido online</div>
            <div className="side-title">Forno e Sabor</div>
            <p className="side-sub">Quase lá! Confirme seu pedido</p>
          </div>
        </div>

        <StepProgress current={3} />
        <div className="page-header">
          <span className="page-title">Revisar Pedido</span>
        </div>
        <div className="form">
          <div className="summary-card">
            <div className="summary-row">
              <span className="summary-label">Cliente</span>
              <div className="summary-value">
                <strong>{nome}</strong>
                <span>{telefone}</span>
              </div>
            </div>
            <div className="summary-divider" />
            <div className="summary-row">
              <span className="summary-label">Entrega</span>
              <div className="summary-value">
                <strong>{cidade}</strong>
                {cidade !== "Retirada" && (
                  <span>
                    {endereco.rua}, {endereco.numero} — {endereco.referencia}
                  </span>
                )}
              </div>
            </div>
            <div className="summary-divider" />
            <div className="summary-row">
              <span className="summary-label">Pagamento</span>
              <div className="summary-value">
                <strong>{formatarPagamento(pagamento)}</strong>
                {pagamento === "dinheiro" && semTroco && (
                  <span>Não precisa de troco</span>
                )}
                {pagamento === "dinheiro" && !semTroco && troco && (
                  <span>Troco para {troco}</span>
                )}
              </div>
            </div>
            {observacao && (
              <>
                <div className="summary-divider" />
                <div className="summary-row">
                  <span className="summary-label">Obs.</span>
                  <div className="summary-value">
                    <span>{observacao}</span>
                  </div>
                </div>
              </>
            )}
          </div>
          <div className="card">
            <span className="label">Pedido</span>
            {itens.map((item, index) => (
              <div key={index} className="item">
                <strong>{item.combo.nome}</strong>
                {Object.entries(item.sabores).map(([s, q]) =>
                  q > 0 ? (
                    <div key={s} className="sub">
                      {q}x {s}
                    </div>
                  ) : null,
                )}
                {item.refri && <div className="sub">🥤 {item.refri}</div>}
                {item.refriExtra && (
                  <div className="sub">
                    🥤 Extra: {item.refriExtra.nome} ({item.refriExtra.tipo}) —
                    R$ {item.refriExtra.preco.toFixed(2)}
                  </div>
                )}
                {item.maioneseQtd > 0 && (
                  <div className="sub">🧄 {item.maioneseQtd}x maionese</div>
                )}
                {item.observacaoItem && (
                  <div className="sub">📝 {item.observacaoItem}</div>
                )}
              </div>
            ))}
          </div>
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
            {taxaCartao > 0 && (
              <div className="row extra">
                <span>Taxa cartão</span>
                <strong>+ R$ 1,00</strong>
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
        <div className="footer">
          <button className="button cancel" onClick={() => navigate(-1)}>
            Voltar
          </button>
          <button
            className={`button${loadingConfirm ? " loading" : ""}`}
            disabled={loadingConfirm}
            onClick={async () => {
              if (loadingConfirm) return;
              setLoadingConfirm(true);
              try {
                const pedido = {
                  nomeCliente: nome,
                  telefone,
                  cidade,
                  endereco: cidade !== "Retirada" ? endereco : null,
                  itens,
                  pagamento,
                  troco: semTroco && !troco ? `R$ ${total.toFixed(2).replace(".", ",")}` : troco,
                  observacao,
                };
                const res = await fetch(
                  `${import.meta.env.VITE_API_URL}/orders`,
                  {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                      "x-api-key": import.meta.env.VITE_API_KEY,
                    },
                    body: JSON.stringify(pedido),
                  },
                );
                if (!res.ok) {
                  navigate("/confirmacao", {
                    state: { erro: true, mensagem: "Erro ao enviar pedido para o servidor" },
                  });
                  return;
                }
                setStep(4);
                navigate("/confirmacao", { state: { erro: false } });
              } catch (err) {
                console.error(err);
                navigate("/confirmacao", {
                  state: { erro: true, mensagem: "Erro de conexão com servidor" },
                });
              } finally {
                setLoadingConfirm(false);
              }
            }}
          >
            {loadingConfirm ? <div className="spinner" /> : "Finalizar pedido"}
          </button>
        </div>
      </div>
    </Container>
  );
}
