import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background: #f5f5f5;
  display: flex;
  justify-content: center;

  .content {
    width: 100%;
    max-width: 420px;
    display: flex;
    flex-direction: column;
    background: #fff;
    min-height: 100vh;
  }

  /* HEADER */
  .page-header {
    padding: 14px 16px 10px;
    border-bottom: 1px solid #f0f0f0;
  }

  .page-title {
    font-size: 17px;
    font-weight: 700;
    color: #222;
  }

  /* FORM */
  .form {
    padding: 14px 16px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    flex: 1;
  }

  /* TOTAL */
  .total-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #fff8f8;
    border: 1px solid #fdd;
    border-radius: 14px;
    padding: 14px 16px;
    margin-bottom: 4px;
  }

  .total-info {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .total-label {
    font-size: 13px;
    font-weight: 600;
    color: #555;
  }

  .total-note {
    font-size: 11px;
    color: #ff4d4f;
  }

  .total-value {
    font-size: 22px;
    font-weight: 800;
    color: #d90000;
  }

  /* CARDS DE PAGAMENTO */
  .pay-card {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 14px;
    border-radius: 14px;
    border: 1.5px solid #eee;
    background: #fafafa;
    cursor: pointer;
    transition: border-color 0.2s, background 0.2s, transform 0.1s;
    user-select: none;
  }

  .pay-card:active {
    transform: scale(0.98);
  }

  .pay-card.active {
    border-color: #d90000;
    background: #fff5f5;
  }

  .pay-icon {
    width: 44px;
    height: 44px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 22px;
    flex-shrink: 0;
  }

  .pay-icon.pix {
    background: #e6faf3;
    color: #09a96c;
  }

  .pay-icon.card {
    background: #eef2ff;
    color: #4f6ef7;
  }

  .pay-icon.cash {
    background: #fef9e7;
    color: #d4a017;
  }

  .pay-info {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .pay-info strong {
    font-size: 15px;
    color: #222;
  }

  .pay-info span {
    font-size: 12px;
    color: #888;
  }

  .pay-check {
    font-size: 22px;
    color: #d90000;
    flex-shrink: 0;
  }

  /* PIX BOX */
  .pix-box {
    background: #f0fdf8;
    border: 1px solid #bbf0dc;
    border-radius: 14px;
    padding: 14px;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .pix-label {
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.4px;
    color: #09a96c;
  }

  .pix-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
  }

  .pix-key {
    font-size: 16px;
    font-weight: 700;
    color: #1a1a1a;
    letter-spacing: 0.5px;
  }

  .pix-copy {
    display: flex;
    align-items: center;
    gap: 5px;
    background: #09a96c;
    color: #fff;
    border: none;
    padding: 8px 14px;
    border-radius: 8px;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    white-space: nowrap;
    transition: opacity 0.2s;
  }

  .pix-copy:hover {
    opacity: 0.85;
  }

  .pix-tip {
    font-size: 12px;
    color: #2d7a5a;
    line-height: 1.4;
    margin: 0;
  }

  /* TROCO */
  .troco-box {
    background: #fffbeb;
    border: 1px solid #fde68a;
    border-radius: 14px;
    padding: 14px;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .troco-label {
    font-size: 12px;
    font-weight: 700;
    color: #92400e;
    text-transform: uppercase;
    letter-spacing: 0.4px;
  }

  .troco-input {
    display: flex;
    align-items: center;
    background: #fff;
    border: 1.5px solid #fcd34d;
    border-radius: 10px;
    padding: 0 12px;
    height: 48px;
    gap: 6px;
    transition: border-color 0.2s;
  }

  .troco-input.error {
    border-color: #ff4d4f;
  }

  .troco-prefix {
    font-size: 15px;
    font-weight: 600;
    color: #777;
  }

  .troco-input input {
    flex: 1;
    border: none;
    outline: none;
    background: transparent;
    font-size: 16px;
    font-weight: 600;
    color: #222;
  }

  .troco-result {
    font-size: 14px;
    font-weight: 700;
    color: #16a34a;
  }

  .troco-result.negative {
    color: #ef4444;
  }

  /* ANIMAÇÃO */
  .fade-slide {
    animation: fadeSlide 0.25s ease;
  }

  @keyframes fadeSlide {
    from { opacity: 0; transform: translateY(8px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  /* ERROS */
  .error-text {
    font-size: 12px;
    color: #ff4d4f;
    margin: -4px 0 0;
  }

  /* FOOTER */
  .footer {
    padding: 12px 16px 24px;
    display: flex;
    gap: 10px;
    border-top: 1px solid #f0f0f0;
    background: #fff;
  }

  .button {
    flex: 1;
    height: 50px;
    border-radius: 10px;
    border: none;
    background: #d90000;
    color: #fff;
    font-weight: bold;
    font-size: 15px;
    cursor: pointer;
    transition: opacity 0.2s, transform 0.1s;
  }

  .button:hover { opacity: 0.9; }
  .button:active { transform: scale(0.97); }

  .button.cancel {
    background: #f0f0f0;
    color: #555;
  }

  /* DESKTOP */
  @media (min-width: 1024px) {
    .content {
      max-width: 100%;
      width: 100%;
      display: grid;
      grid-template-columns: 1fr 520px;
      grid-template-rows: auto auto 1fr auto;
    }

    /* StepProgress e page-header ocupam só a coluna direita */
    .content > *:not(.desktop-hero) {
      grid-column: 2;
    }

    .page-header {
      padding: 32px 40px 12px;
    }

    .form {
      padding: 0 40px 20px;
      gap: 12px;
      overflow-y: auto;
    }

    .footer {
      padding: 12px 40px 40px;
    }

    .button {
      height: 56px;
      font-size: 16px;
    }

    .total-value {
      font-size: 26px;
    }
  }
`;
