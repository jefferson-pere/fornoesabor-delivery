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

export function Pedido() {
  const { step, setStep, itens, setItens, cidade } = usePedido();
  const navigate = useNavigate();

  const [combo, setCombo] = useState<ComboType | null>(null);
  const [sabores, setSabores] = useState<Record<string, number>>({});
  const [refri, setRefri] = useState("");
  const [maioneseQtd, setMaioneseQtd] = useState(0);
  const [observacaoItem, setObservacaoItem] = useState("");

  const saboresRef = useRef<HTMLDivElement | null>(null);

  const [errors, setErrors] = useState({
    combo: false,
    sabores: false,
    refri: false,
  });

  useEffect(() => {
    if (step < 2) {
      navigate("/", { replace: true });
    }
  }, [step, navigate]);

  const alterarQtd = (s: string, delta: number) => {
    if (!combo) return;

    const totalAtual = Object.values(sabores).reduce((a, b) => a + b, 0);

    if (delta > 0 && totalAtual >= combo.unidades) return;

    setSabores((prev) => ({
      ...prev,
      [s]: Math.max((prev[s] || 0) + delta, 0),
    }));
  };

  const totalSabores = Object.values(sabores).reduce((a, b) => a + b, 0);

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
        sabores,
        refri,
        maioneseQtd,
        observacaoItem,
      },
    ]);

    setCombo(null);
    setSabores({});
    setRefri("");
    setMaioneseQtd(0);
    setObservacaoItem("");
    setErrors({ combo: false, sabores: false, refri: false });
  };

  const removerItem = (index: number) => {
    setItens((prev) => prev.filter((_, i) => i !== index));
  };

  const editarItem = (index: number) => {
    const item = itens[index];

    setCombo(item.combo);
    setSabores(item.sabores);
    setRefri(item.refri || "");
    setMaioneseQtd(item.maioneseQtd || 0);
    setObservacaoItem(item.observacaoItem || "");

    removerItem(index);
  };

  const subtotal = itens.reduce((acc, item) => acc + item.combo.preco, 0);
  const adicional = itens.reduce(
    (acc, item) => acc + item.maioneseQtd * 0.99,
    0,
  );

  const frete = cidade === "Cariús" ? 3 : cidade === "Jucás" ? 5 : 0;

  return (
    <Container>
      <div className="content">
        <div className="hero">
          <img src="/banner.png" />
          <div className="hero-overlay">
            <div className="hero-title">Monte seu pedido</div>
          </div>
        </div>

        <div className="form">
          <div className={`input-box ${errors.combo ? "error" : ""}`}>
            <select
              value={combo?.id || ""}
              onChange={(e) => {
                const c = combosDisponiveis.find(
                  (c) => c.id === Number(e.target.value),
                );

                setCombo(c || null);
                setSabores({});
                setRefri("");
                setMaioneseQtd(0);
                setObservacaoItem("");
              }}
            >
              <option value="">Escolha um combo</option>
              {combosDisponiveis.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.nome} — R$ {c.preco}
                </option>
              ))}
            </select>
          </div>

          {errors.combo && <p className="error-text">Selecione um combo</p>}

          {combo && (
            <>
              <div
                ref={saboresRef}
                className="total"
                style={{
                  color:
                    totalSabores === combo.unidades ? "#16a34a" : "#ff4d4f",
                }}
              >
                Combo: {totalSabores} de {combo.unidades}
              </div>

              {errors.sabores && (
                <p className="error-text">
                  Preencha todos os sabores ({totalSabores}/{combo.unidades})
                </p>
              )}

              {saboresLista.map((s) => (
                <div key={s} className="item">
                  <span>{s}</span>

                  <div className="qtd">
                    <button className="btn" onClick={() => alterarQtd(s, -1)}>
                      -
                    </button>

                    <span>{sabores[s] || 0}</span>

                    <button className="btn" onClick={() => alterarQtd(s, 1)}>
                      +
                    </button>
                  </div>
                </div>
              ))}
            </>
          )}

          {combo && combo.refri !== "none" && (
            <>
              <div className={`input-box ${errors.refri ? "error" : ""}`}>
                <select
                  value={refri}
                  onChange={(e) => setRefri(e.target.value)}
                >
                  <option value="">Escolha o refrigerante</option>
                  {saboresRefri[combo.refri].map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </div>

              {errors.refri && (
                <p className="error-text">Escolha o refrigerante</p>
              )}
            </>
          )}

          {combo && (
            <div>
              <input
                placeholder="Observação do combo (ex: sem catupiry...)"
                value={observacaoItem}
                onChange={(e) => setObservacaoItem(e.target.value)}
              />
            </div>
          )}

          {combo && (
            <div className="item">
              <span>
                {combo.maioneseInclusa ? (
                  <>
                    <strong style={{ color: "#16a34a" }}>
                      Já inclui maionese!
                    </strong>
                    <br />
                    Quer adicionar mais? (R$ 0,99)
                  </>
                ) : (
                  "Adicionar Maionese? (R$ 0,99)"
                )}
              </span>

              <div className="qtd">
                <button
                  className="btn"
                  onClick={() => setMaioneseQtd((v) => Math.max(v - 1, 0))}
                >
                  -
                </button>

                <span>{maioneseQtd}</span>

                <button
                  className="btn"
                  onClick={() => setMaioneseQtd((v) => v + 1)}
                >
                  +
                </button>
              </div>
            </div>
          )}

          <div style={{ display: "flex", gap: 10 }}>
            {combo && (
              <button
                className="button cancel"
                onClick={() => {
                  setCombo(null);
                  setSabores({});
                  setRefri("");
                  setMaioneseQtd(0);
                  setObservacaoItem("");
                  setErrors({ combo: false, sabores: false, refri: false });
                }}
              >
                Cancelar
              </button>
            )}
            <button className="button button-add" onClick={adicionarItem}>
              {itens.length > 0 ? "Adicionar combo" : "Adicionar ao pedido"}
            </button>
          </div>

          {!combo &&
            itens.map((item, index) => (
              <div key={index} className="item">
                <div style={{ flex: 1 }}>
                  <strong>{item.combo.nome}</strong>

                  <div style={{ fontSize: 13, color: "#555", marginTop: 4 }}>
                    R$ {item.combo.preco.toFixed(2)}
                  </div>

                  <div style={{ marginTop: 6, fontSize: 13 }}>
                    {Object.entries(item.sabores)
                      .filter(([, q]) => q > 0)
                      .map(([s, q]) => (
                        <div key={s}>
                          {q}x {s}
                        </div>
                      ))}
                  </div>

                  {item.refri && (
                    <div style={{ fontSize: 13, marginTop: 4 }}>
                      Refri: {item.refri}
                    </div>
                  )}

                  {item.maioneseQtd > 0 && (
                    <div style={{ fontSize: 13, marginTop: 4 }}>
                      🧄 {item.maioneseQtd}x maionese
                    </div>
                  )}
                </div>

                <div
                  style={{ display: "flex", flexDirection: "column", gap: 6 }}
                >
                  <button
                    className="btn icon-btn edit"
                    onClick={() => editarItem(index)}
                  >
                    <MdEdit />
                  </button>

                  <button
                    className="btn icon-btn delete"
                    onClick={() => removerItem(index)}
                  >
                    <MdDelete />
                  </button>
                </div>
              </div>
            ))}

          {!combo && (
            <div className="total-card">
              <div className="row">
                <span>Subtotal</span>
                <strong>R$ {subtotal.toFixed(2)}</strong>
              </div>

              {adicional > 0 && (
                <div className="row extra">
                  <span>Adicionais</span>
                  <strong>+ R$ {adicional.toFixed(2)}</strong>
                </div>
              )}

              <div className="row">
                <span>Frete</span>
                <strong>
                  {frete === 0 ? "Retirada no local" : `R$ ${frete.toFixed(2)}`}
                </strong>
              </div>

              <div className="divider" />

              <div className="row total">
                <span>Total: </span>
                <strong>R$ {(subtotal + adicional + frete).toFixed(2)}</strong>
              </div>
            </div>
          )}

          {!combo && (
            <div style={{ display: "flex", gap: 10 }}>
              <button className="button cancel" onClick={() => navigate("/")}>
                Voltar
              </button>

              <button
                className={`button ${itens.length === 0 ? "disabled" : ""}`}
                disabled={itens.length === 0}
                onClick={() => {
                  if (itens.length === 0) return;
                  setStep(3);
                  navigate("/revisao");
                }}
              >
                {itens.length === 0 ? "Adicione um combo" : "Revisar pedido"}
              </button>
            </div>
          )}
        </div>
      </div>
    </Container>
  );
}
