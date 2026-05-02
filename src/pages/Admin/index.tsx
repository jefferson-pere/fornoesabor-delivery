import { useEffect, useState } from "react";
import axios from "axios";
import { Container } from "./style";
import { socket } from "../../services/socket";

type Pedido = {
  id: number;
  nomeCliente: string;
  cidade: string;
  combo: { nome: string };
  sabores: Record<string, number>;
  refri?: string;
  total: number;
  status: string;
};

export function Admin() {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);

  useEffect(() => {
    async function init() {
      try {
        const { data } = await axios.get(
          "https://fornoesabor-backend.onrender.com/orders",
        );

        setPedidos(data.reverse());
      } catch (err) {
        console.error("Erro ao carregar pedidos:", err);
      }
    }

    init();

    socket.on("novo-pedido", (pedido: Pedido) => {
      setPedidos((prev) => [pedido, ...prev]);
    });

    return () => {
      socket.off("novo-pedido");
    };
  }, []);

  // atualizar status
  const atualizar = async (id: number, status: string) => {
    socket.emit(`pedido-${status}`, id);

    setPedidos((prev) => prev.map((p) => (p.id === id ? { ...p, status } : p)));
  };

  return (
    <Container>
      <div className="title">📦 Pedidos</div>

      {pedidos.map((p) => (
        <div key={p.id} className="pedido">
          <div className="linha">
            <strong>{p.nomeCliente}</strong>
            <span>#{p.id}</span>
          </div>

          <div>{p.cidade}</div>

          <div>
            <strong>{p.combo.nome}</strong>
          </div>

          <div>
            {Object.entries(p.sabores)
              .filter(([, q]) => q > 0)
              .map(([s, q]) => (
                <div key={s}>
                  {q}x {s}
                </div>
              ))}
          </div>

          {p.refri && <div>🥤 {p.refri}</div>}

          <div className="linha">
            <strong>R$ {p.total}</strong>
            <span className="status">{p.status}</span>
          </div>

          <div className="acoes">
            <button
              className="recebido"
              onClick={() => atualizar(p.id, "recebido")}
            >
              Recebido
            </button>

            <button className="ok" onClick={() => atualizar(p.id, "impresso")}>
              Impresso
            </button>

            <button className="erro" onClick={() => atualizar(p.id, "erro")}>
              Erro
            </button>
          </div>
        </div>
      ))}
    </Container>
  );
}
