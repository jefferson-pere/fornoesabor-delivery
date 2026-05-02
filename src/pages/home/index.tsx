import axios from "axios";
import { Container } from "./style";
import { useState } from "react";

export function Home() {
  const [nome, setNome] = useState("");
  const [item, setItem] = useState("");

  const enviarPedido = async () => {
    await axios.post("http://localhost:3000/orders", {
      nome,
      itens: [item],
      total: 20,
    });

    alert("Pedido enviado!");
  };

  return (
    <Container>
      <p>Bem-vindo ao projeto base!</p>
      <div style={{ padding: 20 }}>
        <h1>Fazer Pedido</h1>

        <input
          placeholder="Seu nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />

        <br />
        <br />

        <input
          placeholder="Item"
          value={item}
          onChange={(e) => setItem(e.target.value)}
        />

        <br />
        <br />

        <button onClick={enviarPedido}>Enviar Pedido</button>
      </div>
    </Container>
  );
}
