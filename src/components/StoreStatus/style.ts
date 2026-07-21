import styled from "styled-components";

export const Container = styled.div`
  background: #fff;
  border-radius: 14px;
  padding: 4px 18px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  width: fit-content;
  min-width: 420px;
  transition: background 0.25s;

  body.painel-dark & {
    background: #1e293b;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
  }

  .info {
    display: flex;
    flex-direction: column;
    gap: 2px;

    h2 {
      font-size: 16px;
      margin: 0;
      body.painel-dark & { color: #f8fafc; }
    }

    p {
      font-size: 13px;
      color: #666;
      margin: 0;
      body.painel-dark & { color: #94a3b8; }
    }
  }

  .actions {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  select {
    width: 160px;
    height: 40px;
    border-radius: 10px;
    border: 1px solid #ddd;
    padding: 0 12px;
    font-size: 14px;
    background: #fff;
    cursor: pointer;
    outline: none;

    body.painel-dark & {
      background: #0f172a;
      border-color: #334155;
      color: #f8fafc;
    }
  }

  .badge {
    padding: 8px 12px;

    border-radius: 999px;

    font-size: 12px;

    font-weight: 700;

    white-space: nowrap;
  }

  .aberto {
    background: #dcfce7;

    color: #166534;
  }

  .fechado {
    background: #fee2e2;

    color: #991b1b;
  }

  .demanda {
    background: #fef3c7;

    color: #92400e;
  }

  @media (max-width: 700px) {
    width: 100%;

    min-width: unset;

    flex-direction: column;

    align-items: stretch;

    .actions {
      width: 100%;

      flex-direction: column;

      align-items: stretch;
    }

    select {
      width: 100%;
    }
  }
`;
