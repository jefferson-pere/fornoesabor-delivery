type Props = {
  sabores: string[];
  selecionados: string[];
  onToggle: (sabor: string) => void;
};

export function SaboresSelector({ sabores, selecionados, onToggle }: Props) {
  return (
    <div>
      <h3>Sabores</h3>
      {sabores.map((s) => (
        <label key={s}>
          <input
            type="checkbox"
            checked={selecionados.includes(s)}
            onChange={() => onToggle(s)}
          />
          {s}
        </label>
      ))}
    </div>
  );
}
