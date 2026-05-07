import { useState } from "react";

import { Container } from "./style";

import { StoreStatus } from "../../components/StoreStatus";

export function Painel() {
  const [autenticado, setAutenticado] = useState(false);

  const [senha, setSenha] = useState("");

  const SENHA = import.meta.env.VITE_ADMIN_PASSWORD;

  function entrar() {
    if (senha === SENHA) {
      setAutenticado(true);

      sessionStorage.setItem("admin-auth", "true");

      return;
    }

    alert("Senha inválida");
  }

  // 🔥 sessão salva
  if (!autenticado && sessionStorage.getItem("admin-auth") === "true") {
    setAutenticado(true);
  }

  // 🔥 LOGIN
  if (!autenticado) {
    return (
      <Container>
        <div className="login-card">
          <h1>🔒 Painel Admin</h1>

          <p>Digite a senha para acessar</p>

          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />

          <button onClick={entrar}>Entrar</button>
        </div>
      </Container>
    );
  }

  // 🔥 PAINEL
  return (
    <Container>
      <div className="topo">
        <h1>⚙️ Painel</h1>

        <button
          className="logout"
          onClick={() => {
            sessionStorage.removeItem("admin-auth");

            window.location.reload();
          }}
        >
          Sair
        </button>
      </div>

      <StoreStatus />
    </Container>
  );
}
