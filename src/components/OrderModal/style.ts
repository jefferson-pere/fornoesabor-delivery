import styled from "styled-components";

export const Container = styled.div`
  .overlay {
    position: fixed;

    inset: 0;

    background: rgba(0, 0, 0, 0.6);

    display: flex;

    justify-content: center;

    align-items: center;

    padding: 20px;

    z-index: 9999;
  }

  .modal {
    width: 100%;

    max-width: 1100px;

    max-height: 94vh;

    overflow-y: auto;

    background: #fff;

    border-radius: 26px;

    padding: 24px;

    box-sizing: border-box;
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

    gap: 6px;

    h2 {
      margin: 0;

      font-size: 32px;
    }

    small {
      color: #666;
    }
  }

  .badges {
    display: flex;

    gap: 10px;

    flex-wrap: wrap;

    margin-top: 8px;
  }

  .badge {
    padding: 6px 12px;

    border-radius: 999px;

    font-size: 12px;

    font-weight: bold;
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

    background: #f3f4f6;

    cursor: pointer;

    font-size: 20px;
  }

  .grid {
    display: grid;

    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));

    gap: 18px;
  }

  .card {
    background: #f9fafb;

    border-radius: 20px;

    padding: 18px;
  }

  .card h3 {
    margin-top: 0;

    margin-bottom: 16px;

    font-size: 18px;
  }

  .linha {
    display: flex;

    justify-content: space-between;

    gap: 12px;

    margin-bottom: 10px;

    font-size: 15px;
  }

  .valor {
    font-weight: bold;
  }

  .item {
    background: #fff;

    border: 1px solid #eee;

    border-radius: 14px;

    padding: 14px;

    margin-bottom: 12px;
  }

  .item-topo {
    display: flex;

    justify-content: space-between;

    align-items: center;

    margin-bottom: 10px;
  }

  .combo {
    font-weight: bold;

    font-size: 15px;
  }

  .sabores {
    display: flex;

    flex-direction: column;

    gap: 4px;

    margin-bottom: 10px;
  }

  .extra {
    font-size: 14px;

    margin-top: 4px;
  }

  .observacao {
    font-size: 14px;

    margin-top: 8px;

    color: #444;
  }

  .acoes {
    position: sticky;

    bottom: 0;

    background: #fff;

    display: flex;

    gap: 14px;

    padding-top: 18px;

    margin-top: 20px;
  }

  .acoes button {
    flex: 1;

    height: 52px;

    border: none;

    border-radius: 14px;

    font-weight: bold;

    cursor: pointer;

    font-size: 15px;
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

  @media (max-width: 700px) {
    .modal {
      padding: 16px;
    }

    .grid {
      grid-template-columns: 1fr;
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
    }
  }
`;
