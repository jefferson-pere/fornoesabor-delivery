import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container } from "./style";
import { usePedido } from "../../hook/usePedido";
import { MdPix, MdCreditCard, MdAttachMoney, MdCheckCircle, MdContentCopy } from "react-icons/md";
import { StepProgress } from "../../components/StepProgress";

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

  const subtotal = itens.reduce((acc, item) => acc + item.combo.preco, 0);
  const adicional = itens.reduce((acc, item) => acc + item.maioneseQtd * 0.99, 0);
  const adicionalRefri = itens.reduce((acc, item) => acc + (item.refriExtra?.preco || 0), 0);
  const frete = cidade === "Cariús" ? 3 : cidade === "Jucás" ? 5 : 0;
  const taxaCartao = pagamento === "cartao" ? 1 : 0;
  const total = subtotal + adicional + adicionalRefri + frete + taxaCartao;

  const chavePix = "8896445671";

  const copiarPix = async () => {
    await navigator.clipboard.writeText(chavePix);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2000);
  };

  const selecionar = (metodo: string) => {
    setPagamento(metodo);
    setErrorPagamento(false);
    if (metodo !== "dinheiro") setTroco("");
  };

  const continuar = () => {
    const erroPag = !pagamento;
    const erroTroco = pagamento === "dinheiro" && !troco;
    let trocoMenor = false;
    if (pagamento === "dinheiro" && troco) {
      const valorTroco = Number(troco.replace("R$", "").replace(/\./g, "").replace(",", "."));
      trocoMenor = valorTroco < total;
    }
    setErrorPagamento(erroPag);
    setErrorTroco(erroTroco || trocoMenor);
    if (erroPag || erroTroco || trocoMenor) return;
    setStep(4);
    navigate("/revisao");
  };

  const trocoRestante = troco
    ? Number(troco.replace("R$", "").replace(/\./g, "").replace(",", ".")) - total
    : null;

  return (
    <Container>
      <div className="content">
        <StepProgress current={3} />

        <div className="page-header">
          <span className="page-title">Forma de pagamento</span>
        </div>

        <div className="form">
          {/* TOTAL */}
          <div className="total-box">
            <div className="total-info">
              <span className="total-label">Total do pedido</span>
              {taxaCartao > 0 && (
                <span className="total-note">inclui taxa de R$ 1,00 no cartão</span>
              )}
            </div>
            <span className="total-value">R$ {total.toFixed(2)}</span>
          </div>

          {errorPagamento && (
            <p className="error-text">Selecione uma forma de pagamento</p>
          )}

          {/* PIX */}
          <div
            className={`pay-card${pagamento === "pix" ? " active" : ""}`}
            onClick={() => selecionar("pix")}
          >
            <div className="pay-icon pix">
              <MdPix />
            </div>
            <div className="pay-info">
              <strong>PIX</strong>
              <span>Transferência instantânea</span>
            </div>
            {pagamento === "pix" && <MdCheckCircle className="pay-check" />}
          </div>

          {pagamento === "pix" && (
            <div className="pix-box fade-slide">
              <span className="pix-label">Chave PIX (telefone)</span>
              <div className="pix-row">
                <span className="pix-key">{chavePix}</span>
                <button className="pix-copy" onClick={copiarPix}>
                  <MdContentCopy />
                  {copiado ? "Copiado!" : "Copiar"}
                </button>
              </div>
              <p className="pix-tip">
                Após o pagamento, envie o comprovante para <strong>(88) 99644-5671</strong>
              </p>
            </div>
          )}

          {/* CARTÃO */}
          <div
            className={`pay-card${pagamento === "cartao" ? " active" : ""}`}
            onClick={() => selecionar("cartao")}
          >
            <div className="pay-icon card">
              <MdCreditCard />
            </div>
            <div className="pay-info">
              <strong>Cartão</strong>
              <span>Pagar na entrega · acréscimo de R$ 1,00</span>
            </div>
            {pagamento === "cartao" && <MdCheckCircle className="pay-check" />}
          </div>

          {/* DINHEIRO */}
          <div
            className={`pay-card${pagamento === "dinheiro" ? " active" : ""}`}
            onClick={() => selecionar("dinheiro")}
          >
            <div className="pay-icon cash">
              <MdAttachMoney />
            </div>
            <div className="pay-info">
              <strong>Dinheiro</strong>
              <span>Pagar na entrega</span>
            </div>
            {pagamento === "dinheiro" && <MdCheckCircle className="pay-check" />}
          </div>

          {pagamento === "dinheiro" && (
            <div className="troco-box fade-slide">
              <span className="troco-label">Precisa de troco?</span>
              <div className={`troco-input${errorTroco ? " error" : ""}`}>
                <span className="troco-prefix">R$</span>
                <input
                  placeholder="0,00"
                  inputMode="numeric"
                  value={troco.replace("R$ ", "")}
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
              {trocoRestante !== null && (
                <div className={`troco-result${trocoRestante < 0 ? " negative" : ""}`}>
                  {trocoRestante < 0
                    ? `Falta R$ ${Math.abs(trocoRestante).toFixed(2).replace(".", ",")}`
                    : `Troco: R$ ${trocoRestante.toFixed(2).replace(".", ",")}`}
                </div>
              )}
            </div>
          )}
        </div>

        <div className="footer">
          <button className="button cancel" onClick={() => navigate("/pedido")}>
            Voltar
          </button>
          <button className="button" onClick={continuar}>
            Revisar e confirmar
          </button>
        </div>
      </div>
    </Container>
  );
}
