import styled from "styled-components";

export const Container = styled.div`
  background: #fff;

  border-radius: 18px;

  padding: 18px;

  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);

  .topo {
    display: flex;

    justify-content: space-between;

    align-items: center;

    margin-bottom: 10px;

    strong {
      font-size: 16px;
    }

    span {
      color: #666;

      font-size: 13px;
    }
  }
  .infoendpag {
    display: flex;
    margin: 10px;
    justify-content: space-between;
  }
  .combo {
    color: #444;

    margin-bottom: 18px;

    font-size: 14px;
  }

  .footer {
    display: flex;

    justify-content: space-between;

    align-items: center;

    margin-bottom: 14px;
  }

  .pago,
  .nao-pago {
    border: none;

    padding: 8px 12px;

    border-radius: 999px;

    font-size: 12px;

    font-weight: 600;

    cursor: pointer;
  }

  .pago {
    background: #dcfce7;

    color: #166534;
  }

  .nao-pago {
    background: #fee2e2;

    color: #991b1b;
  }

  .acoes {
    display: flex;

    gap: 10px;
  }

  .detalhes,
  .avancar {
    flex: 1;

    height: 40px;

    border: none;

    border-radius: 12px;

    cursor: pointer;

    font-weight: bold;
  }

  .detalhes {
    background: #ececec;
  }

  .avancar {
    background: #111;

    color: #fff;
  }
`;
