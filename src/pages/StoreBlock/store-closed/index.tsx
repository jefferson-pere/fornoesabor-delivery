import { Container } from "./style";
import { LuClock3 } from "react-icons/lu";

export function StoreClosed() {
  return (
    <Container>
      <div className="content">

        <div className="hero">
          <img src="/banner.png" onError={(e) => (e.currentTarget.style.display = "none")} />
          <div className="hero-overlay">
            <div className="hero-badge">🔒 Loja fechada</div>
            <div className="hero-title">Estamos Fechados</div>
            <p className="hero-sub">Voltamos em breve com nossas esfihas 🫶</p>
          </div>
        </div>

        <div className="body">
          <p className="descricao">
            A <strong>Forno e Sabor</strong> agradece pela sua preferência.
            Em breve estaremos de volta com nossas deliciosas esfihas artesanais.
          </p>

          <div className="horario-box">
            <div className="horario-header">
              <LuClock3 size={16} />
              <span>Horário de funcionamento</span>
            </div>

            <div className="horario-row">
              <span className="dias">Quarta a Segunda</span>
              <div className="horario-pills">
                <span className="pill open">18:00</span>
                <span className="separador">–</span>
                <span className="pill open">22:00</span>
              </div>
            </div>

            <div className="divider" />

            <div className="horario-row">
              <span className="dias">Terça</span>
              <span className="pill closed">Fechado</span>
            </div>
          </div>

          <p className="footer-text">Obrigado pela preferência! 🙌</p>
        </div>

      </div>
    </Container>
  );
}
