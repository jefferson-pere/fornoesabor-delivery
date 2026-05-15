import styled from "styled-components";

export const Container = styled.div<{ erro?: boolean }>`
  width: 100%;
  min-height: 100vh;
  background: #f5f5f5;
  display: flex;
  justify-content: center;

  .content {
    width: 100%;
    max-width: 480px;
    display: flex;
    flex-direction: column;
    background: #fff;
    min-height: 100vh;
  }

  /* HERO */
  .hero {
    position: relative;
    height: 220px;
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
    background: linear-gradient(to bottom, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.65) 100%);
  }

  .hero-title {
    font-size: 24px;
    font-weight: 800;
    color: #fff;
    text-shadow: 0 1px 4px rgba(0,0,0,0.3);
  }

  /* CARD */
  .card {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 32px 24px max(28px, env(safe-area-inset-bottom, 28px));
    text-align: center;
    animation: fadeUp 0.4s ease;
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(14px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  /* ÍCONE */
  .icon-wrap {
    width: 76px;
    height: 76px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 18px;
  }

  .icon-wrap.success { background: #f0fdf4; }
  .icon-wrap.error   { background: #fff5f5; }

  .icon-x {
    font-size: 30px;
    font-weight: 900;
    color: #d90000;
  }

  /* CHECKMARK SVG ANIMADO */
  .check-svg {
    width: 56px;
    height: 56px;
  }

  .check-circle {
    fill: none;
    stroke: #22c55e;
    stroke-width: 3;
    stroke-dasharray: 166;
    stroke-dashoffset: 166;
    animation: drawCircle 0.6s ease forwards;
  }

  .check-mark {
    fill: none;
    stroke: #22c55e;
    stroke-width: 3.5;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-dasharray: 48;
    stroke-dashoffset: 48;
    animation: drawCheck 0.4s ease 0.5s forwards;
  }

  @keyframes drawCircle {
    to { stroke-dashoffset: 0; }
  }

  @keyframes drawCheck {
    to { stroke-dashoffset: 0; }
  }

  /* TEXTOS */
  h1 {
    font-size: 22px;
    font-weight: 800;
    color: #111;
    margin: 0 0 8px;
    line-height: 1.3;
  }

  .desc {
    font-size: 14px;
    color: #666;
    line-height: 1.6;
    margin: 0 0 24px;
  }

  /* COUNTDOWN */
  .countdown-bar {
    width: 100%;
    height: 4px;
    background: #e5e7eb;
    border-radius: 99px;
    overflow: hidden;
    margin-bottom: 8px;
  }

  .countdown-fill {
    height: 100%;
    width: 100%;
    background: #22c55e;
    border-radius: 99px;
    animation: shrink linear forwards;
  }

  @keyframes shrink {
    from { width: 100%; }
    to   { width: 0%; }
  }

  .countdown-text {
    font-size: 13px;
    color: #999;
    margin: 0 0 20px;
  }

  /* BOTÕES */
  .btn-whatsapp {
    width: 100%;
    height: 52px;
    border-radius: 14px;
    border: none;
    background: #22c55e;
    color: #fff;
    font-weight: 800;
    font-size: 16px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    transition: opacity 0.2s, transform 0.1s;
    margin-bottom: 10px;
  }

  .btn-whatsapp:hover  { opacity: 0.9; }
  .btn-whatsapp:active { transform: scale(0.97); }

  .btn-primary {
    width: 100%;
    height: 52px;
    border-radius: 14px;
    border: none;
    background: #d90000;
    color: #fff;
    font-weight: 800;
    font-size: 16px;
    cursor: pointer;
    transition: opacity 0.2s, transform 0.1s;
    margin-bottom: 10px;
  }

  .btn-primary:hover  { opacity: 0.9; }
  .btn-primary:active { transform: scale(0.97); }

  .btn-ghost {
    width: 100%;
    height: 44px;
    border-radius: 12px;
    border: 1.5px solid #e5e7eb;
    background: transparent;
    color: #999;
    font-weight: 600;
    font-size: 14px;
    cursor: pointer;
    transition: background 0.2s;
  }

  .btn-ghost:hover { background: #f5f5f5; }

  /* DESKTOP */
  @media (min-width: 1024px) {
    .content {
      max-width: 100%;
      width: 100%;
      height: 100vh;
      overflow: hidden;
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
    .hero-title   { font-size: 38px; }

    .card {
      padding: 0 48px;
      justify-content: center;
      overflow-y: auto;
    }

    h1       { font-size: 28px; }
    .desc    { font-size: 15px; }

    .btn-whatsapp,
    .btn-primary { height: 56px; font-size: 17px; }
  }

  @media (min-width: 1440px) {
    .content {
      grid-template-columns: 1fr 540px;
    }
  }
`;
