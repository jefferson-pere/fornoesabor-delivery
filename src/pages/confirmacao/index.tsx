import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container } from "./style";
import { MdCheckCircle } from "react-icons/md";
import { usePedido } from "../../hook/usePedido";

export function Confirmacao() {
  const navigate = useNavigate();
  const { resetPedido } = usePedido();

  useEffect(() => {
    resetPedido();
  }, [resetPedido]);

  return (
    <Container>
      <div className="content">
        {/* HERO */}
        <div className="hero">
          <img src="/banner.png" />
          <div className="hero-overlay">
            <div className="hero-title">Pedido confirmado</div>
          </div>
        </div>

        {/* CARD */}
        <div className="card">
          <MdCheckCircle className="icon" />

          <h1>Pedido enviado!</h1>

          <p>
            Seu pedido foi recebido com sucesso 🎉 <br />
            Em breve entraremos em contato.
          </p>

          <div className="info">
            <span>Obrigado pela preferência 🙌</span>
          </div>

          <button className="button" onClick={() => navigate("/")}>
            Voltar ao início
          </button>
        </div>
      </div>
    </Container>
  );
}
