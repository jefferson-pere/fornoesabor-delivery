import { useState } from "react";

import { Receipt } from "../Receipt";

import type { Pedido } from "../../types/order";

import { deleteOrder, updateOrder } from "../../services/orders";

import { Container } from "./style";

type Props = {
  order: Pedido | null;

  onClose: () => void;
};

export function OrderModal({ order, onClose }: Props) {
  const [editing, setEditing] = useState(false);

  const [form, setForm] = useState<Pedido | null>(null);

  // 🔥 sem pedido
  if (!order) {
    return null;
  }

  // 🔥 pedido seguro
  const safeOrder = order;

  // 🔥 sincroniza
  if (form?.id !== safeOrder.id) {
    setForm(safeOrder);
  }

  // 🔥 pedido atual
  const currentOrder = form ?? safeOrder;

  // 🔥 salvar
  async function handleSave() {
    try {
      await updateOrder(safeOrder.id, currentOrder);

      alert("Pedido atualizado");

      setEditing(false);
    } catch (error) {
      console.error(error);

      alert("Erro ao atualizar pedido");
    }
  }

  // 🔥 apagar
  async function handleDelete() {
    const password = prompt("Digite a senha para apagar");

    if (password !== import.meta.env.VITE_DELETE_PASSWORD) {
      alert("Senha inválida");

      return;
    }

    const confirmDelete = confirm("Deseja apagar pedido?");

    if (!confirmDelete) {
      return;
    }

    try {
      await deleteOrder(safeOrder.id);

      onClose();
    } catch (error) {
      console.error(error);

      alert("Erro ao apagar pedido");
    }
  }

  // 🔥 imprimir
  function handlePrint() {
    window.print();
  }

  return (
    <Container>
      {/* CUPOM */}
      <Receipt order={currentOrder} />

      {/* MODAL */}
      <div className="overlay no-print">
        <div className="modal">
          {/* TOPO */}
          <div className="topo">
            <h2>{safeOrder.codigo}</h2>

            <button onClick={onClose}>✕</button>
          </div>

          {/* CONTEÚDO */}
          <div className="content">
            {/* CLIENTE */}
            <label>Cliente</label>

            <input
              disabled={!editing}
              value={currentOrder.nomeCliente}
              onChange={(e) =>
                setForm({
                  ...currentOrder,

                  nomeCliente: e.target.value,
                })
              }
            />

            {/* CIDADE */}
            <label>Cidade</label>

            <input
              disabled={!editing}
              value={currentOrder.cidade}
              onChange={(e) =>
                setForm({
                  ...currentOrder,

                  cidade: e.target.value,
                })
              }
            />

            {/* PAGAMENTO */}
            <label>Pagamento</label>

            <select
              disabled={!editing}
              value={currentOrder.pagamento}
              onChange={(e) =>
                setForm({
                  ...currentOrder,

                  pagamento: e.target.value,
                })
              }
            >
              <option value="PIX">PIX</option>

              <option value="Dinheiro">Dinheiro</option>

              <option value="Cartão">Cartão</option>
            </select>

            {/* OBS */}
            <label>Observação</label>

            <textarea
              disabled={!editing}
              value={currentOrder.observacao || ""}
              onChange={(e) =>
                setForm({
                  ...currentOrder,

                  observacao: e.target.value,
                })
              }
            />

            {/* PAGO */}
            <div className="pago">
              <label>Pago</label>

              <input
                type="checkbox"
                disabled={!editing}
                checked={currentOrder.pago}
                onChange={(e) =>
                  setForm({
                    ...currentOrder,

                    pago: e.target.checked,
                  })
                }
              />
            </div>

            {/* TOTAL */}
            <div className="total">
              <strong>Total:</strong>

              <span>R$ {currentOrder.total.toFixed(2)}</span>
            </div>

            <hr />

            {/* ITENS */}
            {currentOrder.itens.map((item, i) => (
              <div key={i} className="item">
                <strong>{item.combo.nome}</strong>

                {Object.entries(item.sabores).map(([sabor, qtd]) => (
                  <div key={sabor}>
                    {qtd}x {sabor}
                  </div>
                ))}

                {item.refri && <div>🥤 {item.refri}</div>}

                {item.maioneseQtd > 0 && <div>🧄 {item.maioneseQtd}x</div>}
              </div>
            ))}
          </div>

          {/* AÇÕES */}
          <div className="acoes">
            <button onClick={handlePrint}>🖨️ Imprimir</button>

            {!editing ? (
              <button onClick={() => setEditing(true)}>✏️ Editar</button>
            ) : (
              <button onClick={handleSave}>💾 Salvar</button>
            )}

            <button className="danger" onClick={handleDelete}>
              🗑️ Apagar
            </button>
          </div>
        </div>
      </div>
    </Container>
  );
}
