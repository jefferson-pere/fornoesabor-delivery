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
    max-width: 480px;
    display: flex;
    flex-direction: column;
    background: #fff;
    min-height: 100vh;
  }

  /* PAINEL LATERAL DESKTOP (oculto no mobile) */
  .desktop-side {
    display: none;
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
    font-size: 16px;
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
    transition:
      background 0.2s,
      border 0.2s;
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
    0%,
    100% {
      transform: translateX(0);
    }
    25% {
      transform: translateX(-6px);
    }
    75% {
      transform: translateX(6px);
    }
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
    font-size: 14px;
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
    grid-template-columns: 1fr;
    gap: 10px;
  }

  .combo-card {
    background: linear-gradient(135deg, #fff5f5 0%, #fff 60%);
    border: 1.5px solid #fac8c8;
    border-left: 8px solid #d90000;
    border-radius: 16px;
    padding: 18px 18px 18px 16px;
    cursor: pointer;
    transition:
      box-shadow 0.2s,
      transform 0.15s,
      border-color 0.2s,
      background 0.2s;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 14px;
    box-shadow: 0 3px 12px rgba(217, 0, 0, 0.09);
  }

  .combo-card:hover {
    border-color: #d90000;
    box-shadow: 0 8px 24px rgba(217, 0, 0, 0.46);
    transform: translateY(-2px);
    background: linear-gradient(135deg, #ffe8e8 0%, #fff5f5 60%);
  }

  .combo-card:active {
    transform: scale(0.98) translateY(0);
    box-shadow: 0 2px 8px rgba(217, 0, 0, 0.12);
  }

  .combo-left {
    display: flex;
    flex-direction: column;
    gap: 5px;
    flex: 1;
    min-width: 0;
  }

  .combo-top {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 0;
  }

  .combo-badge {
    font-size: 11px;
    font-weight: 800;
    padding: 3px 9px;
    border-radius: 99px;
    letter-spacing: 0.4px;
    text-transform: uppercase;
  }

  .combo-badge.prime {
    background: #fee2e2;
    color: #dc2626;
  }

  .combo-badge.classico {
    background: #fef3c7;
    color: #92400e;
  }

  .container-price {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 4px;
    flex-shrink: 0;
  }

  .combo-price {
    font-size: 22px;
    font-weight: 900;
    color: #d90000;
    line-height: 1;
  }

  .combo-arrow {
    font-size: 20px;
    color: #d90000;
    opacity: 0.5;
    line-height: 1;
  }

  .combo-units {
    font-size: 20px;
    font-weight: 800;
    color: #111;
    line-height: 1.1;
  }

  .combo-extras {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
    margin-top: 0;
  }

  .combo-extras span {
    font-size: 12px;
    color: #16a34a;
    font-weight: 600;
    background: #dcfce7;
    padding: 2px 8px;
    border-radius: 99px;
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
    width: 36px;
    height: 36px;
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
    flex-wrap: wrap;
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
    transition:
      border-color 0.15s,
      background 0.15s,
      color 0.15s;
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

  /* REFRI EXTRA */
  .refri-extra-section {
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 12px;
    padding: 12px !important;
    margin: 4px 0;
  }

  .refri-extra-section .section-label {
    color: #64748b;
    margin-bottom: 10px;
  }

  .refri-extra-select {
    border-color: #cbd5e1 !important;
    background: #fff !important;
    font-size: 15px !important;
    color: #334155 !important;
  }

  .refri-extra-select:focus {
    border-color: #94a3b8 !important;
    box-shadow: none !important;
  }

  /* MAIONESE INLINE */
  .maionese-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
    padding: 5px;
    border: 1px solid #b9b9b9;
    border-radius: 8px;
    background: #eeeded;
  }

  .maionese-info {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .maionese-title {
    font-size: 16px;
    font-weight: 700;
    color: #6d6d6d;
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
    font-size: 16px;
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
  .btn-obs-toggle {
    width: 100%;
    padding: 10px;
    border: 1.5px dashed #d1d5db;
    border-radius: 10px;
    background: transparent;
    color: #9ca3af;
    font-size: 13px;
    font-weight: 500;
    cursor: pointer;
    text-align: center;
    transition: border-color 0.2s, color 0.2s;
  }

  .btn-obs-toggle:hover {
    border-color: #9ca3af;
    color: #6b7280;
  }

  .btn-obs-fechar {
    background: none;
    border: none;
    color: #ef4444;
    font-size: 11px;
    font-weight: 600;
    cursor: pointer;
    padding: 0;
    margin-left: auto;
    text-transform: none;
    letter-spacing: 0;
  }

  .obs-input {
    width: 100%;
    box-sizing: border-box;
    border: 1.5px solid #eee;
    border-radius: 12px;
    padding: 10px 12px;
    font-size: 16px;
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
    transition:
      background 0.3s,
      transform 0.1s;
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
    width: 36px;
    height: 36px;
    border-radius: 8px;
    border: 1px solid #eee;
    background: #fff;
    color: #555;
    font-size: 16px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition:
      background 0.15s,
      color 0.15s;
  }

  .icon-btn.danger {
    color: #dc2626;
    border-color: #fee2e2;
    background: #fff8f8;
  }

  /* FOOTER FIXO */
  .footer {
    border-top: 1px solid #f0f0f0;
    padding: 12px 16px max(24px, env(safe-area-inset-bottom, 24px));
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
    height: 52px;
    border-radius: 10px;
    border: none;
    background: #d90000;
    color: #fff;
    font-weight: 700;
    font-size: 15px;
    cursor: pointer;
    transition:
      opacity 0.2s,
      transform 0.1s;
  }

  .btn-continue:active {
    transform: scale(0.97);
  }

  .btn-continue.disabled {
    background: #e0e0e0;
    color: #aaa;
    cursor: not-allowed;
  }

  /* ── DESKTOP ── */
  @media (min-width: 1024px) {
    .content {
      max-width: 100%;
      width: 100%;
      height: 100vh;
      overflow: hidden;
      display: grid;
      grid-template-columns: 1fr 600px;
      grid-template-rows: auto auto 1fr auto;
    }

    /* Painel lateral */
    .desktop-side {
      display: block;
      position: relative;
      grid-column: 1;
      grid-row: 1 / -1;
      overflow: hidden;
    }

    .desktop-side img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }

    .side-overlay {
      position: absolute;
      inset: 0;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      padding: 40px;
      background: linear-gradient(
        to bottom,
        rgba(0, 0, 0, 0.05) 0%,
        rgba(0, 0, 0, 0.65) 100%
      );
    }

    .side-badge {
      display: inline-flex;
      align-self: flex-start;
      background: #d90000;
      color: #fff;
      font-size: 11px;
      font-weight: 700;
      padding: 4px 12px;
      border-radius: 99px;
      margin-bottom: 8px;
      letter-spacing: 0.3px;
    }

    .side-title {
      font-size: 36px;
      font-weight: 800;
      color: #fff;
      line-height: 1.1;
      text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
    }

    .side-sub {
      font-size: 15px;
      color: rgba(255, 255, 255, 0.85);
      margin-top: 6px;
    }

    /* Conteúdo na coluna direita */
    .content > *:not(.desktop-side) {
      grid-column: 2;
    }

    .page-header {
      padding: 20px 28px 12px;
    }

    .form {
      padding: 4px 28px 8px;
      overflow-y: auto;
      min-height: 0;
    }

    .footer {
      padding: 12px 28px 28px;
    }

    .combo-grid {
      grid-template-columns: 1fr;
    }

    .sabor-name {
      font-size: 14px;
    }

    .btn-add,
    .btn-continue {
      height: 52px;
      font-size: 16px;
    }

    .select-input,
    .obs-input {
      font-size: 14px;
    }
  }

  @media (min-width: 1440px) {
    .content {
      grid-template-columns: 1fr 640px;
    }
  }

  /* INDISPONÍVEL */
  .combo-card.indisponivel {
    opacity: 0.45;
    cursor: not-allowed;
    pointer-events: none;
  }

  .badge-indisponivel {
    font-size: 11px;
    font-weight: 700;
    background: #fee2e2;
    color: #dc2626;
    padding: 2px 8px;
    border-radius: 6px;
  }

  .sabor-row.sabor-indisponivel {
    opacity: 0.4;
  }

  .tag-indisponivel {
    font-size: 11px;
    color: #dc2626;
    font-weight: 600;
  }

  .chip.chip-indisponivel {
    opacity: 0.4;
    cursor: not-allowed;
    pointer-events: none;
  }
`;
