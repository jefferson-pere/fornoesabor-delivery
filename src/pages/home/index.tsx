import { useState } from "react";
import axios from "axios";
import { Container } from "./style";

import {
  combosDisponiveis,
  cidades,
  saboresLista,
  saboresRefri,
} from "../../data/menu";

// 👉 tipo derivado (sem any)
type ComboType = (typeof combosDisponiveis)[number];

export function Home() {
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [cidade, setCidade] = useState("");
  const [endereco, setEndereco] = useState("");

  const [combo, setCombo] = useState<ComboType | null>(null);
  const [sabores, setSabores] = useState<string[]>([]);
  const [refri, setRefri] = useState("");

  // ======================
  // FUNÇÕES
  // ======================

  const toggleSabor = (s: string) => {
    setSabores((prev) =>
      prev.includes(s) ? prev.filter((i) => i !== s) : [...prev, s],
    );
  };

  const frete = cidades.find((c) => c.nome === cidade)?.frete || 0;
  const total = combo ? combo.preco + frete : 0;

  const enviarPedido = async () => {
    try {
      // validações
      if (!nome || !cidade || !combo) {
        return alert("Preencha os campos obrigatórios");
      }

      if (cidade !== "Retirada" && !endereco) {
        return alert("Informe o endereço");
      }

      if (sabores.length === 0) {
        return alert("Escolha pelo menos 1 sabor");
      }

      if (combo.tipo === "prime" && !refri) {
        return alert("Escolha o refri");
      }

      await axios.post("https://fornoesabor-backend.onrender.com/orders", {
        nomeCliente: nome,
        telefone,
        cidade,
        endereco,
        combo,
        sabores,
        refri: combo.tipo === "prime" ? refri : null,
        total,
      });

      alert("Pedido enviado com sucesso!");

      // reset
      setNome("");
      setTelefone("");
      setCidade("");
      setEndereco("");
      setCombo(null);
      setSabores([]);
      setRefri("");
    } catch (err) {
      console.error(err);
      alert("Erro ao enviar pedido");
    }
  };

  // ======================
  // UI
  // ======================

  return (
    <Container>
      <div className="card">
        <h1 className="title">🍕 Forno e Sabor</h1>

        {/* NOME */}
        <input
          className="input"
          placeholder="Seu nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />

        {/* TELEFONE */}
        <input
          className="input"
          placeholder="Telefone"
          value={telefone}
          onChange={(e) => setTelefone(e.target.value)}
        />

        {/* CIDADE */}
        <select
          className="select"
          value={cidade}
          onChange={(e) => setCidade(e.target.value)}
        >
          <option value="">Escolha a cidade</option>
          {cidades.map((c) => (
            <option key={c.nome} value={c.nome}>
              {c.nome} (+ R$ {c.frete})
            </option>
          ))}
        </select>

        {/* ENDEREÇO */}
        {cidade !== "Retirada" && cidade && (
          <input
            className="input"
            placeholder="Endereço"
            value={endereco}
            onChange={(e) => setEndereco(e.target.value)}
          />
        )}

        {/* COMBOS */}
        <div className="section">
          <p className="section-title">Combos</p>

          {combosDisponiveis.map((c) => (
            <label key={c.id} className="option">
              <input
                type="radio"
                checked={combo?.id === c.id}
                onChange={() => {
                  setCombo(c);
                  setRefri("");
                }}
              />
              {c.nome} - R$ {c.preco}
            </label>
          ))}
        </div>

        {/* SABORES */}
        <div className="section">
          <p className="section-title">Sabores</p>

          {saboresLista.map((s) => (
            <label key={s} className="option">
              <input
                type="checkbox"
                checked={sabores.includes(s)}
                onChange={() => toggleSabor(s)}
              />
              {s}
            </label>
          ))}
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
              <option value="">Escolha o refri</option>
              {saboresRefri[combo.refri].map((r) => (
                <option key={r}>{r}</option>
              ))}
            </select>
          </div>
        )}

        {/* TOTAL */}
        <div className="total">Total: R$ {total.toFixed(2)}</div>

        {/* BOTÃO */}
        <button className="button" onClick={enviarPedido}>
          Enviar Pedido
        </button>
      </div>
    </Container>
  );
}
