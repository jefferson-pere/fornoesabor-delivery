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

  /* CARD */
  .card {
    background: #fff;
    margin: 16px;
    border-radius: 18px;
    padding: 24px 20px;
    text-align: center;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
    border: 1px solid #eee;
    animation: fadeUp 0.4s ease;
  }

  .icon {
    font-size: 64px;
    color: #22c55e;
    margin-bottom: 10px;
  }

  h1 {
    font-size: 22px;
    margin-bottom: 8px;
    color: #222;
  }

  p {
    font-size: 14px;
    color: #666;
    margin-bottom: 16px;
    line-height: 1.4;
  }

  .info {
    font-size: 13px;
    color: #444;
    margin-bottom: 20px;
  }

  .button {
    width: 100%;
    height: 52px;
    border-radius: 30px;
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

  /* ANIMAÇÃO */
  @keyframes fadeUp {
    from {
      opacity: 0;
      transform: translateY(15px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  /* RESPONSIVO */
  @media (min-width: 768px) {
    .hero {
      height: 260px;
    }

    .hero-title {
      font-size: 24px;
    }

    .card {
      margin: 24px;
      padding: 28px;
    }

    h1 {
      font-size: 24px;
    }
  }
`;
