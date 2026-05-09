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

  if (!order) {
    return null;
  }

  const safeOrder = order;

  if (form?.id !== safeOrder.id) {
    setForm(safeOrder);
  }

  const currentOrder = form ?? safeOrder;

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

  function handlePrint() {
    window.print();
  }

  return (
    <Container>
      <Receipt order={currentOrder} />

      <div className="overlay no-print">
        <div className="modal">
          <div className="topo">
            <div>
              <h2>{safeOrder.codigo}</h2>

              <small>
                {new Date(safeOrder.createdAt).toLocaleString("pt-BR")}
              </small>
            </div>

            <button onClick={onClose}>✕</button>
          </div>

          <div className="content">
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

            <label>Telefone</label>

            <input
              disabled={!editing}
              value={currentOrder.telefone || ""}
              onChange={(e) =>
                setForm({
                  ...currentOrder,

                  telefone: e.target.value,
                })
              }
            />

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

            {currentOrder.cidade !== "Retirada" && (
              <>
                <label>Rua</label>

                <input
                  disabled={!editing}
                  value={currentOrder.endereco?.rua || ""}
                />

                <label>Número</label>

                <input
                  disabled={!editing}
                  value={currentOrder.endereco?.numero || ""}
                />

                <label>Referência</label>

                <input
                  disabled={!editing}
                  value={currentOrder.endereco?.referencia || ""}
                />
              </>
            )}

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
              <option value="pix">PIX</option>

              <option value="dinheiro">Dinheiro</option>

              <option value="cartao">Cartão</option>
            </select>

            {currentOrder.troco && (
              <>
                <label>Troco</label>

                <input disabled value={currentOrder.troco} />
              </>
            )}

            {/* <label>Observação admin</label>

            <textarea
              disabled={!editing}
              value={currentOrder.observacao || ""}
              onChange={(e) =>
                setForm({
                  ...currentOrder,

                  observacao: e.target.value,
                })
              }
            /> */}
            {/* 
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
            </div> */}

            <div className="total">
              <strong>Total:</strong>

              <span>R$ {currentOrder.total.toFixed(2)}</span>
            </div>

            <hr />

            {currentOrder.itens.map((item, i) => (
              <div key={i} className="item">
                <strong>{item.combo.nome}</strong>

                {Object.entries(item.sabores).map(([sabor, qtd]) => (
                  <div key={sabor}>
                    {qtd}x {sabor}
                  </div>
                ))}

                {item.refri && <div>🥤 {item.refri}</div>}

                {item.refriExtra && (
                  <div>
                    🥤 Extra: {item.refriExtra.nome} ({item.refriExtra.tipo})
                  </div>
                )}

                {item.maioneseQtd > 0 && <div>🧄 {item.maioneseQtd}x</div>}

                {item.observacaoItem && <div>📝 {item.observacaoItem}</div>}
              </div>
            ))}
          </div>

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
