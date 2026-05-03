import { useEffect, useState } from "react";
import axios from "axios";
import { Container } from "./style";
import { socket } from "../../services/socket";

type Item = {
  combo: { nome: string };
  sabores: Record<string, number>;
  refri?: string;
  maioneseQtd: number;
};

type Pedido = {
  id: number;
  codigo: string;
  nomeCliente: string;
  cidade: string;
  itens: Item[];
  pagamento: string;
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

    const handler = (pedido: Pedido) => {
      setPedidos((prev) => [pedido, ...prev]);
    };

    socket.on("novo-pedido", handler);

    return () => {
      socket.off("novo-pedido", handler);
    };
  }, []);

  const atualizar = (id: number, status: string) => {
    socket.emit(`pedido-${status}`, id);

    setPedidos((prev) => prev.map((p) => (p.id === id ? { ...p, status } : p)));
  };

  const renderColuna = (status: string, titulo: string) => (
    <div className="coluna">
      <div className="coluna-header">{titulo}</div>

      {pedidos
        .filter((p) => p.status === status)
        .map((p) => (
          <div key={p.id} className="card">
            <div className="topo">
              <strong>{p.nomeCliente}</strong>
              <span>{p.codigo}</span>
            </div>

            <div className="sub">{p.cidade}</div>

            {p.itens.map((item, i) => (
              <div key={i} className="item">
                <strong>{item.combo.nome}</strong>

                {Object.entries(item.sabores).map(([s, q]) =>
                  q > 0 ? (
                    <div key={s} className="sub">
                      {q}x {s}
                    </div>
                  ) : null,
                )}

                {item.refri && <div className="sub">🥤 {item.refri}</div>}

                {item.maioneseQtd > 0 && (
                  <div className="sub">🧄 {item.maioneseQtd}x</div>
                )}
              </div>
            ))}

            <div className="footer">
              <strong>R$ {p.total.toFixed(2)}</strong>

              <div className="acoes">
                <button onClick={() => atualizar(p.id, "recebido")}>✔</button>

                <button onClick={() => atualizar(p.id, "impresso")}>🖨️</button>

                <button onClick={() => atualizar(p.id, "erro")}>❌</button>
              </div>
            </div>
          </div>
        ))}
    </div>
  );

  return (
    <Container>
      <div className="grid">
        {renderColuna("enviado", "🟡 Recebidos")}
        {renderColuna("impresso", "🟢 Impressos")}
        {renderColuna("erro", "🔴 Erros")}
      </div>
    </Container>
  );
}
