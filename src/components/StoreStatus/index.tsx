import { useEffect, useState } from "react";
import { toast } from "sonner";
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

  async function salvar(data: StoreStatusType) {
    try {
      setLoading(true);
      const updated = await updateStoreStatus(data);
      setStore(updated);
    } catch (err) {
      console.error(err);
      toast.error("Erro ao atualizar loja");
    } finally {
      setLoading(false);
    }
  }
  async function alterarStatus(value: LojaOption) {
    setStatusLoja(value);

    if (value === "aberto") {
      await salvar({
        aberto: true,
        altaDemanda: false,
        mensagem: "",
      });
    }
    if (value === "fechado") {
      await salvar({
        aberto: false,
        altaDemanda: false,
        mensagem: "Estamos fora do expediente",
      });
    }
    if (value === "demanda") {
      await salvar({
        aberto: true,
        altaDemanda: true,
        mensagem: "Estamos com alta demanda no momento",
      });
    }
  }
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
      <div className="info">
        <h2>Status da Loja</h2>
      </div>
      <div className="actions">
        {renderStatus()}
        <select
          disabled={loading}
          value={statusLoja}
          onChange={(e) => alterarStatus(e.target.value as LojaOption)}
        >
          <option value="aberto">🟢 Aberto</option>
          <option value="fechado">🔴 Fechado</option>
          <option value="demanda">⚠️ Alta demanda</option>
        </select>
      </div>
    </Container>
  );
}
