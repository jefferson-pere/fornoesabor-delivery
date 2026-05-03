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
  }
  .hero-overlay {
    position: absolute;
    bottom: 0;
    padding: 16px;
    width: 100%;
    color: #fff;
    background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
  }

  .hero-title {
    font-size: 20px;
    font-weight: bold;
  }

  /* FORM */
  .form {
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .label {
    font-size: 13px;
    font-weight: 600;
    color: #555;
  }

  /* CARDS */
  .card {
    background: #fff;
    border-radius: 14px;
    padding: 14px;
    border: 1px solid #eee;
    display: flex;
    flex-direction: column;
    gap: 6px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
  }

  .sub {
    font-size: 13px;
    color: #666;
  }

  /* ITENS */
  .item {
    margin-top: 10px;
    padding-top: 10px;
    border-top: 1px dashed #eee;
  }

  .item strong {
    font-size: 14px;
    color: #222;
  }

  /* TOTAL */
  .total-card {
    background: #fff;
    border-radius: 16px;
    padding: 16px;
    border: 1px solid #eee;
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.04);
  }

  .row {
    display: flex;
    justify-content: space-between;
    margin-bottom: 8px;
    font-size: 14px;
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
    margin: 10px 0;
  }

  .row.total {
    font-weight: bold;
    font-size: 16px;
  }

  /* FOOTER */
  .footer {
    position: sticky;
    bottom: 0;
    background: #f5f5f5;
    padding: 16px;
    display: flex;
    gap: 10px;
  }

  .button {
    flex: 1;
    height: 52px;
    border-radius: 10px;
    border: none;
    background: #d90000;
    color: #fff;
    font-weight: bold;
    font-size: 16px;
    cursor: pointer;
    transition: 0.2s;
  }

  .button:active {
    transform: scale(0.97);
  }

  .button.cancel {
    background: #ddd;
    color: #333;
  }

  /* RESPONSIVO */
  @media (min-width: 768px) {
    .hero {
      height: 260px;
    }

    .hero-title {
      font-size: 24px;
    }

    .form {
      padding: 24px;
      gap: 20px;
    }

    .card {
      padding: 18px;
    }

    .total-card {
      padding: 20px;
    }

    .button {
      height: 56px;
      font-size: 18px;
    }
  }
`;
