import styled from "styled-components";

export const Container = styled.div`
  min-height: 100vh;

  padding: 40px;

  background: #f5f5f5;

  .login-card {
    width: 100%;
    max-width: 420px;

    margin: 80px auto;

    background: #fff;

    padding: 30px;

    border-radius: 20px;

    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.08);

    h1 {
      font-size: 32px;
      margin-bottom: 10px;
    }

    p {
      color: #666;
      margin-bottom: 24px;
    }

    input {
      width: 100%;

      height: 52px;

      border-radius: 12px;

      border: 1px solid #ddd;

      padding: 0 14px;

      font-size: 16px;

      outline: none;

      margin-bottom: 16px;
    }

    button {
      width: 100%;

      height: 52px;

      border: none;

      border-radius: 12px;

      background: #111;

      color: #fff;

      font-size: 16px;

      font-weight: bold;

      cursor: pointer;
    }
  }

  .topo {
    display: flex;
    align-items: center;
    justify-content: space-between;

    margin-bottom: 30px;

    h1 {
      font-size: 32px;
    }
  }

  .logout {
    border: none;

    background: #ef4444;

    color: #fff;

    padding: 12px 18px;

    border-radius: 12px;

    cursor: pointer;

    font-weight: bold;
  }
`;
