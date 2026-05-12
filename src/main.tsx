import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { theme } from "./styles/theme";
import { GlobalStyles } from "./styles/global";
import { App } from "./app";
import { Pedido } from "./pages/pedido";
import { Revisao } from "./pages/revisao";
import { Home } from "./pages/home";
import { Confirmacao } from "./pages/confirmacao";
import { Pagamento } from "./pages/pagamento";
import { PedidoProvider } from "./context/PedidoProvider";
import { StoreGuard } from "./utils/StoreGuard";
import { Historico } from "./pages/historico";
import { Painel } from "./pages/painel";
import CreateOrder from "./pages/painel/create-order";
import SorteioPage from "./pages/sorteio";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyles />
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
              <Route path="/revisao" element={<Revisao />} />
            </Route>
            <Route path="/painel" element={<Painel />} />
            <Route path="/painel/criarpedido" element={<CreateOrder />} />
            <Route path="/painel/criarpedido/:id" element={<CreateOrder />} />
            <Route path="/historico" element={<Historico />} />
            <Route path="/sorteio" element={<SorteioPage />} />
          </Routes>
        </BrowserRouter>
      </PedidoProvider>
    </ThemeProvider>
  </React.StrictMode>,
);
