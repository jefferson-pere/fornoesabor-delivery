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
    height: 20%;
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

  .input-box {
    display: flex;
    align-items: center;
    gap: 10px;
    background: #f7f7f7;
    border-radius: 14px;
    padding: 14px;
    border: 1px solid #d1d5db;
    transition: 0.2s;
  }

  .input-box input {
    border: none;
    outline: none;
    background: transparent;
    width: 100%;
    font-size: 15px;
  }

  .input-box.error {
    border-color: #ff4d4f;
    background: #fff5f5;
  }

  .option {
    cursor: pointer;
  }

  .option.active {
    border-color: #ff4d4f;
    background: #fff5f5;
  }

  .option-desc {
    font-size: 12px;
    color: #777;
    margin-top: 3px;
  }

  .input-icon {
    font-size: 20px;
    color: #ff4d4f;
    min-width: 20px;
  }

  .error-text {
    font-size: 12px;
    color: #ff4d4f;
  }

  /* FOOTER */
  .footer {
    padding: 16px 0;
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

  .button.cancel {
    background: #ddd;
    color: #333;
  }

  /* TOTAL */
  .total-box {
    background: #fff;
    border-radius: 14px;
    padding: 14px;
    display: flex;
    justify-content: space-between;
    font-weight: 600;
    border: 1px solid #eee;
  }

  /* PIX */
  .pix-box {
    background: #fff;
    border-radius: 14px;
    padding: 14px;
    border: 1px solid #eee;
  }

  .pix-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
    margin-top: 8px;
  }

  .pix-key {
    font-weight: bold;
    color: #222;
  }

  .pix-copy {
    background: #ff4d4f;
    color: #fff;
    border: none;
    padding: 8px 12px;
    border-radius: 8px;
    cursor: pointer;
  }

  .pix-info {
    font-size: 12px;
    margin-top: 10px;
    color: #555;
  }

  .fade-slide {
    animation: fade 0.3s ease;
  }

  @keyframes fade {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  /* DESKTOP */
  @media (min-width: 1024px) {
    .content {
      max-width: 100%;
      width: 100%;
      min-height: 100vh;

      display: grid;
      grid-template-columns: 1fr 520px;
    }

    /* IMAGEM */
    .hero {
      height: 100vh;
      position: relative;
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

    /* FORM LATERAL */
    .form {
      padding: 40px 40px 20px;
      gap: 20px;
      overflow-y: auto;
    }

    .input-box {
      padding: 16px;
    }

    .footer {
      padding: 40px 0;
    }

    .button {
      height: 58px;
      font-size: 17px;
    }

    .total-box {
      padding: 18px;
      font-size: 17px;
    }

    .pix-box {
      padding: 18px;
    }
  }
`;
