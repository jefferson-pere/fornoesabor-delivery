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
    (acc, item) => acc + (item.refriExtra?.preco || 0),
    0,
  );

  const frete = cidade === "Cariús" ? 3 : cidade === "Jucás" ? 5 : 0;

  const taxaCartao = pagamento === "cartao" ? 1 : 0;

  const total = subtotal + adicional + adicionalRefri + frete + taxaCartao;

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

    let trocoMenor = false;

    if (pagamento === "dinheiro" && troco) {
      const valorTroco = Number(
        troco.replace("R$", "").replace(/\./g, "").replace(",", "."),
      );

      trocoMenor = valorTroco < total;
    }

    setErrorPagamento(erroPag);

    setErrorTroco(erroTroco || trocoMenor);

    if (erroPag || erroTroco || trocoMenor) {
      return;
    }

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
            <div className="hero-title">Forma de pagamento</div>
          </div>
        </div>

        <div className="form">
          {/* TOTAL */}
          <div className="total-box">
            <span>
              Total do pedido
              {pagamento === "cartao" && (
                <div
                  style={{
                    marginTop: 8,
                    fontSize: 13,
                    color: "#666",
                  }}
                >
                  + Taxa cartão: R$ 1,00
                </div>
              )}
            </span>

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
                <br /> Acescimo de R$ 1,00
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
                  placeholder="R$ 0,00"
                  value={troco}
                  onChange={(e) => {
                    let valor = e.target.value.replace(/\D/g, "");

                    valor = (Number(valor) / 100).toFixed(2);

                    valor = valor.replace(".", ",");

                    setTroco(`R$ ${valor}`);

                    setErrorTroco(false);
                  }}
                />
              </div>

              {errorTroco && (
                <p className="error-text">Valor insuficiente para o pedido</p>
              )}

              {troco &&
                (() => {
                  const valorTroco = Number(
                    troco
                      .replace("R$", "")
                      .replace(/\./g, "")
                      .replace(",", "."),
                  );

                  const restante = valorTroco - total;

                  return (
                    <div
                      style={{
                        marginTop: 10,
                        fontSize: 14,
                        fontWeight: 600,
                        color: restante < 0 ? "#ef4444" : "#16a34a",
                      }}
                    >
                      {restante < 0 ? "Falta:" : "Troco:"} R${" "}
                      {Math.abs(restante).toFixed(2).replace(".", ",")}
                    </div>
                  );
                })()}
            </div>
          )}

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
      </div>
    </Container>
  );
}
