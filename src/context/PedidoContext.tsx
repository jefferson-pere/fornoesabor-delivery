import { createContext } from "react";
import type { PedidoContextType } from "../types/pedido";

export const PedidoContext = createContext({} as PedidoContextType);
