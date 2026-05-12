import styled from "styled-components";

export const Container = styled.div`
  min-height: 100vh;
  padding: 40px 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

  /* HEADER COM LOGO */
  .header {
    max-width: 900px;
    margin: 0 auto 30px;
    position: relative;
  }

  .logo-wrapper {
    display: flex;
    align-items: center;
    gap: 15px;
    background: rgba(255, 255, 255, 0.95);
    padding: 15px 30px;
    border-radius: 50px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    backdrop-filter: blur(10px);
    width: fit-content;
  }

  .logo-icon {
    font-size: 40px;
  }

  .logo-text {
    font-size: 28px;
    font-weight: 700;
    color: #e65100;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
    letter-spacing: 1px;
  }

  .header-decoration {
    position: absolute;
    bottom: -10px;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(
      90deg,
      transparent,
      #ffd700,
      #ff6b6b,
      #4ecdc4,
      transparent
    );
    border-radius: 3px;
  }

  /* CARD PRINCIPAL */
  .card {
    max-width: 900px;
    margin: 0 auto;
    background: white;
    border-radius: 20px;
    padding: 35px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  }

  .card-header {
    text-align: center;
    margin-bottom: 30px;
  }

  .card-header h2 {
    font-size: 32px;
    color: #333;
    margin-bottom: 10px;
    font-weight: 600;
  }

  .card-header p {
    color: #666;
    font-size: 16px;
  }

  /* BOTÕES */
  .button {
    width: 100%;
    padding: 15px 25px;
    border: none;
    border-radius: 12px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
  }

  .button:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none !important;
  }

  .button:hover:not(:disabled) {
    transform: translateY(-1px);
  }

  .button:active:not(:disabled) {
    transform: translateY(0);
  }

  /* Botão Carregar - Azul */
  .button-carregar {
    background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
    color: white;
    box-shadow: 0 4px 15px rgba(30, 60, 114, 0.3);
  }

  .button-carregar:hover:not(:disabled) {
    box-shadow: 0 6px 20px rgba(30, 60, 114, 0.4);
  }

  /* Botão Sortear - Laranja */
  .button-sortear {
    background: linear-gradient(135deg, #f39c12 0%, #e67e22 100%);
    color: white;
    box-shadow: 0 4px 15px rgba(243, 156, 18, 0.3);
    margin-top: 20px;
  }

  .button-sortear:hover:not(:disabled) {
    box-shadow: 0 6px 20px rgba(243, 156, 18, 0.4);
  }

  .button-icon {
    font-size: 20px;
  }

  /* Spinner para loading nos botões */
  .button-spinner {
    width: 18px;
    height: 18px;
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-top: 2px solid white;
    border-radius: 50%;
    animation: spin 0.6s linear infinite;
  }

  /* MENSAGEM */
  .message {
    margin-top: 20px;
    padding: 15px;
    background: #fff3cd;
    border: 1px solid #ffeaa7;
    border-radius: 12px;
    color: #856404;
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .message-icon {
    font-size: 18px;
  }

  /* LISTA DE PARTICIPANTES */
  .list-container {
    margin-top: 25px;
    background: #f8f9fa;
    border-radius: 12px;
    overflow: hidden;
  }

  .list-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 20px;
    background: linear-gradient(135deg, #1e726e 0%, #2a8798 100%);
    color: white;
  }

  .list-title {
    font-weight: 600;
    font-size: 16px;
  }

  .list-count {
    background: rgba(255, 255, 255, 0.2);
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 14px;
    font-weight: 500;
  }

  .list {
    max-height: 350px;
    overflow-y: auto;
    padding: 10px;
  }

  .list::-webkit-scrollbar {
    width: 8px;
  }

  .list::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 4px;
  }

  .list::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 4px;
  }

  .list::-webkit-scrollbar-thumb:hover {
    background: #555;
  }

  .item {
    display: flex;
    align-items: center;
    gap: 15px;
    padding: 12px 15px;
    margin-bottom: 8px;
    background: white;
    border-radius: 10px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
    transition: all 0.2s ease;
  }

  .item:hover {
    transform: translateX(3px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.08);
  }

  .item-avatar {
    width: 45px;
    height: 45px;
    border-radius: 50%;
    background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    font-size: 18px;
    flex-shrink: 0;
  }

  .item-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .item-name {
    color: #333;
    font-size: 16px;
  }

  .item-date {
    color: #888;
    font-size: 13px;
  }

  .item-total {
    font-weight: 600;
    color: #28a745;
    font-size: 14px;
  }

  /* VENCEDOR */
  .winner-card {
    margin-top: 30px;
    padding: 30px;
    background: linear-gradient(135deg, #ffd89b 0%, #f5c252 100%);
    border-radius: 15px;
    text-align: center;
    position: relative;
    overflow: hidden;
  }

  .winner-confetti {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background:
      radial-gradient(circle at 20% 30%, #ff6b6b 2px, transparent 3px),
      radial-gradient(circle at 80% 70%, #4ecdc4 2px, transparent 3px),
      radial-gradient(circle at 40% 80%, #ffe66d 2px, transparent 3px),
      radial-gradient(circle at 70% 20%, #a8e6cf 2px, transparent 3px);
    background-size: 50px 50px;
    opacity: 0.3;
    pointer-events: none;
  }

  .winner-header {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    margin-bottom: 20px;
  }

  .winner-trophy {
    font-size: 40px;
  }

  .winner-header h2 {
    color: #333;
    font-size: 28px;
    font-weight: 700;
  }

  .winner-content {
    position: relative;
    z-index: 1;
  }

  .winner-avatar {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 32px;
    font-weight: 700;
    margin: 0 auto 20px;
    box-shadow: 0 8px 20px rgba(245, 87, 108, 0.3);
  }

  .winner-name {
    padding: 10px 20px;
    border-radius: 10px;
    background: linear-gradient(135deg, #8e5694 0%, #e06878 100%);
    font-size: 36px;
    font-weight: 700;
    color: rgb(255, 255, 255);
    margin-bottom: 10px;
    box-shadow: 0 8px 20px rgba(245, 87, 108, 0.3);
    text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.3);
  }

  .winner-date {
    color: #000000;
    font-size: 18px;
    font-weight: 700;
    text-shadow: 2px 2px 2px rgba(255, 255, 255, 0.3);
  }

  .winner-total {
    color: #28a745;
    font-weight: 600;
    font-size: 20px;
    margin-top: 10px;
  }

  /* ANIMAÇÕES */
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  /* RESPONSIVIDADE */
  @media (max-width: 768px) {
    .container {
      padding: 20px 15px;
    }

    .logo-wrapper {
      padding: 10px 20px;
    }

    .logo-icon {
      font-size: 30px;
    }

    .logo-text {
      font-size: 22px;
    }

    .card {
      padding: 20px;
    }

    .card-header h2 {
      font-size: 24px;
    }

    .item {
      padding: 10px;
    }

    .item-avatar {
      width: 35px;
      height: 35px;
      font-size: 14px;
    }

    .winner-header h2 {
      font-size: 22px;
    }

    .winner-name {
      font-size: 20px;
    }
  }
`;
