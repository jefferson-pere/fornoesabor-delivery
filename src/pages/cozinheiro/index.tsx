import { useEffect, useRef, useState } from "react";
import alertSound from "../../../sounds/alert.mp3";
import { getOrders, updateOrderStatus } from "../../services/orders";
import { supabase } from "../../lib/supabase";
import type { Pedido } from "../../types/order";
import { Container } from "./style";

export function Cozinheiro() {
  const [orders, setOrders] = useState<Pedido[]>([]);
  const [index, setIndex] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    document.body.style.backgroundColor = "#111827";
    return () => {
      document.body.style.backgroundColor = "";
    };
  }, []);

  useEffect(() => {
    const audio = new Audio(alertSound);
    audio.preload = "auto";
    audioRef.current = audio;

    const desbloquear = () => {
      audio
        .play()
        .then(() => {
          audio.pause();
          audio.currentTime = 0;
        })
        .catch(() => {});
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
    async function init() {
      try {
        const data = await getOrders();
        const emProducao = data
          .filter((o: Pedido) => o.status === "PRODUCAO")
          .sort(
            (a: Pedido, b: Pedido) =>
              new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
          );
        setOrders(emProducao);
      } catch (err) {
        console.error("Erro pedidos:", err);
      }
    }
    init();

    const channel = supabase
      .channel("cozinha-orders")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "orders" },
        ({ new: pedido }) => {
          if ((pedido as Pedido).status === "PRODUCAO") {
            setOrders((prev) => [...prev, pedido as Pedido]);
            tocarSom();
          }
        },
      )
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "orders" },
        ({ new: pedido }) => {
          setOrders((prev) => {
            if ((pedido as Pedido).deleted) {
              return prev.filter((o) => o.id !== (pedido as Pedido).id);
            }
            if ((pedido as Pedido).status === "PRODUCAO") {
              const exists = prev.find((o) => o.id === (pedido as Pedido).id);
              if (exists) return prev.map((o) => (o.id === (pedido as Pedido).id ? (pedido as Pedido) : o));
              tocarSom();
              return [...prev, pedido as Pedido];
            }
            return prev.filter((o) => o.id !== (pedido as Pedido).id);
          });
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  async function marcarPronto() {
    const order = orders[safeIndex];
    if (!order) return;
    try {
      await updateOrderStatus(order.id, "ENTREGA");
      setOrders((prev) => {
        const next = prev.filter((o) => o.id !== order.id);
        return next;
      });
      setIndex((prev) => Math.max(0, prev - 1));
    } catch (err) {
      console.error("Erro ao marcar pronto:", err);
    }
  }

  const total = orders.length;
  const safeIndex = total > 0 ? Math.min(index, total - 1) : 0;
  const order = orders[safeIndex] ?? null;

  return (
    <Container>
      <div className="topo">
        <h1> Cozinha</h1>
        {total > 0 && (
          <div className="contador">
            {safeIndex + 1} / {total}
          </div>
        )}
      </div>

      {!order ? (
        <div className="vazio">
          <div className="vazio-icon">✅</div>
          <p>Tudo em dia! Aguardando novos pedidos.</p>
        </div>
      ) : (
        <div className="conteudo">
          <div className="card">
            <div className="card-topo">
              <span className="codigo">{order.codigo}</span>
              <span className="hora">
                {new Date(order.createdAt).toLocaleTimeString("pt-BR", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>

            <div className="cliente">{order.nomeCliente}</div>

            <div className="itens">
              {order.itens.map((item, i) => (
                <div key={i} className="item">
                  <div className="item-nome">{item.combo.nome}</div>

                  <div className="sabores">
                    {Object.entries(item.sabores)
                      .filter(([, qtd]) => qtd > 0)
                      .map(([sabor, qtd]) => (
                        <div key={sabor} className="sabor">
                          <span className="sabor-qtd">{qtd}</span>
                          <span className="sabor-nome">{sabor}</span>
                        </div>
                      ))}
                  </div>

                  {item.observacaoItem && (
                    <div className="obs-item">📝 {item.observacaoItem}</div>
                  )}
                </div>
              ))}
            </div>

            {order.observacao && (
              <div className="observacao">⚠️ {order.observacao}</div>
            )}
          </div>

          <div className="navegacao">
            <button
              className="nav voltar"
              onClick={() => setIndex((prev) => Math.max(0, prev - 1))}
              disabled={safeIndex === 0}
            >
              ← Voltar
            </button>

            <button className="pronto" onClick={marcarPronto}>
               Pronto
            </button>

            <button
              className="nav passar"
              onClick={() => setIndex((prev) => Math.min(total - 1, prev + 1))}
              disabled={safeIndex === total - 1}
            >
              Passar →
            </button>
          </div>
        </div>
      )}
    </Container>
  );
}
