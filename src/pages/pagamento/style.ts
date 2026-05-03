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
    margin-bottom: 10px;
  }

  .option {
    padding: 12px;
    border: 1px solid #ddd;
    border-radius: 8px;
    margin-bottom: 10px;
    cursor: pointer;
  }

  .selected {
    border-color: #ff4d4f;
    background: #fff5f5;
  }

  .input {
    width: 100%;
    padding: 12px;
    margin-top: 10px;
    border-radius: 8px;
    border: 1px solid #ddd;
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
