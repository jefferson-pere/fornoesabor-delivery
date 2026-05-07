import styled from "styled-components";

export const Container = styled.div`
  width: 100%;

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    margin-bottom: 20px;

    h2 {
      font-size: 24px;
      margin-bottom: 4px;
    }

    p {
      color: #666;
      font-size: 14px;
    }
  }

  .card {
    background: #fff;

    padding: 20px;

    border-radius: 16px;

    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
  }

  .label {
    font-size: 14px;
    font-weight: 600;

    margin-bottom: 10px;

    color: #444;
  }

  select {
    width: 100%;

    height: 50px;

    border-radius: 12px;

    border: 1px solid #ddd;

    padding: 0 14px;

    font-size: 15px;

    outline: none;

    cursor: pointer;

    background: #fff;
  }

  .mensagem {
    margin-top: 18px;

    color: #666;

    line-height: 1.5;

    font-size: 14px;
  }

  .badge {
    padding: 10px 14px;

    border-radius: 999px;

    font-size: 13px;
    font-weight: 700;
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
`;
