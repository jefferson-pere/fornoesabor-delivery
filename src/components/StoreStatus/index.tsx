import { useEffect, useState } from "react";

import {
  getStoreStatus,
  updateStoreStatus,
  type StoreStatusType,
} from "../../services/store";

import { Container } from "./style";

type LojaOption = "aberto" | "fechado" | "demanda";

export function StoreStatus() {
  const [store, setStore] = useState<StoreStatusType>({
    aberto: true,
    altaDemanda: false,
    mensagem: "",
  });

  const [loading, setLoading] = useState(false);

  const [statusLoja, setStatusLoja] = useState<LojaOption>("aberto");

  // 🔥 init
  useEffect(() => {
    async function init() {
      try {
        const data = await getStoreStatus();

        setStore(data);

        if (!data.aberto) {
          setStatusLoja("fechado");
        } else if (data.altaDemanda) {
          setStatusLoja("demanda");
        } else {
          setStatusLoja("aberto");
        }
      } catch (err) {
        console.error(err);
      }
    }

    init();
  }, []);

  // 🔥 salvar
  async function salvar(data: StoreStatusType) {
    try {
      setLoading(true);

      const updated = await updateStoreStatus(data);

      setStore(updated);
    } catch (err) {
      console.error(err);

      alert("Erro ao atualizar loja");
    } finally {
      setLoading(false);
    }
  }

  // 🔥 alterar
  async function alterarStatus(value: LojaOption) {
    setStatusLoja(value);

    // aberto
    if (value === "aberto") {
      await salvar({
        aberto: true,
        altaDemanda: false,
        mensagem: "",
      });
    }

    // fechado
    if (value === "fechado") {
      await salvar({
        aberto: false,
        altaDemanda: false,
        mensagem: "Estamos fora do expediente",
      });
    }

    // demanda
    if (value === "demanda") {
      await salvar({
        aberto: true,
        altaDemanda: true,
        mensagem: "Estamos com alta demanda no momento",
      });
    }
  }

  // 🔥 badge
  function renderStatus() {
    if (!store.aberto) {
      return <div className="badge fechado">🔴 Fechado</div>;
    }

    if (store.altaDemanda) {
      return <div className="badge demanda">⚠️ Alta demanda</div>;
    }

    return <div className="badge aberto">🟢 Aberto</div>;
  }

  return (
    <Container>
      {/* HEADER */}
      <div className="header">
        <div>
          <h2>Status da Loja</h2>

          <p>Controle funcionamento da loja</p>
        </div>

        {renderStatus()}
      </div>

      {/* CARD */}
      <div className="card">
        <div className="label">Status atual</div>

        <select
          disabled={loading}
          value={statusLoja}
          onChange={(e) => alterarStatus(e.target.value as LojaOption)}
        >
          <option value="aberto">🟢 Aberto</option>

          <option value="fechado">🔴 Fechado</option>

          <option value="demanda">⚠️ Alta demanda</option>
        </select>

        <div className="mensagem">
          {store.mensagem || "Loja funcionando normalmente"}
        </div>
      </div>
    </Container>
  );
}
