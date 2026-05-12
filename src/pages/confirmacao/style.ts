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
.icon-error{
  fill: #d90000;
  svg{
    fill: #d90000;
  }
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
    line-height: 1.5;
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
    margin-top: 10px;
  }

  .button:hover {
    opacity: 0.9;
  }

  .button:active {
    transform: scale(0.97);
  }

  .whatsapp {
    background: #22c55e;
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

  /* DESKTOP */
  @media (min-width: 1024px) {
    .content {
      width: 100%;
      max-width: 100%;
      height: 100vh;

      display: grid;
      grid-template-columns: 1fr 520px;

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
    .card {
      margin: 0;
      height: 100vh;

      overflow-y: auto;

      border-radius: 0;
      border: none;
      box-shadow: none;

      display: flex;
      flex-direction: column;
      justify-content: center;

      padding: 40px;
    }

    .icon {
      font-size: 90px;
      margin-bottom: 20px;
    }

    h1 {
      font-size: 36px;
      margin-bottom: 16px;
    }

    p {
      font-size: 18px;
      line-height: 1.7;
      margin-bottom: 24px;
    }

    .info {
      font-size: 15px;
      margin-bottom: 30px;
    }

    .button {
      height: 58px;
      font-size: 18px;
    }
  }
`;
