const API_URL = import.meta.env.VITE_API_URL;

export type StoreStatusType = {
  aberto: boolean;
  altaDemanda: boolean;
  mensagem: string;
};

export async function getStoreStatus(): Promise<StoreStatusType> {
  const res = await fetch(`${API_URL}/store`);

  if (!res.ok) {
    throw new Error("Erro ao carregar status da loja");
  }

  return res.json();
}

export async function updateStoreStatus(
  data: StoreStatusType,
): Promise<StoreStatusType> {
  console.log("📤 ENVIANDO:", data);

  const res = await fetch(`${API_URL}/store`, {
    method: "PATCH",

    headers: {
      "Content-Type": "application/json",
      "x-api-key": import.meta.env.VITE_API_KEY,
    },

    body: JSON.stringify(data),
  });

  const json = await res.json();

  if (!res.ok) {
    throw new Error(json.error || "Erro ao atualizar status");
  }

  return json;
}
