import styled from "styled-components";

export const Container = styled.div`
  min-height: 100vh;

  background: #f5f5f5;

  padding: 24px;

  .topo {
    margin-bottom: 28px;

    h1 {
      font-size: 34px;

      font-weight: 800;

      color: #111;
    }

    p {
      color: #666;

      margin-top: 6px;
    }
  }

  .filters {
    display: flex;

    gap: 14px;

    margin-bottom: 24px;

    input {
      height: 48px;

      border: none;

      border-radius: 14px;

      padding: 0 16px;

      background: #fff;

      font-size: 15px;

      flex: 1;
    }
  }

  .stats {
    display: grid;

    grid-template-columns: repeat(4, 1fr);

    gap: 16px;

    margin-bottom: 24px;

    .card {
      background: #fff;

      border-radius: 18px;

      padding: 20px;

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
  }

  .list {
    display: grid;

    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));

    gap: 18px;
  }

  .order {
    background: #fff;

    border-radius: 20px;

    padding: 20px;

    display: flex;

    flex-direction: column;

    gap: 16px;

    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);

    .header {
      display: flex;

      justify-content: space-between;

      align-items: center;

      strong {
        display: block;

        font-size: 18px;

        margin-bottom: 4px;
      }

      span {
        color: #666;

        font-size: 14px;
      }
    }

    .paid {
      color: #16a34a;

      font-weight: 700;
    }

    .pending {
      color: #dc2626;

      font-weight: 700;
    }

    .info {
      display: flex;

      justify-content: space-between;

      font-size: 14px;

      color: #444;
    }

    .time {
      font-size: 13px;

      color: #777;
    }

    button {
      height: 46px;

      border: none;

      border-radius: 14px;

      background: #111;

      color: #fff;

      font-weight: 700;

      cursor: pointer;
    }
  }

  .empty {
    width: 100%;

    padding: 40px;

    text-align: center;

    color: #777;
  }

  @media (max-width: 900px) {
    .stats {
      grid-template-columns: repeat(2, 1fr);
    }

    .filters {
      flex-direction: column;
    }
  }

  @media (max-width: 600px) {
    padding: 14px;

    .stats {
      grid-template-columns: 1fr;
    }

    .topo h1 {
      font-size: 28px;
    }
  }
`;
