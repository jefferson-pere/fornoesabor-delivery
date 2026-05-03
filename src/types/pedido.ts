import type { ComboType } from "../data/menu";

/* =========================
   ENDEREÇO
========================= */
export type EnderecoType = {
  rua: string;
  numero: string;
  referencia: string;
};

/* =========================
   PAGAMENTO
========================= */
export type FormaPagamentoType = "pix" | "cartao" | "dinheiro";

/* =========================
   REFRI EXTRA
========================= */
export type RefriExtraType = {
  lata: number;
  "1l": number;
};

/* =========================
   ITEM DO PEDIDO
========================= */
export type ItemPedido = {
  combo: ComboType;

  sabores: Record<string, number>;

  refri?: string;

  maioneseQtd: number;

  observacaoItem?: string;

  refriExtra?: RefriExtraType;
};

/* =========================
   CONTEXT
========================= */
export type PedidoContextType = {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;

  nome: string;
  setNome: React.Dispatch<React.SetStateAction<string>>;

  telefone: string;
  setTelefone: React.Dispatch<React.SetStateAction<string>>;

  cidade: string;
  setCidade: React.Dispatch<React.SetStateAction<string>>;

  endereco: EnderecoType;
  setEndereco: React.Dispatch<React.SetStateAction<EnderecoType>>;

  itens: ItemPedido[];
  setItens: React.Dispatch<React.SetStateAction<ItemPedido[]>>;

  pagamento: FormaPagamentoType;
  setPagamento: React.Dispatch<React.SetStateAction<FormaPagamentoType>>;

  troco: string;
  setTroco: React.Dispatch<React.SetStateAction<string>>;

  observacao: string;
  setObservacao: React.Dispatch<React.SetStateAction<string>>;

  // 🔥 MELHOR PRÁTICA (RESET CENTRALIZADO)
  resetPedido: () => void;
};
