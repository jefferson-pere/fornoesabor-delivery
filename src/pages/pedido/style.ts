import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  max-width: 100vw;
  overflow-x: hidden;
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
  }

  /* HERO */
  .hero {
    position: relative;
    height: 18%;
    min-height: 180px;
    overflow: hidden;
  }

  .hero img {
    width: 100%;
    height: 100%;
    object-fit: cover;
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
    gap: 6px;
  }

  .input-box {
    display: flex;
    align-items: center;
    gap: 10px;
    background: #f7f7f7;
    border-radius: 14px;
    padding: 4px;
    border: 1px solid #fdb4b4;
  }

  .input-box input,
  .input-box select {
    flex: 1;
    border: none;
    outline: none;
    background: transparent;
    font-size: 16px;
    padding: 10px;
    min-width: 0;
  }

  .form > div > input,
  .form > input {
    width: 100%;
    box-sizing: border-box;
    border: 1px solid #fdb4b4;
    border-radius: 14px;
    padding: 12px 14px;
    font-size: 16px;
    outline: none;
    background: #f7f7f7;
  }

  .margem {
    margin: 15px 0;
  }

  .button.disabled {
    background: #ccc;
    cursor: not-allowed;
    opacity: 0.7;
  }

  .input-refri {
    background: #f7e2e2 !important;
    margin: 10px 0;
  }

  .item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #fff;
    padding: 10px;
    border-radius: 12px;
    border: 1px solid #ffe1e1;
  }

  .qtd {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .btn {
    width: 40px;
    height: 40px;
    border-radius: 8px;
    border: none;
    background: #ff4d4f;
    color: #fff;
    font-weight: bold;
    font-size: 20px;
    cursor: pointer;
  }

  .button.cancel {
    background: #4e4c4c;
  }

  .total {
    text-align: center;
    font-weight: bold;
  }

  .footer {
    padding: 16px;
  }

  .button {
    width: 100%;
    height: 52px;
    border-radius: 10px;
    border: none;
    background: #d90000;
    color: #fff;
    font-weight: bold;
    font-size: 16px;
    margin-top: 10px;
    cursor: pointer;
  }

  .total-card {
    margin-top: 12px;
    background: #fff;
    border-radius: 16px;
    padding: 16px;
    border: 1px solid #eee;
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.05);
  }

  .total-card .row {
    display: flex;
    justify-content: space-between;
    margin-bottom: 8px;
    font-size: 14px;
  }

  .total-card .extra {
    color: #ff4d4f;
    font-weight: 600;
  }

  .total-card .divider {
    height: 1px;
    background: #eee;
    margin: 10px 0;
  }

  .total-card .total {
    font-size: 16px;
    font-weight: bold;
  }

  /* DESKTOP */
  @media (min-width: 1024px) {
    .label {
      font-size: 16px;
      font-weight: 600;
    }
    .footer{
      
    }

    .content {
      max-width: 100%;
      width: 100%;
      min-height: 100vh;

      display: grid;
      grid-template-columns: 1fr 550px;

      background: #fff;
    }

    /* IMAGEM */
    .hero {
      height: 100vh;
      position: sticky;
      top: 0;
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
      font-size: 38px;
    }

    /* FORM LATERAL */
    .form {
      padding: 40px;
      gap: 14px;
      overflow-y: auto;
      height: 100vh;
    }

    .item {
      padding: 14px;
    }

    .button {
      height: 56px;
      font-size: 17px;
    }

    .total-card {
      margin-top: 20px;
    }
  }
`;
