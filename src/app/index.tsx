import { Outlet, useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";
import { Container } from "./styles";

const PAINEL_PREFIXES = ["/painel", "/cozinha", "/historico", "/estatisticas", "/sorteio", "/entregador"];
const STORAGE_KEY = "cliente_primeiro_acesso";
const LIMITE_MS = 12 * 60 * 60 * 1000;

export function App() {
  const location = useLocation();
  const hiddenAt = useRef<number | null>(null);

  useEffect(() => {
    const isPainel = PAINEL_PREFIXES.some((p) => location.pathname.startsWith(p));
    if (isPainel) return;

    if (!localStorage.getItem(STORAGE_KEY)) {
      localStorage.setItem(STORAGE_KEY, String(Date.now()));
    }

    function handleVisibility() {
      if (document.visibilityState === "hidden") {
        hiddenAt.current = Date.now();
        return;
      }
      if (document.visibilityState === "visible") {
        const primeiroAcesso = Number(localStorage.getItem(STORAGE_KEY) ?? 0);
        if (Date.now() - primeiroAcesso >= LIMITE_MS) {
          localStorage.setItem(STORAGE_KEY, String(Date.now()));
          window.location.reload();
        }
        hiddenAt.current = null;
      }
    }

    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, [location.pathname]);

  return (
    <Container>
      <main>
        <Outlet />
      </main>
    </Container>
  );
}
