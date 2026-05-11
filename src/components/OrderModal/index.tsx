import { useState } from "react";

import { Receipt } from "../Receipt";

import type { Pedido } from "../../types/order";

import { deleteOrder, updateOrder } from "../../services/orders";

import { Container } from "./style";
import { useNavigate } from "react-router-dom";

type Props = {
  order: Pedido | null;

  onClose: () => void;
};

export function OrderModal({ order, onClose }: Props) {
  const navigate = useNavigate();
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
      await updateOrder(currentOrder.id, currentOrder);

      alert("Pedido atualizado");

      setEditing(false);
    } catch (error) {
      console.error(error);

      alert("Erro ao atualizar");
    }
  }

  async function handleDelete() {
    const password = prompt("Digite a senha");

    if (password !== import.meta.env.VITE_DELETE_PASSWORD) {
      alert("Senha inválida");

      return;
    }

    const confirmDelete = confirm("Deseja apagar?");

    if (!confirmDelete) {
      return;
    }

    try {
      await deleteOrder(currentOrder.id);

      onClose();
    } catch (error) {
      console.error(error);

      alert("Erro ao apagar");
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
            <div className="codigo">
              <h2>{currentOrder.codigo}</h2>

              <small>
                {new Date(currentOrder.createdAt).toLocaleString("pt-BR")}
              </small>

              <div className="badges">
                <div className={`badge ${currentOrder.status.toLowerCase()}`}>
                  {currentOrder.status}
                </div>

                <div
                  className={`badge ${currentOrder.pago ? "pago" : "nao-pago"}`}
                >
                  {currentOrder.pago ? "Pago" : "Não Pago"}
                </div>

                <div className="badge novo">{currentOrder.pagamento}</div>
              </div>
            </div>

            <button className="close" onClick={onClose}>
              ✕
            </button>
          </div>

          <div className="grid">
            <div className="card">
              <h3>Cliente</h3>

              <div className="linha">
                <span>Nome</span>

                <span className="valor">{currentOrder.nomeCliente}</span>
              </div>

              <div className="linha">
                <span>Telefone</span>

                <span className="valor">{currentOrder.telefone}</span>
              </div>

              <div className="linha">
                <span>Cidade</span>

                <span className="valor">{currentOrder.cidade}</span>
              </div>

              {currentOrder.cidade !== "Retirada" && (
                <>
                  <div className="linha">
                    <span>Rua</span>

                    <span className="valor">{currentOrder.endereco?.rua}</span>
                  </div>

                  <div className="linha">
                    <span>Número</span>

                    <span className="valor">
                      {currentOrder.endereco?.numero}
                    </span>
                  </div>

                  <div className="linha">
                    <span>Referência</span>

                    <span className="valor">
                      {currentOrder.endereco?.referencia}
                    </span>
                  </div>
                </>
              )}
            </div>

            <div className="card">
              <h3>Financeiro</h3>

              <div className="linha">
                <span>Pagamento</span>

                <span className="valor">{currentOrder.pagamento}</span>
              </div>

              {currentOrder.troco && (
                <div className="linha">
                  <span>Troco</span>

                  <span className="valor">{currentOrder.troco}</span>
                </div>
              )}

              <div className="linha">
                <span>Total</span>

                <span className="valor">
                  R$ {currentOrder.total.toFixed(2)}
                </span>
              </div>
            </div>

            <div className="card">
              <h3>Pedido</h3>

              {currentOrder.itens.map((item, i) => (
                <div key={i} className="item">
                  <div className="item-topo">
                    <div className="combo">{item.combo.nome}</div>
                  </div>

                  <div className="sabores">
                    {Object.entries(item.sabores).map(([sabor, qtd]) => (
                      <div key={sabor}>
                        {qtd}x {sabor}
                      </div>
                    ))}
                  </div>

                  {item.refri && <div className="extra">🥤 {item.refri}</div>}

                  {item.refriExtra && (
                    <div className="extra">
                      🥤 Extra: {item.refriExtra.nome}
                    </div>
                  )}

                  {item.maioneseQtd > 0 && (
                    <div className="extra">
                      🧄{item.maioneseQtd}x Maionese extra
                    </div>
                  )}

                  {item.observacaoItem && (
                    <div className="observacao">📝 {item.observacaoItem}</div>
                  )}
                </div>
              ))}
            </div>

            {currentOrder.observacao && (
              <div className="card">
                <h3>Observação</h3>

                <p>{currentOrder.observacao}</p>
              </div>
            )}
          </div>

          <div className="acoes">
            <button className="print" onClick={handlePrint}>
              🖨️ Imprimir
            </button>

            {currentOrder.telefone && (
              <a
                href={`https://wa.me/55${currentOrder.telefone.replace(/\D/g, "")}`}
                target="_blank"
                rel="noreferrer"
                style={{
                  flex: 1,
                }}
              >
                <button className="whats">WhatsApp</button>
              </a>
            )}

            {!editing ? (
              <button
                className="edit"
                onClick={() =>
                  navigate("/painel/criarpedido", {
                    state: {
                      order: currentOrder,

                      fromModal: true,
                    },
                  })
                }
              >
                ✏️ Editar
              </button>
            ) : (
              <button className="save" onClick={handleSave}>
                💾 Salvar
              </button>
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
