import { useEffect, useState, useRef } from "react";
import { supabase } from "../../lib/supabase";
import { getOrders, updateOrderStatus } from "../../services/orders";
import type { Pedido } from "../../types/order";
import alertSound from "../../../sounds/alert.mp3";
import {
  Acoes,
  CardHeader,
  ClienteInfo,
  Container,
  Content,
  Divider,
  Empty,
  Header,
  HistoricoCard,
  OrderCard,
  Pagamento,
  ResumoItens,
  Tab,
  Tabs,
} from "./style";

const SESSION_KEY = "delivery_entregador";

type TabKey = "rota" | "historico";

export function Entregador() {
  const [tab, setTab] = useState<TabKey>("rota");
  const [emRota, setEmRota] = useState<Pedido[]>([]);
  const [historico, setHistorico] = useState<Pedido[]>([]);
  const [entregando, setEntregando] = useState<number | null>(null);
  const nomeEntregador = useRef<string>(sessionStorage.getItem(SESSION_KEY) ?? "Entregador 1");
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const seenOrders = useRef(new Set<number>());

  useEffect(() => {
    document.body.style.backgroundColor = "#0f172a";
    return () => { document.body.style.backgroundColor = ""; };
  }, []);

  useEffect(() => {
    const audio = new Audio(alertSound);
    audio.preload = "auto";
    audioRef.current = audio;
    const desbloquear = () => {
      audio.play().then(() => { audio.pause(); audio.currentTime = 0; }).catch(() => {});
      document.removeEventListener("click", desbloquear);
    };
    document.addEventListener("click", desbloquear);
    return () => document.removeEventListener("click", desbloquear);
  }, []);

  function tocarSom() {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {});
    }
  }

  useEffect(() => {
    let mounted = true;

    async function fetchOrders() {
      try {
        const data = await getOrders();
        if (!mounted) return;
        setEmRota(data.filter((o) => o.status === "ENTREGA" && o.entregadorDesignado === nomeEntregador.current).sort(
          (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        ));
        setHistorico(data.filter((o) => o.status === "FINALIZADO" && o.entregador === nomeEntregador.current).sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        ));
      } catch (err) {
        console.error("Erro ao carregar pedidos:", err);
      }
    }

    const channel = supabase
      .channel("entregador-orders")
      .on("postgres_changes", { event: "UPDATE", schema: "public", table: "orders" }, ({ new: pedido }) => {
        const p = pedido as Pedido;
        if (p.deleted) {
          setEmRota((prev) => prev.filter((o) => o.id !== p.id));
          setHistorico((prev) => prev.filter((o) => o.id !== p.id));
          return;
        }
        if (p.status === "ENTREGA") {
          if (p.entregadorDesignado === nomeEntregador.current && !seenOrders.current.has(p.id)) {
            seenOrders.current.add(p.id);
            tocarSom();
          }
          setEmRota((prev) => {
            if (p.entregadorDesignado !== nomeEntregador.current) {
              return prev.filter((o) => o.id !== p.id);
            }
            const exists = prev.find((o) => o.id === p.id);
            if (exists) return prev.map((o) => (o.id === p.id ? p : o));
            return [...prev, p].sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
          });
          setHistorico((prev) => prev.filter((o) => o.id !== p.id));
        } else if (p.status === "FINALIZADO") {
          setEmRota((prev) => prev.filter((o) => o.id !== p.id));
          setHistorico((prev) => {
            if (p.entregador !== nomeEntregador.current) return prev;
            const exists = prev.find((o) => o.id === p.id);
            if (exists) return prev;
            return [p, ...prev];
          });
        } else {
          setEmRota((prev) => prev.filter((o) => o.id !== p.id));
        }
      })
      .subscribe((status) => {
        if (status === "SUBSCRIBED") {
          fetchOrders();
        }
      });

    return () => {
      mounted = false;
      supabase.removeChannel(channel);
    };
  }, []);

  async function marcarEntregue(id: number) {
    setEntregando(id);
    try {
      await updateOrderStatus(id, "FINALIZADO", nomeEntregador.current);
    } catch (err) {
      console.error("Erro ao finalizar pedido:", err);
    } finally {
      setEntregando(null);
    }
  }

  function abrirWhatsApp(telefone: string) {
    const digits = telefone.replace(/\D/g, "");
    const number = digits.startsWith("55") ? digits : `55${digits}`;
    window.location.href = `whatsapp://send?phone=${number}`;
  }

  function formatHora(iso: string) {
    return new Date(iso).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
  }

  function formatPagamento(p: string) {
    const map: Record<string, string> = { dinheiro: "Dinheiro", cartao: "Cartão", pix: "Pix" };
    return map[p] ?? p;
  }

  async function sair() {
    sessionStorage.removeItem(SESSION_KEY);
    await supabase.auth.signOut();
    window.location.reload();
  }

  return (
    <Container>
      <Header>
        <div className="title">
          <span className="icon">🛵</span>
          <div>
            <h1>Entregas</h1>
            <span className="nome-entregador">{nomeEntregador.current}</span>
          </div>
        </div>
        {emRota.length > 0 && (
          <span className="badge">{emRota.length} em rota</span>
        )}
        <button className="logout" onClick={sair}>Sair</button>
      </Header>

      <Tabs>
        <Tab $active={tab === "rota"} onClick={() => setTab("rota")}>
          Em Rota {emRota.length > 0 ? `(${emRota.length})` : ""}
        </Tab>
        <Tab $active={tab === "historico"} onClick={() => setTab("historico")}>
          Histórico do dia {historico.length > 0 ? `(${historico.length})` : ""}
        </Tab>
      </Tabs>

      {tab === "rota" && (
        <Content>
          {emRota.length === 0 ? (
            <Empty>
              <div className="icon">✅</div>
              <p>Nenhum pedido em rota no momento.</p>
            </Empty>
          ) : (
            emRota.map((order) => (
              <OrderCard key={order.id}>
                <CardHeader>
                  <span className="codigo">{order.codigo}</span>
                  <span className="hora">{formatHora(order.createdAt)}</span>
                </CardHeader>

                <ClienteInfo>
                  <div className="nome">{order.nomeCliente}</div>
                  <div className="infos">
                    {order.telefone && (
                      <div className="linha">
                        <span className="label">📞</span>
                        <a href={`tel:${order.telefone}`} className="valor">{order.telefone}</a>
                      </div>
                    )}
                    <div className="linha">
                      <span className="label">📍</span>
                      <span className="valor">
                        {order.cidade}
                        {order.endereco?.rua && (
                          <>, {order.endereco.rua}{order.endereco.numero ? `, ${order.endereco.numero}` : ""}</>
                        )}
                        {order.endereco?.referencia && (
                          <><br /><span style={{ color: "#64748b", fontSize: "13px" }}>Ref: {order.endereco.referencia}</span></>
                        )}
                      </span>
                    </div>
                  </div>
                </ClienteInfo>

                <Divider />

                <ResumoItens>
                  {order.itens.map((item, i) => (
                    <div className="item-linha" key={i}>
                      <span className="item-nome">{item.combo.nome}</span>
                      {item.maioneseQtd > 0 && (
                        <span>· {item.maioneseQtd}x maionese</span>
                      )}
                    </div>
                  ))}
                  {order.observacao && (
                    <div style={{ marginTop: "4px", fontSize: "13px", color: "#fbbf24", background: "rgba(251,191,36,0.08)", borderRadius: "8px", padding: "6px 10px" }}>
                      ⚠️ {order.observacao}
                    </div>
                  )}
                </ResumoItens>

                <Pagamento>
                  <span className="metodo">
                    {formatPagamento(order.pagamento)}
                    {order.pagamento === "dinheiro" && order.troco && (
                      <span className="troco">· Troco p/ R$ {order.troco}</span>
                    )}
                  </span>
                  <span className="total">R$ {order.total.toFixed(2).replace(".", ",")}</span>
                </Pagamento>

                <Acoes>
                  <button
                    className="btn-whatsapp"
                    onClick={() => order.telefone && abrirWhatsApp(order.telefone)}
                    disabled={!order.telefone}
                  >
                    💬 WhatsApp
                  </button>
                  <button
                    className="btn-entregar"
                    onClick={() => marcarEntregue(order.id)}
                    disabled={entregando === order.id}
                  >
                    {entregando === order.id ? "Finalizando..." : "✅ Entregar"}
                  </button>
                </Acoes>
              </OrderCard>
            ))
          )}
        </Content>
      )}

      {tab === "historico" && (
        <Content>
          {historico.length === 0 ? (
            <Empty>
              <div className="icon">📦</div>
              <p>Nenhuma entrega finalizada hoje.</p>
            </Empty>
          ) : (
            <>
              {historico.map((order) => {
                const frete = order.cidade === "Retirada" ? 0 : order.cidade === "Cariús" ? 3 : 5;
                return (
                  <HistoricoCard key={order.id}>
                    <div className="info">
                      <span className="codigo">✓ {order.codigo}</span>
                      <span className="nome">{order.nomeCliente}</span>
                      <span className="cidade">{order.cidade}{order.endereco?.rua ? ` · ${order.endereco.rua}` : ""}</span>
                    </div>
                    <div className="direita">
                      {frete > 0 && (
                        <span className="frete">Frete R$ {frete},00</span>
                      )}
                      <span className="total">R$ {order.total.toFixed(2).replace(".", ",")}</span>
                      <span className="hora">{formatHora(order.createdAt)}</span>
                    </div>
                  </HistoricoCard>
                );
              })}
              <div className="resumo-total">
                <span>Total em fretes</span>
                <strong>
                  R$ {historico.reduce((acc, o) => {
                    const frete = o.cidade === "Retirada" ? 0 : o.cidade === "Cariús" ? 3 : 5;
                    return acc + frete;
                  }, 0)},00
                </strong>
              </div>
            </>
          )}
        </Content>
      )}
    </Container>
  );
}
