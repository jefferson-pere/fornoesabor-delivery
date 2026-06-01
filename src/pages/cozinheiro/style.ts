import styled from "styled-components";

export const Container = styled.div`
  height: 100vh;
  height: 100dvh;
  background: #111827;
  padding: 24px 20px;
  color: #fff;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  @supports (-webkit-touch-callout: none) {
    height: -webkit-fill-available;
  }

  .topo {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 28px;

    h1 {
      font-size: 32px;
      font-weight: 800;
      color: #fff;
    }
  }

  .contador {
    font-size: 18px;
    font-weight: 700;
    color: #fb923c;
    background: rgba(251, 146, 60, 0.12);
    padding: 6px 18px;
    border-radius: 999px;
    border: 1px solid rgba(251, 146, 60, 0.3);
  }

  .vazio {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 16px;

    .vazio-icon {
      font-size: 80px;
    }

    p {
      font-size: 20px;
      color: #6b7280;
      font-weight: 600;
    }
  }

  .conteudo {
    display: flex;
    flex-direction: column;
    gap: 16px;
    flex: 1;
    max-width: 560px;
    width: 100%;
    margin: 0 auto;
  }

  .card {
    background: #1f2937;
    border-radius: 24px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    border: 2px solid #374151;
    flex: 1;
    overflow-y: auto;
    animation: entrar 0.2s ease;

    @keyframes entrar {
      from {
        opacity: 0;
        transform: translateY(-6px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  }

  .card-topo {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .codigo {
    font-size: 26px;
    font-weight: 800;
    color: #fb923c;
    letter-spacing: 1px;
  }

  .hora {
    font-size: 15px;
    color: #6b7280;
    font-weight: 600;
    background: #374151;
    padding: 5px 12px;
    border-radius: 10px;
  }

  .cliente {
    font-size: 22px;
    font-weight: 700;
    color: #f9fafb;
    border-bottom: 1px solid #374151;
  }

  .itens {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .item {
    background: #111827;
    border-radius: 14px;
    padding: 14px 16px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    border-left: 4px solid #fb923c4d;
  }

  .item-nome {
    font-size: 17px;
    font-weight: 800;
    color: #f3f4f6;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .sabores {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .sabor {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 5px 0;
    border-bottom: 2px solid #3e4a5e;

    &:last-child {
      border-bottom: none;
    }
  }

  .sabor-qtd {
    min-width: 28px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #374151;
    color: #d1d5db;
    font-size: 13px;
    font-weight: 700;
    border-radius: 6px;
    flex-shrink: 0;
  }

  .sabor-nome {
    font-size: 14px;
    font-weight: 600;
    color: #e5e7eb;
  }

  .extra {
    font-size: 15px;
    color: #9ca3af;
    font-weight: 500;
  }

  .obs-item {
    font-size: 14px;
    color: #fbbf24;
    font-weight: 600;
    background: rgba(251, 191, 36, 0.08);
    padding: 5px 10px;
    border-radius: 8px;
  }

  .observacao {
    font-size: 15px;
    font-weight: 600;
    color: #fbbf24;
    background: rgba(251, 191, 36, 0.1);
    border: 1px solid rgba(251, 191, 36, 0.3);
    border-radius: 12px;
    padding: 12px 16px;
  }

  .navegacao {
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    gap: 12px;
    align-items: center;
  }

  .nav {
    height: 56px;
    border: none;
    border-radius: 16px;
    font-size: 16px;
    font-weight: 700;
    cursor: pointer;
    transition: 0.2s;
    background: #374151;
    color: #fff;

    &:hover:not(:disabled) {
      background: #4b5563;
      transform: translateY(-2px);
    }

    &:disabled {
      opacity: 0.3;
      cursor: not-allowed;
    }
  }

  .pronto {
    height: 56px;
    padding: 0 28px;
    border: none;
    border-radius: 16px;
    background: linear-gradient(135deg, #16a34a, #15803d);
    color: #fff;
    font-size: 17px;
    font-weight: 700;
    cursor: pointer;
    transition: 0.2s;
    white-space: nowrap;

    &:hover {
      transform: translateY(-2px);
      opacity: 0.92;
    }

    &:active {
      transform: translateY(0);
    }
  }

  @media (max-width: 768px) {
    padding: 12px;
    height: 100vh;

    .topo {
      margin-bottom: 12px;

      h1 {
        font-size: 24px;
      }
    }

    .conteudo {
      max-width: 100%;
      gap: 10px;
    }

    .card {
      border-radius: 16px;
    }

    .navegacao {
      gap: 8px;
    }

    .nav,
    .pronto {
      height: 52px;
      font-size: 15px;
      border-radius: 12px;
    }
  }
`;
