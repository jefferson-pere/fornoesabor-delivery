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
    background: #fff;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  /* HERO */
  .hero {
    position: relative;
    height: 240px;
    overflow: hidden;
    flex-shrink: 0;
  }

  .hero img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .hero-overlay {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 20px 18px;
    background: linear-gradient(to bottom, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.72) 100%);
  }

  .hero-badge {
    display: inline-flex;
    align-self: flex-start;
    background: rgba(255,255,255,0.2);
    backdrop-filter: blur(4px);
    color: #fff;
    font-size: 12px;
    font-weight: 700;
    padding: 4px 12px;
    border-radius: 99px;
    margin-bottom: 8px;
    border: 1px solid rgba(255,255,255,0.3);
    letter-spacing: 0.3px;
  }

  .hero-title {
    font-size: 28px;
    font-weight: 800;
    color: #fff;
    line-height: 1.1;
    text-shadow: 0 1px 4px rgba(0,0,0,0.3);
  }

  .hero-sub {
    font-size: 13px;
    color: rgba(255,255,255,0.85);
    margin-top: 5px;
  }

  /* BODY */
  .body {
    padding: 24px 20px 32px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    animation: fadeUp 0.4s ease;
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(12px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .descricao {
    font-size: 14px;
    color: #555;
    line-height: 1.7;
    text-align: center;
  }

  /* HORÁRIO */
  .horario-box {
    background: #fafafa;
    border: 1px solid #eee;
    border-radius: 16px;
    padding: 18px 16px;
    display: flex;
    flex-direction: column;
    gap: 14px;
  }

  .horario-header {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 7px;
    font-size: 11px;
    font-weight: 700;
    color: #aaa;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .horario-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
  }

  .dias {
    font-size: 14px;
    font-weight: 600;
    color: #333;
  }

  .horario-pills {
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .separador {
    font-size: 13px;
    color: #aaa;
  }

  .pill {
    padding: 5px 14px;
    border-radius: 99px;
    font-size: 13px;
    font-weight: 700;
  }

  .pill.open {
    background: #f0fdf4;
    color: #16a34a;
    border: 1px solid #bbf7d0;
  }

  .pill.closed {
    background: #fff5f5;
    color: #d90000;
    border: 1px solid #fecaca;
  }

  .divider {
    height: 1px;
    background: #f0f0f0;
  }

  /* RODAPÉ */
  .footer-text {
    text-align: center;
    font-size: 13px;
    color: #aaa;
    font-weight: 500;
  }

  /* DESKTOP */
  @media (min-width: 1024px) {
    .content {
      max-width: 100%;
      display: grid;
      grid-template-columns: 1fr 480px;
    }

    .hero {
      height: 100vh;
      position: sticky;
      top: 0;
    }

    .hero img { height: 100vh; }
    .hero-overlay { padding: 40px; }
    .hero-title { font-size: 42px; }
    .hero-sub   { font-size: 16px; }

    .body {
      padding: 48px 40px;
      justify-content: center;
    }

    .descricao { font-size: 15px; }
  }
`;
