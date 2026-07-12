import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container } from "./style";
import {
  combosDisponiveis,
  saboresLista,
  saboresRefri,
  type ComboType,
} from "../../data/menu";
import { usePedido } from "../../hook/usePedido";
import { MdDelete, MdEdit } from "react-icons/md";
import { StepProgress } from "../../components/StepProgress";
import { getMenuConfig, type MenuDisponibilidade } from "../../services/menu";

export function Pedido() {
  const { step, setStep, itens, setItens, cidade } = usePedido();
  const navigate = useNavigate();

  const [combo, setCombo] = useState<ComboType | null>(null);
  const [sabores, setSabores] = useState<Record<string, number>>({});
  const [refri, setRefri] = useState("");
  const [refrisExtras, setRefrisExtras] = useState<Record<string, number>>({});
  const [maioneseQtd, setMaioneseQtd] = useState(0);
  const [observacaoItem, setObservacaoItem] = useState("");
  const [maxChocolate, setMaxChocolate] = useState(false);
  const [adicionado, setAdicionado] = useState(false);
  const [showObservacao, setShowObservacao] = useState(false);
  const [errors, setErrors] = useState({
    combo: false,
    sabores: false,
    refri: false,
  });

  const [menuConfig, setMenuConfig] = useState<MenuDisponibilidade | null>(null);

  const saboresRef = useRef<HTMLDivElement | null>(null);
  const formRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (step < 2) navigate("/", { replace: true });
  }, [step, navigate]);

  useEffect(() => {
    getMenuConfig().then(setMenuConfig).catch(() => {});
  }, []);

  const isComboDisponivel = (id: number) =>
    !menuConfig || menuConfig.combos[String(id)] !== false;

  const isSaborDisponivel = (s: string) =>
    !menuConfig || menuConfig.sabores[s] !== false;

  const isRefriDisponivel = (r: string, tipo: "lata" | "1l") =>
    !menuConfig ||
    (tipo === "lata" ? menuConfig.refriLata[r] : menuConfig.refri1l[r]) !== false;

  const isMaioneseDisponivel = !menuConfig || menuConfig.maionese !== false;

  useEffect(() => {
    if (combo) {
      formRef.current?.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [combo]);

  const totalSabores = Object.values(sabores).reduce((a, b) => a + b, 0);

  const alterarQtd = (s: string, delta: number) => {
    if (!combo) return;
    const totalAtual = Object.values(sabores).reduce((a, b) => a + b, 0);
    const qtdAtual = sabores[s] || 0;
    if (s.toLowerCase().includes("chocolate") && delta > 0 && qtdAtual >= 10) {
      setMaxChocolate(true);
      return;
    }
    setMaxChocolate(false);
    if (delta > 0 && totalAtual >= combo.unidades) return;
    const novaQtd = delta > 0
      ? Math.min(qtdAtual + delta, qtdAtual + (combo.unidades - totalAtual))
      : Math.max(qtdAtual + delta, 0);
    setSabores((prev) => ({ ...prev, [s]: novaQtd }));
  };

  const cancelar = () => {
    setCombo(null);
    setSabores({});
    setRefri("");
    setRefrisExtras({});
    setMaioneseQtd(0);
    setObservacaoItem("");
    setShowObservacao(false);
    setMaxChocolate(false);
    setErrors({ combo: false, sabores: false, refri: false });
  };

  const selecionarCombo = (c: ComboType) => {
    setCombo(c);
    setSabores({});
    setRefri("");
    setRefrisExtras({});
    setMaioneseQtd(0);
    setObservacaoItem("");
    setShowObservacao(false);
    setMaxChocolate(false);
    setErrors({ combo: false, sabores: false, refri: false });
  };

  const alterarRefriExtra = (key: string, delta: number) => {
    setRefrisExtras((prev) => ({
      ...prev,
      [key]: Math.max((prev[key] || 0) + delta, 0),
    }));
  };

  const adicionarItem = () => {
    const newErrors = {
      combo: !combo,
      sabores: combo ? totalSabores !== combo.unidades : true,
      refri: combo ? combo.refri !== "none" && !refri : false,
    };
    setErrors(newErrors);
    if (newErrors.sabores) {
      saboresRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
    if (Object.values(newErrors).some(Boolean)) return;

    const refriExtraArray = Object.entries(refrisExtras)
      .filter(([, qtd]) => qtd > 0)
      .map(([key, qtd]) => {
        const lastDash = key.lastIndexOf("-");
        const nome = key.substring(0, lastDash);
        const tipo = key.substring(lastDash + 1) as "lata" | "1l";
        return { nome, tipo, preco: tipo === "lata" ? 5 : 8, qtd };
      });

    setItens((prev) => [
      ...prev,
      {
        combo: combo!,
        sabores: Object.fromEntries(Object.entries(sabores).filter(([, qtd]) => qtd > 0)),
        refri,
        refriExtra: refriExtraArray,
        maioneseQtd,
        observacaoItem,
      },
    ]);
    setAdicionado(true);
    setTimeout(() => {
      setAdicionado(false);
      cancelar();
    }, 900);
  };

  const removerItem = (index: number) =>
    setItens((prev) => prev.filter((_, i) => i !== index));

  const editarItem = (index: number) => {
    const item = itens[index];
    setCombo(item.combo);
    setSabores(item.sabores);
    setRefri(item.refri || "");
    const extrasMap: Record<string, number> = {};
    for (const r of (item.refriExtra || [])) {
      extrasMap[`${r.nome}-${r.tipo}`] = r.qtd;
    }
    setRefrisExtras(extrasMap);
    setMaioneseQtd(item.maioneseQtd || 0);
    setObservacaoItem(item.observacaoItem || "");
    if (item.observacaoItem) setShowObservacao(true);
    removerItem(index);
  };

  const subtotal = itens.reduce((acc, item) => acc + (item.combo?.preco ?? 0), 0);
  const adicional = itens.reduce(
    (acc, item) =>
      acc + (item.maioneseQtd ?? 0) * 0.99 + (Array.isArray(item.refriExtra) ? item.refriExtra.reduce((a, r) => a + r.preco * r.qtd, 0) : 0),
    0,
  );
  const frete = cidade === "Cariús" ? 3 : cidade === "Jucás" ? 5 : 0;
  const totalGeral = subtotal + adicional + frete;

  const nomeCombo = (c: ComboType) =>
    c.nome.split(" - ")[0].replace("Combo ", "");

  return (
    <Container>
      <div className="content">
        <div className="desktop-side">
          <img
            src="/banner.png"
            alt=""
            onError={(e) => (e.currentTarget.style.display = "none")}
          />
          <div className="side-overlay">
            <div className="side-badge">🔥 Pedido online</div>
            <div className="side-title">Forno e Sabor</div>
            <p className="side-sub">Monte seu combo favorito</p>
          </div>
        </div>

        <StepProgress current={2} />

        <div className="page-header">
          <span className="page-title">Monte seu pedido</span>
        </div>

        <div className="form" ref={formRef}>
          {/* ── SELEÇÃO DE COMBO ── */}
          {!combo && (
            <section className="section">
              <div className="section-label">
                {itens.length === 0
                  ? "Escolha um combo"
                  : "Adicionar outro combo"}
              </div>
              <div className="combo-grid">
                {combosDisponiveis.map((c) => {
                  const disponivel = isComboDisponivel(c.id);
                  return (
                  <div
                    key={c.id}
                    className={`combo-card${disponivel ? "" : " indisponivel"}`}
                    onClick={() => disponivel && selecionarCombo(c)}
                  >
                    <div className="combo-left">
                      <div className="combo-top">
                        <span className={`combo-badge ${c.tipo}`}>
                          {c.nomeRef}
                        </span>
                        {!disponivel && (
                          <span className="badge-indisponivel">Indisponível</span>
                        )}
                      </div>
                      <div className="combo-units">{c.unidades} Esfihas</div>
                      {c.maioneseInclusa && (
                        <div className="combo-extras">
                          <span>Maionese inclusa</span>
                        </div>
                      )}
                    </div>
                    <div className="container-price">
                      <span className="combo-price">R$ {c.preco.toFixed(2)}</span>
                      <span className="combo-arrow">›</span>
                    </div>
                  </div>
                  );
                })}
              </div>
            </section>
          )}

          {/* ── CONFIGURAÇÃO DO COMBO ── */}
          {combo && (
            <>
              <div className="combo-editing-header">
                <div>
                  <div className="combo-editing-name">{nomeCombo(combo)}</div>
                  <div className="combo-editing-price">
                    R$ {combo.preco.toFixed(2)}
                  </div>
                </div>
                <button className="btn-trocar" onClick={cancelar}>
                  Trocar
                </button>
              </div>

              {/* SABORES */}
              <section className="section" ref={saboresRef}>
                <div className="section-label">
                  Sabores
                  <span
                    className={`count-badge${totalSabores === combo.unidades ? " full" : ""}`}
                  >
                    {totalSabores}/{combo.unidades}
                  </span>
                </div>
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{
                      width: `${Math.min((totalSabores / combo.unidades) * 100, 100)}%`,
                    }}
                  />
                </div>
                {errors.sabores && (
                  <p className="error-text">
                    Faltam {combo.unidades - totalSabores} unidade(s)
                  </p>
                )}
                {maxChocolate && (
                  <p className="error-text">Chocolate: máximo 10 unidades</p>
                )}
                {saboresLista.map((s) => {
                  const qty = sabores[s] || 0;
                  const dispSabor = isSaborDisponivel(s);
                  return (
                    <div key={s} className={`sabor-row${dispSabor ? "" : " sabor-indisponivel"}`}>
                      <span className="sabor-name">
                        {s}
                        {!dispSabor && <span className="tag-indisponivel"> · Indisponível</span>}
                      </span>
                      <div className="qtd-control">
                        <button
                          className="qtd-btn minus"
                          onClick={() => alterarQtd(s, -5)}
                          disabled={qty === 0 || !dispSabor}
                        >
                          −
                        </button>
                        <span className={`qtd-value${qty > 0 ? " has" : ""}`}>
                          {qty}
                        </span>
                        <button
                          className="qtd-btn plus"
                          onClick={() => alterarQtd(s, 5)}
                          disabled={totalSabores >= combo.unidades || !dispSabor}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  );
                })}
              </section>

              {/* REFRIGERANTE INCLUÍDO */}
              {combo.refri !== "none" && (
                <section
                  className={`section refri-section${errors.refri ? " refri-error" : ""}${!refri ? " refri-pending" : ""}`}
                >
                  <div className="section-label">
                    🥤 Refrigerante incluído
                    {!refri && !errors.refri && (
                      <span className="refri-pending-tag">Selecione</span>
                    )}
                    {errors.refri && (
                      <span className="required-tag">Obrigatório!</span>
                    )}
                  </div>
                  {!refri && (
                    <p className="refri-hint">
                      Escolha o refrigerante do seu combo
                    </p>
                  )}
                  <div className="chips">
                    {saboresRefri[combo.refri as "lata" | "1l"].map((r) => {
                      const dispRefri = isRefriDisponivel(r, combo.refri as "lata" | "1l");
                      return (
                      <button
                        key={r}
                        className={`chip${refri === r ? " active" : ""}${dispRefri ? "" : " chip-indisponivel"}`}
                        disabled={!dispRefri}
                        onClick={() => {
                          if (!dispRefri) return;
                          setRefri(r);
                          setErrors((e) => ({ ...e, refri: false }));
                        }}
                      >
                        {r}{!dispRefri && " (Ind.)"}
                      </button>
                      );
                    })}
                  </div>
                </section>
              )}

              {/* OBSERVAÇÃO */}
              <section className="section">
                {!showObservacao && !observacaoItem ? (
                  <button
                    className="btn-obs-toggle"
                    onClick={() => setShowObservacao(true)}
                  >
                    + Adicionar observação
                  </button>
                ) : (
                  <>
                    <div className="section-label">
                      Observação
                      <button
                        className="btn-obs-fechar"
                        onClick={() => { setShowObservacao(false); setObservacaoItem(""); }}
                      >
                        ✕ remover
                      </button>
                    </div>
                    <textarea
                      className="obs-input"
                      placeholder="Alguma observação?"
                      value={observacaoItem}
                      onChange={(e) => setObservacaoItem(e.target.value)}
                      rows={2}
                      autoFocus
                    />
                  </>
                )}
              </section>

              {/* MAIONESE */}
              <section className="section">
                <div className="maionese-row">
                  <div className="maionese-info">
                    <span className="maionese-title">Maionese caseira</span>
                    <span className="price-hint">
                      {!isMaioneseDisponivel
                        ? "Indisponível no momento"
                        : `R$ 0,99 unidade.${combo.maioneseInclusa ? " · ✓ inclusa" : ""}`}
                    </span>
                  </div>
                  <div className="qtd-control">
                    <button
                      className="qtd-btn minus"
                      onClick={() => setMaioneseQtd((v) => Math.max(v - 1, 0))}
                      disabled={maioneseQtd === 0 || !isMaioneseDisponivel}
                    >
                      −
                    </button>
                    <span
                      className={`qtd-value${maioneseQtd > 0 ? " has" : ""}`}
                    >
                      {maioneseQtd}
                    </span>
                    <button
                      className="qtd-btn plus"
                      onClick={() => setMaioneseQtd((v) => v + 1)}
                      disabled={!isMaioneseDisponivel}
                    >
                      +
                    </button>
                  </div>
                </div>
              </section>

              {/* REFRI EXTRA */}
              <section className="section refri-extra-section">
                <div className="section-label">
                  Adicionar refrigerante?
                  <span className="optional-tag">opcional</span>
                </div>
                <p className="refri-extra-prices">Lata R$ 5,00 &nbsp;·&nbsp; 1 Litro R$ 8,00</p>

                <select
                  className="select-input refri-extra-select"
                  value=""
                  onChange={(e) => {
                    if (!e.target.value) return;
                    alterarRefriExtra(e.target.value, 1);
                  }}
                >
                  <option value="">
                    {Object.values(refrisExtras).some((q) => q > 0) ? "Adicionar outro refrigerante?" : "Escolha o refri para adicionar"}
                  </option>
                  <optgroup label="Lata — R$ 5,00">
                    {saboresRefri.lata.filter((r) => isRefriDisponivel(r, "lata")).map((r) => (
                      <option key={r} value={`${r}-lata`}>{r}</option>
                    ))}
                  </optgroup>
                  <optgroup label="1 Litro — R$ 8,00">
                    {saboresRefri["1l"].filter((r) => isRefriDisponivel(r, "1l")).map((r) => (
                      <option key={r} value={`${r}-1l`}>{r}</option>
                    ))}
                  </optgroup>
                </select>

                {Object.entries(refrisExtras).filter(([, q]) => q > 0).length > 0 && (
                  <div className="refri-extra-lista">
                    <span className="refri-extra-label">você adicionou:</span>
                    {Object.entries(refrisExtras).filter(([, q]) => q > 0).map(([key, qty]) => {
                      const lastDash = key.lastIndexOf("-");
                      const nome = key.substring(0, lastDash);
                      const tipo = key.substring(lastDash + 1) as "lata" | "1l";
                      return (
                        <div key={key} className="refri-extra-tag">
                          <span>🥤 {qty}× {nome} ({tipo === "lata" ? "Lata" : "1L"})</span>
                          <button onClick={() => setRefrisExtras(prev => ({ ...prev, [key]: 0 }))}>✕</button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </section>

              {/* AÇÕES DO COMBO */}
              <div className="combo-actions">
                <button className="btn-cancel" onClick={cancelar}>
                  Cancelar
                </button>
                <button
                  className={`btn-add${adicionado ? " success" : ""}`}
                  onClick={adicionarItem}
                  disabled={adicionado}
                >
                  {adicionado ? "✓ Adicionado!" : "Adicionar ao pedido"}
                </button>
              </div>
            </>
          )}

          {/* ── ITENS ADICIONADOS ── */}
          {itens.length > 0 && !combo && (
            <section className="section items-section">
              <div className="section-label">
                Seu pedido:
                <span className="count-badge full">
                  {itens.length} {itens.length === 1 ? "combo" : "combos"}
                </span>
              </div>
              {itens.map((item, index) => (
                <div key={index} className="item-card">
                  <div className="item-info">
                    <strong>{nomeCombo(item.combo)}</strong>
                    <span className="item-price">
                      R$ {item.combo.preco.toFixed(2)}
                    </span>
                    <div className="item-tags">
                      {Object.entries(item.sabores)
                        .filter(([, q]) => q > 0)
                        .map(([s, q]) => (
                          <span key={s} className="tag">
                            {q}× {s}
                          </span>
                        ))}
                      {item.refri && (
                        <span className="tag">🥤 {item.refri}</span>
                      )}
                      {(Array.isArray(item.refriExtra) ? item.refriExtra : []).map((r) => (
                        <span key={`${r.nome}-${r.tipo}`} className="tag">
                          🥤 {r.qtd}× {r.nome} ({r.tipo})
                        </span>
                      ))}
                      {item.maioneseQtd > 0 && (
                        <span className="tag">
                          🧄 {item.maioneseQtd}× maionese
                        </span>
                      )}
                      {item.observacaoItem && (
                        <span className="tag obs">
                          📝 {item.observacaoItem}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="item-btns">
                    <button
                      className="icon-btn"
                      onClick={() => editarItem(index)}
                    >
                      <MdEdit />
                    </button>
                    <button
                      className="icon-btn danger"
                      onClick={() => removerItem(index)}
                    >
                      <MdDelete />
                    </button>
                  </div>
                </div>
              ))}
            </section>
          )}
        </div>

        {/* ── FOOTER FIXO ── */}
        {!combo && (
          <div className="footer">
            <div className="footer-total">
              <div className="footer-total-left">
                <span className="footer-label">
                  {itens.length === 0
                    ? "Nenhum combo ainda"
                    : `${itens.length} ${itens.length === 1 ? "combo" : "combos"}`}
                </span>
                {frete > 0 && (
                  <span className="footer-frete">
                    + R$ {frete.toFixed(2)} frete
                  </span>
                )}
              </div>
              <strong className="footer-price">
                R$ {totalGeral.toFixed(2)}
              </strong>
            </div>
            <div className="footer-btns">
              <button className="btn-cancel" onClick={() => navigate("/")}>
                Voltar
              </button>
              <button
                className={`btn-continue${itens.length === 0 ? " disabled" : ""}`}
                disabled={itens.length === 0}
                onClick={() => {
                  if (!itens.length) return;
                  setStep(3);
                  navigate("/pagamento");
                }}
              >
                {itens.length === 0 ? "Adicione um combo" : "Continuar →"}
              </button>
            </div>
          </div>
        )}
      </div>
    </Container>
  );
}
