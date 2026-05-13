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

    max-height: 94vh;

    overflow-y: auto;

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

    flex-direction: column;

    gap: 8px;

    h2 {
      margin: 0;

      font-size: 32px;

      color: #111827;

      font-weight: 900;
    }

    small {
      color: #6b7280;

      font-size: 13px;
    }
  }

  .badges {
    display: flex;

    gap: 8px;

    flex-wrap: wrap;

    margin-top: 8px;
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
    position: sticky;

    bottom: 0;

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
  }

  @media (max-width: 700px) {
    .modal {
      padding: 16px;
    }

    .topo {
      flex-direction: column;
    }

    .acoes {
      flex-direction: column;
    }
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
