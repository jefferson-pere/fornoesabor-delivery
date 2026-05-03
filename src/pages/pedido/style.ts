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
  }

 

  .hero-overlay {
    position: absolute;
    bottom: 0;
    padding: 16px;
    width: 100%;
    color: #fff;
    background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
  }

  .hero-title {
    font-size: 20px;
    font-weight: bold;
  }

  .form {
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .input-box {
    display: flex;
    align-items: center;
    gap: 10px;
    background: #f7f7f7;
    border-radius: 14px;
    padding: 4px;
    border: 1px solid #fdb4b4;
  }
  .button.disabled {
    background: #ccc;
    cursor: not-allowed;
    opacity: 0.7;
  }

  .input-box select {
    flex: 1;
    border: none;
    outline: none;
    background: transparent;
    font-size: 16px;
  }
  .input-refri {
    background: #f7e2e2 !important;
    margin: 10px 0;
  }

  .item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #fff;
    padding: 10px;
    border-radius: 12px;
    border: 1px solid #ffe1e1;
  }

  .qtd {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .btn {
    width: 40px;
    height: 40px;
    border-radius: 8px;
    border: none;
    background: #ff4d4f;
    color: #fff;
    font-weight: bold;
    font-size: 20px;
  }
  .button.cancel {
    background: #4e4c4c;
  }

  .total {
    text-align: center;
    font-weight: bold;
  }

  .footer {
    padding: 16px;
  }

  .button {
    width: 100%;
    height: 52px;
    border-radius: 10px;
    border: none;
    background: #d90000;
    color: #fff;
    font-weight: bold;
    font-size: 16px;
    margin-top: 10px;
  }

  .total-card {
    margin-top: 12px;
    background: #fff;
    border-radius: 16px;
    padding: 16px;
    border: 1px solid #eee;
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.05);
  }

  .total-card .row {
    display: flex;
    justify-content: space-between;
    margin-bottom: 8px;
    font-size: 14px;
  }

  .total-card .extra {
    color: #ff4d4f;
    font-weight: 600;
  }

  .total-card .divider {
    height: 1px;
    background: #eee;
    margin: 10px 0;
  }

  .total-card .total {
    font-size: 16px;
    font-weight: bold;
  }
`;
