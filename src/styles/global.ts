import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    -webkit-text-size-adjust: 100%;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    color: ${({ theme }) => theme.colors.text};
    background-color: ${({ theme }) => theme.colors.background};
    -webkit-font-smoothing: antialiased;
  }

  /* 🔥 FIX IOS ZOOM INPUT */
  input,
  select,
  textarea {
    font-size: 16px; /* 👈 ESSENCIAL */
    -webkit-text-size-adjust: 100%;
  }

  button {
    font-family: inherit;
    cursor: pointer;
  }

  input,
  select,
  textarea,
  button {
    outline: none;
  }
`;
