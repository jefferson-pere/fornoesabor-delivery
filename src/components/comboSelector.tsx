import type { ComboType } from "../types";

type Props = {
  combos: ComboType[];
  selected: ComboType | null;
  onSelect: (combo: ComboType) => void;
};

export function ComboSelector({ combos, selected, onSelect }: Props) {
  return (
    <div>
      <h3>Combos</h3>
      {combos.map((c) => (
        <label key={c.id}>
          <input
            type="radio"
            checked={selected?.id === c.id}
            onChange={() => onSelect(c)}
          />
          {c.nome} - R$ {c.preco}
        </label>
      ))}
    </div>
  );
}
