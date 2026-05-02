type Props = {
  tipo?: "lata" | "1l";
  value: string;
  onChange: (v: string) => void;
  opcoes: Record<string, string[]>;
};

export function RefriSelector({ tipo, value, onChange, opcoes }: Props) {
  if (!tipo) return null;

  return (
    <div>
      <h3>Refri</h3>
      <select value={value} onChange={(e) => onChange(e.target.value)}>
        <option value="">Escolha</option>
        {opcoes[tipo].map((r) => (
          <option key={r}>{r}</option>
        ))}
      </select>
    </div>
  );
}
