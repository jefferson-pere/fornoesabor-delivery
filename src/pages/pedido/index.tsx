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

export function Pedido() {
  const { step, setStep, itens, setItens, cidade } = usePedido();
  const navigate = useNavigate();

  const [combo, setCombo] = useState<ComboType | null>(null);
  const [sabores, setSabores] = useState<Record<string, number>>({});
  const [refri, setRefri] = useState("");
  const [refriExtra, setRefriExtra] = useState<{
    nome: string;
    tipo: "lata" | "1l";
    preco: number;
  } | null>(null);
  const [maioneseQtd, setMaioneseQtd] = useState(0);
  const [observacaoItem, setObservacaoItem] = useState("");
  const [maxChocolate, setMaxChocolate] = useState(false);
  const [adicionado, setAdicionado] = useState(false);
  const [errors, setErrors] = useState({
    combo: false,
    sabores: false,
    refri: false,
  });

  const saboresRef = useRef<HTMLDivElement | null>(null);
  const formRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (step < 2) navigate("/", { replace: true });
  }, [step, navigate]);

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
    setSabores((prev) => ({ ...prev, [s]: Math.max(qtdAtual + delta, 0) }));
  };

  const cancelar = () => {
    setCombo(null);
    setSabores({});
    setRefri("");
    setRefriExtra(null);
    setMaioneseQtd(0);
    setObservacaoItem("");
    setMaxChocolate(false);
    setErrors({ combo: false, sabores: false, refri: false });
  };

  const selecionarCombo = (c: ComboType) => {
    setCombo(c);
    setSabores({});
    setRefri("");
    setRefriExtra(null);
    setMaioneseQtd(0);
    setObservacaoItem("");
    setMaxChocolate(false);
    setErrors({ combo: false, sabores: false, refri: false });
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

    setItens((prev) => [
      ...prev,
      {
        combo: combo!,
        sabores: Object.fromEntries(Object.entries(sabores).filter(([, qtd]) => qtd > 0)),
        refri,
        refriExtra,
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
    setRefriExtra(item.refriExtra || null);
    setMaioneseQtd(item.maioneseQtd || 0);
    setObservacaoItem(item.observacaoItem || "");
    removerItem(index);
  };

  const subtotal = itens.reduce((acc, item) => acc + item.combo.preco, 0);
  const adicional = itens.reduce(
    (acc, item) =>
      acc + item.maioneseQtd * 0.99 + (item.refriExtra?.preco || 0),
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
                {combosDisponiveis.map((c) => (
                  <div
                    key={c.id}
                    className="combo-card"
                    onClick={() => selecionarCombo(c)}
                  >
                    <div className="combo-top">
                      <span className={`combo-badge ${c.tipo}`}>
                        {c.nomeRef}
                      </span>
                    </div>
                    <div className="combo-units">{c.unidades} Esfihas </div>
                    <div className="combo-extras">
                      {c.refri !== "none" && (
                        <span>
                          + 🥤 Refri {c.refri === "lata" ? "lata" : "1L"}
                        </span>
                      )}
                      {c.maioneseInclusa && <span> e Maionese</span>}
                    </div >
                    <div className="container-price">

                    <span className="combo-price">R$ {c.preco.toFixed(2)}</span>
                    </div>
                  </div>
                ))}
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
                  return (
                    <div key={s} className="sabor-row">
                      <span className="sabor-name">{s}</span>
                      <div className="qtd-control">
                        <button
                          className="qtd-btn minus"
                          onClick={() => alterarQtd(s, -1)}
                          disabled={qty === 0}
                        >
                          −
                        </button>
                        <span className={`qtd-value${qty > 0 ? " has" : ""}`}>
                          {qty}
                        </span>
                        <button
                          className="qtd-btn plus"
                          onClick={() => alterarQtd(s, 1)}
                          disabled={totalSabores >= combo.unidades}
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
                    {saboresRefri[combo.refri].map((r) => (
                      <button
                        key={r}
                        className={`chip${refri === r ? " active" : ""}`}
                        onClick={() => {
                          setRefri(r);
                          setErrors((e) => ({ ...e, refri: false }));
                        }}
                      >
                        {r}
                      </button>
                    ))}
                  </div>
                </section>
              )}

              {/* OBSERVAÇÃO */}
              <section className="section">
                <div className="section-label">
                  Observação
                  <span className="optional-tag">opcional</span>
                </div>
                <textarea
                  className="obs-input"
                  placeholder="Alguma observação?"
                  value={observacaoItem}
                  onChange={(e) => setObservacaoItem(e.target.value)}
                  rows={2}
                />
              </section>

              {/* MAIONESE */}
              <section className="section">
                <div className="maionese-row">
                  <div className="maionese-info">
                    <span className="maionese-title">Maionese caseira</span>
                    <span className="price-hint">
                      R$ 0,99 unidade.{combo.maioneseInclusa ? " · ✓ inclusa" : ""}
                    </span>
                  </div>
                  <div className="qtd-control">
                    <button
                      className="qtd-btn minus"
                      onClick={() => setMaioneseQtd((v) => Math.max(v - 1, 0))}
                      disabled={maioneseQtd === 0}
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
                    >
                      +
                    </button>
                  </div>
                </div>
              </section>

              {/* REFRI EXTRA */}
              <section className="section">
                <div className="section-label">
                  Refrigerante extra
                  <span className="optional-tag">opcional</span>
                </div>
                <select
                  className="select-input"
                  value={
                    refriExtra ? `${refriExtra.nome}-${refriExtra.tipo}` : ""
                  }
                  onChange={(e) => {
                    const value = e.target.value;
                    if (!value) {
                      setRefriExtra(null);
                      return;
                    }
                    const lastIndex = value.lastIndexOf("-");
                    const nome = value.substring(0, lastIndex);
                    const tipo = value.substring(lastIndex + 1) as
                      | "lata"
                      | "1l";
                    setRefriExtra({
                      nome,
                      tipo,
                      preco: tipo === "lata" ? 3 : 8,
                    });
                  }}
                >
                  <option value="">Não quero</option>
                  {saboresRefri.lata.map((r) => (
                    <option key={`${r}-lata`} value={`${r}-lata`}>
                      {r} Lata — R$ 3,00
                    </option>
                  ))}
                  {saboresRefri["1l"].map((r) => (
                    <option key={`${r}-1l`} value={`${r}-1l`}>
                      {r} 1L — R$ 8,00
                    </option>
                  ))}
                </select>
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
                      {item.refriExtra && (
                        <span className="tag">
                          🥤 Extra {item.refriExtra.nome} (
                          {item.refriExtra.tipo})
                        </span>
                      )}
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
