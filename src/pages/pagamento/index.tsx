import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container } from "./style";
import { usePedido } from "../../hook/usePedido";
import { MdPix, MdCreditCard, MdAttachMoney } from "react-icons/md";

export function Pagamento() {
  const {
    step,
    setStep,
    pagamento,
    setPagamento,
    troco,
    setTroco,
    itens,
    cidade,
  } = usePedido();

  const navigate = useNavigate();

  const [errorPagamento, setErrorPagamento] = useState(false);
  const [errorTroco, setErrorTroco] = useState(false);
  const [copiado, setCopiado] = useState(false);

  useEffect(() => {
    if (step < 3) navigate("/");
  }, [step, navigate]);

  // 💰 TOTAL
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

  // PIX
  const chavePix = "8896445671";

  const copiarPix = async () => {
    await navigator.clipboard.writeText(chavePix);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2000);
  };

  const continuar = () => {
    const erroPag = !pagamento;
    const erroTroco = pagamento === "dinheiro" && !troco;

    setErrorPagamento(erroPag);
    setErrorTroco(erroTroco);

    if (erroPag || erroTroco) return;

    setStep(4);
    navigate("/revisao");
  };

  return (
    <Container>
      <div className="content">
        {/* HERO */}
        <div className="hero">
          <img src="/banner.png" />
          <div className="hero-overlay">
            <div className="hero-title">Pagamento</div>
          </div>
        </div>

        <div className="form">
          {/* TOTAL */}
          <div className="total-box">
            <span>Total do pedido</span>
            <strong>R$ {total.toFixed(2)}</strong>
          </div>

          <span className="label">Forma de pagamento</span>

          {errorPagamento && (
            <p className="error-text">Selecione uma forma de pagamento</p>
          )}

          {/* PIX */}
          <div
            className={`input-box option ${
              pagamento === "pix" ? "active" : ""
            }`}
            onClick={() => {
              setPagamento("pix");
              setErrorPagamento(false);
            }}
          >
            <MdPix className="input-icon" />
            <span>Pix</span>
          </div>

          {/* PIX BOX */}
          {pagamento === "pix" && (
            <div className="pix-box fade-slide">
              <span className="label">Chave PIX</span>

              <div className="pix-content">
                <span className="pix-key">{chavePix}</span>

                <button className="pix-copy" onClick={copiarPix}>
                  {copiado ? "Copiado!" : "Copiar"}
                </button>
              </div>

              <p className="pix-info">
                Enviar comprovante para <strong>(88) 99644-5671</strong>
              </p>
            </div>
          )}

          {/* CARTÃO */}
          <div
            className={`input-box option ${
              pagamento === "cartao" ? "active" : ""
            }`}
            onClick={() => {
              setPagamento("cartao");
              setErrorPagamento(false);
            }}
          >
            <MdCreditCard className="input-icon" />
            <div>
              <span>Cartão</span>
              <p className="option-desc">
                Pagar com entregador na hora da entrega
              </p>
            </div>
          </div>

          {/* DINHEIRO */}
          <div
            className={`input-box option ${
              pagamento === "dinheiro" ? "active" : ""
            }`}
            onClick={() => {
              setPagamento("dinheiro");
              setErrorPagamento(false);
            }}
          >
            <MdAttachMoney className="input-icon" />
            <div>
              <span>Dinheiro</span>
              <p className="option-desc">
                Pagar com entregador na hora da entrega
              </p>
            </div>
          </div>

          {/* TROCO */}
          {pagamento === "dinheiro" && (
            <div className="fade-slide">
              <span className="label">Troco</span>

              <div className={`input-box ${errorTroco ? "error" : ""}`}>
                <input
                  placeholder="Troco para quanto?"
                  value={troco}
                  onChange={(e) => {
                    setTroco(e.target.value);
                    setErrorTroco(false);
                  }}
                />
              </div>

              {errorTroco && <p className="error-text">Informe o troco</p>}
            </div>
          )}
        </div>

        {/* FOOTER */}
        <div className="footer">
          <div style={{ display: "flex", gap: 10 }}>
            <button
              className="button cancel"
              onClick={() => navigate("/pedido")}
            >
              Voltar
            </button>

            <button className="button" onClick={continuar}>
              Revisar e confirmar
            </button>
          </div>
        </div>
      </div>
    </Container>
  );
}
