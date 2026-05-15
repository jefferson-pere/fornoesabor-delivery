import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Container } from "./style";
import { usePedido } from "../../hook/usePedido";

const WHATSAPP = "5588996445671";

export function Confirmacao() {
  const navigate = useNavigate();
  const location = useLocation();
  const erro = location.state?.erro;
  const mensagem = location.state?.mensagem;
  const { resetPedido, nome } = usePedido();

  const [countdown, setCountdown] = useState(4);

  const abrirWhatsApp = useCallback(() => {
    const texto = encodeURIComponent(`Olá, sou ${nome} e acabei de fazer um pedido 😊`);
    window.location.replace(`whatsapp://send?phone=${WHATSAPP}&text=${texto}`);
  }, [nome]);

  useEffect(() => {
    if (erro) return;

    const interval = setInterval(() => {
      setCountdown((v) => v - 1);
    }, 1000);

    const timer = setTimeout(() => {
      clearInterval(interval);
      abrirWhatsApp();
      resetPedido();
    }, 4000);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [erro, abrirWhatsApp, resetPedido]);


  return (
    <Container erro={erro}>
      <div className="content">
        <div className="hero">
          <img src="/banner.png" onError={(e) => (e.currentTarget.style.display = "none")} />
          <div className="hero-overlay">
            <div className="hero-title">{erro ? "Erro no pedido" : "Pedido confirmado"}</div>
          </div>
        </div>

        <div className="card">
          {erro ? (
            <>
              <div className="icon-wrap error">
                <span className="icon-x">✕</span>
              </div>
              <h1>Falha no envio</h1>
              <p className="desc">
                {mensagem || "Não foi possível enviar o pedido."}<br />
                Tente novamente em instantes.
              </p>
              <button className="btn-primary" onClick={() => navigate(-1)}>
                Tentar novamente
              </button>
              <button className="btn-ghost" onClick={() => navigate("/")}>
                Voltar ao início
              </button>
            </>
          ) : (
            <>
              <div className="icon-wrap success">
                <svg className="check-svg" viewBox="0 0 52 52">
                  <circle className="check-circle" cx="26" cy="26" r="24" />
                  <path className="check-mark" d="M14 27 l8 8 l16-16" />
                </svg>
              </div>

              <h1>Pedido confirmado!</h1>
              <p className="desc">Seu pedido foi recebido com sucesso 🎉</p>

              <div className="countdown-bar">
                <div className="countdown-fill" style={{ animationDuration: "4s" }} />
              </div>
              <p className="countdown-text">
                Abrindo WhatsApp em <strong>{Math.max(countdown, 0)}s</strong>...
              </p>

              <button className="btn-whatsapp" onClick={abrirWhatsApp}>
                💬 Abrir WhatsApp agora
              </button>
              <button className="btn-ghost" onClick={() => { resetPedido(); navigate("/"); }}>
                Voltar ao início
              </button>
            </>
          )}
        </div>
      </div>
    </Container>
  );
}
