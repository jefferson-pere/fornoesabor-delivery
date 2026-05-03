import { useNavigate } from "react-router-dom";
import { Container } from "./style";
import { usePedido } from "../../hook/usePedido";
import { useState } from "react";

import { MdPerson, MdPhone, MdLocalShipping } from "react-icons/md";
import { MdKeyboardArrowDown } from "react-icons/md";

export function Home() {
  const { setStep, setNome, setTelefone, setCidade, setEndereco } = usePedido();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [tipoEntrega, setTipoEntrega] = useState<"entrega" | "retirada" | null>(
    null,
  );

  const [nomeLocal, setNomeLocal] = useState("");
  const [telefoneLocal, setTelefoneLocal] = useState("");

  const [cidadeLocal, setCidadeLocal] = useState("");
  const [rua, setRua] = useState("");
  const [numero, setNumero] = useState("");
  const [referencia, setReferencia] = useState("");

  const [errors, setErrors] = useState({
    nome: false,
    telefone: false,
    cidade: false,
    rua: false,
    numero: false,
    referencia: false,
    tipoEntrega: false,
  });

  const formatarTelefone = (value: string) => {
    const nums = value.replace(/\D/g, "").slice(0, 11);

    if (nums.length <= 2) return `(${nums}`;
    if (nums.length <= 6) return `(${nums.slice(0, 2)}) ${nums.slice(2)}`;

    return `(${nums.slice(0, 2)}) ${nums.slice(2, 7)}-${nums.slice(7)}`;
  };

  const handleContinuar = () => {
    const newErrors = {
      nome: !nomeLocal,
      telefone: telefoneLocal.replace(/\D/g, "").length < 10,
      tipoEntrega: !tipoEntrega,

      cidade: tipoEntrega === "entrega" && !cidadeLocal,
      rua: tipoEntrega === "entrega" && !rua,
      numero: tipoEntrega === "entrega" && !numero,
      referencia: tipoEntrega === "entrega" && !referencia,
    };

    setErrors(newErrors);
    if (Object.values(newErrors).some(Boolean)) return;

    setLoading(true);

    setTimeout(() => {
      setNome(nomeLocal);
      setTelefone(telefoneLocal);

      if (tipoEntrega === "retirada") {
        setCidade("Retirada");
      } else {
        setCidade(cidadeLocal);
        setEndereco({ rua, numero, referencia });
      }

      setStep(2);
      navigate("/pedido");
    }, 700);
  };

  return (
    <Container>
      <div className="content">
        <div className="hero">
          <img
            src="/banner.png"
            onError={(e) => (e.currentTarget.style.display = "none")}
          />
          <div className="hero-overlay">
            <div className="hero-title">Seja bem-vindo(a)</div>
            <p>Agilize seu pedido e aproveite nosso cardápio</p>
          </div>
        </div>

        <div className="form">
          {/* NOME */}
          <div>
            <div className="label">Nome</div>
            <div className={`input-box ${errors.nome ? "error" : ""}`}>
              <MdPerson className="input-icon" />
              <input
                placeholder="Nome de sobrenome"
                value={nomeLocal}
                onChange={(e) => setNomeLocal(e.target.value)}
              />
            </div>
            {errors.nome && <p className="error-text">Campo obrigatório</p>}
          </div>

          {/* TELEFONE */}
          <div>
            <div className="label">Telefone</div>
            <div className={`input-box ${errors.telefone ? "error" : ""}`}>
              <MdPhone className="input-icon" />
              <input
                placeholder="(00) 00000-0000"
                value={telefoneLocal}
                onChange={(e) =>
                  setTelefoneLocal(formatarTelefone(e.target.value))
                }
              />
            </div>
            {errors.telefone && <p className="error-text">Telefone inválido</p>}
          </div>

          {/* ENTREGA */}
          <div
            className={`delivery-options ${errors.tipoEntrega ? "error" : ""}`}
          >
            <div
              className={`delivery-btn ${
                tipoEntrega === "entrega" ? "active" : ""
              }`}
              onClick={() => setTipoEntrega("entrega")}
            >
              🛵 Entrega
            </div>

            <div
              className={`delivery-btn ${
                tipoEntrega === "retirada" ? "active" : ""
              }`}
              onClick={() => setTipoEntrega("retirada")}
            >
              📍 Retirada no local
            </div>
          </div>

          {errors.tipoEntrega && (
            <p className="error-text">Selecione uma opção de entrega</p>
          )}

          {/* CAMPOS ENTREGA */}
          {tipoEntrega === "entrega" && (
            <div className="fade-slide">
              {/* CIDADE */}
              <div>
                <div className={`input-box ${errors.cidade ? "error" : ""}`}>
                  <MdLocalShipping className="input-icon" />
                  <select
                    value={cidadeLocal}
                    onChange={(e) => setCidadeLocal(e.target.value)}
                  >
                    <option value="">Selecione a opção</option>
                    <option value="Cariús">Cariús</option>
                    <option value="Jucás">Jucás</option>
                  </select>
                  <MdKeyboardArrowDown className="select-arrow" />
                </div>
                {errors.cidade && (
                  <p className="error-text">Campo obrigatório</p>
                )}
              </div>

              {/* RUA */}
              <div>
                <div className={`input-box ${errors.rua ? "error" : ""}`}>
                  <input
                    placeholder="Rua"
                    value={rua}
                    onChange={(e) => setRua(e.target.value)}
                  />
                </div>
                {errors.rua && <p className="error-text">Campo obrigatório</p>}
              </div>

              {/* NÚMERO */}
              <div>
                <div className={`input-box ${errors.numero ? "error" : ""}`}>
                  <input
                    placeholder="Número"
                    value={numero}
                    onChange={(e) => setNumero(e.target.value)}
                  />
                </div>
                {errors.numero && (
                  <p className="error-text">Campo obrigatório</p>
                )}
              </div>

              {/* REFERÊNCIA */}
              <div>
                <div
                  className={`input-box ${errors.referencia ? "error" : ""}`}
                >
                  <input
                    placeholder="Referência"
                    value={referencia}
                    onChange={(e) => setReferencia(e.target.value)}
                  />
                </div>
                {errors.referencia && (
                  <p className="error-text">Campo obrigatório</p>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="footer">
          <button
            className={`button ${loading ? "loading" : ""}`}
            onClick={handleContinuar}
          >
            {loading ? <div className="spinner" /> : "Fazer pedido →"}
          </button>
        </div>
      </div>
    </Container>
  );
}
