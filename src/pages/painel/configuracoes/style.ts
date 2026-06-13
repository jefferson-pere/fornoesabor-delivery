import styled from "styled-components";

export const Container = styled.div`
  height: 100vh;
  height: 100dvh;
  background: #ececec;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  padding: 16px;

  .loading {
    text-align: center;
    padding: 60px;
    color: #666;
    font-size: 16px;
  }

  /* ── TOPO ── */
  .topo {
    display: flex;
    align-items: center;
    gap: 14px;
    margin-bottom: 12px;
    flex-shrink: 0;
  }

  .topo-title {
    h1 {
      font-size: 20px;
      font-weight: 800;
      color: #111;
      margin-bottom: 1px;
    }

    p {
      color: #888;
      font-size: 12px;
    }
  }

  .btn-back {
    height: 36px;
    padding: 0 14px;
    border: none;
    border-radius: 10px;
    background: #fff;
    color: #111;
    font-weight: 700;
    font-size: 13px;
    cursor: pointer;
    transition: 0.2s;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
    white-space: nowrap;
    flex-shrink: 0;

    &:hover {
      background: #111;
      color: #fff;
    }
  }

  /* ── GRID ── */
  .sections {
    flex: 1;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
    align-items: start;
    overflow: hidden;
    padding-bottom: 12px;

    @media (max-width: 1100px) {
      grid-template-columns: repeat(2, 1fr);
      overflow-y: auto;
    }

    @media (max-width: 640px) {
      grid-template-columns: 1fr;
      overflow-y: auto;
    }
  }

  /* ── CARD ── */
  .card {
    background: #fff;
    border-radius: 14px;
    padding: 13px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.06);
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow-y: auto;

    &::-webkit-scrollbar { width: 3px; }
    &::-webkit-scrollbar-track { background: transparent; }
    &::-webkit-scrollbar-thumb { background: #e5e7eb; border-radius: 4px; }
  }

  .card-title {
    font-size: 13px;
    font-weight: 800;
    color: #fff;
    background: #111;
    margin: -13px -13px 10px -13px;
    padding: 9px 13px;
    border-radius: 14px 14px 0 0;
    flex-shrink: 0;
    letter-spacing: 0.3px;
  }

.card-subtitle {
    font-size: 11px;
    font-weight: 700;
    color: #555;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    background: #f3f4f6;
    margin: 10px -13px 6px -13px;
    padding: 5px 13px;
    text-align: center;
  }

  .items-list {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  /* ── ITEM ROW ── */
  .item-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 8px;
    padding: 7px 9px;
    border-radius: 8px;
    background: #f9fafb;
    border: 1.5px solid transparent;
    transition: 0.2s;

    &.off {
      background: #fff1f1;
      border-color: #fecaca;

      .item-name {
        color: #dc2626;
      }

      .item-sub {
        color: #f87171;
      }
    }
  }

  .item-info {
    display: flex;
    flex-direction: column;
    gap: 1px;
    min-width: 0;
  }

  .item-name {
    font-size: 12px;
    font-weight: 600;
    color: #111;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    transition: 0.2s;
  }

  .item-sub {
    font-size: 11px;
    color: #888;
    transition: 0.2s;
  }

  /* ── TOGGLE ── */
  .toggle {
    height: 26px;
    padding: 0 9px;
    border-radius: 6px;
    font-size: 11px;
    font-weight: 700;
    cursor: pointer;
    transition: 0.2s;
    white-space: nowrap;
    flex-shrink: 0;
    border: 1.5px solid #fca5a5;
    background: #fee2e2;
    color: #dc2626;

    &.on {
      background: #dcfce7;
      border-color: #16a34a;
      color: #15803d;
    }

    &:hover {
      transform: scale(1.04);
    }
  }

`;
