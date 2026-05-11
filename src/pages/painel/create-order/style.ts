import styled from "styled-components";

export const Container = styled.div`
  min-height: 100vh;

  background: #eef2f7;

  padding: 18px;

  display: grid;

  grid-template-columns: 1fr 330px;

  gap: 18px;

  .content {
    display: flex;

    flex-wrap: wrap;

    gap: 14px;

    align-content: flex-start;
  }

  .card {
    background: #ffffff;

    border-radius: 16px;

    padding: 16px;

    border: 1px solid #dbe2ea;

    box-shadow: 0 2px 10px rgba(15, 23, 42, 0.05);
  }

  .full {
    width: 100%;
  }

  .half-card {
    width: calc(50% - 7px);
  }

  .top {
    display: flex;

    align-items: center;

    justify-content: space-between;

    margin-bottom: 14px;
  }

  h2 {
    font-size: 15px;

    font-weight: 700;

    color: #0f172a;
  }

  .top span {
    background: #1e293b;

    color: #fff;

    min-width: 28px;

    height: 28px;

    border-radius: 999px;

    display: flex;

    align-items: center;

    justify-content: center;

    font-size: 12px;

    font-weight: 700;
  }

  input,
  select,
  textarea {
    width: 100%;

    border: 1px solid #cbd5e1;

    border-radius: 10px;

    background: #f8fafc;

    padding: 10px 12px;

    font-size: 13px;

    color: #0f172a;

    transition: 0.2s;

    outline: none;
  }

  input:focus,
  select:focus,
  textarea:focus {
    border-color: #2563eb;

    background: #fff;

    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.12);
  }

  textarea {
    resize: none;

    min-height: 75px;
  }

  .grid-2 {
    display: grid;

    grid-template-columns: 1fr 1fr;

    gap: 10px;

    margin-bottom: 10px;
  }

  .grid-3 {
    display: grid;

    grid-template-columns: 2fr 1fr 2fr;

    gap: 10px;
  }

  .sabores {
    display: grid;

    grid-template-columns: 1fr 1fr;

    gap: 8px;

    margin: 16px 0;
  }

  .sabor {
    background: #f1f5f9;

    border: 1px solid #dbe2ea;

    border-radius: 10px;

    padding: 8px;

    display: flex;

    align-items: center;

    justify-content: space-between;

    gap: 8px;
  }

  .sabor span {
    font-size: 11px;

    font-weight: 600;

    color: #334155;
  }

  .sabor input {
    width: 55px;

    padding: 6px;

    text-align: center;

    margin: 0;

    background: white;
  }

  .extra-info {
    height: 42px;

    background: #eff6ff;

    border: 1px solid #bfdbfe;

    border-radius: 10px;

    display: flex;

    align-items: center;

    justify-content: center;

    gap: 5px;

    font-size: 12px;

    font-weight: 700;

    color: #1d4ed8;
  }

  button {
    border: 0;

    cursor: pointer;

    transition: 0.2s;
  }

  button:hover {
    opacity: 0.9;
  }

  .card button {
    height: 42px;

    border-radius: 10px;

    background: #2563eb;

    color: white;

    font-size: 13px;

    font-weight: 700;

    margin-top: 10px;
  }

  .items-grid {
    display: grid;

    grid-template-columns: 1fr 1fr;

    gap: 14px;
  }

  .item-card {
    background: #f8fafc;

    border: 1px solid #dbe2ea;

    border-radius: 14px;

    padding: 14px;
  }

  .item-header {
    display: flex;

    align-items: flex-start;

    justify-content: space-between;

    gap: 10px;

    margin-bottom: 12px;
  }

  .item-header strong {
    display: block;

    font-size: 13px;

    color: #0f172a;

    margin-bottom: 3px;
  }

  .item-header small {
    font-size: 11px;

    color: #64748b;
  }

  .item-header button {
    width: 34px;

    min-width: 34px;

    height: 34px;

    border-radius: 9px;

    background: #ef4444;

    color: white;

    font-weight: 700;

    margin: 0;
  }

  .sabores-selected {
    display: flex;

    flex-wrap: wrap;

    gap: 6px;

    margin-bottom: 12px;
  }

  .sabor-tag {
    background: white;

    border: 1px solid #cbd5e1;

    border-radius: 8px;

    padding: 5px 8px;

    display: flex;

    align-items: center;

    gap: 5px;

    font-size: 10px;

    font-weight: 600;
  }

  .sabor-tag strong {
    color: #16a34a;
  }

  .item-values {
    display: flex;

    flex-wrap: wrap;

    gap: 7px;
  }

  .item-values small {
    background: #e2e8f0;

    border-radius: 8px;

    padding: 4px 7px;

    display: flex;

    gap: 4px;

    font-size: 10px;

    font-weight: 700;

    color: #334155;
  }

  .item-values strong {
    color: #0f172a;
  }

  .item-total {
    background: #dcfce7 !important;

    color: #166534 !important;
  }

  .resume {
    position: relative;
  }

  .sticky {
    position: sticky;

    top: 18px;
  }

  .prices {
    margin-top: 16px;

    display: flex;

    flex-direction: column;

    gap: 10px;
  }

  .prices div {
    display: flex;

    align-items: center;

    justify-content: space-between;

    font-size: 13px;

    font-weight: 600;

    color: #334155;
  }

  .prices strong {
    color: #0f172a;
  }

  .total {
    padding-top: 12px;

    border-top: 1px solid #dbe2ea;

    font-size: 17px !important;

    font-weight: 800;
  }

  .total strong {
    color: #16a34a;
  }

  .finish {
    width: 100%;

    height: 48px;

    border-radius: 12px;

    background: #16a34a !important;

    color: white;

    font-size: 14px;

    font-weight: 800;

    margin-top: 18px;
  }

  @media (max-width: 1000px) {
    grid-template-columns: 1fr;

    .sticky {
      position: relative;

      top: 0;
    }
  }

  @media (max-width: 900px) {
    .half-card {
      width: 100%;
    }

    .items-grid {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 700px) {
    padding: 12px;

    .grid-2,
    .grid-3,
    .sabores {
      grid-template-columns: 1fr;
    }
  }
`;
