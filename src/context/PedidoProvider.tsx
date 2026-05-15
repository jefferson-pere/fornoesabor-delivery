import { useState, useCallback, useEffect, type ReactNode } from "react";
import { PedidoContext } from "./PedidoContext";
import type {
  EnderecoType,
  FormaPagamentoType,
  ItemPedido,
} from "../types/pedido";
export function PedidoProvider({ children }: { children: ReactNode }) {
  const [step, setStep] = useState(1);
  const [nome, setNome] = useState(
    () => localStorage.getItem("pedido_nome") || "",
  );
  const [telefone, setTelefone] = useState(
    () => localStorage.getItem("pedido_telefone") || "",
  );
  const [cidade, setCidade] = useState(
    () => localStorage.getItem("pedido_cidade") || "",
  );
  const [endereco, setEndereco] = useState<EnderecoType>(() => {
    const saved = localStorage.getItem("pedido_endereco");
    return saved ? JSON.parse(saved) : { rua: "", numero: "", referencia: "" };
  });
  const [itens, setItens] = useState<ItemPedido[]>([]);
  const [pagamento, setPagamento] = useState<FormaPagamentoType>("");
  const [troco, setTroco] = useState("");
  const [observacao, setObservacao] = useState("");
  useEffect(() => {
    localStorage.setItem("pedido_nome", nome);
  }, [nome]);
  useEffect(() => {
    localStorage.setItem("pedido_telefone", telefone);
  }, [telefone]);
  useEffect(() => {
    localStorage.setItem("pedido_cidade", cidade);
  }, [cidade]);
  useEffect(() => {
    localStorage.setItem("pedido_endereco", JSON.stringify(endereco));
  }, [endereco]);
  const resetPedido = useCallback(() => {
    setStep(1);
    setNome("");
    setTelefone("");
    setCidade("");
    setEndereco({ rua: "", numero: "", referencia: "" });
    setItens([]);
    setPagamento("");
    setTroco("");
    setObservacao("");
    localStorage.removeItem("pedido_nome");
    localStorage.removeItem("pedido_telefone");
    localStorage.removeItem("pedido_cidade");
    localStorage.removeItem("pedido_endereco");
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
        resetPedido,
      }}
    >
      {children}
    </PedidoContext.Provider>
  );
}
