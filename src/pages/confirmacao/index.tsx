import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Container } from "./style";
import { MdCheckCircle } from "react-icons/md";
import { usePedido } from "../../hook/usePedido";
import { BiSolidError } from "react-icons/bi";
export function Confirmacao() {
  const navigate = useNavigate();
  const location = useLocation();
  const { resetPedido } = usePedido();
  const erro = location.state?.erro;
  const mensagem = location.state?.mensagem;

  useEffect(() => {
    resetPedido();
    if (!erro) {
      window.location.href =
        "https://wa.me/5588996445671?text=Olá,%20acabei%20de%20fazer%20um%20pedido%20😊";
    }
  }, [resetPedido, erro]);
  return (
    <Container>
      <div className="content">
        <div className="hero">
          <img src="/banner.png" />
          <div className="hero-overlay">
            <div className="hero-title">
              {erro ? "Erro no pedido" : "Pedido confirmado"}
            </div>
          </div>
        </div>
        <div className="card">
          {erro ? (
            <BiSolidError className="icon icon-error" />
          ) : (
            <MdCheckCircle className="icon" />
          )}
          <h1>{erro ? "Falha ao enviar pedido" : "Pedido enviado!"}</h1>
          <p>
            {erro ? (
              <>
                {mensagem}
                <br />
                Tente novamente em alguns instantes.
              </>
            ) : (
              <>
                Seu pedido foi recebido com sucesso 🎉
                <br />
                Você será redirecionado para o WhatsApp...
              </>
            )}
          </p>
          <div className="info">
            <span>
              {erro
                ? "Não foi possível concluir o envio"
                : "Obrigado pela preferência 🙌"}
            </span>
          </div>
          {!erro && (
            <button
              className="button whatsapp"
              onClick={() =>
                window.open(
                  "https://wa.me/5588996445671?text=Olá,%20acabei%20de%20fazer%20um%20pedido!",
                  "_blank",
                )
              }
            >
              Abrir WhatsApp
            </button>
          )}
          <button className="button" onClick={() => navigate("/")}>
            Voltar ao início
          </button>
        </div>
      </div>
    </Container>
  );
}
