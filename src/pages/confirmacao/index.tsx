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

          {/* WHATSAPP */}
          <button
            className="button whatsapp"
            onClick={() =>
              window.open(
                "https://wa.me/5588996445671?text=Olá,%20acabei%20de%20fazer%20um%20pedido%20😊",
                "_blank",
              )
            }
          >
            Falar no WhatsApp
          </button>

          {/* VOLTAR */}
          <button className="button" onClick={() => navigate("/")}>
            Voltar ao início
          </button>
        </div>
      </div>
    </Container>
  );
}
