import { useState, useEffect } from "react";
import { toast } from "sonner";
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

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  if (!order) {
    return null;
  }

  const currentOrder = order;

  const _totalCombos = currentOrder.itens.reduce((acc, item) => acc + item.combo.preco, 0);
  const _totalRefri = currentOrder.itens.reduce((acc, item) => acc + (Array.isArray(item.refriExtra) ? item.refriExtra.reduce((a, r) => a + r.preco * r.qtd, 0) : 0), 0);
  const _totalMaionese = currentOrder.itens.reduce((acc, item) => acc + item.maioneseQtd * 0.99, 0);
  const _frete = currentOrder.cidade === "Retirada" ? 0 : currentOrder.cidade === "Cariús" ? 3 : 5;
  const _taxaCartao = currentOrder.pagamento === "cartao" ? 1 : 0;
  const orderTotal = _totalCombos + _totalRefri + _totalMaionese + _frete + _taxaCartao;

  async function handleSave() {
    try {
      await updateOrder(currentOrder.id, currentOrder);
      toast.success("Pedido atualizado");
      setEditing(false);
    } catch (error) {
      console.error(error);
      toast.error("Erro ao atualizar");
    }
  }

  async function handleDelete() {
    const password = prompt("Digite a senha");
    if (password !== import.meta.env.VITE_DELETE_PASSWORD) {
      toast.error("Senha inválida");
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

      toast.error("Erro ao apagar");
    }
  }

  function handlePrint() {
    window.print();
  }

  return (
    <Container>
      <Receipt order={currentOrder} />

      <div className="overlay no-print" onClick={onClose}>
        <div className="modal" onClick={(e) => e.stopPropagation()}>
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
            <div className="card cliente-card">
              <h3>Cliente</h3>

              <div className="linha">
                <span>Nome: </span>

                <span className="valor">{currentOrder.nomeCliente}</span>
              </div>

              <div className="linha">
                <span>Telefone: </span>

                <span className="valor">{currentOrder.telefone}</span>
              </div>

              <div className="linha">
                <span>Cidade: </span>

                <span className="valor">{currentOrder.cidade}</span>
              </div>

              {currentOrder.cidade !== "Retirada" && (
                <>
                  <div className="linha">
                    <span>Rua: </span>

                    <span className="valor">
                      {currentOrder.endereco?.rua},{" "}
                      {currentOrder.endereco?.numero} -{" "}
                      {currentOrder.endereco?.referencia}
                    </span>
                  </div>
                </>
              )}

              <div className="financeiro">
                <h3>Financeiro</h3>

                <>
                  <div className="linha">
                    <span>Combos</span>
                    <span className="valor">R$ {_totalCombos.toFixed(2)}</span>
                  </div>

                  {_totalRefri > 0 && (
                    <div className="linha">
                      <span>Refri extra</span>
                      <span className="valor">R$ {_totalRefri.toFixed(2)}</span>
                    </div>
                  )}

                  {_totalMaionese > 0 && (
                    <div className="linha">
                      <span>Maionese</span>
                      <span className="valor">R$ {_totalMaionese.toFixed(2)}</span>
                    </div>
                  )}

                  <div className="linha">
                    <span>Frete</span>
                    <span className="valor">
                      {_frete === 0 ? "GRÁTIS" : `R$ ${_frete.toFixed(2)}`}
                    </span>
                  </div>

                  {_taxaCartao > 0 && (
                    <div className="linha">
                      <span>Taxa cartão</span>
                      <span className="valor">R$ {_taxaCartao.toFixed(2)}</span>
                    </div>
                  )}

                  <div className="linha">
                    <span>Pagamento</span>
                    <span className="valor">{currentOrder.pagamento}</span>
                  </div>

                  {currentOrder.troco && currentOrder.pagamento === "dinheiro" && (() => {
                    const valorInformado = Number(
                      currentOrder.troco!.replace("R$", "").replace(/\./g, "").replace(",", ".").trim(),
                    );
                    const troco = valorInformado - orderTotal;
                    return (
                      <>
                        <div className="linha">
                          <span>Valor informado</span>
                          <span className="valor">R$ {valorInformado.toFixed(2)}</span>
                        </div>
                        <div className="linha">
                          <span>Troco</span>
                          <span className="valor">R$ {troco.toFixed(2)}</span>
                        </div>
                      </>
                    );
                  })()}

                  <div className="linha total-linha">
                    <span>Total</span>
                    <span className="valor">R$ {orderTotal.toFixed(2)}</span>
                  </div>
                </>
              </div>
            </div>

            <div className="card card-pedido">
              <h3>Pedido</h3>

              <div className="pedidos-grid">
                {currentOrder.itens.map((item, i) => (
                  <div key={i} className="item">
                    <div className="item-topo">
                      <div className="combo">{item.combo.nome}</div>
                    </div>

                    <div className="sabores">
                      {Object.entries(item.sabores).filter(([, qtd]) => qtd > 0).map(([sabor, qtd]) => (
                        <div key={sabor}>
                          {qtd}x {sabor}
                        </div>
                      ))}
                    </div>

                    {item.refri && <div className="extra">🥤 {item.refri}</div>}

                    {(Array.isArray(item.refriExtra) ? item.refriExtra : []).map((r) => (
                      <div key={`${r.nome}-${r.tipo}`} className="extra">
                        🥤 {r.qtd}× {r.nome} ({r.tipo})
                      </div>
                    ))}

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
            </div>

            {currentOrder.observacao && (
              <div className="card observacao-card">
                <h3>Observação</h3>

                <p>{currentOrder.observacao}</p>
              </div>
            )}
          </div>

          <div className="acoes">
            <button className="print" onClick={handlePrint}>
              Imprimir
            </button>

            {currentOrder.telefone && (
              <a
                href={`https://wa.me/55${currentOrder.telefone.replace(
                  /\D/g,
                  "",
                )}`}
                target="_blank"
                rel="noreferrer"
                style={{
                  flex: 1,
                }}
              >
                <button className="whats">WhatsApp</button>
              </a>
            )}

            <button
              className="confirm"
              onClick={() => {
                if (!currentOrder.telefone) {
                  toast.warning("Cliente sem telefone");
                  return;
                }

                const telefone = currentOrder.telefone.replace(/\D/g, "");

                const mensagemConfirmado = `Olá, *${currentOrder.nomeCliente}*! 😊
Seu pedido Nº *${currentOrder.codigo}* foi confirmado! ✅
📦 Tipo: ${
                  currentOrder.cidade === "Retirada"
                    ? "📍 Retirada no local"
                    : "🛵 Entrega"
                }
💰 Total: R$ ${orderTotal.toFixed(2)}
⏱️ Tempo estimado: 40 a 50 minutos.
Obrigado! 🙌`;

                const mensagemEntrega =
                  currentOrder.cidade === "Retirada"
                    ? `*${currentOrder.nomeCliente}*,
Seu pedido já está pronto para retirada! 📍
Estamos aguardando você. 🙌
Muito obrigado! 😊`
                    : `*${currentOrder.nomeCliente}*,
Seu pedido saiu para entrega! 🛵
Em breve chegará até você. 😊
Obrigado pela preferência 🙌`;

                const mensagem =
                  currentOrder.status === "ENTREGA"
                    ? mensagemEntrega
                    : mensagemConfirmado;

                window.location.replace(
                  `whatsapp://send?phone=55${telefone}&text=${encodeURIComponent(
                    mensagem,
                  )}`,
                );
              }}
            >
              {currentOrder.status === "ENTREGA"
                ? currentOrder.cidade === "Retirada"
                  ? "Pedido pronto"
                  : "Saiu para entrega"
                : "Confirmar pedido"}
            </button>

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
                Editar
              </button>
            ) : (
              <button className="save" onClick={handleSave}>
                Salvar
              </button>
            )}

            <button className="danger" onClick={handleDelete}>
              Apagar
            </button>
          </div>
        </div>
      </div>
    </Container>
  );
}
