import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { Container } from "./style";
import { usePedido } from "../../hook/usePedido";
import type { FormaPagamentoType } from "../../types/pedido";
import { MdPix, MdCreditCard, MdAttachMoney, MdCheckCircle, MdContentCopy, MdCancel } from "react-icons/md";
import { StepProgress } from "../../components/StepProgress";
import { criarPedido } from "../../services/orders";
import { combosDisponiveis } from "../../data/menu";

export function Pagamento() {
  const {
    step,
    setStep,
    nome,
    telefone,
    endereco,
    observacao,
    pagamento,
    setPagamento,
    troco,
    setTroco,
    semTroco,
    setSemTroco,
    itens,
    cidade,
  } = usePedido();
  const navigate = useNavigate();
  const [errorPagamento, setErrorPagamento] = useState(false);
  const [errorTroco, setErrorTroco] = useState(false);
  const [copiado, setCopiado] = useState(false);
  const [cardapioDesatualizado, setCardapioDesatualizado] = useState(false);

  const { mutate: enviarPedido, isPending } = useMutation({
    mutationFn: criarPedido,
    onSuccess: () => {
      setStep(4);
      navigate("/confirmacao", { state: { erro: false } });
    },
    onError: (err: Error) => {
      if (err.message === "CARDAPIO_DESATUALIZADO") {
        setCardapioDesatualizado(true);
        setTimeout(() => window.location.reload(), 5000);
        return;
      }
      navigate("/confirmacao", {
        state: { erro: true, mensagem: err.message || "Erro de conexão com servidor" },
      });
    },
  });

  useEffect(() => {
    if (step < 3) navigate("/");
  }, [step, navigate]);

  const subtotal = itens.reduce((acc, item) => acc + (item.combo?.preco ?? 0), 0);
  const adicional = itens.reduce((acc, item) => acc + (item.maioneseQtd ?? 0) * 0.99, 0);
  const adicionalRefri = itens.reduce((acc, item) => acc + (Array.isArray(item.refriExtra) ? item.refriExtra.reduce((a, r) => a + r.preco * r.qtd, 0) : 0), 0);
  const frete = cidade === "Cariús" ? 3 : cidade === "Jucás" ? 5 : 0;
  const taxaCartao = pagamento === "cartao" ? 1 : 0;
  const total = subtotal + adicional + adicionalRefri + frete + taxaCartao;

  useEffect(() => {
    if (semTroco && !troco) {
      setTroco(`R$ ${total.toFixed(2).replace(".", ",")}`);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [semTroco]);

  const chavePix = "88996445671";

  const copiarPix = async () => {
    await navigator.clipboard.writeText(chavePix);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2000);
  };

  const selecionar = (metodo: FormaPagamentoType) => {
    setPagamento(metodo);
    setErrorPagamento(false);
    if (metodo !== "dinheiro") { setTroco(""); setSemTroco(false); }
  };

  const continuar = () => {
    const idsValidos = new Set(combosDisponiveis.map((c) => c.id));
    if (itens.some((item) => !idsValidos.has(item.combo.id))) {
      setCardapioDesatualizado(true);
      setTimeout(() => window.location.reload(), 5000);
      return;
    }
    const erroPag = !pagamento;
    const erroTroco = pagamento === "dinheiro" && !semTroco && !troco;
    let trocoMenor = false;
    if (pagamento === "dinheiro" && troco && !semTroco) {
      const valorTroco = Number(troco.replace("R$", "").replace(/\./g, "").replace(",", "."));
      trocoMenor = valorTroco < total;
    }
    setErrorPagamento(erroPag);
    setErrorTroco(erroTroco || trocoMenor);
    if (erroPag || erroTroco || trocoMenor) return;

    enviarPedido({
      nomeCliente: nome,
      telefone,
      cidade,
      endereco: cidade !== "Retirada" ? endereco : null,
      itens,
      pagamento,
      troco: semTroco && !troco ? `R$ ${total.toFixed(2).replace(".", ",")}` : troco,
      observacao,
    });
  };

  const trocoRestante = troco
    ? Number(troco.replace("R$", "").replace(/\./g, "").replace(",", ".")) - total
    : null;

  return (
    <Container>
      {cardapioDesatualizado && (
        <div className="cardapio-overlay">
          <div className="cardapio-modal">
            <MdCancel className="cardapio-icon" />
            <h2 className="cardapio-title">Cardápio atualizado!</h2>
            <p className="cardapio-desc">
              O cardápio mudou desde que você abriu o app.<br />
              A página será recarregada automaticamente.
            </p>
            <div className="cardapio-bar-wrap">
              <div className="cardapio-bar" />
            </div>
            <span className="cardapio-hint">Recarregando em instantes…</span>
          </div>
        </div>
      )}
      <div className="content">
        <div className="desktop-side">
          <img src="/banner.png" alt="" onError={(e) => (e.currentTarget.style.display = "none")} />
          <div className="side-overlay">
            <div className="side-badge">🔥 Pedido online</div>
            <div className="side-title">Forno e Sabor</div>
            <p className="side-sub">Como você vai pagar?</p>
          </div>
        </div>

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
                Envie o comprovante para <strong>(88) 99644-5671</strong>
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
              <span className="troco-label">TROCO PARA:</span>
              {!semTroco && (
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
              )}
              {errorTroco && !semTroco && (
                <p className="error-text">
                  {trocoRestante !== null && trocoRestante < 0
                    ? `Valor insuficiente · falta R$ ${Math.abs(trocoRestante).toFixed(2).replace(".", ",")}`
                    : "Informe o valor do troco"}
                </p>
              )}
              {!semTroco && <div className="troco-ou">ou</div>}
              <div
                className={`troco-sem-troco${semTroco ? " active" : ""}`}
                onClick={() => {
                  const novoSemTroco = !semTroco;
                  setSemTroco(novoSemTroco);
                  if (novoSemTroco) {
                    setTroco(`R$ ${total.toFixed(2).replace(".", ",")}`);
                    setErrorTroco(false);
                  } else {
                    setTroco("");
                  }
                }}
              >
                <span className={`troco-sem-check${semTroco ? " checked" : ""}`} />
                Não precisa de troco
              </div>
            </div>
          )}
        </div>

        <div className="footer">
          <button className="button cancel" onClick={() => navigate("/pedido")}>
            Voltar
          </button>
          <button
            className={`button${isPending ? " loading" : ""}`}
            disabled={isPending}
            onClick={continuar}
          >
            {isPending ? <div className="spinner" /> : "Confirmar pedido"}
          </button>
        </div>
      </div>
    </Container>
  );
}
