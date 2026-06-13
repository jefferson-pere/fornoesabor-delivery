import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { combosDisponiveis, saboresLista, saboresRefri } from "../../../data/menu";
import { getMenuConfig, updateMenuConfig, type MenuDisponibilidade } from "../../../services/menu";
import { Container } from "./style";

const DEFAULT_CONFIG: MenuDisponibilidade = {
  combos: Object.fromEntries(combosDisponiveis.map((c) => [String(c.id), true])),
  sabores: Object.fromEntries(saboresLista.map((s) => [s, true])),
  refriLata: Object.fromEntries(saboresRefri.lata.map((r) => [r, true])),
  refri1l: Object.fromEntries(saboresRefri["1l"].map((r) => [r, true])),
  maionese: true,
};

export function Configuracoes() {
  const navigate = useNavigate();
  const [config, setConfig] = useState<MenuDisponibilidade>(DEFAULT_CONFIG);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMenuConfig()
      .then((data) => {
        setConfig({
          combos: { ...DEFAULT_CONFIG.combos, ...data.combos },
          sabores: { ...DEFAULT_CONFIG.sabores, ...data.sabores },
          refriLata: { ...DEFAULT_CONFIG.refriLata, ...data.refriLata },
          refri1l: { ...DEFAULT_CONFIG.refri1l, ...data.refri1l },
          maionese: data.maionese !== false,
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

  async function toggleMaionese() {
    const newConfig = { ...config, maionese: !config.maionese };
    setConfig(newConfig);
    try {
      await updateMenuConfig(newConfig);
      toast.success("Salvo!");
    } catch {
      toast.error("Erro ao salvar");
      setConfig(config);
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
            <div className={`item-row${config.maionese !== false ? "" : " off"}`}>
              <div className="item-info">
                <span className="item-name">Maionese caseira</span>
                <span className="item-sub">R$ 0,99 unidade</span>
              </div>
              <button
                className={`toggle${config.maionese !== false ? " on" : ""}`}
                onClick={toggleMaionese}
              >
                {config.maionese !== false ? "✓ Disponível" : "✕ Indisponível"}
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

        {/* REFRI LATA */}
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
