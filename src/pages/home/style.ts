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

  /* ── HERO ── */
  .hero {
    position: relative;
    width: 100%;
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
    background: linear-gradient(
      to bottom,
      rgba(0,0,0,0.05) 0%,
      rgba(0,0,0,0.65) 100%
    );
  }

  .hero-badge {
    display: inline-flex;
    align-self: flex-start;
    background: #d90000;
    color: #fff;
    font-size: 14px;
    font-weight: 700;
    padding: 3px 10px;
    border-radius: 99px;
    margin-bottom: 6px;
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
    font-size: 16px;
    color: rgba(255,255,255,0.85);
    margin-top: 4px;
  }

  /* ── FORM ── */
  .form {
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    flex: 1;
  }

  .field {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .label {
    font-size: 12px;
    font-weight: 700;
    color: #888;
    text-transform: uppercase;
    letter-spacing: 0.4px;
  }

  /* NOME + SOBRENOME LADO A LADO */
  .name-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
  }

  /* RUA + NÚMERO LADO A LADO */
  .rua-numero-row {
    display: flex;
    gap: 10px;
  }

  .rua-field { flex: 2; }
  .numero-field { flex: 1; }

  /* INPUT BOX */
  .input-box {
    display: flex;
    align-items: center;
    gap: 8px;
    background: #f8f8f8;
    border-radius: 12px;
    padding: 0 12px;
    border: 1.5px solid #eee;
    transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
    min-height: 48px;
  }

  .input-box:focus-within {
    border-color: #d90000;
    background: #fff;
    box-shadow: 0 0 0 3px rgba(217, 0, 0, 0.08);
  }

  .input-box.error {
    border-color: #ef4444;
    background: #fff5f5;
  }

  .input-icon {
    font-size: 17px;
    color: #d90000;
    flex-shrink: 0;
  }

  .select-arrow {
    color: #aaa;
    flex-shrink: 0;
  }

  .input-box input,
  .input-box select {
    flex: 1;
    border: none;
    outline: none;
    background: transparent;
    font-size: 16px;
    font-weight: 500;
    color: #222;
    min-width: 0;
  }

  .input-box input::placeholder {
    color: #bbb;
    font-weight: 400;
  }

  /* DELIVERY OPTIONS */
  .delivery-options {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
  }

  .delivery-options.error .delivery-btn {
    border-color: #ef4444;
  }

  .delivery-btn {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2px;
    padding: 14px 10px;
    border-radius: 14px;
    background: #f8f8f8;
    border: 1.5px solid #eee;
    cursor: pointer;
    transition: border-color 0.2s, background 0.2s, transform 0.1s;
    text-align: center;
    user-select: none;
  }

  .delivery-btn:active {
    transform: scale(0.97);
  }

  .delivery-btn.active {
    background: #fff0f0;
    border-color: #d90000;
  }

  .delivery-icon {
    font-size: 22px;
    line-height: 1;
  }

  .delivery-label {
    font-size: 14px;
    font-weight: 700;
    color: #222;
    margin-top: 4px;
  }

  .delivery-btn.active .delivery-label {
    color: #d90000;
  }

  .delivery-sub {
    font-size: 11px;
    color: #aaa;
    font-weight: 500;
  }

  .delivery-btn.active .delivery-sub {
    color: #f87171;
  }

  /* ADDRESS */
  .address-block {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  /* FADE SLIDE */
  .fade-slide {
    animation: fadeSlide 0.3s ease;
  }

  @keyframes fadeSlide {
    from { opacity: 0; transform: translateY(8px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  /* ERROR TEXT */
  .error-text {
    font-size: 11px;
    color: #ef4444;
    margin-top: 2px;
  }

  /* FOOTER */
  .footer {
    padding: 4px 16px max(8px, env(safe-area-inset-bottom, 8px));
    margin-top: auto;
  }

  .button {
    width: 100%;
    height: 54px;
    border-radius: 14px;
    border: none;
    background: #d90000;
    color: #fff;
    font-weight: 800;
    font-size: 17px;
    cursor: pointer;
    transition: opacity 0.2s, transform 0.1s;
    letter-spacing: 0.3px;
  }

  .button:hover  { opacity: 0.9; }
  .button:active { transform: scale(0.98); }

  .button.loading {
    opacity: 0.7;
    cursor: not-allowed;
  }

  .spinner {
    width: 18px;
    height: 18px;
    border: 3px solid rgba(255,255,255,0.4);
    border-top-color: #fff;
    border-radius: 50%;
    animation: spin 0.7s linear infinite;
    margin: auto;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  /* ── DESKTOP ── */
  @media (min-width: 1024px) {
    .content {
      max-width: 100%;
      width: 100%;
      height: 100vh;
      overflow: hidden;
      display: grid;
      grid-template-columns: 1fr 520px;
      grid-template-rows: auto 1fr;
    }

    /* Hero ocupa coluna esquerda inteira */
    .hero {
      grid-row: 1 / 3;
      grid-column: 1;
      height: 100vh;
    }

    .hero img {
      height: 100vh;
    }

    .hero-title {
      font-size: 38px;
    }

    .hero-sub {
      font-size: 15px;
    }

    /* StepProgress e form na coluna direita */
    .content > *:not(.hero) {
      grid-column: 2;
    }

    .form {
      padding: 20px 36px 12px;
      overflow-y: auto;
      min-height: 0;
      gap: 14px;
    }

    .footer {
      padding: 8px 36px 32px;
      margin-top: 0;
    }

    .input-box {
      min-height: 52px;
    }

    .input-box input,
    .input-box select {
      font-size: 15px;
    }

    .button {
      height: 58px;
      font-size: 18px;
    }
  }

  @media (min-width: 1440px) {
    .content {
      grid-template-columns: 1fr 560px;
    }
  }
`;
