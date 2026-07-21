import styled from "styled-components";

export const Container = styled.div`
  .overlay {
    position: fixed;

    inset: 0;

    background: rgba(0, 0, 0, 0.7);

    display: flex;

    justify-content: center;

    align-items: center;

    padding: 20px;

    z-index: 9999;

    backdrop-filter: blur(4px);
  }

  .modal {
    width: 100%;

    max-width: 1300px;

    background: #f9fafb;

    border-radius: 28px;

    padding: 24px;

    box-sizing: border-box;

    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.18);
  }

  .topo {
    display: flex;

    justify-content: space-between;

    align-items: flex-start;

    margin-bottom: 24px;

    gap: 20px;
  }

  .codigo {
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;
    gap: 10px;

    h2 {
      margin: 0;
      font-size: 20px;
      color: #111827;
      font-weight: 900;
    }

    small {
      color: #6b7280;
      font-size: 13px;
    }
  }

  .meta-sep {
    color: #d1d5db;
    font-size: 14px;
  }

  .badges {
    display: flex;
    gap: 6px;
    flex-wrap: wrap;
  }

  .badge {
    padding: 6px 12px;

    border-radius: 999px;

    font-size: 11px;

    font-weight: 800;
  }

  .novo {
    background: #fef3c7;

    color: #92400e;
  }

  .producao {
    background: #dbeafe;

    color: #1d4ed8;
  }

  .entrega {
    background: #fed7aa;

    color: #c2410c;
  }

  .finalizado {
    background: #dcfce7;

    color: #166534;
  }

  .pago {
    background: #dcfce7;

    color: #166534;
  }

  .nao-pago {
    background: #fee2e2;

    color: #991b1b;
  }

  .close {
    width: 42px;

    height: 42px;

    border: none;

    border-radius: 12px;

    background: #faa5a5;

    cursor: pointer;

    font-size: 18px;

    color: #fff;
    transition: 0.2s;
  }

  .close:hover {
    background: #d1d5db;
  }

  .grid {
    display: grid;

    grid-template-columns: minmax(360px, 420px) minmax(0, 1fr);

    gap: 16px;

    align-items: start;
  }
  .cliente-card {
    width: 100%;

    min-width: 360px;
  }
  .card {
    background: #f3f4f6;

    border: 1px solid #d1d5db;

    border-radius: 20px;

    padding: 16px;

    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.04);
  }

  .card h3 {
    margin-top: 0;

    margin-bottom: 14px;

    font-size: 17px;

    color: #111827;

    font-weight: 800;
  }

  .cliente-card {
    height: fit-content;
  }

  .financeiro {
    margin-top: 18px;

    padding-top: 16px;

    border-top: 1px solid #d1d5db;
  }

  .linha {
    display: flex;

    align-items: center;

    gap: 10px;

    margin-bottom: 4px;

    padding: 5px 10px;

    background: #ffffff;

    border-radius: 12px;

    border: 1px solid #e5e7eb;

    font-size: 13px;
  }

  .linha span:first-child {
    color: #6b7280;

    font-weight: 700;

    font-size: 12px;
  }

  .total-linha {
    border-color: #111827 !important;
    background: #f0fdf4 !important;

    span {
      color: #166534 !important;
      font-weight: 800 !important;
      font-size: 13px !important;
    }
  }

  .valor {
    font-weight: 800;

    color: #111827;

    text-align: right;

    font-size: 13px;
  }

  .card-pedido {
    min-height: 100%;
  }
  .confirm {
    flex: 1;

    border: none;

    border-radius: 12px;

    padding: 14px 18px;

    font-size: 15px;

    font-weight: 700;

    cursor: pointer;

    transition: 0.2s;

    background: #25d3659a;

    color: #fff;

    display: flex;

    align-items: center;

    justify-content: center;

    gap: 8px;
  }

  .confirm:hover {
    transform: translateY(-2px);

    opacity: 0.92;
  }

  .confirm:active {
    transform: scale(0.98);
  }
  .pedidos-grid {
    display: grid;

    grid-template-columns: repeat(2, minmax(320px, 1fr));

    gap: 14px;

    width: 100%;
  }

  .item {
    width: 100%;
    background: #ffffff;

    border: 1px solid #d1d5db;

    border-radius: 18px;

    padding: 16px;

    transition: 0.2s;

    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  }

  .item:hover {
    border-color: #9ca3af;
  }

  .item-topo {
    display: flex;

    justify-content: space-between;

    align-items: center;

    margin-bottom: 12px;
  }

  .combo {
    font-weight: 800;

    font-size: 15px;

    color: #111827;
  }

  .sabores {
    display: flex;

    flex-direction: column;

    gap: 6px;

    margin-bottom: 12px;

    font-size: 13px;

    color: #374151;
  }

  .extra {
    font-size: 13px;

    margin-top: 6px;

    color: #111827;

    background: #f3f4f6;

    padding: 8px 10px;

    border-radius: 10px;
  }

  .observacao {
    font-size: 13px;

    margin-top: 10px;

    color: #374151;

    background: #f9fafb;

    padding: 10px;

    border-radius: 10px;

    border-left: 4px solid #f59e0b;
  }

  .observacao-card {
    grid-column: span 2;
  }

  .acoes {
    background: #f9fafb;

    display: flex;

    gap: 14px;

    padding-top: 18px;

    margin-top: 22px;
  }

  .acoes button {
    flex: 1;

    height: 52px;

    border: none;

    border-radius: 14px;

    font-weight: 800;

    cursor: pointer;

    font-size: 14px;

    transition: 0.2s;
  }

  .acoes button:hover {
    transform: translateY(-1px);

    opacity: 0.95;
  }

  .print {
    background: #111827;

    color: #fff;
  }

  .edit {
    background: #f59e0b;

    color: #fff;
  }

  .save {
    background: #16a34a;

    color: #fff;
  }

  .danger {
    background: #dc2626;

    color: #fff;
  }

  .whats {
    width: 100%;

    background: #22c55e;

    color: #fff;
  }

  @media (max-width: 900px) {
    .grid {
      grid-template-columns: 1fr;
    }

    .pedidos-grid {
      grid-template-columns: 1fr;
    }

    .observacao-card {
      grid-column: span 1;
    }

    .cliente-card {
      min-width: unset;
    }
  }

  @media (max-width: 600px) {
    .overlay {
      padding: 0;
      align-items: flex-end;
      overflow-y: auto;
    }

    .modal {
      width: 100%;
      max-width: 100%;
      border-radius: 24px 24px 0 0;
      padding: 20px 16px 24px;
      max-height: 92vh;
      overflow-y: auto;
    }

    .topo {
      flex-direction: row;
      align-items: flex-start;
      margin-bottom: 16px;
    }

    .codigo h2 {
      font-size: 22px;
    }

    .badges {
      margin-top: 6px;
    }

    .badge {
      font-size: 10px;
      padding: 4px 10px;
    }

    .close {
      width: 36px;
      height: 36px;
      font-size: 15px;
      flex-shrink: 0;
    }

    .grid {
      gap: 12px;
    }

    .acoes {
      flex-direction: column;
      gap: 10px;
      padding-top: 14px;
      margin-top: 16px;
    }

    .acoes button {
      height: 48px;
      font-size: 14px;
    }

    .whats {
      width: 100%;
    }

    .pedidos-grid {
      grid-template-columns: 1fr;
      gap: 10px;
    }

    .item {
      padding: 12px;
    }

    .linha {
      font-size: 12px;
    }
  }

  body.painel-dark & {
    .modal {
      background: #0f172a;
    }

    .codigo h2 { color: #f8fafc; }

    .meta small { color: #94a3b8; }

    .card {
      background: #1e293b;
      border-color: #334155;

      h3 { color: #f8fafc; }
    }

    .linha {
      background: #0f172a;
      border-color: #334155;
      color: #f8fafc;

      span:first-child { color: #94a3b8; }
    }

    .valor { color: #f8fafc; }

    .financeiro { border-color: #334155; }

    .total-linha {
      background: #052e16 !important;
      border-color: #166534 !important;

      span { color: #f8fafc !important; }
    }

    .print {
      background: #1e293b;
      border: 1px solid #475569;
    }

    .item {
      background: #0f172a;
      border-color: #334155;
    }

    .combo { color: #f8fafc; }

    .sabores { color: #94a3b8; }

    .extra {
      background: #1e293b;
      color: #f8fafc;
    }

    .observacao {
      background: #1e293b;
      color: #94a3b8;
    }

    .acoes { background: #0f172a; }
  }

  @media print {
    .overlay,
    .acoes,
    .close {
      display: none !important;
    }

    .modal {
      box-shadow: none;

      border-radius: 0;

      max-width: 100%;

      background: #fff;
    }
  }
`;
