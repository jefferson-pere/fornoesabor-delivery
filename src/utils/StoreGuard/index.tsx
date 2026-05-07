import { useEffect, useState } from "react";
import { getStoreStatus } from "../../services/store";
import { StoreBlock } from "../../pages/StoreBlock";

type Props = {
  children: React.ReactNode;
};

export function StoreGuard({ children }: Props) {
  const [loading, setLoading] = useState(true);

  const [store, setStore] = useState({
    aberto: true,
    altaDemanda: false,
    mensagem: "",
  });

  useEffect(() => {
    async function load() {
      try {
        const data = await getStoreStatus();

        setStore(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    load();
    const interval = setInterval(load, 3000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return null;
  }

  if (!store.aberto) {
    return <StoreBlock tipo="fechado" />;
  }

  if (store.altaDemanda) {
    return <StoreBlock tipo="demanda" />;
  }

  return <>{children}</>;
}
