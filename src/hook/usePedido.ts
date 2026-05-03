import { useContext } from "react";
import { PedidoContext } from "../context/PedidoContext";

export const usePedido = () => useContext(PedidoContext);
