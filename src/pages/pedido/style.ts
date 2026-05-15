import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  max-width: 100vw;
  overflow-x: hidden;
  min-height: 100vh;
  background: #f5f5f5;
  display: flex;
  justify-content: center;

  .content {
    width: 100%;
    max-width: 420px;
    display: flex;
    flex-direction: column;
    background: #fff;
    min-height: 100vh;
  }

  /* HEADER */
  .page-header {
    padding: 14px 16px 10px;
    border-bottom: 1px solid #f0f0f0;
  }

  .page-title {
    font-size: 17px;
    font-weight: 700;
    color: #222;
  }

  /* FORM */
  .form {
    padding: 12px 16px;
    display: flex;
    flex-direction: column;
    gap: 0;
    flex: 1;
    overflow-y: auto;
  }

  /* SEÇÃO */
  .section {
    padding: 12px 0;
    border-bottom: 1px solid #f3f3f3;
  }

  .section:last-child {
    border-bottom: none;
  }

  .section-label {
    font-size: 12px;
    font-weight: 700;
    color: #888;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .count-badge {
    background: #eee;
    color: #666;
    font-size: 11px;
    font-weight: 700;
    padding: 2px 8px;
    border-radius: 20px;
  }

  .count-badge.full {
    background: #dcfce7;
    color: #16a34a;
  }

  .required-tag {
    background: #fee2e2;
    color: #dc2626;
    font-size: 10px;
    font-weight: 700;
    padding: 2px 7px;
    border-radius: 20px;
    text-transform: uppercase;
  }

  /* REFRI OBRIGATÓRIO */
  .refri-section {
    border-radius: 12px;
    padding: 12px;
    margin: 0 -12px;
    transition: background 0.2s, border 0.2s;
  }

  .refri-pending {
    background: #fffbeb;
    border: 1.5px dashed #fbbf24 !important;
  }

  .refri-error {
    background: #fff5f5;
    border: 1.5px solid #ef4444 !important;
    animation: shake 0.35s ease;
  }

  .refri-pending-tag {
    background: #fef3c7;
    color: #92400e;
    font-size: 10px;
    font-weight: 700;
    padding: 2px 8px;
    border-radius: 20px;
    text-transform: uppercase;
    letter-spacing: 0.3px;
  }

  .refri-hint {
    font-size: 12px;
    color: #b45309;
    margin: 0 0 8px;
  }

  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    25%       { transform: translateX(-6px); }
    75%       { transform: translateX(6px); }
  }

  .optional-tag {
    color: #bbb;
    font-size: 11px;
    font-weight: 500;
    text-transform: none;
    letter-spacing: 0;
  }

  .price-hint {
    color: #aaa;
    font-size: 11px;
    font-weight: 500;
    text-transform: none;
    letter-spacing: 0;
  }

  .included-tag {
    color: #16a34a;
    font-size: 11px;
    font-weight: 600;
    text-transform: none;
    letter-spacing: 0;
  }

  .error-text {
    font-size: 12px;
    color: #ef4444;
    margin: 0 0 8px;
  }

  /* COMBO CARDS */
  .combo-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
  }

  .combo-card {
    border: 1.5px solid #eee;
    border-radius: 14px;
    padding: 12px;
    background: #fafafa;
    cursor: pointer;
    transition: border-color 0.15s, background 0.15s, transform 0.1s;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .combo-card:active {
    transform: scale(0.97);
  }

  .combo-card:hover {
    border-color: #fbb;
    background: #fff8f8;
  }

  .combo-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2px;
  }

  .combo-badge {
    font-size: 10px;
    font-weight: 800;
    padding: 2px 7px;
    border-radius: 6px;
    letter-spacing: 0.3px;
  }

  .combo-badge.prime {
    background: #fee2e2;
    color: #dc2626;
  }

  .combo-badge.classico {
    background: #e0f2fe;
    color: #0369a1;
  }

  .combo-price {
    font-size: 13px;
    font-weight: 800;
    color: #d90000;
  }

  .combo-units {
    font-size: 13px;
    font-weight: 600;
    color: #222;
  }

  .combo-extras {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
    margin-top: 2px;
  }

  .combo-extras span {
    font-size: 11px;
    color: #666;
  }

  /* COMBO EDITANDO */
  .combo-editing-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #fff5f5;
    border: 1.5px solid #fdd;
    border-radius: 14px;
    padding: 12px 14px;
    margin-bottom: 4px;
  }

  .combo-editing-name {
    font-size: 14px;
    font-weight: 700;
    color: #222;
  }

  .combo-editing-price {
    font-size: 13px;
    color: #d90000;
    font-weight: 600;
    margin-top: 2px;
  }

  .btn-trocar {
    font-size: 12px;
    font-weight: 600;
    color: #d90000;
    background: none;
    border: 1px solid #fbb;
    border-radius: 8px;
    padding: 6px 12px;
    cursor: pointer;
  }

  /* BARRA DE PROGRESSO */
  .progress-bar {
    height: 6px;
    background: #eee;
    border-radius: 99px;
    overflow: hidden;
    margin-bottom: 12px;
  }

  .progress-fill {
    height: 100%;
    background: linear-gradient(90deg, #ff4d4f, #d90000);
    border-radius: 99px;
    transition: width 0.3s ease;
  }

  /* SABORES */
  .sabor-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 0;
    border-bottom: 1px solid #f8f8f8;
  }

  .sabor-row:last-child {
    border-bottom: none;
  }

  .sabor-name {
    font-size: 13px;
    color: #333;
    flex: 1;
    margin-right: 10px;
  }

  /* CONTROLE DE QUANTIDADE */
  .qtd-control {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .qtd-control.standalone {
    margin-top: 4px;
  }

  .qtd-btn {
    width: 34px;
    height: 34px;
    border-radius: 8px;
    border: none;
    font-size: 18px;
    font-weight: bold;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: opacity 0.15s;
  }

  .qtd-btn.minus {
    background: #f3f4f6;
    color: #555;
  }

  .qtd-btn.plus {
    background: #d90000;
    color: #fff;
  }

  .qtd-btn:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }

  .qtd-value {
    font-size: 15px;
    font-weight: 600;
    color: #aaa;
    min-width: 22px;
    text-align: center;
    transition: color 0.2s;
  }

  .qtd-value.has {
    color: #d90000;
  }

  /* CHIPS */
  .chips {
    display: flex;
    gap: 8px;
  }

  .chips.wrap {
    flex-wrap: wrap;
  }

  .chip {
    padding: 8px 14px;
    border-radius: 99px;
    border: 1.5px solid #eee;
    background: #fafafa;
    font-size: 13px;
    font-weight: 500;
    color: #555;
    cursor: pointer;
    transition: border-color 0.15s, background 0.15s, color 0.15s;
    white-space: nowrap;
  }

  .chip:active {
    transform: scale(0.96);
  }

  .chip.active {
    border-color: #d90000;
    background: #fff0f0;
    color: #d90000;
    font-weight: 700;
  }

  /* MAIONESE INLINE */
  .maionese-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
  }

  .maionese-info {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .maionese-title {
    font-size: 13px;
    font-weight: 700;
    color: #888;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  /* SELECT */
  .select-input {
    width: 100%;
    box-sizing: border-box;
    border: 1.5px solid #eee;
    border-radius: 12px;
    padding: 10px 12px;
    font-size: 14px;
    color: #333;
    background: #fafafa;
    outline: none;
    font-family: inherit;
    cursor: pointer;
    appearance: auto;
    transition: border-color 0.2s;
  }

  .select-input:focus {
    border-color: #fbb;
    background: #fff;
  }

  /* OBSERVAÇÃO */
  .obs-input {
    width: 100%;
    box-sizing: border-box;
    border: 1.5px solid #eee;
    border-radius: 12px;
    padding: 10px 12px;
    font-size: 14px;
    color: #333;
    background: #fafafa;
    resize: none;
    outline: none;
    font-family: inherit;
    transition: border-color 0.2s;
  }

  .obs-input:focus {
    border-color: #fbb;
    background: #fff;
  }

  /* AÇÕES DO COMBO */
  .combo-actions {
    display: flex;
    gap: 10px;
    padding: 14px 0 4px;
  }

  .btn-cancel {
    flex: 0 0 auto;
    height: 48px;
    padding: 0 18px;
    border-radius: 10px;
    border: 1.5px solid #eee;
    background: #f5f5f5;
    color: #555;
    font-weight: 600;
    font-size: 14px;
    cursor: pointer;
    transition: opacity 0.2s;
  }

  .btn-add {
    flex: 1;
    height: 48px;
    border-radius: 10px;
    border: none;
    background: #d90000;
    color: #fff;
    font-weight: 700;
    font-size: 15px;
    cursor: pointer;
    transition: background 0.3s, transform 0.1s;
  }

  .btn-add.success {
    background: #16a34a;
    cursor: default;
  }

  .btn-add:active {
    transform: scale(0.97);
  }

  /* ITENS ADICIONADOS */
  .items-section {
    margin-top: 4px;
  }

  .item-card {
    display: flex;
    gap: 10px;
    align-items: flex-start;
    background: #fafafa;
    border: 1px solid #eee;
    border-radius: 12px;
    padding: 12px;
    margin-bottom: 8px;
  }

  .item-card:last-of-type {
    margin-bottom: 10px;
  }

  .item-info {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 2px;
    min-width: 0;
  }

  .item-info strong {
    font-size: 14px;
    color: #222;
  }

  .item-price {
    font-size: 13px;
    font-weight: 700;
    color: #d90000;
    margin-bottom: 4px;
  }

  .item-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
  }

  .tag {
    font-size: 11px;
    background: #f0f0f0;
    color: #555;
    padding: 2px 8px;
    border-radius: 99px;
  }

  .tag.obs {
    background: #fef9c3;
    color: #854d0e;
  }

  .item-btns {
    display: flex;
    flex-direction: column;
    gap: 6px;
    flex-shrink: 0;
  }

  .icon-btn {
    width: 34px;
    height: 34px;
    border-radius: 8px;
    border: 1px solid #eee;
    background: #fff;
    color: #555;
    font-size: 16px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.15s, color 0.15s;
  }

  .icon-btn.danger {
    color: #dc2626;
    border-color: #fee2e2;
    background: #fff8f8;
  }

  /* FOOTER FIXO */
  .footer {
    border-top: 1px solid #f0f0f0;
    padding: 12px 16px 24px;
    background: #fff;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .footer-total {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .footer-total-left {
    display: flex;
    flex-direction: column;
    gap: 1px;
  }

  .footer-label {
    font-size: 13px;
    color: #777;
    font-weight: 500;
  }

  .footer-frete {
    font-size: 11px;
    color: #aaa;
  }

  .footer-price {
    font-size: 20px;
    font-weight: 800;
    color: #d90000;
  }

  .footer-btns {
    display: flex;
    gap: 10px;
  }

  .btn-continue {
    flex: 1;
    height: 50px;
    border-radius: 10px;
    border: none;
    background: #d90000;
    color: #fff;
    font-weight: 700;
    font-size: 15px;
    cursor: pointer;
    transition: opacity 0.2s, transform 0.1s;
  }

  .btn-continue:active {
    transform: scale(0.97);
  }

  .btn-continue.disabled {
    background: #e0e0e0;
    color: #aaa;
    cursor: not-allowed;
  }

  /* DESKTOP */
  @media (min-width: 1024px) {
    .content {
      max-width: 560px;
    }

    .form {
      padding: 16px 24px;
    }

    .footer {
      padding: 14px 24px 32px;
    }

    .combo-grid {
      grid-template-columns: repeat(3, 1fr);
    }

    .sabor-name {
      font-size: 14px;
    }

    .btn-add,
    .btn-continue {
      height: 52px;
      font-size: 16px;
    }
  }
`;
