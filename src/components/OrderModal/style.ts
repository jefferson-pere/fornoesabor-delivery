import styled from "styled-components";

export const Container = styled.div`
  .overlay {
    position: fixed;

    inset: 0;

    background: rgba(0, 0, 0, 0.5);

    display: flex;

    align-items: center;

    justify-content: center;

    z-index: 9999;
  }

  .modal {
    width: 100%;

    max-width: 700px;

    background: #fff;

    border-radius: 20px;

    padding: 24px;

    max-height: 90vh;

    overflow-y: auto;
  }

  .topo {
    display: flex;

    justify-content: space-between;

    align-items: center;

    margin-bottom: 20px;

    button {
      border: none;

      background: none;

      font-size: 22px;

      cursor: pointer;
    }
  }

  .content {
    display: flex;

    flex-direction: column;

    gap: 14px;

    label {
      font-weight: bold;
    }

    input,
    textarea,
    select {
      width: 100%;

      border: 1px solid #ddd;

      border-radius: 10px;

      padding: 12px;

      font-size: 15px;
    }

    textarea {
      min-height: 100px;
    }
  }

  .item {
    background: #f5f5f5;

    padding: 14px;

    border-radius: 12px;
  }

  .pago {
    display: flex;

    align-items: center;

    gap: 10px;
  }

  .acoes {
    display: flex;

    gap: 12px;

    margin-top: 24px;

    button {
      flex: 1;

      height: 46px;

      border: none;

      border-radius: 12px;

      cursor: pointer;

      font-weight: bold;
    }

    .danger {
      background: #dc2626;

      color: #fff;
    }
  }

  @media print {
    .acoes,
    .topo button {
      display: none;
    }

    .overlay {
      background: #fff;
    }

    .modal {
      box-shadow: none;

      border-radius: 0;
    }
  }
`;
