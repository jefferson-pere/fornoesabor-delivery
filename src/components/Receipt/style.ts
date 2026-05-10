import styled from "styled-components";

export const Container = styled.div`
  * {
    box-sizing: border-box;
  }

  display: none;

  @media print {
    display: block;

    position: fixed;
    inset: 0;

    background: #fff;

    z-index: 999999;

    margin: 0;
    padding: 0;

    .receipt-print {
      margin: 0;
      padding: 0;
    }

    .receipt-content {
      margin: 0;
      padding: 0;

      width: fit-content;
      min-width: 100%;

      box-sizing: border-box;
    }

    .no-print {
      display: none;
    }

    body {
      margin: 0;
      padding: 0;
    }
  }

  .receipt-print {
    margin: 0;
    padding: 0;

    page-break-after: avoid;
  }

  .receipt-content {
    margin: 0;
    padding: 0;

    font-family: monospace;

    font-size: 12px;

    font-weight: bold;

    line-height: 1.2;

    color: #000;

    background: #fff;

    page-break-inside: avoid;
  }

  h1 {
    text-align: center;

    font-size: 18px;

    margin: 0;

    font-weight: 900;
  }

  .pedido {
    text-align: center;

    margin-top: 2px;

    margin-bottom: 6px;

    font-size: 13px;
  }

  .divider {
    border-top: 1px dashed #000;

    margin: 5px 0;
  }

  .line,
  .flavor,
  .total {
    display: flex;

    justify-content: space-between;

    align-items: flex-start;

    gap: 4px;
  }

  .line {
    margin-bottom: 1px;

    font-size: 12px;
  }

  .lineEnd {
    display: flex;
    align-items: flex-start;
    gap: 4px;
    margin-bottom: 2px;
    font-size: 12px;
  }

  .itemCupom {
    margin-top: 4px;
  }

  h2 {
    font-size: 13px;

    margin: 0 0 3px;

    font-weight: 900;
  }

  .flavor {
    font-size: 12px;

    margin-bottom: 1px;
  }

  .obs {
    margin-top: 2px;
  }

  .combo-divider {
    border-top: 1px dashed #000;

    margin: 5px 0;
  }

  .total {
    margin-top: 8px;

    font-size: 18px;

    font-weight: 900;
  }

  .footer {
    margin-top: 10px;
    font-size: 18px;
    font-weight: 900;
    display: flex;
    flex-direction: column;
    span {
      text-align: right;
    }
  }
`;
