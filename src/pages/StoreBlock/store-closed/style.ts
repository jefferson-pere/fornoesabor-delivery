import styled from "styled-components";

export const Container = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  .hero {
    margin-top: 30px;
    height: 160px;
    img {
      width: 100%;
      border-radius: 8px;
    }
  }
  .fechado-card {
    width: 100%;
    max-width: 340px;
    background: #f8f6f5;
    border-radius: 10px;
    text-align: center;
    position: relative;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  }

  .aviso-badge {
    position: absolute;
    top: -14px;
    left: 50%;
    transform: translateX(-50%);
    background: #d60d0d;
    color: #fff;
    padding: 8px 18px;
    border-radius: 999px;
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 12px;
    font-weight: bold;
    letter-spacing: 1px;
  }

  .fechado-card h1 {
    color: #d60d0d;
    font-size: 36px;
    line-height: 40px;
    margin-top: 20px;
    font-weight: 800;
  }

  .linha {
    width: 60px;
    height: 3px;
    background: #e5c7c7;
    margin: 18px auto;
    border-radius: 20px;
  }

  .descricao {
    color: #444;
    font-size: 15px;
    line-height: 25px;
    margin-bottom: 28px;
  }

  .horario-box {
    background: #ece8e6;
    border-radius: 8px;
    padding: 20px 16px;
    margin-bottom: 24px;
  }

  .horario-title {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
    color: #8a6d6d;
    font-size: 12px;
    font-weight: bold;
    margin-bottom: 20px;
  }

  .horario-item {
    margin-bottom: 18px;
  }

  .horario-item:last-child {
    margin-bottom: 0;
  }

  .horario-item strong {
    display: block;
    font-size: 18px;
    color: #222;
    margin-bottom: 10px;
  }

  .horario-time {
    display: flex;
    justify-content: center;
    gap: 12px;
  }

  .horario-time span {
    width: 80px;
    background: #fff;
    border: 1px solid #ddd;
    padding: 8px 0;
    border-radius: 4px;
    color: #d60d0d;
    font-weight: bold;
    font-size: 14px;
  }

  .footer-text {
    color: #c46d4d;
    font-size: 13px;
    font-style: italic;
    font-weight: bold;
  }

  @media (max-width: 480px) {
    .fechado-card h1 {
      font-size: 32px;
      line-height: 34px;
    }
    .fechado-card {
      max-width: 340px;
      text-align: center;
      position: relative;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    }

    .descricao {
      font-size: 14px;
    }

    .horario-time span {
      width: 100px;
      font-size: 14px;
    }

    .hero {
      height: 120px;
      img {
        width: 100%;
        border-radius: 8px;
      }
    }

    .horario-item strong {
      font-size: 14px;
    }

    .horario-time span {
      font-size: 14px;
    }
    .horario-box {
      padding: 10px 5px;
      margin-bottom: 0px;
    }

    .footer-text {
      margin-top: 5px;
    }
  }
`;
