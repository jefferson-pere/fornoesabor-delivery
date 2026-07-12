import { useEffect, useMemo, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { getOrders } from "../../services/orders";
import type { Pedido } from "../../types/order";
import { Container } from "./style";

type Periodo = "dia" | "semana" | "mes" | "ano";

function getDataBrasilia(isoStr: string): string {
  if (!isoStr) return "";
  const utc = new Date(isoStr);
  // Subtrai 3h para converter UTC → Brasília (UTC-3)
  const brasilia = new Date(utc.getTime() - 3 * 60 * 60 * 1000);
  const y = brasilia.getUTCFullYear();
  const m = String(brasilia.getUTCMonth() + 1).padStart(2, "0");
  const d = String(brasilia.getUTCDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

const CUSTOS_SABORES: Record<string, number> = {
  "Frango com mussarela": 0.38,
  "Calabresa com mussarela": 0.46,
  "Frango com catupiry": 0.28,
  "Calabresa com catupiry": 0.36,
  "Frango com bacon": 0.34,
  "Bacon com mussarela": 0.51,
  "Mussarela": 0.45,
  "Mista": 0.37,
  "Chocolate com granulado": 0.34,
  "Carne moída": 0.35,
};

const CUSTOS_REFRI: Record<string, number> = {
  "Coca cola": 3.15,
  "Coca cola Zero": 3.19,
  "Fanta laranja": 2.99,
  "Cajuína": 2.80,
  "Guaraná": 4.59,
  "Pepsi": 4.42,
  "Sukita laranja": 4.25,
};

const FRETE_CIDADES: Record<string, number> = {
  "Cariús": 3,
  "Jucás": 5,
  "Retirada": 0,
};

const STATUS_LABELS: Record<string, string> = {
  NOVO: "Novo",
  PRODUCAO: "Em produção",
  ENTREGA: "Em entrega",
  FINALIZADO: "Finalizado",
  CANCELADO: "Cancelado",
};

const STATUS_COLORS: Record<string, string> = {
  NOVO: "#2563eb",
  PRODUCAO: "#d97706",
  ENTREGA: "#7c3aed",
  FINALIZADO: "#16a34a",
  CANCELADO: "#dc2626",
};

const MESES = [
  { valor: 1, nome: "Janeiro" },
  { valor: 2, nome: "Fevereiro" },
  { valor: 3, nome: "Março" },
  { valor: 4, nome: "Abril" },
  { valor: 5, nome: "Maio" },
  { valor: 6, nome: "Junho" },
  { valor: 7, nome: "Julho" },
  { valor: 8, nome: "Agosto" },
  { valor: 9, nome: "Setembro" },
  { valor: 10, nome: "Outubro" },
  { valor: 11, nome: "Novembro" },
  { valor: 12, nome: "Dezembro" },
];

export function Estatisticas() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Pedido[]>([]);
  const [loading, setLoading] = useState(true);
  const [periodo, setPeriodo] = useState<Periodo>("dia");

  const [dataSelecionada, setDataSelecionada] = useState(() => {
    const now = new Date();
    const y = now.getFullYear();
    const m = String(now.getMonth() + 1).padStart(2, "0");
    const d = String(now.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  });

  const [anoSelecionado, setAnoSelecionado] = useState(() => new Date().getFullYear());
  const [mesSelecionado, setMesSelecionado] = useState(() => new Date().getMonth() + 1);

  const anos = useMemo(() => {
    const atual = new Date().getFullYear();
    return Array.from({ length: 5 }, (_, i) => atual - 3 + i);
  }, []);

  useEffect(() => {
    getOrders(true)
      .then(setOrders)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const getInicioSemana = useCallback((data: Date): Date => {
    const d = new Date(data);
    const dia = d.getDay();
    const diff = d.getDate() - dia + (dia === 0 ? -6 : 1);
    return new Date(d.setDate(diff));
  }, []);

  const getFimSemana = useCallback(
    (data: Date): Date => {
      const inicio = getInicioSemana(data);
      const fim = new Date(inicio);
      fim.setDate(inicio.getDate() + 6);
      return fim;
    },
    [getInicioSemana],
  );

  const getDataStr = useCallback((isoStr: string) => getDataBrasilia(isoStr), []);

  const pedidosFiltrados = useMemo(() => {
    switch (periodo) {
      case "dia":
        return orders.filter((p) => getDataStr(p.createdAt) === dataSelecionada);
      case "semana": {
        const [ano, mes, dia] = dataSelecionada.split("-").map(Number);
        const inicio = getInicioSemana(new Date(ano, mes - 1, dia));
        const fim = getFimSemana(new Date(ano, mes - 1, dia));
        return orders.filter((p) => {
          const [pA, pM, pD] = getDataStr(p.createdAt).split("-").map(Number);
          const d = new Date(pA, pM - 1, pD);
          return d >= inicio && d <= fim;
        });
      }
      case "mes":
        return orders.filter((p) => {
          const [pA, pM] = getDataStr(p.createdAt).split("-").map(Number);
          return pA === anoSelecionado && pM === mesSelecionado;
        });
      case "ano":
        return orders.filter((p) => {
          const [pA] = getDataStr(p.createdAt).split("-").map(Number);
          return pA === anoSelecionado;
        });
      default:
        return [];
    }
  }, [orders, periodo, dataSelecionada, anoSelecionado, mesSelecionado, getInicioSemana, getFimSemana, getDataStr]);

  // ── KPIs ──────────────────────────────────────────────────────────────────
  const totalPedidos = pedidosFiltrados.length;
  const pedidosPagos = pedidosFiltrados.filter((p) => p.pago).length;
  const pedidosPendentes = pedidosFiltrados.filter((p) => !p.pago).length;
  const faturamentoTotal = pedidosFiltrados.reduce((acc, p) => acc + p.total, 0);
  const totalFrete = pedidosFiltrados.reduce((acc, p) => acc + (FRETE_CIDADES[p.cidade] ?? 0), 0);
  const faturamentoSemFrete = faturamentoTotal - totalFrete;

  // ── Combos ────────────────────────────────────────────────────────────────
  const totalCombos = pedidosFiltrados.reduce((acc, p) => acc + p.itens.length, 0);
  const totalUnidades = pedidosFiltrados.reduce(
    (acc, p) => acc + p.itens.reduce((s, i) => s + i.combo.unidades, 0),
    0,
  );

  const combosPorNome = useMemo(() => {
    const map: Record<string, { quantidade: number; faturamento: number; unidades: number }> = {};
    pedidosFiltrados.forEach((p) => {
      p.itens.forEach((item) => {
        const nome = item.combo.nome.split(" - ")[0];
        if (!map[nome]) map[nome] = { quantidade: 0, faturamento: 0, unidades: 0 };
        map[nome].quantidade++;
        map[nome].faturamento += item.combo.preco;
        map[nome].unidades += item.combo.unidades;
      });
    });
    return Object.entries(map).sort((a, b) => b[1].quantidade - a[1].quantidade);
  }, [pedidosFiltrados]);

  // ── Sabores ───────────────────────────────────────────────────────────────
  const saboresAgregados = useMemo(() => {
    const map: Record<string, number> = {};
    pedidosFiltrados.forEach((p) => {
      p.itens.forEach((item) => {
        Object.entries(item.sabores).forEach(([sabor, qtd]) => {
          map[sabor] = (map[sabor] || 0) + qtd;
        });
      });
    });
    return Object.entries(map).sort((a, b) => b[1] - a[1]);
  }, [pedidosFiltrados]);

  const totalSabores = saboresAgregados.reduce((acc, [, qtd]) => acc + qtd, 0);
  const totalCustoProdutos = saboresAgregados.reduce(
    (acc, [sabor, qtd]) => acc + (CUSTOS_SABORES[sabor] ?? 0.37) * qtd,
    0,
  );

  // ── Refrigerantes ─────────────────────────────────────────────────────────
  const { refriAgregados, totalRefri, totalCustoRefri, faturamentoRefriExtra } = useMemo(() => {
    const map: Record<string, { quantidade: number; custoTotal: number; custoUnitario: number }> = {};
    let total = 0;
    let custoTotal = 0;
    let fatExtra = 0;

    pedidosFiltrados.forEach((p) => {
      p.itens.forEach((item) => {
        if (item.refri && item.refri !== "") {
          const custo = CUSTOS_REFRI[item.refri] ?? 0;
          if (!map[item.refri]) map[item.refri] = { quantidade: 0, custoTotal: 0, custoUnitario: custo };
          map[item.refri].quantidade++;
          map[item.refri].custoTotal += custo;
          total++;
          custoTotal += custo;
        }
        for (const r of (item.refriExtra || [])) {
          const custo = CUSTOS_REFRI[r.nome] ?? 0;
          if (!map[r.nome]) map[r.nome] = { quantidade: 0, custoTotal: 0, custoUnitario: custo };
          map[r.nome].quantidade += r.qtd;
          map[r.nome].custoTotal += custo * r.qtd;
          total += r.qtd;
          custoTotal += custo * r.qtd;
          fatExtra += r.preco * r.qtd;
        }
      });
    });

    return {
      refriAgregados: Object.entries(map).sort((a, b) => b[1].quantidade - a[1].quantidade),
      totalRefri: total,
      totalCustoRefri: custoTotal,
      faturamentoRefriExtra: fatExtra,
    };
  }, [pedidosFiltrados]);

  // ── Maionese ──────────────────────────────────────────────────────────────
  const totalMaionese = pedidosFiltrados.reduce(
    (acc, p) => acc + p.itens.reduce((s, item) => s + (item.maioneseQtd || 0), 0),
    0,
  );

  // ── Cidades ───────────────────────────────────────────────────────────────
  const cidadesAgregadas = useMemo(() => {
    const map: Record<string, { pedidos: number; faturamento: number; frete: number }> = {};
    pedidosFiltrados.forEach((p) => {
      if (!map[p.cidade]) map[p.cidade] = { pedidos: 0, faturamento: 0, frete: 0 };
      map[p.cidade].pedidos++;
      map[p.cidade].faturamento += p.total;
      map[p.cidade].frete += FRETE_CIDADES[p.cidade] ?? 0;
    });
    return Object.entries(map).sort((a, b) => b[1].pedidos - a[1].pedidos);
  }, [pedidosFiltrados]);

  // ── Status ────────────────────────────────────────────────────────────────
  const statusAgregado = useMemo(() => {
    const map: Record<string, number> = {};
    pedidosFiltrados.forEach((p) => {
      map[p.status] = (map[p.status] || 0) + 1;
    });
    return map;
  }, [pedidosFiltrados]);

  // ── Pagamentos ────────────────────────────────────────────────────────────
  const pagamentosAgregados = useMemo(() => {
    const map: Record<string, { quantidade: number; valor: number }> = {};
    pedidosFiltrados.forEach((p) => {
      if (!map[p.pagamento]) map[p.pagamento] = { quantidade: 0, valor: 0 };
      map[p.pagamento].quantidade++;
      map[p.pagamento].valor += p.total;
    });
    return Object.entries(map).sort((a, b) => b[1].quantidade - a[1].quantidade);
  }, [pedidosFiltrados]);

  // ── Lucro estimado ────────────────────────────────────────────────────────
  const totalCustos = totalCustoProdutos + totalCustoRefri;
  const lucroLiquido = faturamentoSemFrete - totalCustos;
  const margemLucro = faturamentoSemFrete > 0 ? (lucroLiquido / faturamentoSemFrete) * 100 : 0;

  // ── Nome do período ───────────────────────────────────────────────────────
  const nomePeriodo = useMemo(() => {
    switch (periodo) {
      case "dia": {
        const [a, m, d] = dataSelecionada.split("-").map(Number);
        return new Date(a, m - 1, d).toLocaleDateString("pt-BR");
      }
      case "semana": {
        const [a, m, d] = dataSelecionada.split("-").map(Number);
        const base = new Date(a, m - 1, d);
        const ini = getInicioSemana(base);
        const fim = getFimSemana(base);
        return `${ini.toLocaleDateString("pt-BR")} - ${fim.toLocaleDateString("pt-BR")}`;
      }
      case "mes":
        return `${MESES.find((m) => m.valor === mesSelecionado)?.nome} de ${anoSelecionado}`;
      case "ano":
        return `${anoSelecionado}`;
    }
  }, [periodo, dataSelecionada, anoSelecionado, mesSelecionado, getInicioSemana, getFimSemana]);

  // ── Comparação com período anterior ───────────────────────────────────────
  const comparacao = useMemo(() => {
    if (periodo === "ano") return null;

    const filtrarPorDatas = (inicio: Date, fim: Date) =>
      orders.filter((p) => {
        const [pA, pM, pD] = getDataBrasilia(p.createdAt).split("-").map(Number);
        if (!pA) return false;
        const d = new Date(pA, pM - 1, pD);
        return d >= inicio && d <= fim;
      });

    let inicioAtual: Date,
      fimAtual: Date,
      inicioAnterior: Date,
      fimAnterior: Date,
      textoAtual = "",
      textoAnterior = "";

    if (periodo === "dia") {
      const [a, m, d] = dataSelecionada.split("-").map(Number);
      inicioAtual = new Date(a, m - 1, d);
      fimAtual = new Date(a, m - 1, d);
      inicioAnterior = new Date(a, m - 1, d - 7);
      fimAnterior = new Date(a, m - 1, d - 7);
      textoAtual = inicioAtual.toLocaleDateString("pt-BR");
      textoAnterior = inicioAnterior.toLocaleDateString("pt-BR");
    } else if (periodo === "semana") {
      const [a, m, d] = dataSelecionada.split("-").map(Number);
      const base = new Date(a, m - 1, d);
      inicioAtual = getInicioSemana(base);
      fimAtual = getFimSemana(base);
      inicioAnterior = new Date(inicioAtual);
      inicioAnterior.setDate(inicioAtual.getDate() - 7);
      fimAnterior = new Date(fimAtual);
      fimAnterior.setDate(fimAtual.getDate() - 7);
      textoAtual = `${inicioAtual.toLocaleDateString("pt-BR")} - ${fimAtual.toLocaleDateString("pt-BR")}`;
      textoAnterior = `${inicioAnterior.toLocaleDateString("pt-BR")} - ${fimAnterior.toLocaleDateString("pt-BR")}`;
    } else {
      const mesAntData = new Date(anoSelecionado, mesSelecionado - 2, 1);
      inicioAtual = new Date(anoSelecionado, mesSelecionado - 1, 1);
      fimAtual = new Date(anoSelecionado, mesSelecionado, 0);
      inicioAnterior = new Date(mesAntData.getFullYear(), mesAntData.getMonth(), 1);
      fimAnterior = new Date(mesAntData.getFullYear(), mesAntData.getMonth() + 1, 0);
      textoAtual = `${MESES.find((m) => m.valor === mesSelecionado)?.nome} ${anoSelecionado}`;
      textoAnterior = `${MESES.find((m) => m.valor === mesAntData.getMonth() + 1)?.nome} ${mesAntData.getFullYear()}`;
    }

    const atual = filtrarPorDatas(inicioAtual, fimAtual);
    const anterior = filtrarPorDatas(inicioAnterior, fimAnterior);

    const variacao = (a: number, b: number) => (b > 0 ? ((a - b) / b) * 100 : a > 0 ? 100 : 0);

    const fatAtual = atual.reduce((acc, p) => acc + p.total, 0);
    const fatAnterior = anterior.reduce((acc, p) => acc + p.total, 0);
    const combosAtual = atual.reduce((acc, p) => acc + p.itens.length, 0);
    const combosAnterior = anterior.reduce((acc, p) => acc + p.itens.length, 0);

    return {
      textoAtual,
      textoAnterior,
      fatAtual,
      fatAnterior,
      qtdAtual: atual.length,
      qtdAnterior: anterior.length,
      combosAtual,
      combosAnterior,
      varFaturamento: variacao(fatAtual, fatAnterior),
      varClientes: variacao(atual.length, anterior.length),
      varCombos: variacao(combosAtual, combosAnterior),
    };
  }, [periodo, dataSelecionada, anoSelecionado, mesSelecionado, orders, getInicioSemana, getFimSemana]);

  if (loading) {
    return (
      <Container>
        <div className="loading">Carregando estatísticas...</div>
      </Container>
    );
  }

  return (
    <Container>
      {/* HEADER */}
      <div className="topo">
        <button className="voltar-btn" onClick={() => navigate("/painel")}>
          ← Painel
        </button>
        <div className="topo-title">
          <h1>📊 Estatísticas</h1>
          <p>Análise completa dos pedidos</p>
        </div>
      </div>

      {/* SELETOR DE PERÍODO */}
      <div className="periodo-section">
        <div className="periodo-tabs">
          {(["dia", "semana", "mes", "ano"] as Periodo[]).map((p) => (
            <button
              key={p}
              className={`tab ${periodo === p ? "ativo" : ""}`}
              onClick={() => setPeriodo(p)}
            >
              {p === "dia" ? "Dia" : p === "semana" ? "Semana" : p === "mes" ? "Mês" : "Ano"}
            </button>
          ))}
        </div>

        <div className="data-input">
          {(periodo === "dia" || periodo === "semana") && (
            <div className="input-group">
              <label>Data:</label>
              <input
                type="date"
                value={dataSelecionada}
                onChange={(e) => setDataSelecionada(e.target.value)}
              />
            </div>
          )}
          {periodo === "mes" && (
            <div className="input-group row">
              <div>
                <label>Mês:</label>
                <select
                  value={mesSelecionado}
                  onChange={(e) => setMesSelecionado(Number(e.target.value))}
                >
                  {MESES.map((m) => (
                    <option key={m.valor} value={m.valor}>
                      {m.nome}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label>Ano:</label>
                <select
                  value={anoSelecionado}
                  onChange={(e) => setAnoSelecionado(Number(e.target.value))}
                >
                  {anos.map((a) => (
                    <option key={a} value={a}>
                      {a}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}
          {periodo === "ano" && (
            <div className="input-group">
              <label>Ano:</label>
              <select
                value={anoSelecionado}
                onChange={(e) => setAnoSelecionado(Number(e.target.value))}
              >
                {anos.map((a) => (
                  <option key={a} value={a}>
                    {a}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        <div className="periodo-info">
          <strong>Período:</strong> {nomePeriodo}
        </div>
      </div>

      {/* RESUMO RÁPIDO */}
      <div className="resumo-grid">
        <div className="resumo-card">
          <span>📦 Pedidos</span>
          <strong>{totalPedidos}</strong>
        </div>
        <div className="resumo-card success">
          <span>✅ Pagos</span>
          <strong>{pedidosPagos}</strong>
        </div>
        <div className="resumo-card danger">
          <span>❌ Pendentes</span>
          <strong>{pedidosPendentes}</strong>
        </div>
        <div className="resumo-card highlight">
          <span>💰 Faturamento Total</span>
          <strong>R$ {faturamentoTotal.toFixed(2)}</strong>
        </div>
        <div className="resumo-card">
          <span>🚗 Frete Total</span>
          <strong>R$ {totalFrete.toFixed(2)}</strong>
        </div>
        <div className="resumo-card">
          <span>🛒 Sem Frete</span>
          <strong>R$ {faturamentoSemFrete.toFixed(2)}</strong>
        </div>
      </div>

      {/* GRID DE CARDS DETALHADOS */}
      <div className="cards-grid">

        {/* COMBOS */}
        <div className="card">
          <h3>📦 Combos Vendidos</h3>
          <div className="stat-row">
            <span>Total de combos:</span>
            <strong>{totalCombos}</strong>
          </div>
          <div className="stat-row">
            <span>Total de mini esfihas:</span>
            <strong>{totalUnidades} un</strong>
          </div>
          <div className="stat-row">
            <span>Faturamento (sem frete):</span>
            <strong>R$ {faturamentoSemFrete.toFixed(2)}</strong>
          </div>
          <div className="divider" />
          <div className="lista">
            {combosPorNome.length === 0 ? (
              <p className="sem-dados">Nenhum combo neste período</p>
            ) : (
              combosPorNome.map(([nome, dados], i) => (
                <div key={nome} className="lista-item">
                  <span className="posicao">{i + 1}º</span>
                  <span className="nome">{nome}</span>
                  <span className="qtd">{dados.quantidade}x</span>
                  <span className="detalhe">{dados.unidades} un</span>
                  <span className="valor">R$ {dados.faturamento.toFixed(2)}</span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* SABORES */}
        <div className="card">
          <h3>🥟 Sabores</h3>
          <div className="stat-row">
            <span>Total de unidades:</span>
            <strong>{totalSabores} un</strong>
          </div>
          <div className="stat-row">
            <span>Custo total estimado:</span>
            <strong>R$ {totalCustoProdutos.toFixed(2)}</strong>
          </div>
          <div className="divider" />
          <div className="lista">
            {saboresAgregados.length === 0 ? (
              <p className="sem-dados">Nenhum sabor neste período</p>
            ) : (
              saboresAgregados.map(([sabor, qtd], i) => (
                <div key={sabor} className="lista-item sabor-item">
                  <span className="posicao">{i + 1}º</span>
                  <span className="nome">{sabor}</span>
                  <span className="qtd">{qtd}x</span>
                  <span className="detalhe">R$ {(CUSTOS_SABORES[sabor] ?? 0.37).toFixed(2)}/un</span>
                  <span className="valor">R$ {((CUSTOS_SABORES[sabor] ?? 0.37) * qtd).toFixed(2)}</span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* REFRIGERANTES */}
        <div className="card">
          <h3>🥤 Refrigerantes</h3>
          <div className="stat-row">
            <span>Total de refris:</span>
            <strong>{totalRefri}</strong>
          </div>
          <div className="stat-row">
            <span>Custo total estimado:</span>
            <strong>R$ {totalCustoRefri.toFixed(2)}</strong>
          </div>
          {faturamentoRefriExtra > 0 && (
            <div className="stat-row">
              <span>Faturamento refris extras:</span>
              <strong>R$ {faturamentoRefriExtra.toFixed(2)}</strong>
            </div>
          )}
          <div className="divider" />
          <div className="lista">
            {refriAgregados.length === 0 ? (
              <p className="sem-dados">Nenhum refrigerante neste período</p>
            ) : (
              refriAgregados.map(([sabor, dados], i) => (
                <div key={sabor} className="lista-item">
                  <span className="posicao">{i + 1}º</span>
                  <span className="nome">{sabor}</span>
                  <span className="qtd">{dados.quantidade}x</span>
                  <span className="detalhe">R$ {dados.custoUnitario.toFixed(2)}/un</span>
                  <span className="valor">R$ {dados.custoTotal.toFixed(2)}</span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* LUCRO ESTIMADO */}
        <div className="card lucro-card">
          <h3>💰 Lucro Estimado</h3>
          <div className="lucro-linha">
            <span>Faturamento (sem frete):</span>
            <span className="positivo">R$ {faturamentoSemFrete.toFixed(2)}</span>
          </div>
          <div className="lucro-linha">
            <span>Custo dos produtos:</span>
            <span className="negativo">- R$ {totalCustoProdutos.toFixed(2)}</span>
          </div>
          <div className="lucro-linha">
            <span>Custo dos refrigerantes:</span>
            <span className="negativo">- R$ {totalCustoRefri.toFixed(2)}</span>
          </div>
          <div className="lucro-linha">
            <span>Total de custos:</span>
            <span className="negativo">- R$ {totalCustos.toFixed(2)}</span>
          </div>
          <div className="divider" />
          <div className="lucro-linha total">
            <span>LUCRO LÍQUIDO:</span>
            <span className={lucroLiquido >= 0 ? "positivo" : "negativo"}>
              R$ {lucroLiquido.toFixed(2)}
            </span>
          </div>
          <div className="lucro-linha total">
            <span>Margem de lucro:</span>
            <span className={margemLucro >= 0 ? "positivo" : "negativo"}>
              {margemLucro.toFixed(1)}%
            </span>
          </div>
          <p className="obs">* Estimativa baseada nos custos cadastrados</p>
        </div>

        {/* CIDADES + MAIONESE */}
        <div className="card">
          <h3>📍 Cidades</h3>
          <div className="lista">
            {cidadesAgregadas.length === 0 ? (
              <p className="sem-dados">Nenhum pedido neste período</p>
            ) : (
              cidadesAgregadas.map(([cidade, dados]) => (
                <div key={cidade} className="lista-item cidade-item">
                  <span className="nome">{cidade}</span>
                  <div className="cidade-info">
                    <span className="qtd">{dados.pedidos} pedidos</span>
                    <span className="detalhe">Frete: R$ {dados.frete.toFixed(2)}</span>
                    <span className="valor">R$ {dados.faturamento.toFixed(2)}</span>
                  </div>
                </div>
              ))
            )}
          </div>
          <div className="divider" />
          <h3 className="sub-titulo">🧂 Maionese Caseira</h3>
          <div className="stat-row">
            <span>Porções solicitadas:</span>
            <strong>{totalMaionese}x</strong>
          </div>
        </div>

        {/* PAGAMENTOS + STATUS */}
        <div className="card">
          <h3>💳 Formas de Pagamento</h3>
          {pagamentosAgregados.length === 0 ? (
            <p className="sem-dados">Nenhum pagamento neste período</p>
          ) : (
            <div className="lista">
              {pagamentosAgregados.map(([tipo, dados]) => (
                <div key={tipo} className="lista-item pagamento-item">
                  <span className="nome">{tipo}</span>
                  <span className="qtd">{dados.quantidade}x</span>
                  <span className="valor">R$ {dados.valor.toFixed(2)}</span>
                </div>
              ))}
            </div>
          )}
          <div className="divider" />
          <h3 className="sub-titulo">📋 Status dos Pedidos</h3>
          <div className="lista">
            {Object.keys(statusAgregado).length === 0 ? (
              <p className="sem-dados">Nenhum pedido neste período</p>
            ) : (
              Object.entries(statusAgregado).map(([status, qtd]) => (
                <div key={status} className="lista-item status-item">
                  <span
                    className="status-badge"
                    style={{ backgroundColor: STATUS_COLORS[status] || "#666" }}
                  >
                    {STATUS_LABELS[status] || status}
                  </span>
                  <span className="qtd">{qtd}x</span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* COMPARAÇÃO COM PERÍODO ANTERIOR */}
        <div className="card comparacao-card">
          <h3>📊 Comparação com Período Anterior</h3>
          {comparacao ? (
            <>
              <div className="comparacao-periodos">
                <div className="periodo-bloco">
                  <span className="label">Período atual</span>
                  <strong>{comparacao.textoAtual}</strong>
                </div>
                <div className="vs">VS</div>
                <div className="periodo-bloco">
                  <span className="label">Período anterior</span>
                  <span>{comparacao.textoAnterior}</span>
                </div>
              </div>

              {[
                {
                  label: "💰 Faturamento",
                  atual: `R$ ${comparacao.fatAtual.toFixed(2)}`,
                  anterior: `R$ ${comparacao.fatAnterior.toFixed(2)}`,
                  variacao: comparacao.varFaturamento,
                },
                {
                  label: "👥 Clientes",
                  atual: String(comparacao.qtdAtual),
                  anterior: String(comparacao.qtdAnterior),
                  variacao: comparacao.varClientes,
                },
                {
                  label: "📦 Combos",
                  atual: String(comparacao.combosAtual),
                  anterior: String(comparacao.combosAnterior),
                  variacao: comparacao.varCombos,
                },
              ].map(({ label, atual, anterior, variacao }) => (
                <div key={label} className="comparacao-item">
                  <div className="comparacao-info">
                    <span className="comparacao-label">{label}</span>
                    <div className="comparacao-valores">
                      <span className="valor-atual">{atual}</span>
                      <span className="valor-anterior">{anterior}</span>
                    </div>
                  </div>
                  <div className={`variacao ${variacao >= 0 ? "positiva" : "negativa"}`}>
                    {variacao >= 0 ? "▲" : "▼"} {Math.abs(variacao).toFixed(1)}%
                  </div>
                </div>
              ))}
            </>
          ) : (
            <div className="comparacao-aviso">
              <p>💡 Selecione "Dia", "Semana" ou "Mês" para ver a comparação</p>
              <p className="aviso-detalhe">• Dia: compara com o mesmo dia da semana passada</p>
              <p className="aviso-detalhe">• Semana: compara com a semana anterior</p>
              <p className="aviso-detalhe">• Mês: compara com o mês anterior</p>
            </div>
          )}
        </div>
      </div>

      {/* LISTA DE PEDIDOS */}
      <div className="pedidos-section">
        <h3>📋 Pedidos do Período ({totalPedidos})</h3>
        <div className="pedidos-lista">
          {pedidosFiltrados.length === 0 ? (
            <p className="sem-dados centro">Nenhum pedido encontrado neste período.</p>
          ) : (
            [...pedidosFiltrados]
              .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
              .map((pedido) => (
                <div key={pedido.id} className="pedido-card">
                  <div className="pedido-header">
                    <strong className="pedido-codigo">{pedido.codigo}</strong>
                    <span className={`pedido-status ${pedido.pago ? "pago" : "pendente"}`}>
                      {pedido.pago ? "✅ Pago" : "❌ Pendente"}
                    </span>
                  </div>

                  <div className="pedido-info">
                    <p><strong>Cliente:</strong> {pedido.nomeCliente}</p>
                    <p><strong>Cidade:</strong> {pedido.cidade}</p>
                    <p><strong>Pagamento:</strong> {pedido.pagamento}</p>
                    <p>
                      <strong>Status:</strong>{" "}
                      <span style={{ color: STATUS_COLORS[pedido.status] || "#333", fontWeight: 700 }}>
                        {STATUS_LABELS[pedido.status] || pedido.status}
                      </span>
                    </p>
                    <p><strong>Total:</strong> R$ {pedido.total.toFixed(2)}</p>
                    <p><strong>Data:</strong> {new Date(pedido.createdAt).toLocaleString("pt-BR")}</p>
                  </div>

                  <div className="pedido-itens">
                    {pedido.itens.map((item, idx) => (
                      <div key={idx} className="pedido-item">
                        <strong>{item.combo.nome.split(" - ")[0]}</strong>
                        <span>
                          {Object.entries(item.sabores)
                            .map(([s, q]) => `${s} (${q}x)`)
                            .join(", ")}
                        </span>
                        {item.refri && item.refri !== "" && (
                          <span>🥤 {item.refri}</span>
                        )}
                        {item.refriExtra?.map((r) => (
                          <span key={`${r.nome}-${r.tipo}`}>🥤 {r.qtd}× {r.nome} — R$ {(r.preco * r.qtd).toFixed(2)}</span>
                        ))}
                        {item.maioneseQtd > 0 && (
                          <span>🧂 Maionese: {item.maioneseQtd}x</span>
                        )}
                        {item.observacaoItem && (
                          <span className="obs-item">📝 {item.observacaoItem}</span>
                        )}
                      </div>
                    ))}
                  </div>

                  {pedido.observacao && (
                    <div className="pedido-obs">
                      📝 <em>{pedido.observacao}</em>
                    </div>
                  )}
                </div>
              ))
          )}
        </div>
      </div>
    </Container>
  );
}
