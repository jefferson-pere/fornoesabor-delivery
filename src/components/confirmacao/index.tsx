import { Container } from "./styles";

type Props = {
  nome: string;
  combo?: { nome: string; refri: string };
  sabores: Record<string, number>;
  refri: string;
  total: number;
  onNovoPedido: () => void;
};

export function Confirmacao({
  nome,
  combo,
  sabores,
  refri,
  total,
  onNovoPedido,
}: Props) {
  return (
    <Container>
      <div className="content">
        <div className="header">🎉 Pedido Enviado!</div>

        <div className="section center">
          <h2>Obrigado, {nome}!</h2>

          <p>Seu pedido foi recebido com sucesso 🙌</p>
          <p>Estamos preparando tudo com carinho 🍕</p>

          <hr />

          <p className="resumo-title">Resumo do pedido</p>

          <p>
            <strong>{combo?.nome}</strong>
          </p>

          {combo?.refri !== "none" && <p>🥤 {refri}</p>}

          {Object.entries(sabores).map(([s, q]) =>
            q > 0 ? (
              <p key={s}>
                {q}x {s}
              </p>
            ) : null,
          )}

          <h2 className="total">Total: R$ {total.toFixed(2)}</h2>

          <button className="button" onClick={onNovoPedido}>
            Fazer novo pedido
          </button>
        </div>
      </div>
    </Container>
  );
}
