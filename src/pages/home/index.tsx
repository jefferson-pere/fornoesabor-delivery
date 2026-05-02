import { useState } from "react";
import type { ComboType } from "../../types";
import { api } from "../../services/api";
import { ComboSelector } from "../../components/comboSelector";
import { SaboresSelector } from "../../components/SaboresSelector";
import { RefriSelector } from "../../components/RefriSelector";
import {
  cidades,
  combosDisponiveis,
  saboresLista,
  saboresRefri,
} from "../../data/menu";

export default function Home() {
  const [combo, setCombo] = useState<ComboType | null>(null);
  const [sabores, setSabores] = useState<string[]>([]);
  const [refri, setRefri] = useState("");
  const [cidade, setCidade] = useState("");

  const toggleSabor = (s: string) => {
    setSabores((prev) =>
      prev.includes(s) ? prev.filter((i) => i !== s) : [...prev, s],
    );
  };

  const frete = cidades.find((c) => c.nome === cidade)?.frete || 0;
  const total = combo ? combo.preco + frete : 0;

  const enviar = async () => {
    if (!combo) return alert("Escolha combo");

    await api.post("/orders", {
      combo,
      sabores,
      refri: combo.tipo === "prime" ? refri : null,
      total,
      cidade,
    });

    alert("Pedido enviado");
  };

  return (
    <div>
      <h1>Forno e Sabor</h1>

      <ComboSelector
        combos={combosDisponiveis}
        selected={combo}
        onSelect={setCombo}
      />

      <SaboresSelector
        sabores={saboresLista}
        selecionados={sabores}
        onToggle={toggleSabor}
      />

      {combo?.tipo === "prime" && (
        <RefriSelector
          tipo={combo.refri}
          value={refri}
          onChange={setRefri}
          opcoes={saboresRefri}
        />
      )}

      <select onChange={(e) => setCidade(e.target.value)}>
        <option>Escolha cidade</option>
        {cidades.map((c) => (
          <option key={c.nome}>{c.nome}</option>
        ))}
      </select>

      <h2>Total: R$ {total.toFixed(2)}</h2>

      <button onClick={enviar}>Enviar</button>
    </div>
  );
}
