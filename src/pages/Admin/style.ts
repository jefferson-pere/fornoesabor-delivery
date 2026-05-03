import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  background: #f5f5f5;
  padding: 16px;

  .grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
    height: 100%;
  }

  .coluna {
    background: #fff;
    border-radius: 12px;
    padding: 10px;
    overflow-y: auto;
  }

  .coluna-header {
    font-weight: bold;
    margin-bottom: 10px;
  }

  .card {
    background: #fafafa;
    border-radius: 10px;
    padding: 10px;
    margin-bottom: 10px;
    font-size: 13px;
    border: 1px solid #eee;
  }

  .topo {
    display: flex;
    justify-content: space-between;
    font-size: 13px;
  }

  .sub {
    font-size: 12px;
    color: #666;
  }

  .item {
    margin-top: 6px;
    padding-top: 6px;
    border-top: 1px dashed #ddd;
  }

  .footer {
    margin-top: 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .acoes {
    display: flex;
    gap: 4px;
  }

  button {
    border: none;
    border-radius: 6px;
    padding: 4px 6px;
    cursor: pointer;
    font-size: 12px;
  }
`;
