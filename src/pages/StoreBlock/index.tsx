import { StoreClosed } from "./store-closed";
import { StoreDemand } from "./store-demand";

type Props = {
  // mensagem: string;
  tipo: "fechado" | "demanda";
};

export function StoreBlock({ tipo }: Props) {
  if (tipo === "fechado") {
    return <StoreClosed />;
  }

  return <StoreDemand />;
}
