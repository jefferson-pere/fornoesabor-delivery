import styled from "styled-components";

export const Container = styled.div`
  display: grid;

  grid-template-columns: repeat(5, 1fr);

  gap: 16px;

  margin-bottom: 24px;

  .card {
    background: #fff;

    border-radius: 18px;

    padding: 20px;

    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);

    display: flex;

    flex-direction: column;

    gap: 8px;

    span {
      color: #666;

      font-size: 14px;
    }

    strong {
      font-size: 28px;

      color: #111;
    }
  }

  .success {
    border-left: 5px solid #16a34a;
  }

  .danger {
    border-left: 5px solid #dc2626;
  }

  @media (max-width: 1400px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;
