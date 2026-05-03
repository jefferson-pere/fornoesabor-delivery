import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  background: #f5f5f5;
  min-height: 100vh;

  .content {
    width: 100%;
    max-width: 500px;
    background: #fff;
    padding-bottom: 90px;
  }

  .header {
    background: #ff4d4f;
    color: white;
    padding: 18px;
    text-align: center;
    font-weight: bold;
  }

  .section {
    padding: 16px;
    border-bottom: 1px solid #eee;
  }

  .title {
    font-weight: bold;
    margin-bottom: 8px;
  }

  .item {
    margin-bottom: 10px;
  }

  .item-title {
    font-weight: bold;
  }

  .sub {
    font-size: 13px;
    color: #666;
  }

  .total {
    font-size: 18px;
    font-weight: bold;
    text-align: right;
  }

  .footer {
    position: fixed;
    bottom: 0;
    width: 100%;
    max-width: 500px;
    background: #fff;
    padding: 12px;
    border-top: 1px solid #eee;
  }

  .button {
    width: 100%;
    padding: 14px;
    background: #ff4d4f;
    color: white;
    border-radius: 10px;
    border: none;
    font-weight: bold;
  }
`;
