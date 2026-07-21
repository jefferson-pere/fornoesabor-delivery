import styled from "styled-components";

export const Container = styled.div`
  background: #f5f5f5;
  border-radius: 18px;
  padding: 18px;
  min-width: 320px;
  width: 100%;
  transition: background 0.25s;

  body.painel-dark & {
    background: #1e293b;
  }

  .right {
    display: flex;
    align-items: center;
    gap: 8px;

    button {
      background: #ddd;
      border: none;
      font-size: 13px;
      padding: 2px 6px;
      border-radius: 8px;
      cursor: pointer;
      transition: 0.2s;

      &:hover { background: #ccc; }

      body.painel-dark & {
        background: #334155;
        color: #f8fafc;
        &:hover { background: #475569; }
      }
    }
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;

    h2 {
      font-size: 18px;
      body.painel-dark & { color: #f8fafc; }
    }

    span {
      background: #111;
      color: #fff;
      width: 28px;
      height: 28px;
      border-radius: 999px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 13px;

      body.painel-dark & { background: #334155; }
    }
  }

  .cards {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
`;
