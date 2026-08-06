import styled from "styled-components";

export const Container = styled.div<{ $borderColor: string }>`
  background: #ffffff;
  border-radius: 18px;
  padding: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
  border: 2px solid #a5a4a4;
  cursor: pointer;
  transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease, background 0.25s;

  body.painel-dark & {
    background: #0f172a;
    border-color: #334155;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
    color: #f8fafc;
  }

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
    margin: 0 0 3px;

    strong {
      font-size: 16px;
      background: #f3f4f6;
      padding: 1px 7px;
      border-radius: 6px;
      flex: 1;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;

      body.painel-dark & {
        background: #1e293b;
        color: #f8fafc;
      }
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
    flex-direction: column;
    gap: 4px;
    margin-bottom: 4px;

    .cidade {
      font-size: 12px;
      color: #555;
      body.painel-dark & { color: #94a3b8; }
    }

    .pagamento-pago {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 6px;

      span {
        font-size: 12px;
        color: #555;
        text-transform: capitalize;
        body.painel-dark & { color: #94a3b8; }
      }
    }

    .entregador {
      font-size: 11px;
      font-weight: 700;
      color: #0d9488;
      background: rgba(20, 184, 166, 0.1);
      padding: 1px 8px;
      border-radius: 99px;
      white-space: nowrap;
      align-self: flex-start;
    }
  }
  .combo {
    color: #444;
    margin-bottom: 18px;
    font-size: 14px;

    body.painel-dark & { color: #94a3b8; }
  }

  .footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 6px;
  }

  .pago,
  .nao-pago {
    border: none;
    padding: 5px 14px;
    border-radius: 999px;
    font-size: 11px;
    font-weight: 600;
    cursor: pointer;
    white-space: nowrap;
  }

  .pago { background: #dcfce7; color: #166534; }
  .nao-pago { background: #fee2e2; color: #991b1b; }

  .designar-inline {
    display: flex;
    align-items: center;

    .sem-designacao {
      display: flex;
      align-items: center;
      gap: 4px;

      span { font-size: 12px; }

      button {
        height: 24px;
        padding: 0 8px;
        border: 1.5px solid #64748b;
        background: transparent;
        border-radius: 6px;
        font-size: 11px;
        font-weight: 700;
        cursor: pointer;
        color: #334155;
        transition: 0.15s;

        body.painel-dark & { color: #94a3b8; }

        &:hover {
          border-color: #14b8a6;
          color: #14b8a6;
          background: rgba(20, 184, 166, 0.08);
        }
      }
    }

    .designado {
      display: flex;
      align-items: center;
      gap: 5px;
      background: rgba(20, 184, 166, 0.1);
      border-radius: 99px;
      padding: 3px 8px;

      span {
        font-size: 11px;
        font-weight: 700;
        color: #0d9488;
      }

      .trocar {
        border: none;
        background: transparent;
        font-size: 10px;
        color: #94a3b8;
        cursor: pointer;
        text-decoration: underline;
        padding: 0;

        &:hover { color: #64748b; }
      }
    }

    .form-troca {
      display: flex;
      align-items: center;
      gap: 3px;

      input {
        width: 72px;
        height: 24px;
        border-radius: 6px;
        border: 1px solid #64748b;
        background: #f1f5f9;
        padding: 0 6px;
        font-size: 11px;
        outline: none;

        body.painel-dark & { background: #1e293b; color: #f8fafc; }

        &.erro { border-color: #ef4444; }
        &:focus { border-color: #14b8a6; }
      }

      button {
        height: 24px;
        width: 24px;
        border-radius: 5px;
        border: none;
        cursor: pointer;
        font-size: 11px;
        font-weight: 700;

        &[type="submit"] { background: #14b8a6; color: #fff; }
        &[type="button"] { background: #e2e8f0; color: #64748b; body.painel-dark & { background: #334155; color: #94a3b8; } }
      }
    }
  }

  .acoes {
    display: flex;
    gap: 6px;
  }

  .detalhes,
  .avancar,
  .escolher-entregador,
  .cancelar-entregador {
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
    body.painel-dark & { background: #334155; color: #f8fafc; border-color: #475569; }
  }

  .avancar {
    background: #013a22;
    color: #fff;

    &:disabled {
      background: #d1d5db;
      color: #9ca3af;
      border-color: #d1d5db;
      cursor: not-allowed;
      body.painel-dark & { background: #1e293b; color: #475569; border-color: #334155; }
    }
  }

`;
