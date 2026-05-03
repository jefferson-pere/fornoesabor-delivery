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
  }

  .input-box input {
    border: none;
    outline: none;
    background: transparent;
    width: 100%;
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
  }

  .input-icon {
    font-size: 20px;
    color: #ff4d4f;
  }

  .error-text {
    font-size: 12px;
    color: #ff4d4f;
  }

  .footer {
    margin-top: auto;
    padding: 16px;
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
  }

  /* PIX */
  .pix-box {
    background: #fff;
    border-radius: 14px;
    padding: 14px;
  }

  .pix-content {
    display: flex;
    justify-content: space-between;
    margin-top: 8px;
  }

  .pix-copy {
    background: #ff4d4f;
    color: #fff;
    border: none;
    padding: 6px 10px;
    border-radius: 8px;
  }

  .pix-info {
    font-size: 12px;
    margin-top: 8px;
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
`;
