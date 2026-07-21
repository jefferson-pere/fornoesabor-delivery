import React from "react";
import ReactDOM from "react-dom/client";

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.addEventListener("controllerchange", () => {
    window.location.reload();
  });

  navigator.serviceWorker.ready.then((registration) => {
    // Verifica atualização do SW a cada 5 minutos
    setInterval(() => registration.update(), 5 * 60 * 1000);
  });
}
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "styled-components";
import { theme } from "./styles/theme";
import { GlobalStyles } from "./styles/global";
import { Toaster } from "sonner";
import { App } from "./app";
import { Pedido } from "./pages/pedido";
import { Home } from "./pages/home";
import { Confirmacao } from "./pages/confirmacao";
import { Pagamento } from "./pages/pagamento";
import { PedidoProvider } from "./context/PedidoProvider";
import { StoreGuard } from "./utils/StoreGuard";
import { PasswordGuard } from "./utils/PasswordGuard";
import { Historico } from "./pages/historico";
import { Painel } from "./pages/painel";
import CreateOrder from "./pages/painel/create-order";
import SorteioPage from "./pages/sorteio";
import { Estatisticas } from "./pages/estatisticas";
import { Cozinheiro } from "./pages/cozinheiro";
import { Configuracoes } from "./pages/painel/configuracoes";

const queryClient = new QueryClient();


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Toaster richColors position="top-right" />
      <PedidoProvider>
        <BrowserRouter>
          <Routes>
            <Route
              element={
                <StoreGuard>
                  <App />
                </StoreGuard>
              }
            >
              <Route path="/" element={<Home />} />
              <Route path="/pedido" element={<Pedido />} />
              <Route path="/pagamento" element={<Pagamento />} />
              <Route path="/confirmacao" element={<Confirmacao />} />
            </Route>
            <Route element={<PasswordGuard />}>
              <Route path="/painel" element={<Painel />} />
              <Route path="/painel/criarpedido" element={<CreateOrder />} />
              <Route path="/painel/criarpedido/:id" element={<CreateOrder />} />
              <Route path="/historico" element={<Historico />} />
              <Route path="/sorteio" element={<SorteioPage />} />
              <Route path="/estatisticas" element={<Estatisticas />} />
              <Route path="/cozinha" element={<Cozinheiro />} />
              <Route path="/painel/configuracoes" element={<Configuracoes />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </PedidoProvider>
    </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);
