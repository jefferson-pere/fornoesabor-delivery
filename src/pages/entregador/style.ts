import styled from "styled-components";

export const Container = styled.div`
  min-height: 100vh;
  min-height: 100dvh;
  background: #0f172a;
  color: #fff;
  display: flex;
  flex-direction: column;

  @supports (-webkit-touch-callout: none) {
    min-height: -webkit-fill-available;
  }
`;

export const Header = styled.header`
  background: #1e293b;
  border-bottom: 1px solid #334155;
  padding: 16px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 0;
  z-index: 10;

  .title {
    display: flex;
    align-items: center;
    gap: 10px;

    span.icon {
      font-size: 24px;
    }

    h1 {
      font-size: 20px;
      font-weight: 800;
      color: #fff;
      margin: 0;
    }

    span.nome-entregador {
      font-size: 12px;
      font-weight: 600;
      color: #14b8a6;
      letter-spacing: 0.5px;
    }
  }

  .badge {
    background: rgba(20, 184, 166, 0.15);
    border: 1px solid rgba(20, 184, 166, 0.4);
    color: #14b8a6;
    font-size: 13px;
    font-weight: 700;
    padding: 4px 12px;
    border-radius: 999px;
  }

  .logout {
    background: transparent;
    border: 1px solid #475569;
    color: #94a3b8;
    font-size: 13px;
    font-weight: 600;
    padding: 6px 14px;
    border-radius: 10px;
    cursor: pointer;
    transition: 0.2s;

    &:hover {
      border-color: #64748b;
      color: #cbd5e1;
    }
  }
`;

export const Tabs = styled.div`
  display: flex;
  background: #1e293b;
  border-bottom: 1px solid #334155;
`;

export const Tab = styled.button<{ $active: boolean }>`
  flex: 1;
  height: 48px;
  border: none;
  background: transparent;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  color: ${({ $active }) => ($active ? "#14b8a6" : "#64748b")};
  border-bottom: 2px solid ${({ $active }) => ($active ? "#14b8a6" : "transparent")};
  transition: 0.2s;

  &:hover {
    color: ${({ $active }) => ($active ? "#14b8a6" : "#94a3b8")};
  }
`;

export const Content = styled.div`
  flex: 1;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-width: 640px;
  width: 100%;
  margin: 0 auto;
  box-sizing: border-box;

  .resumo-total {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: rgba(74, 222, 128, 0.08);
    border: 1px solid rgba(74, 222, 128, 0.25);
    border-radius: 14px;
    padding: 14px 18px;
    margin-top: 4px;

    span {
      font-size: 14px;
      font-weight: 600;
      color: #64748b;
    }

    strong {
      font-size: 22px;
      font-weight: 800;
      color: #4ade80;
    }
  }
`;

export const Empty = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 60px 20px;

  .icon {
    font-size: 64px;
  }

  p {
    font-size: 18px;
    font-weight: 600;
    color: #475569;
    text-align: center;
  }
`;

export const OrderCard = styled.div`
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 20px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  animation: entrar 0.2s ease;

  @keyframes entrar {
    from { opacity: 0; transform: translateY(-6px); }
    to   { opacity: 1; transform: translateY(0); }
  }
`;

export const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  .codigo {
    font-size: 22px;
    font-weight: 800;
    color: #14b8a6;
    letter-spacing: 1px;
  }

  .hora {
    font-size: 13px;
    color: #64748b;
    font-weight: 600;
    background: #0f172a;
    padding: 4px 10px;
    border-radius: 8px;
  }
`;

export const ClienteInfo = styled.div`
  .nome {
    font-size: 20px;
    font-weight: 700;
    color: #f1f5f9;
    margin-bottom: 8px;
  }

  .infos {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .linha {
    display: flex;
    align-items: flex-start;
    gap: 8px;
    font-size: 14px;
    color: #94a3b8;

    .label {
      flex-shrink: 0;
      font-size: 16px;
    }

    .valor {
      color: #cbd5e1;
      font-weight: 500;
      line-height: 1.4;
    }

    a {
      color: #38bdf8;
      text-decoration: none;
      font-weight: 600;

      &:hover {
        text-decoration: underline;
      }
    }
  }
`;

export const Divider = styled.div`
  height: 1px;
  background: #334155;
`;

export const ResumoItens = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  .item-linha {
    font-size: 13px;
    color: #94a3b8;
    display: flex;
    gap: 6px;

    .item-nome {
      color: #e2e8f0;
      font-weight: 600;
    }
  }
`;

export const Pagamento = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #0f172a;
  border-radius: 12px;
  padding: 10px 14px;

  .metodo {
    font-size: 14px;
    color: #94a3b8;
    font-weight: 500;
    text-transform: capitalize;

    .troco {
      color: #fbbf24;
      font-size: 13px;
      margin-left: 6px;
    }
  }

  .total {
    font-size: 18px;
    font-weight: 800;
    color: #4ade80;
  }
`;

export const Acoes = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;

  .btn-whatsapp {
    height: 50px;
    border: 1px solid #25d366;
    background: rgba(37, 211, 102, 0.1);
    color: #25d366;
    font-size: 14px;
    font-weight: 700;
    border-radius: 14px;
    cursor: pointer;
    transition: 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    text-decoration: none;

    &:hover {
      background: rgba(37, 211, 102, 0.2);
      border-color: #25d366;
    }

    &:disabled {
      opacity: 0.35;
      cursor: not-allowed;
    }
  }

  .btn-entregar {
    height: 50px;
    border: none;
    background: linear-gradient(135deg, #16a34a, #15803d);
    color: #fff;
    font-size: 15px;
    font-weight: 700;
    border-radius: 14px;
    cursor: pointer;
    transition: 0.2s;
    box-shadow: 0 4px 16px rgba(22, 163, 74, 0.3);

    &:hover {
      transform: translateY(-1px);
      opacity: 0.92;
    }

    &:active {
      transform: translateY(0);
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
      transform: none;
    }
  }
`;

export const HistoricoCard = styled.div`
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 16px;
  padding: 14px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;

  .info {
    display: flex;
    flex-direction: column;
    gap: 3px;

    .codigo {
      font-size: 15px;
      font-weight: 800;
      color: #4ade80;
    }

    .nome {
      font-size: 14px;
      color: #e2e8f0;
      font-weight: 600;
    }

    .cidade {
      font-size: 13px;
      color: #64748b;
    }
  }

  .direita {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 3px;
    flex-shrink: 0;

    .frete {
      font-size: 17px;
      font-weight: 800;
      color: #f59e0b;
    }

    .total {
      font-size: 13px;
      font-weight: 600;
      color: #4ade80;
    }

    .hora {
      font-size: 12px;
      color: #475569;
    }
  }
`;
