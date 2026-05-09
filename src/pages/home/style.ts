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
  }

  .hero {
    position: relative;
    width: 100%;
    height: 240px;
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

  .form {
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  .label {
    font-size: 13px;
    font-weight: 600;
    color: #555;
    margin-bottom: 6px;
  }

  .input-box {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 5px;
    background: #f7f7f7;
    border-radius: 14px;
    padding: 2px 12px;
    border: 1px solid #ff9191;
    transition: 0.2s;
    min-height: 52px;
  }

  .input-box:focus-within {
    border-color: #ff4d4f;
    background: #fff;
    box-shadow: 0 0 0 2px rgba(255, 77, 79, 0.1);
  }

  .input-box.error {
    border-color: #ff4d4f;
    background: #fff5f5;
  }

  .input-icon {
    font-size: 18px;
    color: #ff4d4f;
    min-width: 18px;
  }

  .input-box input,
  .input-box select {
    flex: 1;
    border: none;
    outline: none;
    background: transparent;
    font-size: 16px;
    font-weight: 500;
    width: 100%;
  }

  .select-arrow {
    color: #999;
  }

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
    font-size: 14px;
    font-weight: 500;
  }

  .delivery-btn:hover {
    transform: translateY(-2px);
  }

  .delivery-btn.active {
    background: #ffe5e5;
    border-color: #ff4d4f;
    color: #ff4d4f;
    font-weight: bold;
  }

  .fade-slide {
    animation: fadeSlide 0.3s ease;
    display: flex;
    flex-direction: column;
    gap: 16px;
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

  .footer {
    padding: 16px 0;
    margin-top: auto;
  }

  .button {
    width: 100%;
    height: 56px;
    border-radius: 14px;
    border: none;
    background: #d90000;
    color: #fff;
    font-weight: bold;
    font-size: 18px;
    cursor: pointer;
    transition: 0.2s;
  }

  .button:hover {
    opacity: 0.9;
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

  .error-text {
    font-size: 13px;
    color: #ff4d4f;
    margin-top: 4px;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  @media (min-width: 1024px) {
    padding: 0;

    .content {
      max-width: 100%;
      width: 100%;
      min-height: 100vh;

      display: grid;
      grid-template-columns: 1fr 520px;

      background: #fff;
    }

    .hero {
      height: 100vh;
    }

    .hero img {
      height: 100vh;
    }

    .hero-overlay {
      padding: 40px;
    }

    .hero-title {
      font-size: 42px;
      margin-bottom: 10px;
    }

    .hero-overlay p {
      font-size: 18px;
      max-width: 500px;
    }

    .form {
      padding: 10px 40px ;
      overflow-y: auto;
      justify-content: center;
    }

    .footer {
      padding:  0px;
    }

    .delivery-options {
      display: grid;
      grid-template-columns: 1fr 1fr;
    }
  }
`;
