import styled from "styled-components";

export const Container = styled.div`
  min-height: 100vh;

  background: #ececec;

  padding: 20px;

  .topo {
    display: flex;

    justify-content: space-between;

    align-items: center;

    margin-bottom: 28px;

    h1 {
      font-size: 32px;

      font-weight: 800;

      color: #111;

      margin-bottom: 6px;
    }

    p {
      color: #666;

      font-size: 15px;
    }
  }
.top-actions {
  display: flex;

  align-items: center;

  gap: 12px;
}

.new-order {
  height: 42px;

  padding: 0 18px;

  border: 0;

  border-radius: 12px;

  background: #2563eb;

  color: white;

  font-weight: 700;

  cursor: pointer;

  transition: 0.2s;
}

.new-order:hover {
  background: #1d4ed8;
}
  .grid {
    display: grid;

    grid-template-columns: repeat(4, 1fr);

    gap: 20px;

    align-items: flex-start;
  }
  .logout {
    height: 48px;

    padding: 0 20px;

    border: none;

    border-radius: 14px;

    background: #dc2626;

    color: #fff;

    font-weight: 700;

    cursor: pointer;

    transition: 0.2s;
  }

  .logout:hover {
    opacity: 0.92;

    transform: translateY(-2px);
  }
  /* LOGIN */
  .login {
    width: 100%;

    max-width: 420px;

    margin: 80px auto;

    background: #fff;

    border-radius: 24px;

    padding: 40px;

    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);

    display: flex;

    flex-direction: column;

    gap: 20px;

    text-align: center;

    h2 {
      font-size: 28px;

      color: #111;

      font-weight: 700;
    }

    button {
      height: 52px;

      border: none;

      border-radius: 14px;

      background: #111;

      color: #fff;

      font-size: 16px;

      font-weight: bold;

      cursor: pointer;

      transition: 0.2s;
    }

    button:hover {
      opacity: 0.92;

      transform: translateY(-2px);
    }
  }

  /* SCROLL */
  ::-webkit-scrollbar {
    width: 8px;

    height: 8px;
  }

  ::-webkit-scrollbar-thumb {
    background: #cfcfcf;

    border-radius: 999px;
  }

  ::-webkit-scrollbar-track {
    background: transparent;
  }

  /* RESPONSIVO */
  @media (max-width: 1200px) {
    .grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-width: 700px) {
    .grid {
      grid-template-columns: 1fr;
    }

    .topo {
      flex-direction: column;

      align-items: flex-start;

      gap: 10px;

      h1 {
        font-size: 24px;
      }
    }

    .login {
      padding: 24px;

      border-radius: 18px;

      h2 {
        font-size: 22px;
      }
    }
  }
`;
