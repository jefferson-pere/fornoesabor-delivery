import styled from "styled-components";

export const Container = styled.div`
  min-height: 100vh;
  background: #f0f2f5;
  padding: 24px;
  font-family: sans-serif;

  .loading {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 60vh;
    font-size: 18px;
    color: #555;
  }

  /* ── Header ── */
  .topo {
    display: flex;
    align-items: center;
    gap: 20px;
    margin-bottom: 28px;
  }

  .voltar-btn {
    height: 44px;
    padding: 0 20px;
    border: none;
    border-radius: 12px;
    background: #111;
    color: #fff;
    font-weight: 700;
    font-size: 14px;
    cursor: pointer;
    white-space: nowrap;
    flex-shrink: 0;

    &:hover {
      background: #333;
    }
  }

  .topo-title h1 {
    font-size: 32px;
    font-weight: 800;
    color: #111;
    margin: 0;
  }

  .topo-title p {
    color: #666;
    margin: 4px 0 0;
    font-size: 14px;
  }

  /* ── Período ── */
  .periodo-section {
    background: #fff;
    border-radius: 20px;
    padding: 20px 24px;
    margin-bottom: 24px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
    display: flex;
    flex-direction: column;
    gap: 14px;
  }

  .periodo-tabs {
    display: flex;
    gap: 8px;
  }

  .tab {
    height: 40px;
    padding: 0 22px;
    border: 2px solid #e5e7eb;
    border-radius: 10px;
    background: transparent;
    font-weight: 600;
    font-size: 14px;
    cursor: pointer;
    color: #555;
    transition: all 0.15s;

    &:hover {
      border-color: #111;
      color: #111;
    }

    &.ativo {
      background: #111;
      border-color: #111;
      color: #fff;
    }
  }

  .data-input {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  .input-group {
    display: flex;
    align-items: center;
    gap: 10px;

    label {
      font-weight: 600;
      font-size: 14px;
      color: #444;
      white-space: nowrap;
    }

    input,
    select {
      height: 42px;
      border: 2px solid #e5e7eb;
      border-radius: 10px;
      padding: 0 14px;
      font-size: 14px;
      background: #f9fafb;
      cursor: pointer;

      &:focus {
        outline: none;
        border-color: #111;
      }
    }

    &.row {
      gap: 20px;

      > div {
        display: flex;
        align-items: center;
        gap: 8px;
      }
    }
  }

  .periodo-info {
    font-size: 14px;
    color: #555;
    padding: 10px 16px;
    background: #f0f2f5;
    border-radius: 10px;
    width: fit-content;

    strong {
      color: #111;
    }
  }

  /* ── Resumo rápido ── */
  .resumo-grid {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 14px;
    margin-bottom: 24px;
  }

  .resumo-card {
    background: #fff;
    border-radius: 18px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
    border-left: 4px solid transparent;

    span {
      font-size: 13px;
      color: #666;
      font-weight: 500;
    }

    strong {
      font-size: 22px;
      font-weight: 800;
      color: #111;
    }

    &.success {
      border-left-color: #16a34a;
      strong { color: #16a34a; }
    }

    &.danger {
      border-left-color: #dc2626;
      strong { color: #dc2626; }
    }

    &.highlight {
      background: #111;
      span { color: #aaa; }
      strong { color: #fff; }
    }
  }

  /* ── Grid de cards ── */
  .cards-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
    gap: 20px;
    margin-bottom: 32px;
  }

  .card {
    background: #fff;
    border-radius: 20px;
    padding: 24px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);

    h3 {
      font-size: 17px;
      font-weight: 700;
      color: #111;
      margin: 0 0 16px;
    }

    &.lucro-card {
      border: 2px solid #16a34a22;
      background: #f0fdf4;
    }

    &.comparacao-card {
      grid-column: span 1;
    }
  }

  .sub-titulo {
    font-size: 16px;
    font-weight: 700;
    color: #111;
    margin: 16px 0 10px;
  }

  .stat-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 6px 0;
    font-size: 14px;
    color: #444;

    strong {
      font-weight: 700;
      color: #111;
    }
  }

  .divider {
    height: 1px;
    background: #f0f2f5;
    margin: 14px 0;
  }

  /* ── Listas genéricas ── */
  .lista {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .lista-item {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 10px;
    background: #f9fafb;
    border-radius: 10px;
    font-size: 13px;
    flex-wrap: wrap;

    .posicao {
      font-weight: 700;
      color: #888;
      min-width: 22px;
    }

    .nome {
      flex: 1;
      font-weight: 600;
      color: #222;
      min-width: 80px;
    }

    .qtd {
      font-weight: 700;
      color: #2563eb;
      white-space: nowrap;
    }

    .detalhe {
      color: #888;
      font-size: 12px;
      white-space: nowrap;
    }

    .valor {
      font-weight: 700;
      color: #16a34a;
      white-space: nowrap;
    }
  }

  .cidade-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;

    .nome {
      font-size: 15px;
    }

    .cidade-info {
      display: flex;
      gap: 12px;
      flex-wrap: wrap;
    }
  }

  .pagamento-item {
    .nome {
      text-transform: capitalize;
    }
  }

  .status-item {
    gap: 10px;
  }

  .status-badge {
    display: inline-block;
    padding: 3px 10px;
    border-radius: 8px;
    color: #fff;
    font-size: 12px;
    font-weight: 700;
  }

  .sem-dados {
    color: #999;
    font-size: 13px;
    font-style: italic;
    padding: 8px 0;

    &.centro {
      text-align: center;
      padding: 40px;
    }
  }

  /* ── Lucro ── */
  .lucro-linha {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 0;
    font-size: 14px;
    color: #444;

    &.total {
      font-size: 16px;
      font-weight: 800;
      color: #111;
    }
  }

  .positivo {
    color: #16a34a;
    font-weight: 700;
  }

  .negativo {
    color: #dc2626;
    font-weight: 700;
  }

  .obs {
    font-size: 11px;
    color: #999;
    margin-top: 8px;
    font-style: italic;
  }

  /* ── Comparação ── */
  .comparacao-periodos {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 16px;
    padding: 12px;
    background: #f9fafb;
    border-radius: 12px;
  }

  .periodo-bloco {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 3px;

    .label {
      font-size: 11px;
      color: #888;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    strong, span {
      font-size: 13px;
      color: #333;
    }
  }

  .vs {
    font-weight: 800;
    color: #aaa;
    font-size: 13px;
  }

  .comparacao-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 0;
    border-bottom: 1px solid #f0f2f5;

    &:last-child {
      border-bottom: none;
    }
  }

  .comparacao-info {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .comparacao-label {
    font-size: 14px;
    color: #555;
    font-weight: 600;
  }

  .comparacao-valores {
    display: flex;
    gap: 12px;
    font-size: 13px;
  }

  .valor-atual {
    font-weight: 700;
    color: #111;
  }

  .valor-anterior {
    color: #999;
  }

  .variacao {
    font-weight: 800;
    font-size: 16px;
    padding: 4px 10px;
    border-radius: 8px;

    &.positiva {
      color: #16a34a;
      background: #dcfce7;
    }

    &.negativa {
      color: #dc2626;
      background: #fee2e2;
    }
  }

  .comparacao-aviso {
    background: #f9fafb;
    border-radius: 12px;
    padding: 16px;

    p {
      font-size: 14px;
      color: #555;
      margin: 0 0 8px;
    }

    .aviso-detalhe {
      font-size: 13px;
      color: #888;
      margin: 4px 0 0;
    }
  }

  /* ── Pedidos ── */
  .pedidos-section {
    h3 {
      font-size: 20px;
      font-weight: 700;
      color: #111;
      margin: 0 0 16px;
    }
  }

  .pedidos-lista {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
    gap: 16px;
  }

  .pedido-card {
    background: #fff;
    border-radius: 20px;
    padding: 20px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
    display: flex;
    flex-direction: column;
    gap: 14px;
  }

  .pedido-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .pedido-codigo {
    font-size: 17px;
    font-weight: 800;
    color: #111;
  }

  .pedido-status {
    font-weight: 700;
    font-size: 13px;

    &.pago { color: #16a34a; }
    &.pendente { color: #dc2626; }
  }

  .pedido-info {
    display: flex;
    flex-direction: column;
    gap: 4px;
    font-size: 13px;
    color: #444;

    p {
      margin: 0;
    }

    strong {
      color: #111;
    }
  }

  .pedido-itens {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .pedido-item {
    background: #f9fafb;
    border-radius: 10px;
    padding: 10px 12px;
    display: flex;
    flex-direction: column;
    gap: 4px;
    font-size: 13px;
    color: #444;

    strong {
      color: #111;
      font-size: 14px;
    }
  }

  .obs-item {
    color: #888;
    font-style: italic;
  }

  .pedido-obs {
    font-size: 13px;
    color: #666;
    font-style: italic;
    padding: 8px 12px;
    background: #fef9c3;
    border-radius: 8px;
  }

  /* ── Responsive ── */
  @media (max-width: 1200px) {
    .resumo-grid {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  @media (max-width: 900px) {
    padding: 16px;

    .topo-title h1 {
      font-size: 26px;
    }

    .resumo-grid {
      grid-template-columns: repeat(2, 1fr);
    }

    .cards-grid {
      grid-template-columns: 1fr;
    }

    .periodo-tabs {
      flex-wrap: wrap;
    }
  }

  @media (max-width: 600px) {
    padding: 12px;

    .topo {
      flex-direction: column;
      align-items: flex-start;
    }

    .resumo-grid {
      grid-template-columns: 1fr 1fr;
    }

    .pedidos-lista {
      grid-template-columns: 1fr;
    }

    .input-group.row {
      flex-direction: column;
      align-items: flex-start;
    }
  }
`;
