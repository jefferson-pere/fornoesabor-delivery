import { useState } from "react";
import axios from "axios";
import { Container } from "./style";

import {
  combosDisponiveis,
  cidades,
  saboresLista,
  saboresRefri,
  type ComboType,
} from "../../data/menu";

export function Home() {
  const [nome, setNome] = useState("");
  const [cidade, setCidade] = useState("");

  const [rua, setRua] = useState("");
  const [numero, setNumero] = useState("");
  const [referencia, setReferencia] = useState("");

  const [combo, setCombo] = useState<ComboType | null>(null);
  const [sabores, setSabores] = useState<Record<string, number>>({});
  const [refri, setRefri] = useState("");

  const [maioneseQtd, setMaioneseQtd] = useState(0);
  const [observacao, setObservacao] = useState("");

  const [pagamento, setPagamento] = useState("");
  const [troco, setTroco] = useState("");

  const [revisando, setRevisando] = useState(false);
  const [confirmado, setConfirmado] = useState(false);

  // =========================
  // SABORES COM LIMITE
  // =========================
  const alterarQtd = (s: string, qtd: number) => {
    const novo = Math.max(0, qtd);
    const totalAtual = Object.values(sabores).reduce((a, b) => a + b, 0);

    const diff = novo - (sabores[s] || 0);

    if (combo && totalAtual + diff > combo.unidades) return;

    setSabores((prev) => ({
      ...prev,
      [s]: novo,
    }));
  };

  const totalSabores = Object.values(sabores).reduce((a, b) => a + b, 0);

  // =========================
  // TOTAL
  // =========================
  const frete = cidades.find((c) => c.nome === cidade)?.frete || 0;

  const total =
    (combo?.preco || 0) +
    frete +
    (combo?.maioneseInclusa ? 0 : maioneseQtd * 0.99);

  // =========================
  // REVISÃO
  // =========================
  const handleRevisao = () => {
    if (!nome || !cidade || !combo) {
      return alert("Preencha os campos obrigatórios");
    }

    if (combo.refri !== "none" && !refri) {
      return alert("Escolha o refri");
    }

    if (totalSabores !== combo.unidades) {
      return alert(`Escolha ${combo.unidades} unidades`);
    }

    if (cidade !== "Retirada" && (!rua || !numero)) {
      return alert("Preencha endereço");
    }

    if (!pagamento) {
      return alert("Escolha pagamento");
    }

    if (pagamento === "dinheiro" && !troco) {
      return alert("Informe o troco");
    }

    setRevisando(true);
  };

  // =========================
  // ENVIAR
  // =========================
  const enviar = async () => {
    await axios.post("https://fornoesabor-backend.onrender.com/orders", {
      nomeCliente: nome,
      cidade,
      endereco: cidade !== "Retirada" ? { rua, numero, referencia } : null,
      combo,
      sabores,
      refri: combo?.refri !== "none" ? refri : null,
      maioneseQtd: combo?.maioneseInclusa ? 0 : maioneseQtd,
      observacao,
      pagamento,
      troco,
      total,
    });
  };

  // =========================
  // TELA DE REVISÃO
  // =========================
  if (revisando) {
    return (
      <Container>
        <div className="content">
          <div className="header">Revisar Pedido</div>

          <div className="section">
            <p>
              <strong>Cliente:</strong> {nome}
            </p>
            <p>
              <strong>Cidade:</strong> {cidade}
            </p>

            {cidade !== "Retirada" && (
              <p>
                {rua}, {numero} - {referencia}
              </p>
            )}

            <hr />

            <p>
              <strong>{combo?.nome}</strong>
            </p>

            {combo?.refri !== "none" && <p>🥤 {refri}</p>}

            <p>Sabores:</p>
            {Object.entries(sabores).map(([s, q]) =>
              q > 0 ? (
                <p key={s}>
                  {q}x {s}
                </p>
              ) : null,
            )}

            {maioneseQtd > 0 && <p>Maionese: {maioneseQtd}x</p>}

            {observacao && <p>Obs: {observacao}</p>}

            <hr />

            <p>Pagamento: {pagamento}</p>
            {troco && <p>Troco: {troco}</p>}

            <h2>Total: R$ {total.toFixed(2)}</h2>

            <button
              className="button"
              onClick={async () => {
                await enviar();
                setRevisando(false);
                setConfirmado(true);
              }}
            >
              Confirmar Pedido
            </button>

            <button onClick={() => setRevisando(false)}>Voltar</button>
          </div>
        </div>
      </Container>
    );
  }

  // =========================
  // AGRADECIMENTO
  // =========================
  if (confirmado) {
    return (
      <Container>
        <div className="content">
          <div className="header">🎉 Pedido Enviado!</div>

          <div className="section" style={{ textAlign: "center" }}>
            <h2>Obrigado, {nome}!</h2>

            <p>Recebemos seu pedido com sucesso 🙌</p>
            <p>Estamos preparando tudo 🍕</p>

            <button className="button" onClick={() => window.location.reload()}>
              Novo Pedido
            </button>
          </div>
        </div>
      </Container>
    );
  }

  // =========================
  // FORM PRINCIPAL
  // =========================
  return (
    <Container>
      <div className="content">
        <div className="header">🍕 Forno e Sabor</div>

        <div className="section">
          <input
            className="input"
            placeholder="Nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />

          <select
            className="select"
            value={cidade}
            onChange={(e) => setCidade(e.target.value)}
          >
            <option value="">Cidade</option>
            {cidades.map((c) => (
              <option key={c.nome} value={c.nome}>
                {c.nome} (+ R$ {c.frete})
              </option>
            ))}
          </select>

          {(cidade === "Cariús" || cidade === "Jucás") && (
            <>
              <input
                className="input"
                placeholder="Rua"
                value={rua}
                onChange={(e) => setRua(e.target.value)}
              />
              <input
                className="input"
                placeholder="Número"
                value={numero}
                onChange={(e) => setNumero(e.target.value)}
              />
              <input
                className="input"
                placeholder="Referência"
                value={referencia}
                onChange={(e) => setReferencia(e.target.value)}
              />
            </>
          )}
        </div>

        {/* COMBO */}
        <div className="section">
          <p className="section-title">Combo</p>

          <select
            className="select"
            onChange={(e) => {
              const c = combosDisponiveis.find(
                (c) => c.id === Number(e.target.value),
              );

              setCombo(c || null);
              setRefri("");
              setSabores({});
              setMaioneseQtd(0);
            }}
          >
            <option value="">Escolha</option>
            {combosDisponiveis.map((c) => (
              <option key={c.id} value={c.id}>
                {c.nome} — R$ {c.preco}
              </option>
            ))}
          </select>
        </div>

        {/* REFRI */}
        {combo && combo.refri !== "none" && (
          <div className="section">
            <p className="section-title">Refri</p>

            <select
              className="select"
              value={refri}
              onChange={(e) => setRefri(e.target.value)}
            >
              <option value="">Escolha</option>
              {saboresRefri[combo.refri].map((r) => (
                <option key={r}>{r}</option>
              ))}
            </select>
          </div>
        )}

        {/* SABORES */}
        <div className="section">
          <p className="section-title">
            Sabores ({totalSabores}/{combo?.unidades || 0})
          </p>

          {saboresLista.map((s) => (
            <div key={s} className="option">
              <span>{s}</span>

              <input
                type="number"
                min="0"
                placeholder="0"
                value={sabores[s] === 0 ? "" : sabores[s] || ""}
                onChange={(e) => {
                  const value = e.target.value;
                  alterarQtd(s, value === "" ? 0 : Number(value));
                }}
              />
            </div>
          ))}
        </div>

        {/* MAIONESE */}
        <div className="section maionese">
          <p className="section-title">Maionese caseira (+0,99) </p>

          {combo?.maioneseInclusa ? (
            <p>✅ Já inclusa no combo</p>
          ) : (
            <div className="qtd-control">
              <button onClick={() => setMaioneseQtd((q) => Math.max(q - 1, 0))}>
                -
              </button>

              <span>{maioneseQtd}</span>

              <button onClick={() => setMaioneseQtd((q) => q + 1)}>+</button>
            </div>
          )}
        </div>

        {/* OBS */}
        <div className="section">
          <textarea
            className="input"
            placeholder="Observação"
            value={observacao}
            onChange={(e) => setObservacao(e.target.value)}
          />
        </div>

        {/* PAGAMENTO */}
        <div className="section">
          <select
            className="select"
            value={pagamento}
            onChange={(e) => setPagamento(e.target.value)}
          >
            <option value="">Pagamento</option>
            <option value="pix">Pix</option>
            <option value="cartao">Cartão</option>
            <option value="dinheiro">Dinheiro</option>
          </select>

          {pagamento === "dinheiro" && (
            <input
              className="input"
              placeholder="Troco para quanto?"
              value={troco}
              onChange={(e) => setTroco(e.target.value)}
            />
          )}
        </div>

        <div className="footer">
          <button className="button" onClick={handleRevisao}>
            Fazer Pedido • R$ {total.toFixed(2)}
          </button>
        </div>
      </div>
    </Container>
  );
}
