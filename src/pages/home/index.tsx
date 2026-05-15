import { useNavigate } from "react-router-dom";
import { Container } from "./style";
import { usePedido } from "../../hook/usePedido";
import { useEffect, useState } from "react";
import { MdPhone, MdLocationOn, MdKeyboardArrowDown } from "react-icons/md";
import { getStoreStatus } from "../../services/store";
import { StoreBlock } from "../StoreBlock";
import { StepProgress } from "../../components/StepProgress";

export function Home() {
  const {
    setStep,
    setNome,
    setTelefone,
    setCidade,
    setEndereco,
    nome,
    telefone,
    cidade,
    endereco,
  } = usePedido();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [tipoEntrega, setTipoEntrega] = useState<"entrega" | "retirada" | null>(
    cidade === "Retirada"
      ? "retirada"
      : cidade
        ? "entrega"
        : (localStorage.getItem("cliente_tipoEntrega") as "entrega" | "retirada" | null) || null,
  );
  const [loadingStore, setLoadingStore] = useState(true);
  const [store, setStore] = useState({ aberto: true, altaDemanda: false, mensagem: "" });

  const [nomeLocal, setNomeLocal] = useState(() => {
    if (nome) return nome.split(" ")[0] || "";
    return localStorage.getItem("cliente_nome") || "";
  });
  const [sobrenomeLocal, setSobrenomeLocal] = useState(() => {
    if (nome) return nome.split(" ").slice(1).join(" ") || "";
    return localStorage.getItem("cliente_sobrenome") || "";
  });
  const [telefoneLocal, setTelefoneLocal] = useState(
    () => telefone || localStorage.getItem("cliente_telefone") || "",
  );
  const [cidadeLocal, setCidadeLocal] = useState(
    cidade === "Retirada" ? "" : cidade || localStorage.getItem("cliente_cidade") || "",
  );
  const [rua, setRua] = useState(
    () => endereco.rua || localStorage.getItem("cliente_rua") || "",
  );
  const [numero, setNumero] = useState(
    () => endereco.numero || localStorage.getItem("cliente_numero") || "",
  );
  const [referencia, setReferencia] = useState(
    () => endereco.referencia || localStorage.getItem("cliente_referencia") || "",
  );
  const [errors, setErrors] = useState({
    nome: false,
    sobrenome: false,
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
    if (nums.length <= 6) return `(${nums.slice(0, 2)}) ${nums.slice(2)}`;
    return `(${nums.slice(0, 2)}) ${nums.slice(2, 7)}-${nums.slice(7)}`;
  };

  const handleContinuar = () => {
    const newErrors = {
      nome: !nomeLocal.trim(),
      sobrenome: !sobrenomeLocal.trim(),
      telefone: telefoneLocal.replace(/\D/g, "").length < 10,
      tipoEntrega: !tipoEntrega,
      cidade: tipoEntrega === "entrega" && !cidadeLocal,
      rua: tipoEntrega === "entrega" && !rua.trim(),
      numero: tipoEntrega === "entrega" && !numero.trim(),
      referencia: tipoEntrega === "entrega" && !referencia.trim(),
    };
    setErrors(newErrors);
    if (Object.values(newErrors).some(Boolean)) return;

    setLoading(true);
    setTimeout(() => {
      const nomeCompleto = `${nomeLocal.trim()} ${sobrenomeLocal.trim()}`;
      setNome(nomeCompleto);
      setTelefone(telefoneLocal);

      localStorage.setItem("cliente_nome", nomeLocal.trim());
      localStorage.setItem("cliente_sobrenome", sobrenomeLocal.trim());
      localStorage.setItem("cliente_telefone", telefoneLocal);
      localStorage.setItem("cliente_tipoEntrega", tipoEntrega || "");

      if (tipoEntrega === "retirada") {
        setCidade("Retirada");
        setEndereco({ rua: "", numero: "", referencia: "" });
        localStorage.removeItem("cliente_cidade");
        localStorage.removeItem("cliente_rua");
        localStorage.removeItem("cliente_numero");
        localStorage.removeItem("cliente_referencia");
      } else {
        setCidade(cidadeLocal);
        setEndereco({ rua: rua.trim(), numero: numero.trim(), referencia: referencia.trim() });
        localStorage.setItem("cliente_cidade", cidadeLocal);
        localStorage.setItem("cliente_rua", rua.trim());
        localStorage.setItem("cliente_numero", numero.trim());
        localStorage.setItem("cliente_referencia", referencia.trim());
      }
      setStep(2);
      navigate("/pedido");
    }, 700);
  };

  if (loadingStore) return null;
  if (!store.aberto) return <StoreBlock tipo="fechado" />;
  if (store.altaDemanda) return <StoreBlock tipo="demanda" />;

  return (
    <Container>
      <div className="content">

        {/* HERO */}
        <div className="hero">
          <img
            src="/banner.png"
            onError={(e) => (e.currentTarget.style.display = "none")}
          />
          <div className="hero-overlay">
            <div className="hero-badge">🔥 Pedido online</div>
            <div className="hero-title">Forno e Sabor</div>
            <p className="hero-sub">Esfihas artesanais fresquinhas pra você</p>
          </div>
        </div>

        <StepProgress current={1} />

        {/* FORM */}
        <div className="form">

          {/* NOME */}
          <div className="field-group">
            <div className="name-row">
              <div className="field">
                <label className="label">Nome</label>
                <div className={`input-box${errors.nome ? " error" : ""}`}>
                  <input
                    placeholder="nome"
                    value={nomeLocal}
                    onChange={(e) => {
                      setNomeLocal(e.target.value);
                      setErrors((er) => ({ ...er, nome: false }));
                    }}
                  />
                </div>
                {errors.nome && <p className="error-text">Obrigatório</p>}
              </div>
              <div className="field">
                <label className="label">Sobrenome</label>
                <div className={`input-box${errors.sobrenome ? " error" : ""}`}>
                  <input
                    placeholder="sobrenome"
                    value={sobrenomeLocal}
                    onChange={(e) => {
                      setSobrenomeLocal(e.target.value);
                      setErrors((er) => ({ ...er, sobrenome: false }));
                    }}
                  />
                </div>
                {errors.sobrenome && <p className="error-text">Obrigatório</p>}
              </div>
            </div>
          </div>

          {/* TELEFONE */}
          <div className="field">
            <label className="label">Telefone</label>
            <div className={`input-box${errors.telefone ? " error" : ""}`}>
              <MdPhone className="input-icon" />
              <input
                type="tel"
                inputMode="numeric"
                placeholder="(00) 00000-0000"
                value={telefoneLocal}
                onChange={(e) => {
                  setTelefoneLocal(formatarTelefone(e.target.value));
                  setErrors((er) => ({ ...er, telefone: false }));
                }}
              />
            </div>
            {errors.telefone && <p className="error-text">Telefone inválido</p>}
          </div>

          {/* TIPO DE ENTREGA */}
          <div className="field">
            <label className="label">Tipo de entrega</label>
            <div className={`delivery-options${errors.tipoEntrega ? " error" : ""}`}>
              <div
                className={`delivery-btn${tipoEntrega === "entrega" ? " active" : ""}`}
                onClick={() => {
                  setTipoEntrega("entrega");
                  setErrors((er) => ({ ...er, tipoEntrega: false }));
                }}
              >
                <span className="delivery-icon">🛵</span>
                <span className="delivery-label">Entrega</span>
                <span className="delivery-sub">Cariús · Jucás</span>
              </div>
              <div
                className={`delivery-btn${tipoEntrega === "retirada" ? " active" : ""}`}
                onClick={() => {
                  setTipoEntrega("retirada");
                  setErrors((er) => ({ ...er, tipoEntrega: false }));
                }}
              >
                <span className="delivery-icon">📍</span>
                <span className="delivery-label">Retirada</span>
                <span className="delivery-sub">No local · Grátis</span>
              </div>
            </div>
            {errors.tipoEntrega && <p className="error-text">Selecione uma opção</p>}
          </div>

          {/* ENDEREÇO */}
          {tipoEntrega === "entrega" && (
            <div className="fade-slide address-block">
              <div className="field">
                <label className="label">Cidade</label>
                <div className={`input-box${errors.cidade ? " error" : ""}`}>
                  <MdLocationOn className="input-icon" />
                  <select
                    value={cidadeLocal}
                    onChange={(e) => {
                      setCidadeLocal(e.target.value);
                      setErrors((er) => ({ ...er, cidade: false }));
                    }}
                  >
                    <option value="">Selecione</option>
                    <option value="Cariús">Cariús — frete R$ 3,00</option>
                    <option value="Jucás">Jucás — frete R$ 5,00</option>
                  </select>
                  <MdKeyboardArrowDown className="select-arrow" />
                </div>
                {errors.cidade && <p className="error-text">Obrigatório</p>}
              </div>

              <div className="rua-numero-row">
                <div className="field rua-field">
                  <label className="label">Rua</label>
                  <div className={`input-box${errors.rua ? " error" : ""}`}>
                    <input
                      placeholder="Nome da rua"
                      value={rua}
                      onChange={(e) => {
                        setRua(e.target.value);
                        setErrors((er) => ({ ...er, rua: false }));
                      }}
                    />
                  </div>
                  {errors.rua && <p className="error-text">Obrigatório</p>}
                </div>
                <div className="field numero-field">
                  <label className="label">Nº</label>
                  <div className={`input-box${errors.numero ? " error" : ""}`}>
                    <input
                      type="number"
                      placeholder="0"
                      value={numero}
                      onChange={(e) => {
                        setNumero(e.target.value);
                        setErrors((er) => ({ ...er, numero: false }));
                      }}
                    />
                  </div>
                  {errors.numero && <p className="error-text">Obrig.</p>}
                </div>
              </div>

              <div className="field">
                <label className="label">Referência</label>
                <div className={`input-box${errors.referencia ? " error" : ""}`}>
                  <input
                    placeholder="Ex: próximo ao mercado"
                    value={referencia}
                    onChange={(e) => {
                      setReferencia(e.target.value);
                      setErrors((er) => ({ ...er, referencia: false }));
                    }}
                  />
                </div>
                {errors.referencia && <p className="error-text">Obrigatório</p>}
              </div>
            </div>
          )}

          <div className="footer">
            <button
              className={`button${loading ? " loading" : ""}`}
              onClick={handleContinuar}
              disabled={loading}
            >
              {loading ? <div className="spinner" /> : "Fazer pedido →"}
            </button>
          </div>
        </div>
      </div>
    </Container>
  );
}
