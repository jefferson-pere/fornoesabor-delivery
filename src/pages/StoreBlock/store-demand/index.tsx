import { GiFlame } from "react-icons/gi";
import { Container } from "./style";
import { BiBell, BiCheckCircle } from "react-icons/bi";

// type Props = {
//   mensagem: string;
// };

export function StoreDemand() {
  return (
    <Container>
      <div className="demanda-card">
        <div className="hero">
          <img src="/banner.png" />
        </div>
        <div className="status-badge">
          <GiFlame size={28} />
          <span>ALTA DEMANDA</span>
        </div>

        <p className="descricao">
          Devido à alta demanda, os pedidos estão levando um pouco mais de tempo
          para serem preparados. Agradecemos sua paciência e garantimos que cada
          esfiha está sendo feita com todo cuidado e qualidade que você merece.
        </p>

        <div className="tempo-box">
          <span className="tempo-label">PODEMOS VOLTAR A QUALQUER MOMENTO</span>

          {/* <h2>
            25-30 <span>MIN</span>
          </h2> */}

          <div className="linha" />

          <div className="info-item">
            <BiCheckCircle size={16} />
            <p>Pedidos priorizados por ordem de chegada</p>
          </div>
        </div>

        <button className="notify-btn">
          WHATSAPP
          <BiBell size={18} />
        </button>

        <p className="footer-text">
          FIQUE DE OLHO, PODEMOS VOLTAR A QUALQUER MOMENTO!
        </p>
      </div>
    </Container>
  );
}
