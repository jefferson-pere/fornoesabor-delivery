import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { combosDisponiveis, saboresLista, saboresRefri } from "../../../data/menu";
import {
  buildDefaultConfig,
  getMenuConfig,
  resetMenuConfig,
  updateMenuConfig,
  type MenuDisponibilidade,
} from "../../../services/menu";
import { Container } from "./style";

export function Configuracoes() {
  const navigate = useNavigate();
  const [config, setConfig] = useState<MenuDisponibilidade>(buildDefaultConfig());
  const [loading, setLoading] = useState(true);
  const [resetting, setResetting] = useState(false);

  useEffect(() => {
    const defaults = buildDefaultConfig();
    getMenuConfig()
      .then((data) => {
        setConfig({
          combos: { ...defaults.combos, ...data.combos },
          sabores: { ...defaults.sabores, ...data.sabores },
          refriLata: { ...defaults.refriLata, ...data.refriLata },
          refri1l: { ...defaults.refri1l, ...data.refri1l },
          maionese: data.maionese !== false,
          maioneseTemperada: data.maioneseTemperada !== false,
          maioneseBacon: data.maioneseBacon !== false,
          ultimoReset: data.ultimoReset,
        });
      })
      .catch(() => toast.error("Erro ao carregar configurações"))
      .finally(() => setLoading(false));
  }, []);

  async function toggle(section: keyof MenuDisponibilidade, key: string) {
    const newConfig = {
      ...config,
      [section]: { ...(config[section] as Record<string, boolean>), [key]: !(config[section] as Record<string, boolean>)[key] },
    };
    setConfig(newConfig);
    try {
      await updateMenuConfig(newConfig);
      toast.success("Salvo!");
    } catch {
      toast.error("Erro ao salvar");
      setConfig(config);
    }
  }

  async function toggleBoolField(field: "maionese" | "maioneseTemperada" | "maioneseBacon") {
    const newConfig = { ...config, [field]: !config[field] };
    setConfig(newConfig);
    try {
      await updateMenuConfig(newConfig);
      toast.success("Salvo!");
    } catch {
      toast.error("Erro ao salvar");
      setConfig(config);
    }
  }

  async function handleReset() {
    if (!confirm("Resetar tudo e deixar todos os itens disponíveis?")) return;
    setResetting(true);
    try {
      const novo = await resetMenuConfig();
      setConfig(novo);
      toast.success("Tudo disponível!");
    } catch {
      toast.error("Erro ao resetar");
    } finally {
      setResetting(false);
    }
  }

  if (loading) {
    return (
      <Container>
        <div className="topo">
          <button className="btn-back" onClick={() => navigate("/painel")}>
            ← Voltar
          </button>
        </div>
        <div className="loading">Carregando...</div>
      </Container>
    );
  }

  return (
    <Container>
      <div className="topo">
        <button className="btn-back" onClick={() => navigate("/painel")}>
          ← Voltar
        </button>
        <div className="topo-title">
          <h1>Configurações do cardápio</h1>
          <p>Marque os itens disponíveis para os clientes</p>
        </div>
      </div>

      <div className="reset-bar">
        <div className="reset-info">
          <span className="reset-label">Reset automático diário</span>
          <span className="reset-sub">
            {config.ultimoReset
              ? `Último reset: ${config.ultimoReset}`
              : "Nunca resetado automaticamente"}
          </span>
        </div>
        <button
          className="btn-reset"
          onClick={handleReset}
          disabled={resetting}
        >
          {resetting ? "Resetando..." : "↺ Resetar tudo"}
        </button>
      </div>

      <div className="sections">
        {/* COMBOS + MAIONESE */}
        <div className="card">
          <div className="card-title">Combos</div>
          <div className="items-list">
            {combosDisponiveis.map((c) => {
              const disponivel = config.combos[String(c.id)] !== false;
              return (
                <div key={c.id} className={`item-row${disponivel ? "" : " off"}`}>
                  <div className="item-info">
                    <span className="item-name">{c.nomeRef}</span>
                    <span className="item-sub">{c.nome.split(" - ")[1]}</span>
                  </div>
                  <button
                    className={`toggle${disponivel ? " on" : ""}`}
                    onClick={() => toggle("combos", String(c.id))}
                  >
                    {disponivel ? "✓ Disponível" : "✕ Indisponível"}
                  </button>
                </div>
              );
            })}
          </div>

          <div className="card-subtitle">Maionese</div>
          <div className="items-list">
            <div className={`item-row${config.maioneseTemperada !== false ? "" : " off"}`}>
              <div className="item-info">
                <span className="item-name">Maionese temperada</span>
                <span className="item-sub">40g · R$ 0,99</span>
              </div>
              <button
                className={`toggle${config.maioneseTemperada !== false ? " on" : ""}`}
                onClick={() => toggleBoolField("maioneseTemperada")}
              >
                {config.maioneseTemperada !== false ? "✓ Disponível" : "✕ Indisponível"}
              </button>
            </div>
            <div className={`item-row${config.maioneseBacon !== false ? "" : " off"}`}>
              <div className="item-info">
                <span className="item-name">Maionese de bacon</span>
                <span className="item-sub">30g · R$ 0,99</span>
              </div>
              <button
                className={`toggle${config.maioneseBacon !== false ? " on" : ""}`}
                onClick={() => toggleBoolField("maioneseBacon")}
              >
                {config.maioneseBacon !== false ? "✓ Disponível" : "✕ Indisponível"}
              </button>
            </div>
          </div>
        </div>

        {/* SABORES */}
        <div className="card">
          <div className="card-title">Sabores</div>
          <div className="items-list">
            {saboresLista.map((s) => {
              const disponivel = config.sabores[s] !== false;
              return (
                <div key={s} className={`item-row${disponivel ? "" : " off"}`}>
                  <span className="item-name">{s}</span>
                  <button
                    className={`toggle${disponivel ? " on" : ""}`}
                    onClick={() => toggle("sabores", s)}
                  >
                    {disponivel ? "✓ Disponível" : "✕ Indisponível"}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* REFRIGERANTES */}
        <div className="card">
          <div className="card-title">Refrigerantes</div>

          <div className="card-subtitle">Lata (250ml)</div>
          <div className="items-list">
            {saboresRefri.lata.map((r) => {
              const disponivel = config.refriLata[r] !== false;
              return (
                <div key={r} className={`item-row${disponivel ? "" : " off"}`}>
                  <span className="item-name">{r}</span>
                  <button
                    className={`toggle${disponivel ? " on" : ""}`}
                    onClick={() => toggle("refriLata", r)}
                  >
                    {disponivel ? "✓ Disponível" : "✕ Indisponível"}
                  </button>
                </div>
              );
            })}
          </div>

          <div className="card-subtitle">1L</div>
          <div className="items-list">
            {saboresRefri["1l"].map((r) => {
              const disponivel = config.refri1l[r] !== false;
              return (
                <div key={r} className={`item-row${disponivel ? "" : " off"}`}>
                  <span className="item-name">{r}</span>
                  <button
                    className={`toggle${disponivel ? " on" : ""}`}
                    onClick={() => toggle("refri1l", r)}
                  >
                    {disponivel ? "✓ Disponível" : "✕ Indisponível"}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Container>
  );
}
