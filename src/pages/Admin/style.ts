import styled from "styled-components";

export const Container = styled.div`
  padding: 20px;
  background: #f7f7f7;
  min-height: 100vh;

  .title {
    font-size: 22px;
    font-weight: bold;
    margin-bottom: 20px;
  }

  .pedido {
    background: white;
    padding: 15px;
    border-radius: 10px;
    margin-bottom: 12px;
    border-left: 5px solid #ff4d4f;
  }

  .linha {
    display: flex;
    justify-content: space-between;
  }

  .status {
    font-weight: bold;
    text-transform: uppercase;
  }

  .acoes {
    margin-top: 10px;
    display: flex;
    gap: 8px;
  }

  button {
    padding: 6px 10px;
    border-radius: 6px;
    border: none;
    cursor: pointer;
  }

  .ok {
    background: #4caf50;
    color: white;
  }

  .erro {
    background: #f44336;
    color: white;
  }

  .recebido {
    background: #2196f3;
    color: white;
  }
`;
