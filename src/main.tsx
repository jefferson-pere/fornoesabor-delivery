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
import { PedidoProvider } from "./context/PedidoProvider";
import { Confirmacao } from "./pages/confirmacao";
import { Pagamento } from "./pages/pagamento";
import { Admin } from "./pages/Admin";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <PedidoProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<App />}>
              <Route path="/" element={<Home />} />
              <Route path="/pedido" element={<Pedido />} />
              <Route path="/revisao" element={<Revisao />} />
              <Route path="/confirmacao" element={<Confirmacao />} />
              <Route path="/pagamento" element={<Pagamento />} />
              <Route path="/admin" element={<Admin />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </PedidoProvider>
    </ThemeProvider>
  </React.StrictMode>,
);
