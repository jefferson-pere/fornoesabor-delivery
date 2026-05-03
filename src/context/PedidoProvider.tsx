import { useEffect, useState, type ReactNode } from "react";
import { PedidoContext } from "./PedidoContext";
import type {
  EnderecoType,
  FormaPagamentoType,
  ItemPedido,
} from "../types/pedido";

function getInitialData() {
  const data = localStorage.getItem("pedido");

  if (!data) return null;

  try {
    return JSON.parse(data);
  } catch {
    return null;
  }
}

export function PedidoProvider({ children }: { children: ReactNode }) {
  const initial = getInitialData();

  const [step, setStep] = useState(initial?.step ?? 1);

  const [nome, setNome] = useState(initial?.nome ?? "");
  const [telefone, setTelefone] = useState(initial?.telefone ?? "");
  const [cidade, setCidade] = useState(initial?.cidade ?? "");

  const [endereco, setEndereco] = useState<EnderecoType>(
    initial?.endereco ?? {
      rua: "",
      numero: "",
      referencia: "",
    },
  );

  const [itens, setItens] = useState<ItemPedido[]>(initial?.itens ?? []);

  const [pagamento, setPagamento] = useState<FormaPagamentoType>(
    initial?.pagamento ?? "pix",
  );

  const [troco, setTroco] = useState(initial?.troco ?? "");
  const [observacao, setObservacao] = useState(initial?.observacao ?? "");

  useEffect(() => {
    localStorage.setItem(
      "pedido",
      JSON.stringify({
        step,
        nome,
        telefone,
        cidade,
        endereco,
        itens,
        pagamento,
        troco,
        observacao,
      }),
    );
  }, [
    step,
    nome,
    telefone,
    cidade,
    endereco,
    itens,
    pagamento,
    troco,
    observacao,
  ]);

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

        observacao,
        setObservacao,
      }}
    >
      {children}
    </PedidoContext.Provider>
  );
}
