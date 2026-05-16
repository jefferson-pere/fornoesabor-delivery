import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    color: ${({ theme }) => theme.colors.text};
    background-color: ${({ theme }) => theme.colors.background};
    -webkit-font-smoothing: antialiased;
  }

  /* INPUT GLOBAL */
  input, select, textarea {
    width: 100%;
    padding: 14px;
    border-radius: 10px;

    border: 1px solid #d1d5db; /* 👈 atualizado */

    font-size: 14px;
    background: #fafafa;
    transition: all 0.2s ease;
  }
 .label {
    font-size: 13px;
    font-weight: 600;
    color: #555;
    margin-bottom: 6px;
  }
  //logo
   .hero {
    position: relative;
    height: 230px;
  }

  .hero img {
    width: 100%;
    height: 100%;
  }

  input::placeholder {
    color: #9ca3af; /* 👈 placeholder mais bonito */
  }

  input:focus,
  select:focus,
  textarea:focus {
    border-color: #ff4d4f;
    background: #fff;
    outline: none;
    box-shadow: 0 0 0 2px rgba(255, 77, 79, 0.15);
  }

  /* ERRO */
  .input-error {
    border-color: #ff4d4f !important;
    background: #fff5f5 !important;
  }
  .error-text {
    font-size: 12px;
    color: #ff4d4f;
  }

  .input-error-text {
    font-size: 12px;
    color: #ff4d4f;
    margin-top: 4px;
    margin-bottom: 8px;
  }

  /* LABEL */
  .label {
    font-size: 13px;
    font-weight: 600;
    color: #444;
    margin-bottom: 4px;
    display: block;
  }

  /* BUTTON */
  button {
    cursor: pointer;
    transition: all 0.2s ease;
  }

  button:active {
    transform: scale(0.98);
  }

  @page {
    margin: 0;
    size: auto;
  }

  @media print {
    html, body {
      margin: 0;
      padding: 0;
      height: auto;
      overflow: hidden;
    }

    body * {
      visibility: hidden;
    }

    .receipt-print,
    .receipt-print * {
      visibility: visible;
    }

    .receipt-print {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: auto;
      overflow: visible;
      page-break-after: avoid;
    }
  }
`;
