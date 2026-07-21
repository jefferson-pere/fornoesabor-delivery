import styled from "styled-components";

export const Wrapper = styled.div`
  position: relative;
  margin-bottom: 24px;

  .metrics-actions {
    position: absolute;
    top: -40px;
    right: 0;
    display: flex;
    gap: 4px;
  }

  .metrics-toggle {
    background: none;
    border: none;
    cursor: pointer;
    color: #888;
    font-size: 20px;
    display: flex;
    align-items: center;
    padding: 4px 8px;
    border-radius: 8px;
    transition: background 0.15s, color 0.15s;

    &:hover {
      background: #f0f0f0;
      color: #333;
    }

    body.painel-dark & {
      color: #94a3b8;
      &:hover {
        background: #1e293b;
        color: #f8fafc;
      }
    }
  }
`;

export const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 16px;

  .card {
    background: #fff;
    border-radius: 18px;
    padding: 20px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
    display: flex;
    flex-direction: column;
    gap: 8px;

    body.painel-dark & {
      background: #1e293b;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
    }

    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;

      span {
        color: #666;
        font-size: 14px;

        body.painel-dark & {
          color: #94a3b8;
        }
      }

      .card-toggle {
        background: none;
        border: none;
        cursor: pointer;
        color: #bbb;
        font-size: 16px;
        display: flex;
        align-items: center;
        padding: 0;
        transition: color 0.15s;

        &:hover {
          color: #555;
        }

        body.painel-dark & {
          color: #475569;
          &:hover { color: #f8fafc; }
        }
      }
    }

    strong {
      font-size: 28px;
      color: #111;

      body.painel-dark & {
        color: #f8fafc;
      }
    }
  }

  .success {
    border-left: 5px solid #16a34a;
  }

  .danger {
    border-left: 5px solid #dc2626;
  }

  @media (max-width: 1400px) {
    grid-template-columns: repeat(5, 1fr);
  }

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;
