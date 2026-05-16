import { useState, useCallback, useEffect, type ReactNode } from "react";
import { PedidoContext } from "./PedidoContext";
import type {
  EnderecoType,
  FormaPagamentoType,
  ItemPedido,
} from "../types/pedido";
export function PedidoProvider({ children }: { children: ReactNode }) {
  const [step, setStep] = useState(() => {
    const saved = localStorage.getItem("pedido_step");
    return saved ? Number(saved) : 1;
  });
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
  const [itens, setItens] = useState<ItemPedido[]>(() => {
    const saved = localStorage.getItem("pedido_itens");
    return saved ? JSON.parse(saved) : [];
  });
  const [pagamento, setPagamento] = useState<FormaPagamentoType>(() => {
    return (localStorage.getItem("pedido_pagamento") as FormaPagamentoType) || "";
  });
  const [troco, setTroco] = useState(() => localStorage.getItem("pedido_troco") || "");
  const [observacao, setObservacao] = useState(() => localStorage.getItem("pedido_observacao") || "");

  useEffect(() => { localStorage.setItem("pedido_step", String(step)); }, [step]);
  useEffect(() => { localStorage.setItem("pedido_nome", nome); }, [nome]);
  useEffect(() => { localStorage.setItem("pedido_telefone", telefone); }, [telefone]);
  useEffect(() => { localStorage.setItem("pedido_cidade", cidade); }, [cidade]);
  useEffect(() => { localStorage.setItem("pedido_endereco", JSON.stringify(endereco)); }, [endereco]);
  useEffect(() => { localStorage.setItem("pedido_itens", JSON.stringify(itens)); }, [itens]);
  useEffect(() => { localStorage.setItem("pedido_pagamento", pagamento); }, [pagamento]);
  useEffect(() => { localStorage.setItem("pedido_troco", troco); }, [troco]);
  useEffect(() => { localStorage.setItem("pedido_observacao", observacao); }, [observacao]);

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
    ["pedido_step","pedido_nome","pedido_telefone","pedido_cidade","pedido_endereco",
     "pedido_itens","pedido_pagamento","pedido_troco","pedido_observacao"]
      .forEach((k) => localStorage.removeItem(k));
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
