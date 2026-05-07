import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f7f3f1;
  padding: 20px;
  font-family: Arial, Helvetica, sans-serif;

  .demanda-card {
    width: 100%;
    max-width: 420px;
    border-radius: 18px;
    padding: 24px;
    text-align: center;
    background: #f7f3f1;
  }

  .hero {
    width: 100%;
    margin-bottom: 22px;

    img {
      width: 100%;
      height: 220px;
      border-radius: 14px;
      display: block;
    }
  }

  .status-badge {
    width: fit-content;
    margin: 0 auto 22px;
    background: #fff1ef;
    color: #d60000;
    border: 2px solid #f0d0cb;
    border-radius: 999px;
    padding: 10px 18px;
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 28px;
    font-weight: bold;
    letter-spacing: 1px;
  }

  .demanda-card h1 {
    font-size: 42px;
    line-height: 48px;
    color: #111;
    margin-bottom: 18px;
    font-weight: 800;
  }

  .descricao {
    font-size: 16px;
    line-height: 28px;
    color: #666;
    margin-bottom: 34px;
  }

  .tempo-box {
    width: 100%;
    background: #fff;
    border: 1px solid #e7e2df;
    border-radius: 18px;
    padding: 30px 22px;
    margin-bottom: 34px;
  }

  .tempo-label {
    font-size: 12px;
    letter-spacing: 2px;
    color: #777;
    font-weight: bold;
  }

  .tempo-box h2 {
    font-size: 64px;
    color: #d60000;
    margin: 18px 0;
    line-height: 1;
    font-weight: 900;
  }

  .tempo-box h2 span {
    font-size: 24px;
  }

  .linha {
    width: 100%;
    height: 1px;
    background: #ececec;
    margin: 24px 0;
  }

  .info-item {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    text-align: left;
    margin-bottom: 18px;
    color: #444;
  }

  .info-item:last-child {
    margin-bottom: 0;
  }

  .info-item svg {
    color: #d60000;
    min-width: 18px;
    margin-top: 2px;
  }

  .info-item p {
    font-size: 15px;
    line-height: 24px;
  }

  .notify-btn {
    width: 100%;
    height: 60px;
    border: none;
    border-radius: 16px;
    background: #d60000;
    color: #fff;
    font-size: 15px;
    font-weight: bold;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    transition: 0.2s;
    margin-bottom: 20px;
  }

  .notify-btn:hover {
    transform: scale(1.02);
  }

  .footer-text {
    font-size: 12px;
    color: #7a6d6d;
    letter-spacing: 2px;
    line-height: 22px;
  }

  /* ================= MOBILE ================= */

  @media (max-width: 768px) {
    padding: 16px;

    .demanda-card {
      max-width: 100%;
      padding: 20px 16px;
      border-radius: 16px;
    }

    .hero img {
      height: 180px;
      border-radius: 12px;
    }

    .status-badge {
      font-size: 28px;
      padding: 8px 14px;
    }

    .demanda-card h1 {
      font-size: 30px;
      line-height: 36px;
    }

    .descricao {
      font-size: 14px;
      line-height: 24px;
      margin-bottom: 28px;
    }

    .tempo-box {
      padding: 24px 16px;
      border-radius: 14px;
    }

    .tempo-label {
      font-size: 10px;
    }

    .tempo-box h2 {
      font-size: 46px;
    }

    .tempo-box h2 span {
      font-size: 18px;
    }

    .info-item {
      gap: 10px;
    }

    .info-item p {
      font-size: 13px;
      line-height: 20px;
    }

    .notify-btn {
      height: 54px;
      font-size: 13px;
      border-radius: 12px;
    }

    .footer-text {
      font-size: 10px;
      line-height: 18px;
    }
  }

  /* ================= DESKTOP GRANDE ================= */

  @media (min-width: 1200px) {
    .demanda-card {
      max-width: 500px;
      padding: 32px;
    }

    .hero img {
      height: 260px;
    }

    .demanda-card h1 {
      font-size: 48px;
      line-height: 54px;
    }

    .descricao {
      font-size: 17px;
    }

    .tempo-box h2 {
      font-size: 72px;
    }
  }
`;
