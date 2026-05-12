import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

import { Container } from "./style";

type Pedido = {
  id: string;

  cliente: string;

  data: string;

  total?: number;
};

type PedidoApi = {
  id: number | string;

  nomeCliente: string;

  createdAt: string;

  total?: number;

  valorTotal?: number;
};

export default function SorteioPage() {
  const [pedidosSemana, setPedidosSemana] = useState<Pedido[]>([]);

  const [vencedor, setVencedor] = useState<Pedido | null>(null);

  const [mensagem, setMensagem] = useState("");

  const [loadingCarregar, setLoadingCarregar] = useState(false);

  const [loadingSortear, setLoadingSortear] = useState(false);

  const [dataInicio, setDataInicio] = useState("");

  const [dataFim, setDataFim] = useState("");

  const listaRef = useRef<HTMLDivElement>(null);

  const vencedorRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();

  const meses = [
    "janeiro",
    "fevereiro",
    "março",
    "abril",
    "maio",
    "junho",
    "julho",
    "agosto",
    "setembro",
    "outubro",
    "novembro",
    "dezembro",
  ];

  function getIntervaloSemana() {
    return {
      inicio: new Date(`${dataInicio}T00:00:00-03:00`),

      fim: new Date(`${dataFim}T23:59:59-03:00`),
    };
  }

  function formatarData(data: Date) {
    return `${String(data.getDate()).padStart(2, "0")}/${
      meses[data.getMonth()]
    }/${data.getFullYear()}`;
  }

  async function carregarPedidos() {
    setLoadingCarregar(true);

    setMensagem("");

    // loading artificial 3s
    await new Promise((resolve) => setTimeout(resolve, 3000));

    try {
      const { inicio, fim } = getIntervaloSemana();

      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/orders?all=true`,
        {
          headers: {
            "x-api-key": import.meta.env.VITE_API_KEY || "",
          },
        },
      );

      if (!res.ok) {
        setMensagem("Erro ao carregar pedidos.");

        setLoadingCarregar(false);

        return;
      }

      const pedidos: PedidoApi[] = await res.json();

      const filtrados = pedidos
        .filter((p: PedidoApi) => {
          const dataPedido = new Date(p.createdAt);

          return dataPedido >= inicio && dataPedido <= fim;
        })
        .map((p: PedidoApi) => ({
          id: String(p.id),

          cliente: p.nomeCliente,

          data: formatarData(new Date(p.createdAt)),

          total: p.total || p.valorTotal || 0,
        }));

      if (filtrados.length === 0) {
        setMensagem("Nenhum pedido no período.");

        setPedidosSemana([]);

        setLoadingCarregar(false);

        return;
      }

      setPedidosSemana(filtrados);

      setVencedor(null);

      setLoadingCarregar(false);

      setTimeout(() => {
        listaRef.current?.scrollIntoView({
          behavior: "smooth",
        });
      }, 100);
    } catch (error) {
      console.error(error);

      setMensagem("Erro de conexão com API.");

      setLoadingCarregar(false);
    }
  }

  function sortear() {
    setLoadingSortear(true);

    setVencedor(null);

    setTimeout(() => {
      const sorteado =
        pedidosSemana[Math.floor(Math.random() * pedidosSemana.length)];

      setVencedor(sorteado);

      setLoadingSortear(false);

      setTimeout(() => {
        vencedorRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }, 100);
    }, 3000);
  }

  return (
    <Container>
      <div className="container">
        <header className="header">
          <div className="logo-wrapper">
            <span className="logo-icon">🍕</span>

            <span className="logo-text">Forno & Sabor</span>
          </div>

          <button className="button-back" onClick={() => navigate(-1)}>
            ← Voltar
          </button>
        </header>

        <div className="card">
          <div className="card-header">
            <h2>Sorteio da Semana</h2>

            <div style={{ marginTop: 10 }}>
              <input
                type="date"
                value={dataInicio}
                onChange={(e) => setDataInicio(e.target.value)}
                style={{ width: 150 }}
              />

              <input
                type="date"
                value={dataFim}
                onChange={(e) => setDataFim(e.target.value)}
                style={{
                  marginLeft: 10,
                  width: 150,
                }}
              />
            </div>

            <p>
              Período: {formatarData(getIntervaloSemana().inicio)} até{" "}
              {formatarData(getIntervaloSemana().fim)}
            </p>
          </div>

          <button
            className="button button-carregar"
            onClick={carregarPedidos}
            disabled={loadingCarregar}
          >
            {loadingCarregar ? "Carregando..." : "Carregar clientes"}
          </button>

          {mensagem && <div className="message">{mensagem}</div>}

          {pedidosSemana.length > 0 && (
            <div ref={listaRef} className="list-container">
              <div className="list">
                {pedidosSemana.map((p) => (
                  <div key={p.id} className="item">
                    <div className="item-avatar">
                      {p.cliente.charAt(0).toUpperCase()}
                    </div>

                    <div className="item-content">
                      <strong className="item-name">{p.cliente}</strong>

                      <span className="item-date">{p.data}</span>
                    </div>

                    {p.total && (
                      <span className="item-total">
                        R$ {p.total.toFixed(2)}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {pedidosSemana.length > 0 && (
            <button
              className="button button-sortear"
              onClick={sortear}
              disabled={loadingSortear}
            >
              {loadingSortear ? "Sorteando..." : "Sortear agora"}
            </button>
          )}

          {vencedor && !loadingSortear && (
            <div ref={vencedorRef} className="winner-card">
              <div className="winner-header">
                <span className="winner-trophy">🏆</span>

                <h2>Vencedor(a) da semana</h2>
              </div>

              <p className="winner-message">Parabéns, você foi sorteado!</p>

              <div className="winner-content">
                <p className="winner-name">{vencedor.cliente}</p>

                <p className="winner-date">{vencedor.data}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </Container>
  );
}
