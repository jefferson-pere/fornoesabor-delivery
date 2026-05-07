import { FiAlertCircle } from "react-icons/fi";
import { Container } from "./style";
import { LuClock3 } from "react-icons/lu";

// type Props = {
//   mensagem: string;
// };

export function StoreClosed() {
  return (
    <Container>
      <div className="fechado-card">
        <div className="hero">
          <img src="/banner.png" />
        </div>
        <div className="aviso-badge">
          <FiAlertCircle size={16} />
          <span>AVISO</span>
        </div>

        <h1>
          ESTAMOS <br />
          FECHADOS
        </h1>

        <div className="linha" />

        <p className="descricao">
          A Forno e Sabor agradece
          <br />
          pela sua preferência.
          <br />
          Em breve estaremos de volta
          <br />
          com nossas deliciosas esfihas
          <br />
          artesanais feitas com carinho.
        </p>

        <div className="horario-box">
          <div className="horario-title">
            <LuClock3 size={18} />
            <span>HORÁRIO DE FUNCIONAMENTO</span>
          </div>

          <div className="horario-item">
            <strong>QUINTA A SEGUNDA</strong>

            <div className="horario-time">
              <span>18:00</span>
              <span>23:00</span>
            </div>
          </div>

          <div className="horario-item">
            <strong>TERÇA E QUARTA</strong>

            <div className="horario-time">
              <span>FECHADO</span>
            </div>
          </div>
        </div>
        <p className="footer-text">OBRIGADO PELA PREFERÊNCIA!</p>
      </div>
    </Container>
  );
}
