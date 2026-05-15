import styled from "styled-components";

export const Container = styled.div`
  * {
    box-sizing: border-box;
    font-weight: 900 !important;
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

    font-size: 18px;

    font-weight: 900;

    line-height: 1.4;

    color: #000;

    background: #fff;

    page-break-inside: avoid;
  }

  h1 {
    text-align: center;

    font-size: 36px;

    margin: 0;

    font-weight: 900;
  }

  .pedido {
    text-align: center;

    margin-top: 2px;

    margin-bottom: 4px;

    font-size: 18px;

    font-weight: 900;
  }

  .divider {
    border-top: 2px dashed #000;

    margin: 4px 0;
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
    margin-bottom: 0px;

    font-size: 18px;

    font-weight: 900;
  }

  .lineEnd {
    display: flex;
    align-items: flex-start;
    gap: 4px;
    margin-bottom: 1px;
    font-size: 18px;
    font-weight: 900;
  }

  .itemCupom {
    margin-top: 2px;
  }

  h2 {
    font-size: 20px;

    margin: 0 0 2px;

    font-weight: 900;
  }

  .flavor {
    font-size: 18px;

    margin-bottom: 0px;

    font-weight: 900;
  }

  .obs {
    margin-top: 1px;

    font-size: 17px;

    font-weight: 900;
  }

  .combo-divider {
    border-top: 2px dashed #000;

    margin: 3px 0;
  }

  .total {
    margin-top: 6px;

    font-size: 19px;

    font-weight: 900;
  }

  .footer {
    margin-top: 8px;
    font-size: 19px;
    font-weight: 900;
    display: flex;
    flex-direction: column;
    span {
      text-align: right;
    }
  }
`;
