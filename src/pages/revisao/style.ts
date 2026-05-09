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

  /* HERO */
  .hero {
    position: relative;
    height: 220px;
    overflow: hidden;
  }

  .hero img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .hero-overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    padding: 16px;
    width: 100%;
    color: #fff;
    background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
    z-index: 2;
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
    padding: 16px 0;
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

  .button:hover {
    opacity: 0.9;
  }

  .button:active {
    transform: scale(0.97);
  }

  .button.cancel {
    background: #ddd;
    color: #333;
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

    /* IMAGEM FIXA */
    .hero {
      height: 100vh;
      position: sticky;
      top: 0;
      overflow: hidden;
    }

    .hero img {
      width: 100%;
      height: 100vh;
      object-fit: cover;
    }

    .hero-overlay {
      padding: 40px;
    }

    .hero-title {
      font-size: 42px;
    }

    /* LADO DIREITO */
    .form {
      height: 100vh;
      overflow-y: auto;

      padding: 40px 40px 20px;

      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .card {
      padding: 18px;
      border-radius: 18px;
    }

    .total-card {
      padding: 20px;
    }

    .row {
      font-size: 15px;
    }

    .row.total {
      font-size: 18px;
    }

    /* FOOTER FIXO */
    .footer {
      padding: 10px 0 40px;

      margin-top: auto;

      position: sticky;
      bottom: 0;

      background: #fff;
    }

    .button {
      height: 58px;
      font-size: 17px;
    }
  }
`;
