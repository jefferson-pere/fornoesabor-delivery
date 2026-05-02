import styled from "styled-components";

export const Container = styled.div`
  min-height: 100vh;
  background: #f5f5f5;
  display: flex;
  justify-content: center;
  padding: 20px;

  .card {
    width: 100%;
    max-width: 500px;
    background: #fff;
    border-radius: 12px;
    padding: 20px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  }

  .title {
    text-align: center;
    margin-bottom: 20px;
    font-size: 22px;
  }

  .input,
  .select {
    width: 100%;
    padding: 10px;
    border-radius: 8px;
    border: 1px solid #ddd;
    margin-bottom: 12px;
    font-size: 14px;

    &:focus {
      border-color: #ff4d4f;
      outline: none;
    }
  }

  .section {
    margin-top: 20px;
  }

  .section-title {
    margin-bottom: 10px;
    font-weight: bold;
  }

  .option {
    display: flex;
    align-items: center;
    gap: 6px;
    margin-bottom: 6px;
    cursor: pointer;
  }

  .total {
    margin-top: 20px;
    text-align: right;
    font-size: 18px;
    font-weight: bold;
  }

  .button {
    width: 100%;
    padding: 12px;
    border-radius: 10px;
    border: none;
    background: #ff4d4f;
    color: white;
    font-weight: bold;
    cursor: pointer;
    margin-top: 15px;

    &:hover {
      background: #e63b3d;
    }
  }
`;
