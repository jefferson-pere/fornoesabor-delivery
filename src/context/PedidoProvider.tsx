import { useState, useCallback, type ReactNode } from "react";
import { PedidoContext } from "./PedidoContext";
import type {
  EnderecoType,
  FormaPagamentoType,
  ItemPedido,
} from "../types/pedido";

export function PedidoProvider({ children }: { children: ReactNode }) {
  const [step, setStep] = useState(1);

  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [cidade, setCidade] = useState("");

  const [endereco, setEndereco] = useState<EnderecoType>({
    rua: "",
    numero: "",
    referencia: "",
  });

  const [itens, setItens] = useState<ItemPedido[]>([]);

  const [pagamento, setPagamento] = useState<FormaPagamentoType>("pix");

  const [troco, setTroco] = useState("");
  const [observacao, setObservacao] = useState("");

  // 🔥 RESET CENTRALIZADO (MELHOR PRÁTICA)
  const resetPedido = useCallback(() => {
    setStep(1);

    setNome("");
    setTelefone("");
    setCidade("");

    setEndereco({
      rua: "",
      numero: "",
      referencia: "",
    });

    setItens([]);

    setPagamento("pix");
    setTroco("");
    setObservacao("");

    // 🔥 se estiver usando persistência
    localStorage.removeItem("pedido");
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

        observacao,
        setObservacao,

        // 🔥 NOVO
        resetPedido,
      }}
    >
      {children}
    </PedidoContext.Provider>
  );
}
