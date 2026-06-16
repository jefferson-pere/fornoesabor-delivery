import styled from "styled-components";

export const Container = styled.div`
  background: #ffffff;

  border-radius: 18px;

  padding: 10px;

  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
  border: 1px solid #a5a4a4;
  cursor: pointer;

  .topo {
    display: flex;

    margin: 0 0 10px;

    justify-content: space-between;

    align-items: center;

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
    justify-content: space-between;
    .pagamento {
      margin: 2px 25px;
    }
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

    height: 30px;

    border: none;

    border-radius: 12px;
    border: 1px solid #cacaca;

    cursor: pointer;

    font-weight: bold;
  }

  .detalhes {
    background: #ececec;
  }

  .avancar {
    background: #013a22;

    color: #fff;
  }
`;
