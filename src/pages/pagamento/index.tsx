import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container } from "./style";
import { usePedido } from "../../hook/usePedido";

export function Pagamento() {
  const { step, setStep, pagamento, setPagamento, troco, setTroco } =
    usePedido();

  const navigate = useNavigate();

  // 🔒 proteção
  useEffect(() => {
    if (step < 3) navigate("/");
  }, [step, navigate]);

  const continuar = () => {
    if (!pagamento) {
      return alert("Escolha a forma de pagamento");
    }

    if (pagamento === "dinheiro" && !troco) {
      return alert("Informe o troco");
    }

    setStep(4);
    navigate("/confirmacao");
  };

  return (
    <Container>
      <div className="content">
        <div className="header">💳 Pagamento</div>

        <div className="section">
          <div className="title">Forma de pagamento</div>

          <div
            className={`option ${pagamento === "pix" ? "selected" : ""}`}
            onClick={() => setPagamento("pix")}
          >
            Pix
          </div>

          <div
            className={`option ${pagamento === "cartao" ? "selected" : ""}`}
            onClick={() => setPagamento("cartao")}
          >
            Cartão
          </div>

          <div
            className={`option ${pagamento === "dinheiro" ? "selected" : ""}`}
            onClick={() => setPagamento("dinheiro")}
          >
            Dinheiro
          </div>

          {pagamento === "dinheiro" && (
            <input
              className="input"
              placeholder="Troco para quanto?"
              value={troco}
              onChange={(e) => setTroco(e.target.value)}
            />
          )}
        </div>
      </div>

      <div className="footer">
        <button className="button" onClick={continuar}>
          Continuar
        </button>
      </div>
    </Container>
  );
}
