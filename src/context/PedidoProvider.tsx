import { useState, useCallback, useEffect, type ReactNode } from "react";
import { PedidoContext } from "./PedidoContext";
import type {
  EnderecoType,
  FormaPagamentoType,
  ItemPedidoForm,
} from "../types/pedido";

const STORAGE_KEY = "pedido_state";

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function PedidoProvider({ children }: { children: ReactNode }) {
  const saved = loadState();

  const [step, setStep] = useState<number>(saved?.step ?? 1);
  const [nome, setNome] = useState<string>(saved?.nome ?? "");
  const [telefone, setTelefone] = useState<string>(saved?.telefone ?? "");
  const [cidade, setCidade] = useState<string>(saved?.cidade ?? "");
  const [endereco, setEndereco] = useState<EnderecoType>(
    saved?.endereco ?? { rua: "", numero: "", referencia: "" },
  );
  const [itens, setItens] = useState<ItemPedidoForm[]>(saved?.itens ?? []);
  const [pagamento, setPagamento] = useState<FormaPagamentoType>(
    saved?.pagamento ?? "",
  );
  const [troco, setTroco] = useState<string>(saved?.troco ?? "");
  const [semTroco, setSemTroco] = useState<boolean>(saved?.semTroco ?? false);
  const [observacao, setObservacao] = useState<string>(saved?.observacao ?? "");

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        step,
        nome,
        telefone,
        cidade,
        endereco,
        itens,
        pagamento,
        troco,
        semTroco,
        observacao,
      }),
    );
  }, [step, nome, telefone, cidade, endereco, itens, pagamento, troco, semTroco, observacao]);

  const resetPedido = useCallback(() => {
    setStep(1);
    setItens([]);
    setPagamento("");
    setTroco("");
    setSemTroco(false);
    setObservacao("");
    // nome, telefone, cidade e endereco são mantidos para o próximo pedido
  }, []);

  return (
    <PedidoContext.Provider
      value={{
        step,
        setStep,
        nome,
        setNome,
        telefone,
        setTelefone,
        cidade,
        setCidade,
        endereco,
        setEndereco,
        itens,
        setItens,
        pagamento,
        setPagamento,
        troco,
        setTroco,
        semTroco,
        setSemTroco,
        observacao,
        setObservacao,
        resetPedido,
      }}
    >
      {children}
    </PedidoContext.Provider>
  );
}
