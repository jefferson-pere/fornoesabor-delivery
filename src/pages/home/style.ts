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

  /* HEADER */
  .header {
    background: #ff4d4f;
    color: white;
    padding: 20px;
    text-align: center;
    font-weight: bold;
    font-size: 18px;
    border-bottom-left-radius: 12px;
    border-bottom-right-radius: 12px;
  }

  /* SECTION */
  .section {
    padding: 15px;
    background: white;
    border-radius: 12px;
    margin-bottom: 10px;
    border-left: 5px solid #ff4d5060;
    border-right: 5px solid #ff4d5060;
  }
  .maionese{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .section-title {
    margin-bottom: 10px;
    font-weight: bold;
    font-size: 15px;
  }

  /* INPUTS */
  .input,
  .select,
  textarea {
    width: 100%;
    padding: 12px;
    border-radius: 10px;
    border: 1px solid #ddd;
    margin-bottom: 10px;
    background: #fff;
    font-size: 16px; /* 🔥 evita zoom no iPhone */

    &:focus {
      border-color: #ff4d4f;
      outline: none;
    }
  }

  textarea {
    min-height: 90px;
    resize: none;
  }

  /* SABORES */
  .option {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: white;
    padding: 10px;
    border-radius: 10px;
    margin-bottom: 6px;
    border: 1px solid #eee;
    transition: 0.2s;
  }

  .option:hover {
    border-color: #ff4d4f;
  }

  .option input {
    width: 60px;
    padding: 6px;
    border-radius: 8px;
    border: 1px solid #ccc;
    text-align: center;
    font-size: 16px;
  }

  /* FOOTER FIXO */
  .footer {
    position: fixed;
    bottom: 0;
    width: 100%;
    max-width: 500px;
    background: white;
    border-top: 1px solid #ddd;
    padding: 10px;
    box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.05);
  }

  /* BOTÃO */
  .button {
    width: 100%;
    background: #ff4d4f;
    color: white;
    padding: 16px;
    border-radius: 12px;
    border: none;
    font-weight: bold;
    font-size: 16px;
    cursor: pointer;
    transition: 0.2s;

    &:hover {
      background: #e63b3d;
    }

    &:active {
      transform: scale(0.98);
    }
  }

  /* TEXTO AUXILIAR */
  p {
    font-size: 14px;
    color: #555;
  }

  .qtd-control {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .qtd-control button {
    width: 32px;
    height: 32px;
    border-radius: 8px;
    border: none;
    background: #ff4d4f;
    color: white;
    font-size: 18px;
    font-weight: bold;
    cursor: pointer;
  }

  .qtd-control span {
    min-width: 20px;
    text-align: center;
    font-weight: bold;
  }

  /* RESPONSIVO */
  @media (max-width: 480px) {
    .header {
      font-size: 16px;
      padding: 16px;
    }

    .button {
      font-size: 15px;
      padding: 14px;
    }
  }
`;
