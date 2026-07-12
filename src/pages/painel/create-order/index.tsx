import { startTransition, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { useLocation, useNavigate } from "react-router-dom";
import { Container } from "./style";
import type { OrderStatus, Pedido } from "../../../types/order";
import {
  cidades,
  combosDisponiveis,
  saboresLista,
  saboresRefri,
  type ComboType,
  type RefriType,
} from "../../../data/menu";
import type {
  FormaPagamentoType,
  ItemPedido,
  RefriExtraType,
} from "../../../types/pedido";

export default function CreateOrder() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as
    | {
        order: Pedido;
        fromModal?: boolean;
      }
    | undefined;

  const order = state?.order;
  const [status, setStatus] = useState<OrderStatus>("NOVO");
  const [loading, setLoading] = useState(false);
  const [nomeCliente, setNomeCliente] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [cidade, setCidade] = useState("");
  const [rua, setRua] = useState("");
  const [numero, setNumero] = useState("");
  const [referencia, setReferencia] = useState("");
  const [pagamento, setPagamento] = useState<FormaPagamentoType | "">("");
  const [troco, setTroco] = useState("");
  const [observacao, setObservacao] = useState("");
  const [itens, setItens] = useState<ItemPedido[]>([]);
  const [comboSelecionado, setComboSelecionado] = useState<ComboType | null>(
    null,
  );

  const [sabores, setSabores] = useState<Record<string, number>>({});
  const [refri, setRefri] = useState("");
  const [maioneseQtd, setMaioneseQtd] = useState(0);
  const [refrisExtras, setRefrisExtras] = useState<Record<string, number>>({});
  const [observacaoItem, setObservacaoItem] = useState("");
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  useEffect(() => {
    if (!order) return;

    startTransition(() => {
      const [nome, ...resto] = order.nomeCliente.split(" ");
      setNomeCliente(nome || "");
      setSobrenome(resto.join(" "));
      setTelefone(order.telefone || "");
      setCidade(order.cidade);
      setPagamento(order.pagamento as FormaPagamentoType);
      setStatus(order.status);
      setTroco(order.troco || "");
      setObservacao(order.observacao || "");

      if (order.endereco) {
        setRua(order.endereco.rua);
        setNumero(order.endereco.numero);
        setReferencia(order.endereco.referencia || "");
      }

      const itensConvertidos: ItemPedido[] = order.itens.map((item) => {
        const comboEncontrado = combosDisponiveis.find(
          (combo) => combo.nome === item.combo.nome,
        );

        return {
          combo: comboEncontrado || combosDisponiveis[0],
          sabores: item.sabores,
          refri: item.refri,
          maioneseQtd: item.maioneseQtd || 0,
          observacaoItem: item.observacaoItem,
          refriExtra: item.refriExtra || [],
        };
      });

      setItens(itensConvertidos);
    });
  }, [order]);

  const totalSabores = useMemo(() => {
    return Object.values(sabores).reduce((acc, item) => acc + item, 0);
  }, [sabores]);

  const subtotal = useMemo(() => {
    return itens.reduce((acc, item) => {
      return (
        acc +
        item.combo.preco +
        (item.maioneseQtd || 0) * 0.99 +
        (Array.isArray(item.refriExtra) ? item.refriExtra.reduce((a, r) => a + r.preco * r.qtd, 0) : 0)
      );
    }, 0);
  }, [itens]);

  const frete = useMemo(() => {
    return cidades.find((item) => item.nome === cidade)?.frete || 0;
  }, [cidade]);

  const taxaCartao = pagamento === "cartao" ? 1 : 0;

  const total = subtotal + frete + taxaCartao;

  function selecionarCombo(id: number) {
    const combo = combosDisponiveis.find((item) => item.id === id);

    if (!combo) return;

    const totalAtual = Object.values(sabores).reduce(
      (acc, qtd) => acc + qtd,
      0,
    );
    if (totalAtual > combo.unidades) {
      setSabores({});
    }
    if (combo.refri === "none") {
      setRefri("");
    }
    setComboSelecionado(combo);
  }

  function alterarSabor(sabor: string, quantidade: number) {
    if (!comboSelecionado) return;
    if (quantidade % 5 !== 0) return;
    const totalAtual = Object.entries(sabores).reduce((acc, [key, value]) => {
      if (key === sabor) return acc;
      return acc + value;
    }, 0);

    if (totalAtual + quantidade > comboSelecionado.unidades) {
      return;
    }
    setSabores((prev) => ({
      ...prev,
      [sabor]: quantidade,
    }));
  }

  function adicionarItem() {
    if (!comboSelecionado) {
      toast.warning("Selecione um combo");
      return;
    }
    if (totalSabores !== comboSelecionado.unidades) {
      toast.warning(`O combo precisa ter ${comboSelecionado.unidades} esfihas`);
      return;
    }
    if (comboSelecionado.refri !== "none" && !refri) {
      toast.warning("Selecione o refri");
      return;
    }

    const refriExtraArray: RefriExtraType[] = Object.entries(refrisExtras)
      .filter(([, qtd]) => qtd > 0)
      .map(([key, qtd]) => {
        const lastDash = key.lastIndexOf("-");
        const nome = key.substring(0, lastDash);
        const tipo = key.substring(lastDash + 1) as "lata" | "1l";
        return { nome, tipo, preco: tipo === "lata" ? 5 : 8, qtd };
      });

    const novoItem: ItemPedido = {
      combo: comboSelecionado,
      sabores,
      refri,
      maioneseQtd,
      observacaoItem,
      refriExtra: refriExtraArray,
    };

    if (editingIndex !== null) {
      setItens((prev) =>
        prev.map((item, index) => (index === editingIndex ? novoItem : item)),
      );
    } else {
      setItens((prev) => [...prev, novoItem]);
    }
    setEditingIndex(null);
    setComboSelecionado(null);
    setSabores({});
    setRefri("");
    setMaioneseQtd(0);
    setRefrisExtras({});
    setObservacaoItem("");
  }

  function removerItem(index: number) {
    setItens((prev) => prev.filter((_, i) => i !== index));
  }

  function cancelarItem() {
    setEditingIndex(null);
    setComboSelecionado(null);
    setSabores({});
    setRefri("");
    setMaioneseQtd(0);
    setRefrisExtras({});
    setObservacaoItem("");
  }

  function editarItem(index: number) {
    const item = itens[index];
    setEditingIndex(index);
    const comboAtual =
      combosDisponiveis.find((combo) => combo.id === item.combo.id) || null;
    setComboSelecionado(comboAtual);
    setSabores({ ...item.sabores });
    setRefri(item.refri || "");
    setMaioneseQtd(item.maioneseQtd);
    const extrasMap: Record<string, number> = {};
    for (const r of (Array.isArray(item.refriExtra) ? item.refriExtra : [])) {
      extrasMap[`${r.nome}-${r.tipo}`] = r.qtd;
    }
    setRefrisExtras(extrasMap);
    setObservacaoItem(item.observacaoItem || "");
  }
  async function criarPedido() {
    try {
      if (!nomeCliente.trim()) {
        toast.warning("Digite o nome");
        return;
      }
      if (!cidade) {
        toast.warning("Selecione a cidade");
        return;
      }
      if (cidade !== "Retirada" && (!rua || !numero)) {
        toast.warning("Preencha o endereço completo");
        return;
      }
      if (itens.length === 0) {
        toast.warning("Adicione pelo menos um item");
        return;
      }
      if (!pagamento) {
        toast.warning("Selecione a forma de pagamento");
        return;
      }

      if (pagamento === "dinheiro" && !troco) {
        toast.warning("Informe o troco");
        return;
      }

      const itensLimpos = itens.map((item) => ({
        ...item,
        sabores: Object.fromEntries(
          Object.entries(item.sabores).filter(([, qtd]) => qtd > 0),
        ),
        maioneseQtd: item.maioneseQtd > 0 ? item.maioneseQtd : undefined,
        refriExtra: item.refriExtra || undefined,
        observacaoItem: item.observacaoItem?.trim()
          ? item.observacaoItem
          : undefined,
      }));

      const pedido = {
        status,
        nomeCliente: `${nomeCliente} ${sobrenome}`.trim(),
        telefone: telefone,
        cidade,
        endereco:
          cidade !== "Retirada"
            ? {
                rua,
                numero,
                referencia,
              }
            : null,
        itens: itensLimpos,
        pagamento,
        troco,
        observacao,
      };

      setLoading(true);

      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/orders${order ? `/${order.id}` : ""}`,
        {
          method: order ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": import.meta.env.VITE_API_KEY,
          },
          body: JSON.stringify(pedido),
        },
      );

      if (!res.ok) {
        const error = await res.json();
        toast.error(error.error || "Erro ao salvar pedido");
        return;
      }
      toast.success(order ? "Pedido atualizado" : "Pedido criado");
      if (order) {
        navigate("/painel", {
          state: {
            reopenOrder: order.id,
          },
        });

        return;
      }
      navigate("/painel");
      setNomeCliente("");
      setSobrenome("");
      setTelefone("");
      setCidade("");
      setRua("");
      setNumero("");
      setReferencia("");
      setPagamento("");
      setTroco("");
      setObservacao("");
      setItens([]);
      setComboSelecionado(null);
    } catch (err) {
      console.error(err);

      toast.error("Erro de conexão com servidor");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container>
      <div className="content">
        <div className="card full">
          <div className="top">
            <h2>Cliente</h2>
          </div>

          <div className="grid-2">
            <input
              placeholder="Nome"
              value={nomeCliente}
              onChange={(e) => setNomeCliente(e.target.value)}
            />

            <input
              placeholder="Sobrenome"
              value={sobrenome}
              onChange={(e) => setSobrenome(e.target.value)}
            />
          </div>

          <div className="grid-2">
            <input
              placeholder="Telefone"
              value={telefone}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "").slice(0, 11);

                let formatted = value;

                if (value.length > 2) {
                  formatted = `(${value.slice(0, 2)}) ${value.slice(2)}`;
                }

                if (value.length > 7) {
                  formatted = `(${value.slice(0, 2)}) ${value.slice(
                    2,
                    7,
                  )}-${value.slice(7)}`;
                }

                setTelefone(formatted);
              }}
            />

            <select value={cidade} onChange={(e) => setCidade(e.target.value)}>
              <option value="">Cidade</option>

              {cidades.map((item) => (
                <option key={item.nome} value={item.nome}>
                  {item.nome}
                </option>
              ))}
            </select>
          </div>

          {cidade !== "Retirada" && (
            <div className="grid-3">
              <input
                placeholder="Rua"
                value={rua}
                onChange={(e) => setRua(e.target.value)}
              />

              <input
                placeholder="Número"
                value={numero}
                onChange={(e) => setNumero(e.target.value.replace(/\D/g, ""))}
              />

              <input
                placeholder="Referência"
                value={referencia}
                onChange={(e) => setReferencia(e.target.value)}
              />
            </div>
          )}
        </div>

        <div className="card half-card">
          <div className="top">
            <h2>Novo item</h2>

            {comboSelecionado && (
              <span>
                {totalSabores}/{comboSelecionado.unidades}
              </span>
            )}
          </div>

          <select
            value={comboSelecionado ? String(comboSelecionado.id) : ""}
            onChange={(e) => {
              const comboId = Number(e.target.value);

              selecionarCombo(comboId);
            }}
          >
            <option value="">Selecione um combo</option>

            {combosDisponiveis.map((combo) => (
              <option key={combo.id} value={String(combo.id)}>
                {combo.nome} — R$ {combo.preco.toFixed(2)}
              </option>
            ))}
          </select>

          {comboSelecionado && (
            <>
              <div className="combo-preco-badge">
                R$ {comboSelecionado.preco.toFixed(2)}
                <span>{comboSelecionado.unidades} esfihas</span>
              </div>

              <div className="sabores">
                {saboresLista.map((sabor) => {
                  const qty = sabores[sabor] || 0;
                  return (
                  <div key={sabor} className="sabor">
                    <span>{sabor}</span>

                    <div className="sabor-qtd">
                      <button
                        type="button"
                        className="qtd-btn"
                        onClick={() => alterarSabor(sabor, Math.max(qty - 5, 0))}
                        disabled={qty === 0}
                      >−</button>
                      <span className={`qtd-val${qty > 0 ? " has" : ""}`}>{qty}</span>
                      <button
                        type="button"
                        className="qtd-btn"
                        onClick={() => alterarSabor(sabor, qty + 5)}
                        disabled={totalSabores >= comboSelecionado.unidades}
                      >+</button>
                    </div>
                  </div>
                  );
                })}
              </div>

              {comboSelecionado.refri !== "none" && (
                <select
                  value={refri}
                  onChange={(e) => setRefri(e.target.value)}
                >
                  <option value="">Refri incluso</option>

                  {saboresRefri[
                    comboSelecionado.refri as Exclude<RefriType, "none">
                  ].map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              )}

              <div className="grid-2">
                <input
                  type="number"
                  min={0}
                  placeholder={
                    comboSelecionado.maioneseInclusa
                      ? "Maionese extra"
                      : "Qtd maionese"
                  }
                  value={maioneseQtd || ""}
                  onChange={(e) => setMaioneseQtd(Number(e.target.value || 0))}
                />

                <div className="extra-info">
                  {comboSelecionado.maioneseInclusa ? (
                    <>
                      <span>1 inclusa + extras</span>

                      <strong>+ R$ {maioneseQtd * 0.99}</strong>
                    </>
                  ) : (
                    <>
                      <span>Maionese</span>

                      <strong>R$ {maioneseQtd * 0.99}</strong>
                    </>
                  )}
                </div>
              </div>

              <div className="grid-2">
                <select
                  value=""
                  onChange={(e) => {
                    if (!e.target.value) return;
                    setRefrisExtras((prev) => ({
                      ...prev,
                      [e.target.value]: (prev[e.target.value] || 0) + 1,
                    }));
                  }}
                >
                  <option value="">
                    {Object.values(refrisExtras).some((q) => q > 0) ? "Adicionar outro refri" : "Refri extra"}
                  </option>
                  <optgroup label="Lata - R$ 5">
                    {saboresRefri.lata.map((r) => (
                      <option key={r} value={`${r}-lata`}>{r}</option>
                    ))}
                  </optgroup>
                  <optgroup label="1L - R$ 8">
                    {saboresRefri["1l"].map((r) => (
                      <option key={r} value={`${r}-1l`}>{r}</option>
                    ))}
                  </optgroup>
                </select>

                <div className="extra-info">
                  <span>Extra</span>
                  <strong>
                    R$ {Object.entries(refrisExtras).filter(([, q]) => q > 0).reduce((acc, [key, qtd]) => {
                      const tipo = key.substring(key.lastIndexOf("-") + 1);
                      return acc + (tipo === "lata" ? 5 : 8) * qtd;
                    }, 0).toFixed(2)}
                  </strong>
                </div>
              </div>

              {Object.entries(refrisExtras).filter(([, q]) => q > 0).length > 0 && (
                <div className="refri-extra-lista">
                  {Object.entries(refrisExtras).filter(([, q]) => q > 0).map(([key, qty]) => {
                    const lastDash = key.lastIndexOf("-");
                    const nome = key.substring(0, lastDash);
                    const tipo = key.substring(lastDash + 1) as "lata" | "1l";
                    return (
                      <div key={key} className="refri-extra-tag">
                        <button onClick={() => setRefrisExtras((p) => ({ ...p, [key]: Math.max(0, p[key] - 1) }))}>−</button>
                        <span>{qty}× {nome} ({tipo === "lata" ? "Lata" : "1L"}) — R$ {((tipo === "lata" ? 5 : 8) * qty).toFixed(2)}</span>
                        <button onClick={() => setRefrisExtras((p) => ({ ...p, [key]: p[key] + 1 }))}>+</button>
                        <button onClick={() => setRefrisExtras((p) => ({ ...p, [key]: 0 }))}>✕</button>
                      </div>
                    );
                  })}
                </div>
              )}

              <textarea
                placeholder="Observação"
                value={observacaoItem}
                onChange={(e) => setObservacaoItem(e.target.value)}
              />

              <div className="item-btn-group">
                <button type="button" onClick={adicionarItem}>
                  {editingIndex !== null ? "Salvar edição" : "Adicionar item"}
                </button>

                <button
                  type="button"
                  className="cancel-btn"
                  onClick={cancelarItem}
                >
                  Cancelar
                </button>
              </div>
            </>
          )}
        </div>

        <div className="card full">
          <div className="top">
            <h2>Itens adicionados</h2>

            <span>{itens.length}</span>
          </div>

          <div className="items-grid">
            {itens.map((item, index) => (
              <div key={index} className="item-card">
                <div className="item-header">
                  <div>
                    <strong>{item.combo.nome}</strong>

                    <small>{item.combo.unidades} unidades</small>
                  </div>

                  <div className="item-actions">
                    <button
                      type="button"
                      className="edit-btn"
                      onClick={() => editarItem(index)}
                    >
                      ✏️
                    </button>

                    <button
                      type="button"
                      className="remove-btn"
                      onClick={() => removerItem(index)}
                    >
                      X
                    </button>
                  </div>
                </div>

                <div className="sabores-selected">
                  {Object.entries(item.sabores).map(
                    ([sabor, qtd]) =>
                      qtd > 0 && (
                        <div key={sabor} className="sabor-tag">
                          <span>{sabor}</span>

                          <strong>{qtd}x</strong>
                        </div>
                      ),
                  )}
                </div>

                <div className="item-values">
                  <small>
                    Combo:
                    <strong>R$ {item.combo.preco.toFixed(2)}</strong>
                  </small>

                  {item.maioneseQtd > 0 && (
                    <small>
                      Maionese:
                      <strong>
                        R$ {((item.maioneseQtd || 0) * 0.99).toFixed(2)}
                      </strong>
                    </small>
                  )}

                  {(item.refriExtra?.length ?? 0) > 0 && (
                    <small>
                      Extra:
                      <strong>R$ {item.refriExtra!.reduce((a, r) => a + r.preco * r.qtd, 0).toFixed(2)}</strong>
                    </small>
                  )}

                  <small className="item-total">
                    Total:
                    <strong>
                      R${" "}
                      {(
                        item.combo.preco +
                        (item.maioneseQtd || 0) * 0.99 +
                        (Array.isArray(item.refriExtra) ? item.refriExtra.reduce((a, r) => a + r.preco * r.qtd, 0) : 0)
                      ).toFixed(2)}
                    </strong>
                  </small>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="resume">
        <div className="card sticky">
          <div className="top">
            <h2>Resumo</h2>
          </div>

          <select
            value={pagamento}
            onChange={(e) => setPagamento(e.target.value as FormaPagamentoType)}
          >
            <option value="">Forma pagamento</option>

            <option value="pix">PIX</option>

            <option value="cartao">Cartão</option>

            <option value="dinheiro">Dinheiro</option>
          </select>

          {pagamento === "dinheiro" && (
            <input
              placeholder="R$ 0,00"
              value={troco}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "");

                const number = Number(value) / 100;

                setTroco(
                  number.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }),
                );
              }}
            />
          )}

          <div className="prices">
            <div>
              <span>Subtotal</span>

              <strong>R$ {subtotal.toFixed(2)}</strong>
            </div>

            <div>
              <span>Frete</span>

              <strong>R$ {frete.toFixed(2)}</strong>
            </div>
            {taxaCartao > 0 && (
              <div>
                <span>Taxa cartão</span>

                <strong>R$ {taxaCartao.toFixed(2)}</strong>
              </div>
            )}
            <div className="total">
              <span>Total</span>

              <strong>R$ {total.toFixed(2)}</strong>
            </div>
          </div>

          <button className="finish" onClick={criarPedido} disabled={loading}>
            {loading
              ? order
                ? "Atualizando..."
                : "Criando..."
              : order
                ? "Atualizar pedido"
                : "Criar pedido"}
          </button>

          <button
            className="finish cancel-finish"
            onClick={() =>
              navigate(
                order ? "/painel" : "/painel",
                order ? { state: { reopenOrder: order.id } } : undefined,
              )
            }
            disabled={loading}
          >
            Cancelar
          </button>
        </div>
      </div>
    </Container>
  );
}
