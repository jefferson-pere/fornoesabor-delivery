import styled from "styled-components";

export const Container = styled.div<{ $borderColor: string }>`
  background: #ffffff;

  border-radius: 18px;

  padding: 10px;

  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
  border: 2px solid #a5a4a4;
  cursor: pointer;
  transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
    border-color: #aaa;
  }

  &:active {
    transform: translateY(0px);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
  }

  .topo {
    display: flex;
    align-items: center;
    gap: 6px;
    margin: 0 0 10px;

    strong {
      font-size: 16px;
      background: #f3f4f6;
      padding: 1px 7px;
      border-radius: 6px;
      flex: 1;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .hora {
      font-size: 12px;
      color: #fff;
      font-weight: 700;
      background: ${({ $borderColor }) => $borderColor};
      padding: 2px 7px;
      border-radius: 99px;
      white-space: nowrap;
      flex-shrink: 0;
    }

    .codigo {
      font-size: 11px;
      font-weight: 700;
      color: #fff;
      background: #013a22;
      padding: 2px 7px;
      border-radius: 99px;
      white-space: nowrap;
      flex-shrink: 0;
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
    border: 1px solid #6d6d6d;

    cursor: pointer;

    font-weight: bold;

  }

  .detalhes {
    background: #d6d6d6;
  }

  .avancar {
    background: #013a22;

    color: #fff;
  }
`;
