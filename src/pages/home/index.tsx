import { useNavigate } from "react-router-dom";
import { Container } from "./style";
import { usePedido } from "../../hook/usePedido";
import { useEffect, useState } from "react";
import { MdPerson, MdPhone, MdLocalShipping } from "react-icons/md";
import { MdKeyboardArrowDown } from "react-icons/md";
import { getStoreStatus } from "../../services/store";
import { StoreBlock } from "../StoreBlock";
export function Home() {
  const { setStep, setNome, setTelefone, setCidade, setEndereco } = usePedido();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [tipoEntrega, setTipoEntrega] = useState<"entrega" | "retirada" | null>(
    null,
  );
  const [loadingStore, setLoadingStore] = useState(true);
  const [store, setStore] = useState({
    aberto: true,
    altaDemanda: false,
    mensagem: "",
  });

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

  useEffect(() => {
    async function loadStore() {
      try {
        const data = await getStoreStatus();
        setStore(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingStore(false);
      }
    }

    loadStore();
  }, []);

  const formatarTelefone = (value: string) => {
    const nums = value.replace(/\D/g, "").slice(0, 11);
    if (nums.length <= 2) return `(${nums}`;
    if (nums.length <= 6) {
      return `(${nums.slice(0, 2)}) ${nums.slice(2)}`;
    }
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
        setEndereco({
          rua,
          numero,
          referencia,
        });
      }

      setStep(2);
      navigate("/pedido");
    }, 700);
  };
  if (loadingStore) {
    return null;
  }
  if (!store.aberto) {
    return <StoreBlock tipo="fechado" />;
  }
  if (store.altaDemanda) {
    return <StoreBlock tipo="demanda" />;
  }

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
          <div>
            <div className="label">Nome</div>
            <div className={`input-box ${errors.nome ? "error" : ""}`}>
              <MdPerson className="input-icon" />
              <input
                placeholder="Nome e sobrenome"
                value={nomeLocal}
                onChange={(e) => setNomeLocal(e.target.value)}
              />
            </div>
            {errors.nome && <p className="error-text">Campo obrigatório</p>}
          </div>
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
            <p className="error-text">Selecione uma opção</p>
          )}
          {tipoEntrega === "entrega" && (
            <div className="fade-slide">
              <div>
                <div className={`input-box ${errors.cidade ? "error" : ""}`}>
                  <MdLocalShipping className="input-icon" />
                  <select
                    value={cidadeLocal}
                    onChange={(e) => setCidadeLocal(e.target.value)}
                  >
                    <option value="">Selecione a cidade</option>
                    <option value="Cariús">Cariús</option>
                    <option value="Jucás">Jucás</option>
                  </select>
                  <MdKeyboardArrowDown className="select-arrow" />
                </div>

                {errors.cidade && (
                  <p className="error-text">Campo obrigatório</p>
                )}
              </div>

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
