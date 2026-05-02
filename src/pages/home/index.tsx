import { useState } from "react";
import axios from "axios";
import { Container } from "./style";

import {
  combosDisponiveis,
  cidades,
  saboresLista,
  saboresRefri,
} from "../../data/menu";

type ComboType = (typeof combosDisponiveis)[number];

export function Home() {
  const [nome, setNome] = useState("");
  const [cidade, setCidade] = useState("");
  const [combo, setCombo] = useState<ComboType | null>(null);
  const [sabores, setSabores] = useState<string[]>([]);
  const [refri, setRefri] = useState("");

  const toggleSabor = (s: string) => {
    setSabores((prev) =>
      prev.includes(s) ? prev.filter((i) => i !== s) : [...prev, s],
    );
  };

  const frete = cidades.find((c) => c.nome === cidade)?.frete || 0;
  const total = combo ? combo.preco + frete : 0;

  const enviar = async () => {
    if (!nome || !combo || !cidade) {
      return alert("Preencha os campos obrigatórios");
    }

    if (combo.tipo === "prime" && !refri) {
      return alert("Escolha o refri");
    }

    await axios.post("https://fornoesabor-backend.onrender.com/orders", {
      nomeCliente: nome,
      cidade,
      combo,
      sabores,
      refri,
      total,
    });

    alert("Pedido enviado!");
  };

  return (
    <Container>
      <div className="content">
        <div className="header">🍕 Forno e Sabor</div>

        {/* FORM */}
        <div className="section">
          <input
            className="input"
            placeholder="Seu nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />

          <select
            className="select"
            value={cidade}
            onChange={(e) => setCidade(e.target.value)}
          >
            <option value="">Escolha cidade</option>
            {cidades.map((c) => (
              <option key={c.nome} value={c.nome}>
                {c.nome} (+ R$ {c.frete})
              </option>
            ))}
          </select>
        </div>

        {/* COMBOS */}
        <div className="section">
          <p className="section-title">Combos</p>

          {combosDisponiveis.map((c) => (
            <div
              key={c.id}
              className={`combo-card ${combo?.id === c.id ? "selected" : ""}`}
              onClick={() => {
                setCombo(c);
                setRefri("");
              }}
            >
              <strong>{c.nome}</strong>
              <div>R$ {c.preco}</div>
            </div>
          ))}
        </div>

        {/* SABORES */}
        <div className="section">
          <p className="section-title">Sabores</p>

          <div className="sabores-grid">
            {saboresLista.map((s) => (
              <label key={s} className="sabor-item">
                <input
                  type="checkbox"
                  checked={sabores.includes(s)}
                  onChange={() => toggleSabor(s)}
                />
                {s}
              </label>
            ))}
          </div>
        </div>

        {/* REFRI */}
        {combo?.tipo === "prime" && combo.refri && (
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
      </div>

      {/* FOOTER FIXO */}
      <div className="footer">
        <button className="button" onClick={enviar}>
          Fazer Pedido • R$ {total.toFixed(2)}
        </button>
      </div>
    </Container>
  );
}
