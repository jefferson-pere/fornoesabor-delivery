import React from "react";
import styled from "styled-components";

const Bar = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 16px 6px;
  background: #fff;
  border-bottom: 1px solid #f0f0f0;

  .step {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 0 0 auto;
  }

  .step-circle {
    width: 26px;
    height: 26px;
    border-radius: 50%;
    background: #eee;
    color: #aaa;
    font-size: 11px;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.3s, color 0.3s;
  }

  .step.active .step-circle {
    background: #d90000;
    color: #fff;
  }

  .step.done .step-circle {
    background: #22c55e;
    color: #fff;
  }

  .step-label {
    font-size: 10px;
    color: #bbb;
    margin-top: 3px;
    font-weight: 500;
    white-space: nowrap;
  }

  .step.active .step-label {
    color: #d90000;
    font-weight: 700;
  }

  .step.done .step-label {
    color: #22c55e;
  }

  .connector {
    flex: 1;
    height: 2px;
    background: #eee;
    margin-bottom: 18px;
    transition: background 0.3s;
  }

  .connector.done {
    background: #22c55e;
  }
`;

const STEPS = ["Dados", "Pedido", "Pagamento", "Revisão"];

interface Props {
  current: 1 | 2 | 3 | 4;
}

export function StepProgress({ current }: Props) {
  return (
    <Bar>
      {STEPS.map((label, i) => {
        const num = i + 1;
        const isDone = num < current;
        const isActive = num === current;
        return (
          <React.Fragment key={label}>
            <div className={`step${isDone ? " done" : ""}${isActive ? " active" : ""}`}>
              <div className="step-circle">{isDone ? "✓" : num}</div>
              <div className="step-label">{label}</div>
            </div>
            {i < STEPS.length - 1 && (
              <div className={`connector${isDone ? " done" : ""}`} />
            )}
          </React.Fragment>
        );
      })}
    </Bar>
  );
}
