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

  /* HERO */
  .hero {
    position: relative;
    height: 230px;
  }

  .hero img {
    width: 100%;
    height: 100%;
  }

  .hero-overlay {
    position: absolute;
    bottom: 0;
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

  .hero-placeholder {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    background: #111;
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

  /* INPUT COM ÍCONE */
  .input-box {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 5px;

    background: #f7f7f7;
    border-radius: 14px;
    padding: 14px;

    border: 1px solid #ff9191;
    transition: 0.2s;
  }

  .input-box:focus-within {
    border-color: #ff4d4f;
    background: #fff;
    box-shadow: 0 0 0 2px rgba(255, 77, 79, 0.1);
  }
  input {
    border: 1px solid #fd0101;
  }

  .input-box.error {
    border-color: #ff4d4f;
    background: #fff5f5;
  }

  .input-icon {
    font-size: 18px;
    color: #ff4d4f;
  }

  .input-box input,
  .input-box select {
    flex: 1;
    border: none;
    outline: none;
    background: transparent;

    font-size: 16px; /* 👈 AQUI */
    font-weight: 500; /* 👈 deixa mais legível */
  }

  .select-arrow {
    color: #999;
  }

  /* ENTREGA */
  .delivery-options {
    display: flex;
    gap: 10px;
  }

  .delivery-btn {
    flex: 1;
    padding: 14px;
    border-radius: 14px;
    background: #fff;
    text-align: center;
    cursor: pointer;
    border: 1px solid #fab6b6;
    transition: 0.2s;
  }

  .delivery-btn.active {
    background: #ffe5e5;
    border-color: #ff4d4f;
    color: #ff4d4f;
    font-weight: bold;
  }

  /* ANIMAÇÃO */
  .fade-slide {
    animation: fadeSlide 0.3s ease;
  }

  @keyframes fadeSlide {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  /* FOOTER */
  .footer {
    padding: 16px;
  }
  .icon-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
  }
  

  .icon-btn.edit {
    background: #ff4d4f;
  }

  .icon-btn.delete {
    background: #333;
  }

  .icon-btn:hover {
    transform: scale(1.1);
  }
  .button {
    width: 100%;
    height: 52px;
    border-radius: 10px;
    border: none;
    background: #d90000;
    color: #fff;
    font-weight: bold;
    font-size: 20px;
  }

  .loading {
    opacity: 0.7;
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
  @media (min-width: 768px) {
    .hero {
      height: 300px; /* 👈 maior no desktop */
    }
  }
`;
