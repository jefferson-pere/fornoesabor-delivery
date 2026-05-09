import styled from "styled-components";

export const Container = styled.div`
  background: #f5f5f5;

  border-radius: 18px;

  padding: 18px;

  min-width: 320px;

  width: 100%;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    margin-bottom: 20px;

    h2 {
      font-size: 18px;
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
    }
  }

  .cards {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
`;
