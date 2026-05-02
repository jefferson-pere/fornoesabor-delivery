import styled from "styled-components";

export const Container = styled.div`
  min-height: 100vh;
  background: #f7f7f7;
  display: flex;
  justify-content: center;

  .content {
    width: 100%;
    max-width: 500px;
    padding-bottom: 100px;
  }

  .header {
    background: #ff4d4f;
    color: white;
    padding: 20px;
    text-align: center;
    font-weight: bold;
    font-size: 18px;
  }

  .section {
    padding: 15px;
  }

  .section-title {
    margin-bottom: 10px;
    font-weight: bold;
  }

  .input,
  .select {
    width: 100%;
    padding: 10px;
    border-radius: 8px;
    border: 1px solid #ddd;
    margin-bottom: 10px;

    &:focus {
      border-color: #ff4d4f;
      outline: none;
    }
  }

  .combo-card {
    border: 2px solid #eee;
    border-radius: 10px;
    padding: 12px;
    margin-bottom: 10px;
    background: white;
    cursor: pointer;
    transition: 0.2s;

    &:hover {
      border-color: #ff4d4f;
    }

    &.selected {
      border-color: #ff4d4f;
      background: #fff5f5;
    }
  }

  .sabores-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 8px;
  }

  .sabor-item {
    background: white;
    border-radius: 8px;
    padding: 8px;
    border: 1px solid #ddd;
    font-size: 13px;
    display: flex;
    gap: 6px;
    align-items: center;
  }

  .footer {
    position: fixed;
    bottom: 0;
    width: 100%;
    max-width: 500px;
    background: white;
    border-top: 1px solid #ddd;
    padding: 10px;
  }

  .button {
    width: 100%;
    background: #ff4d4f;
    color: white;
    padding: 14px;
    border: none;
    border-radius: 10px;
    font-weight: bold;
    font-size: 16px;
    cursor: pointer;

    &:hover {
      background: #e63b3d;
    }
  }
`;
