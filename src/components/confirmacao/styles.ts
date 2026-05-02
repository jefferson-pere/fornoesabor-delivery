import styled from "styled-components";

export const Container = styled.div`
  min-height: 100vh;
  background: #f7f7f7;
  display: flex;
  justify-content: center;

  .content {
    width: 100%;
    max-width: 500px;
  }

  .header {
    background: #4caf50;
    color: white;
    padding: 20px;
    text-align: center;
    font-weight: bold;
    font-size: 18px;
  }

  .section {
    padding: 20px;
  }

  .center {
    text-align: center;
  }

  .resumo-title {
    margin-top: 10px;
    font-weight: bold;
  }

  .total {
    margin-top: 15px;
  }

  .button {
    width: 100%;
    margin-top: 20px;
    background: #ff4d4f;
    color: white;
    padding: 14px;
    border: none;
    border-radius: 10px;
    font-weight: bold;
  }

  hr {
    margin: 10px 0;
    border-top: 1px dashed #ccc;
  }
`;
