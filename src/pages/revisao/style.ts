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

  /* HEADER COMPACTO */
  .page-header {
    padding: 14px 16px 10px;
    border-bottom: 1px solid #f0f0f0;
    background: #fff;
  }

  .page-title {
    font-size: 17px;
    font-weight: 700;
    color: #222;
  }

  /* FORM */
  .form {
    padding: 12px 16px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    flex: 1;
  }

  .label {
    font-size: 12px;
    font-weight: 700;
    color: #999;
    text-transform: uppercase;
    letter-spacing: 0.4px;
    margin-bottom: 6px;
    display: block;
  }

  /* SUMMARY CARD — cliente, entrega, pagamento */
  .summary-card {
    background: #fff;
    border-radius: 14px;
    border: 1px solid #eee;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
    overflow: hidden;
  }

  .summary-row {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    padding: 10px 14px;
  }

  .summary-label {
    font-size: 11px;
    font-weight: 700;
    color: #aaa;
    text-transform: uppercase;
    letter-spacing: 0.4px;
    min-width: 66px;
    padding-top: 2px;
    flex-shrink: 0;
  }

  .summary-value {
    display: flex;
    flex-direction: column;
    gap: 2px;
    flex: 1;
    min-width: 0;
  }

  .summary-value strong {
    font-size: 13px;
    font-weight: 600;
    color: #222;
  }

  .summary-value span {
    font-size: 12px;
    color: #666;
    line-height: 1.4;
  }

  .summary-divider {
    height: 1px;
    background: #f2f2f2;
    margin: 0 14px;
  }

  /* CARD DE PEDIDO */
  .card {
    background: #fff;
    border-radius: 14px;
    padding: 12px 14px;
    border: 1px solid #eee;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  }

  .sub {
    font-size: 12px;
    color: #666;
  }

  .item {
    margin-top: 8px;
    padding-top: 8px;
    border-top: 1px dashed #eee;
  }

  .item strong {
    font-size: 13px;
    color: #222;
  }

  /* TOTAL */
  .total-card {
    background: #fff;
    border-radius: 14px;
    padding: 12px 14px;
    border: 1px solid #eee;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  }

  .row {
    display: flex;
    justify-content: space-between;
    margin-bottom: 6px;
    font-size: 13px;
  }

  .row strong {
    font-weight: 600;
  }

  .row.extra {
    color: #ff4d4f;
    font-weight: 500;
  }

  .divider {
    height: 1px;
    background: #eee;
    margin: 8px 0;
  }

  .row.total {
    font-weight: bold;
    font-size: 15px;
    margin-bottom: 0;
  }

  /* FOOTER */
  .footer {
    padding: 12px 16px 20px;
    display: flex;
    gap: 10px;
    background: #fff;
    border-top: 1px solid #f0f0f0;
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
    transition: 0.2s;
  }

  .button:hover {
    opacity: 0.9;
  }

  .button:active {
    transform: scale(0.97);
  }

  .button.cancel {
    background: #f0f0f0;
    color: #555;
  }

  .button.loading {
    opacity: 0.7;
    cursor: not-allowed;
  }

  .spinner {
    width: 18px;
    height: 18px;
    border: 3px solid #fff;
    border-top: 3px solid transparent;
    border-radius: 50%;
    animation: spin 0.7s linear infinite;
    margin: auto;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  /* DESKTOP */
  @media (min-width: 1024px) {
    .content {
      width: 100%;
      max-width: 100%;
      height: 100vh;
      display: grid;
      grid-template-columns: 1fr 560px;
      overflow: hidden;
      background: #fff;
    }

    .page-header {
      display: none;
    }

    .form {
      height: 100vh;
      overflow-y: auto;
      padding: 32px 40px 20px;
      gap: 14px;
    }

    .footer {
      padding: 10px 40px 40px;
      border-top: 1px solid #f0f0f0;
    }

    .button {
      height: 56px;
      font-size: 16px;
    }
  }
`;
