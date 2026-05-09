import styled from "styled-components";

export const Container = styled.div`
  display: none;

  @media print {
    display: block;

    position: fixed;

    inset: 0;

    background: #fff;

    z-index: 999999;

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
    }

    .no-print {
      display: none;
    }
  }

  .receipt-content {
    width: 100%;

    font-family: monospace;

    font-size: 18px;

    font-weight: bold;

    line-height: 1.1;

    color: #000;
  }

  h1 {
    text-align: center;

    font-size: 24px;

    margin-bottom: 6px;
  }

  h2 {
    font-size: 18px;

    margin: 6px 0 2px;
  }

  .divider {
    border-top: 1px solid #000;

    margin: 4px 0;
  }

  .line,
  .flavor,
  .total {
    display: flex;

    justify-content: space-between;
  }

  .line,
  .flavor {
    font-size: 17px;
  }

  .item {
    margin: 6px 0;
  }

  .obs {
    margin-top: 4px;

    font-size: 15px;

    font-style: italic;
  }

  .total {
    margin-top: 8px;

    font-size: 24px;
  }

  .footer {
    margin-top: 16px;

    text-align: center;

    font-size: 22px;

    line-height: 1.2;
  }

  @page {
    size: 58mm auto;

    margin: 0;
  }
`;
